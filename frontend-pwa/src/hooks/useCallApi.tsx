import React, { useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { showNotify } from "../state/generalSlice";
import { ApiCallStatusType, IApiCallConfig, IAppState } from "../models/GeneralTypes";

const useCallApi = () => {
  const [status, setStatus] = useState<ApiCallStatusType>("idle");
  const userInfo = useSelector((state: IAppState) => state.general.userInfo);
  const dispatch = useDispatch();
  const execute = (config: IApiCallConfig) => {
    setStatus("pending");
    console.log("process", import.meta.env);

    let axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_SERVER_URL
    });
    if (!config.noToken) {
      axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_SERVER_URL,
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      });
    }
    const addr = `/api/${config.url}`;
    const body = config.getBody ? config.getBody() : null;
    let call: Promise<AxiosResponse>;
    switch (config.method) {
      case "POST":
        call = axiosInstance.post(addr, body);
        break;
      case "GET":
        call = axiosInstance.get(addr);
        break;
      case "DELETE":
        call = axiosInstance.delete(addr);
        break;
      case "PUT":
        call = axiosInstance.put(addr, body);
        break;
      case "PATCH":
        call = axiosInstance.patch(addr, body);
        break;
      default:
        call = axiosInstance.get(addr);
        break;
    }
    call
      .then((resp) => {
        if (resp.status === 200) {
          setStatus("success");
          if (config.successHandler) {
            config.successHandler(resp.data);
          }
        } else {
          setStatus("failed");
          if (config.noShowError == undefined || !config.noShowError) {
            dispatch(showNotify({ show: true, type: "error", message: resp.data.error.message }));
          }
          if (config.failedHandler) {
            config.failedHandler(resp.data);
          }
        }
      })
      .catch((ex: AxiosError) => {
        setStatus("failed");
        console.log("ex", ex);
        if (config.noShowError == undefined || !config.noShowError) {
          dispatch(showNotify({ show: true, type: "error", message: ex.response?.data?.error }));
        }
        if (config.failedHandler) {
          config.failedHandler(ex);
        }
      });
  };

  return [execute, status];
};

export default useCallApi;
