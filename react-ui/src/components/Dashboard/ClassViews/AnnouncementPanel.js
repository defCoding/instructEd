import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, List, ListItemText, Paper, ListItem, Typography } from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    flexShrink: 0,
  },
  drawerPaper: {
    background: theme.palette.secondary.main,
  },
  appBar: {
    position: 'relative',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  dialog: {
    padding: theme.spacing(3),
    height: "100vh",
  }
}));

export default function AnnouncementPanel(props) {
  const classes = useStyles();
  const announcements = props.announcements;

  return (
    <Paper className={classes.dialog}>
      <Grid container justify="flex-end">
        <TextField label="Search" variant="outlined" color="secondary" />
      </Grid>
      <Typography variant="h6">
        Announcements
      </Typography>
      <List>
        {
          announcements.map(announcement => {
            let date = moment(announcement.date_created).local();
            date = date.format('MM-DD-YY [at] h:mm A');

            return (
              <ListItem>
                <ListItemText primary={announcement.announcement_name} secondary={
                  `${announcement.first_name} ${announcement.last_name} on ${date}`
                } />
              </ListItem>
            );
          })
        }
      </List>
    </Paper>
  );
}