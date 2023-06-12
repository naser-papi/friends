import React from "react";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { IFormInputType } from "../../models/FormTypes";
import { useField } from "formik";

const PasswordInput: React.FC<IFormInputType> = (props) => {
  const [field, meta] = useField(props.name);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor={props.name}>{props.label}</InputLabel>
      <OutlinedInput
        name={props.name}
        id={props.name}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={props.label}
        data-cy={props.name}
        value={field.value}
        onChange={field.onChange}
        error={meta.touched && Boolean(meta.error)}
      />
    </FormControl>
  );
};

export default PasswordInput;
