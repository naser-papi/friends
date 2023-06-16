import React from "react";
import { Box, Container, useTheme } from "@mui/material";
import { IMainLayout } from "../../models/GeneralTypes";
import SearchAppBar from "../appbar/AppBar";
import LayoutProvider from "./LayoutProvider";

const MainLayout: React.FC<IMainLayout> = ({ children, pageTitle }) => {
  const theme = useTheme();
  return (
    <LayoutProvider>
      <Container maxWidth={false} disableGutters>
        <SearchAppBar pageTitle={pageTitle} />
        <Box
          sx={{ display: "flex" }}
          bgcolor={theme.palette.background.default}
          padding={theme.spacing(2)}
          marginTop={theme.spacing(8)}
        >
          {children}
        </Box>
      </Container>
    </LayoutProvider>
  );
};

export default MainLayout;
