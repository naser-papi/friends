import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useField } from "formik";
import { IFormInputType } from "../../models/FormTypes";

const CheckboxInput: React.FC<IFormInputType> = (props) => {
  const [field] = useField(props.name);
  return (
    <FormControlLabel
      control={
        <Checkbox
          color="primary"
          name={props.name}
          id={props.name}
          data-cy={props.name}
          value={field.value}
          onChange={field.onChange}
        />
      }
      label={props.label}
    />
  );
};

export default CheckboxInput;
