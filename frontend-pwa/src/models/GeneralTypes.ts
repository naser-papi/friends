import { ReactNode } from "react";

export enum PageRoutes {
  Home = "/home",
  ROOT = "/",
  LOGIN = "/login",
  REGISTER = "/register",
  PROFILE = "/profile/:userId"
}

export interface IPageInfo {
  title: string;
  name?: string;
}

export interface INotifyBar {
  type: "error" | "success" | "warning" | "info";
  message: string;
  icon?: ReactNode;
  show?: boolean;
}

export interface IUserInfo {
  token: string;
  firstName: string;
  lastName: string;
  email: string;
  picturePath: string;
  friends: string[];
  location: string;
  occupation: string;
  viewedProfile: number;
  impressions: number;
  roles: string[];
  _id: string;
}

export interface IGeneralState {
  mode: "light" | "dark";
  isLoggedIn: boolean;
  userInfo: IUserInfo;
  isFetchApi?: boolean;
  notify?: INotifyBar;
}

export interface IPostState {
  posts: [];
}

export interface IAppState {
  general: IGeneralState;
}

export interface IAction<T> {
  name: string;
  payload: T;
}

export interface IMainLayout {
  pageTitle: string;
  children: ReactNode[];
}

export interface IBasePage {
  title: string;
  children: ReactNode[];
}

export type ApiCallStatusType = "idle" | "pending" | "success" | "failed";
export type ApiMethodType = "POST" | "GET" | "PUT" | "DELETE" | "PATCH";

export interface IApiCallConfig {
  url: string;
  method: ApiMethodType;
  noToken?: boolean;
  noShowError?: boolean;
  successHandler?: (object) => void;
  failedHandler?: (object) => void;
  validate?: (object) => Promise<boolean>;
  getBody?: () => FormData | object;
}

export interface INavLinkGrid {
  title: string;
  to: string;
  dataCy: string;
  showConfirm?: boolean;
}
