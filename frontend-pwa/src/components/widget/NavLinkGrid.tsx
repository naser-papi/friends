import React from "react";
import { useNavigate } from "react-router";
import { INavLinkGrid } from "../../models/GeneralTypes";
import { Grid, Link } from "@mui/material";

const NavLinkGrid: React.FC<INavLinkGrid> = (props) => {
  const navigate = useNavigate();
  return (
    <Grid container mt={2} justifyContent="flex-end">
      <Grid item>
        <Link variant="body2" data-cy={props.dataCy} onClick={() => navigate(props.to)}>
          {props.title}
        </Link>
      </Grid>
    </Grid>
  );
};

export default NavLinkGrid;
