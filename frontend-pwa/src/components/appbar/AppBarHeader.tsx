import React from "react";
import { Box, Typography } from "@mui/material";
import SearchBox from "./SearchBox";
import DesktopAppBarIcons from "./DesktopAppBarIcons";
import MobileAppBarIcons from "./MobileAppBarIcons";

const AppBarHeader = ({ userInfo, pageTitle }) => {
  if (userInfo && userInfo.token) {
    return (
      <>
        <SearchBox />
        <DesktopAppBarIcons />
        <MobileAppBarIcons />
      </>
    );
  } else {
    return (
      <>
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant={"h5"}>{pageTitle}</Typography>
      </>
    );
  }
};

export default AppBarHeader;
