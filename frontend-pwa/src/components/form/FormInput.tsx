import React from "react";
import { useField } from "formik";
import { Stack, Typography } from "@mui/material";
import { IFormInputType } from "../../models/FormTypes";
import AvatarInput from "./AvatarInput";
import PasswordInput from "./PasswordInput";
import TextInput from "./TextInput";
import CheckboxInput from "./CheckboxInput";

const GetFormInput: React.FC<IFormInputType> = (props) => {
  switch (props.type) {
    case "check":
      return <CheckboxInput {...props} />;
    case "img":
      return <AvatarInput {...props} />;
    case "password":
      return <PasswordInput {...props} />;
    default:
      return <TextInput {...props} />;
  }
};
const FormInput: React.FC<IFormInputType> = (props) => {
  const [, meta] = useField(props.name);
  return (
    <Stack direction={"column"} spacing={"1 0"}>
      <GetFormInput {...props} fullWidth={props.fullWidth == undefined ? true : props.fullWidth} />
      {meta.touched && meta.error ? (
        <Typography color={"secondary.main"} data-cy={`${props.name}-error`} variant={"subtitle1"}>
          {meta.error}
        </Typography>
      ) : null}
    </Stack>
  );
};

export default FormInput;
