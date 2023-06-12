import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IApiCallConfig, IGeneralState, INotifyBar, IUserInfo } from "../models/GeneralTypes";
import axios from "axios";

export const callApi = createAsyncThunk("api/call", async (config: IApiCallConfig, thunkAPI) => {
  const state = thunkAPI.getState() as IGeneralState;
  let axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL
  });
  if (!config.noToken) {
    axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_SERVER_URL,
      headers: {
        Authorization: `Bearer ${state.userInfo.token}`
      }
    });
  }
  const addr = `/api/${config.url}`;
  const body = config.getBody ? config.getBody() : null;
  let resp = null;
  try {
    switch (config.method) {
      case "POST":
        resp = await axiosInstance.post(addr, body);
        break;
      case "GET":
        resp = await axiosInstance.get(addr);
        break;
      case "DELETE":
        resp = await axiosInstance.delete(addr);
        break;
      case "PUT":
        resp = await axiosInstance.put(addr, body);
        break;
      case "PATCH":
        resp = await axiosInstance.patch(addr, body);
        break;
      default:
        resp = await axiosInstance.get(addr);
        break;
    }

    if (resp.status === 200) {
      thunkAPI.fulfillWithValue(resp.data);
      if (config.successHandler) {
        config.successHandler(resp.data);
      }
    } else {
      thunkAPI.rejectWithValue(resp.data.message);
      if (!config.noShowError) {
        thunkAPI.dispatch(showNotify({ show: true, type: "error", message: resp.data.message }));
      }
      if (config.failedHandler) {
        config.failedHandler(resp.data.message);
      }
    }
  } catch (ex) {
    thunkAPI.rejectWithValue(ex);
    if (config.failedHandler) {
      config.failedHandler(ex);
    }
  }
  return resp;
});

const initialState: IGeneralState = window.initialState || {
  mode: "light",
  isLoggedIn: false,
  isFetchApi: false,
  userInfo: {} as IUserInfo
};

const generalSlice = createSlice<IGeneralState>({
  name: "general",
  initialState: initialState,
  reducers: {
    toggleMode: (state: IGeneralState) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
    doLogin: (state: IGeneralState, action: PayloadAction<IUserInfo>) => {
      state.userInfo = action.payload;
      state.isLoggedIn = true;
    },
    doLogout: (state: IGeneralState) => {
      state.userInfo = initialState.userInfo;
      state.isLoggedIn = false;
    },
    showNotify: (state: IGeneralState, action: PayloadAction<INotifyBar>) => {
      state.notify = action.payload;
    },
    callApi: (state: IGeneralState, action: PayloadAction<IApiCallConfig>) => {}
  },
  extraReducers: {
    [callApi.pending]: (state: IGeneralState, action) => {
      state.isFetchApi = true;
    },
    [callApi.fulfilled]: (state: IGeneralState, action) => {
      state.isFetchApi = false;
    },
    [callApi.rejected]: (state: IGeneralState, action) => {
      state.isFetchApi = false;
    }
  }
});

export const showNotify = generalSlice.actions.showNotify as (payload: INotifyBar) => AnyAction;
export const doLogin = generalSlice.actions.doLogin as (payload: IUserInfo) => AnyAction;
export const { toggleMode, doLogout } = generalSlice.actions;

export default generalSlice.reducer;
