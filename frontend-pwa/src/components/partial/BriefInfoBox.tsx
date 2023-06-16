import React from "react";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  styled,
  Typography,
  useTheme
} from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EditIcon from "@mui/icons-material/Edit";
import { IUserInfo } from "../../models/GeneralTypes";
import { useLayouContext } from "../layout/LayoutProvider";
import AvatarWithInfo from "../widget/AvatarWithInfo";
import InfoLine from "../widget/InfoLine";

const InfoBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  borderRadius: theme.spacing(1),
  ".MuiListItem-root": {
    padding: "0",
    justifyContent: "space-between",
    marginBottom: theme.spacing(1)
  },
  ".MuiDivider-root": {
    margin: theme.spacing(1)
  },
  [theme.breakpoints.down("sm")]: {
    width: "240px"
  },
  [theme.breakpoints.up("sm")]: {
    width: "320"
  },
  span: {
    fontSize: "0.8rem",
    color: theme.palette.info.light
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
          <IconButton aria-label={"friends"}>
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
        <ListItem>
          <InfoLine text={"Who's viewed your profile"} value={props.viewedProfile ?? 0} />
        </ListItem>
        <ListItem>
          <InfoLine text={"impressions of your post"} value={props.impressions ?? 0} />
        </ListItem>
        <Divider />
        <ListItem>
          <Typography variant={"body1"}>Social Profiles</Typography>
        </ListItem>
        <ListItem>
          <AvatarWithInfo icon={<TwitterIcon />} title={"Twitter"} subtitle={"Social Network"} />
          <IconButton aria-label={"edit"}>
            <EditIcon />
          </IconButton>
        </ListItem>
        <ListItem>
          <AvatarWithInfo
            icon={<LinkedInIcon />}
            title={"Linkedin"}
            subtitle={"Network Platform"}
          />
          <IconButton aria-label={"edit"}>
            <EditIcon />
          </IconButton>
        </ListItem>
      </List>
    </InfoBox>
  );
};

export default BriefInfoBox;
