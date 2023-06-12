import React from "react";
import { Box, styled } from "@mui/material";

const WidgetWrapper = styled(Box)(({ theme }) => ({
  padding: "1.5rem 1.5rem 0.75rem 1.5rem",
  backgroundColor: theme.palette.secondary,
  borderRadius: "0.75rem"
}));

export default WidgetWrapper;
