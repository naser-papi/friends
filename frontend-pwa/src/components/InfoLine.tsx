import React from "react";
import { styled } from "@mui/material";

const InfoLineWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexFlow: "row",
  width: "100%",
  alignItems: "center",
  justifyContent: "space-between"
}));

const InfoLine = ({ text, value }) => {
  return (
    <InfoLineWrapper>
      <span>{text}</span>
      <strong>{value}</strong>
    </InfoLineWrapper>
  );
};
export default InfoLine;
