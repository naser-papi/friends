import React from "react";
import ThemeSwitch from "../ThemeSwitch";
import { Avatar, Badge, Box, IconButton, Menu, MenuItem, Tooltip, useTheme } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";

const DesktopAppBarIcons = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const isMenuOpen = Boolean(anchorEl != null);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
        <ThemeSwitch />
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Tooltip title="Open settings">
          <IconButton
            onClick={handleProfileMenuOpen}
            sx={{ p: 0, marginLeft: theme.spacing(2) }}
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
          >
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Menu>
    </>
  );
};

export default DesktopAppBarIcons;
