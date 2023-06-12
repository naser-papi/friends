import React from "react";
import { LoginSchema, UserLoginType } from "../../models/UserTypes";
import { Button, Grid } from "@mui/material";
import FormikForm from "../../components/form/FormikForm";
import FormInput from "../../components/form/FormInput";
import useLoginService from "./useLoginService";

const LoginForm = () => {
  const [callLogin, loginApiState] = useLoginService();

  const submitHandler = (data: UserLoginType) => {
    callLogin(data);
  };

  return (
    <FormikForm
      schema={LoginSchema}
      initialValues={
        {
          email: "",
          password: ""
        } as UserLoginType
      }
      sx={{ mt: 3 }}
      doSubmit={submitHandler}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormInput name={"email"} label={"Email Address"} type={"email"} autoComplete="email" />
        </Grid>
        <Grid item xs={12}>
          <FormInput
            name={"password"}
            label={"Password"}
            type={"password"}
            autoComplete="password"
          />
        </Grid>
      </Grid>
      <Button
        disabled={loginApiState === "pending"}
        data-cy={"submit"}
        type={"submit"}
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Login
      </Button>
    </FormikForm>
  );
};

export default LoginForm;
