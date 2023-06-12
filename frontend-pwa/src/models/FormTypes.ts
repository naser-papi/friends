import { validateYupSchema } from "formik";
import { StyledComponentProps, SxProps, Theme } from "@mui/material";
import { InferType } from "yup";
import { ReactNode } from "react";
import { IAction } from "./GeneralTypes";

export interface IFormInputType {
  name: string;
  label: string;
  type: "text" | "email" | "text-area" | "check" | "select" | "password" | "radio" | "img";
  autoComplete?: string;
  fullWidth?: boolean;
  autoFocus?: boolean;
  sx?: SxProps<Theme>;
}

export interface IFormikForm<T> {
  schema: validateYupSchema<T>;
  children: ReactNode[];
  doSubmit: (values: InferType<T>) => void;
  initialValues?: InferType<T>;
  sx?: SxProps<Theme>;
}

export interface IFormType<T> {
  submitHandler: (T) => void;
  disableSubmit: boolean;
}

export interface ILayoutContext {
  toggleBriefInfo: () => void;
  doBriefInfoAction: (action: IAction<object>) => void;
}

export interface ILayoutProvider {
  children: ReactNode[];
}

export type AvatarSizeType = "small" | "medium" | "large";

export interface IAvatarWithInfo extends StyledComponentProps {
  title?: string;
  subtitle?: string;
  image?: string;
  icon?: ReactNode;
  size?: AvatarSizeType;
}
