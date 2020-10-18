import React from 'react';
import { Paper, TextField, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const onSubmit = (e) => {
  e.preventDefault();
};

const useStyle = makeStyles(theme => ({
  items: {
    margin:theme.spacing(1)
  },
}))

export default function CreateAnnouncement() {
  const classes = useStyle();

    return (
      <Paper>
        <form>
          <Grid height="100%" spacing={1}>
            <Grid item xs="12">
              <TextField color="secondary" variant="outlined" label="Announcement Title" name="announcementName" announcementName={classes.items} />
            </Grid>
            <Grid item xs="12">
              <TextField color="secondary" variant="outlined" label="Class" name="classNumber" announcementName={classes.items} />
            </Grid>
            <Grid item xs="12">
              <TextField color="secondary" multiline="true" variant="outlined" label="Description" name="description" announcementName={classes.items} />
            </Grid>
            <Grid item xs="12">
              <Button variant="contained" color="secondary" announcementName={classes.items} onSubmit={onSubmit}>Post Announcement </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    );
}