import React from "react";
import { Button, Grid } from "@mui/material";
import { RegisterSchema, UserRegisterType } from "../../models/UserTypes";
import FormInput from "../../components/form/FormInput";
import FormikForm from "../../components/form/FormikForm";
import useRegisterService from "./useRegisterService";

const RegisterForm = () => {
  const [registerSrv, callStatus] = useRegisterService();
  //const [callSubmitApi, callStatus] = useCallApi();
  // const navigate = useNavigate();
  // const { isLoggedIn } = useSelector((state: IAppState) => state.general);
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigate(PageRoutes.Home);
  //   }
  // }, [isLoggedIn]);
  // useEffect(() => {
  //   if (callStatus === "success") {
  //     dispatch(showNotify({ message: "New User registered", type: "success" }));
  //   }
  // }, [callStatus]);
  const submitHandler = (data: UserRegisterType) => {
    registerSrv(data);
  };

  return (
    <FormikForm
      schema={RegisterSchema}
      initialValues={
        {
          firstName: "",
          lastName: "",
          location: "",
          email: "",
          occupation: "",
          password: "",
          passwordConfirm: "",
          picturePath: "",
          allowEmailNotification: false
        } as UserRegisterType
      }
      sx={{ mt: 3 }}
      doSubmit={submitHandler}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} display={"flex"} justifyContent={"center"}>
          <FormInput
            name={"picturePath"}
            label={"profile Image"}
            type={"img"}
            fullWidth={true}
            sx={{ width: "96px", height: "96px", boxShadow: "2px 2px 3px" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInput
            name={"firstName"}
            label={"First Name"}
            type={"text"}
            autoComplete="given-name"
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInput
            name={"lastName"}
            label={"Last Name"}
            type={"text"}
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <FormInput name={"email"} label={"Email Address"} type={"email"} autoComplete="email" />
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormInput
            name={"password"}
            label={"Password"}
            type={"password"}
            autoComplete="password"
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormInput
            name={"passwordConfirm"}
            label={"Password Confirm"}
            type={"password"}
            autoComplete="password"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <FormInput
            name={"location"}
            label={"Location"}
            type={"select"}
            autoComplete="locations"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <FormInput
            name={"occupation"}
            label={"Occupation"}
            type={"select"}
            autoComplete="occupation"
          />
        </Grid>
        <Grid item xs={12}>
          <FormInput
            name={"allowEmailNotification"}
            label={"I want to receive inspiration, marketing promotions and updates via email."}
            type={"check"}
          />
        </Grid>
      </Grid>
      <Button
        disabled={callStatus === "pending"}
        data-cy={"submit"}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Sign Up
      </Button>
    </FormikForm>
  );
};

export default RegisterForm;
