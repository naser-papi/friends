import React from "react";
import { useSelector } from "react-redux";
import { AppBar, Box, styled, Toolbar, Typography } from "@mui/material";
import { IAppState, IUserInfo } from "../../models/GeneralTypes";
import AppBarAvatar from "./AppBarAvatar";
import AppBarHeader from "./AppBarHeader";

const AppToolBar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  flexFlow: "row",
  columnGap: theme.spacing(1)
}));
export default function SearchAppBar({ pageTitle }) {
  const userInfo: IUserInfo = useSelector((state: IAppState) => state.general.userInfo);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <AppToolBar>
          <AppBarAvatar userInfo={userInfo} />
          <Typography
            variant="h6"
            noWrap
            data-cy={"appTitle"}
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            FRIENDS
          </Typography>
          <AppBarHeader userInfo={userInfo} pageTitle={pageTitle} />
        </AppToolBar>
      </AppBar>
    </Box>
  );
}
