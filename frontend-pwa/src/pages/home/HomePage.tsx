import { Grid, Typography } from "@mui/material";
import { withBasePage } from "../../components/layout/BasePage";

const HomePage = withBasePage(() => {
  return (
    <Grid container spacing={1}>
      <Grid item>
        <Typography>User Widget</Typography>
      </Grid>
      <Grid item>
        <Typography>New Post</Typography>
        <Typography>Post List</Typography>;
      </Grid>
      <Grid item>
        <Typography>New Post</Typography>
      </Grid>
    </Grid>
  );
}, "Home");

export default HomePage;
