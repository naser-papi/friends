import React from "react";
import { Box, Divider, IconButton, List, ListItem, styled, useTheme } from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import { IUserInfo } from "../models/GeneralTypes";
import { useLayouContext } from "./LayoutProvider";
import AvatarWithInfo from "./AvatarWithInfo";

const InfoBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  borderRadius: theme.spacing(1),
  ".MuiListItem-root": {
    padding: "0"
  },
  ".MuiDivider-root": {
    margin: theme.spacing(1)
  },
  [theme.breakpoints.down("sm")]: {
    width: "240px"
  },
  [theme.breakpoints.up("sm")]: {
    width: "320"
  }
}));
const BriefInfoBox: React.FC<IUserInfo> = (props) => {
  const { toggleBriefInfo } = useLayouContext();
  const theme = useTheme();
  return (
    <InfoBox>
      <List role={"presentation"} data-cy={"briefInfoBox"}>
        <ListItem>
          <AvatarWithInfo
            image={props.picturePath}
            title={`${props.firstName} ${props.lastName}`}
            subtitle={`${props.friends.length} friends`}
          />
          <IconButton aria-label={"friends"} sx={{ marginLeft: "auto" }}>
            <ManageAccountsIcon />
          </IconButton>
        </ListItem>
        <Divider />
        <ListItem>
          <AvatarWithInfo subtitle={props.location} icon={<LocationOnIcon />} />
        </ListItem>
        <ListItem>
          <AvatarWithInfo subtitle={props.occupation} icon={<WorkIcon />} />
        </ListItem>
        <Divider />
      </List>
    </InfoBox>
  );
};

export default BriefInfoBox;
