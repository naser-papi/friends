import { withBasePage } from "../../components/layout/BasePage";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box, CssBaseline, Grid, Paper, Typography, useTheme } from "@mui/material";
import { doLogout } from "../../state/generalSlice";
import LoginForm from "./LoginForm";
import { PageRoutes } from "../../models/GeneralTypes";
import NavLinkGrid from "../../components/widget/NavLinkGrid";

const LoginPage = withBasePage(() => {
  const dispatch = useDispatch();
  const theme = useTheme();
  useEffect(() => {
    dispatch(doLogout());
  }, []);
  return (
    <Grid container component="main" sx={{ height: `calc(100vh - 100px)` }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url('../../assets/friends.png')",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "bottom"
        }}
      />
      <Grid item xs={12} sm={8} component={Paper as any} md={5} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Typography variant="h5">
            Please Enter your your registered email and password to login
          </Typography>
          <LoginForm />
          <NavLinkGrid
            to={PageRoutes.REGISTER}
            dataCy={"signUpLink"}
            title={"Not registered yet? Sign up"}
          />
        </Box>
      </Grid>
    </Grid>
  );
}, "Login");

export default LoginPage;
