import React from "react";
import { Box, CssBaseline, Grid, Paper, Typography, useTheme } from "@mui/material";
import { withBasePage } from "../../components/layout/BasePage";
import RegisterForm from "./RegisterForm";
import NavLinkGrid from "../../components/widget/NavLinkGrid";
import { PageRoutes } from "../../models/GeneralTypes";

const RegisterPage = withBasePage(() => {
  const theme = useTheme();

  return (
    <Grid container component="main" sx={{ height: `calc(100vh - ${theme.spacing(10)})` }}>
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
          backgroundSize: "contain",
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
            Please provide your details to complete the registration process.
          </Typography>
          <RegisterForm />
          <NavLinkGrid
            title={"Already have an account? Sign in"}
            dataCy={"signInLink"}
            to={PageRoutes.LOGIN}
          />
        </Box>
      </Grid>
    </Grid>
  );
}, "Register");

export default RegisterPage;
