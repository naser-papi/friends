import React from "react";
import { Avatar, styled } from "@mui/material";
import { IAvatarWithInfo } from "../models/FormTypes";

const AvatarWithInfo = styled((props: IAvatarWithInfo) => (
  <div {...props}>
    {props.image ? <Avatar alt="image" src={props.image}></Avatar> : <>{props.icon}</>}
    <section>
      {props.title && <strong>{props.title}</strong>}
      {props.subtitle && <span>{props.subtitle}</span>}
    </section>
  </div>
))(
  ({ theme }) => `
  display: flex;
  flex-flow: row;
  align-items:center;
  column-gap: ${theme.spacing(1)};
  & section {
    display: flex;
    flex-flow: column;   
    & strong {
      color: ${theme.palette.info.main};
      font-size: 1rem;
    }
    & span {
      font-size: 0.8rem;
      color: ${theme.palette.info.light}
    }
  }
`
);

export default AvatarWithInfo;
