import { IGeneralState } from "./src/models/GeneralTypes";

declare global {
  interface Window {
    initialState: IGeneralState;
  }
}
