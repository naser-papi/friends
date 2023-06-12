import React from "react";
import { Avatar, IconButton } from "@mui/material";
import SocialDistanceIcon from "@mui/icons-material/SocialDistance";
import { useLayouContext } from "../LayoutProvider";

const AppBarAvatar = ({ userInfo }) => {
  const { toggleBriefInfo } = useLayouContext();
  if (userInfo && userInfo.picturePath) {
    return (
      <Avatar
        data-cy={"userAvatar"}
        alt="user"
        src={userInfo.picturePath}
        onClick={toggleBriefInfo}
      />
    );
  } else {
    return (
      <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
        <SocialDistanceIcon />
      </IconButton>
    );
  }
};

export default AppBarAvatar;
