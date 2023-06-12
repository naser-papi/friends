import React from "react";
import { IFormInputType } from "../../models/FormTypes";
import { TextField } from "@mui/material";
import { useField } from "formik";

const TextInput: React.FC<IFormInputType> = (props) => {
  const [field, meta] = useField(props.name);
  return (
    <TextField
      name={props.name}
      id={props.name}
      label={props.label}
      data-cy={props.name}
      value={field.value}
      onChange={field.onChange}
      error={meta.touched && Boolean(meta.error)}
      {...props}
    />
  );
};

export default TextInput;
