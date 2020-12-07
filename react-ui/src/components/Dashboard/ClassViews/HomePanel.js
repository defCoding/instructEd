import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItemText, Paper, ListItem, Typography } from '@material-ui/core';
import SyllabusViewer from './SyllabusViewer';

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

export default function GeneralPanel(props) {
  const classes = useStyles();
  const courseData = props.courseData;
  return (
    <Paper className={classes.dialog} style={{ overflow: 'auto'}}>
      <Typography variant="h5">
        Course Information
      </Typography>
      <Typography variant="h6">
        Term: {courseData.term}
      </Typography>
      <Typography variant="h6">
        Instructors
        <List>
          {
            courseData.instructors.map(instructor => {              
              return (
                <ListItem>
                  <ListItemText primary={instructor} />
                </ListItem>
              )
            })
          }
        </List>
      </Typography>
      <SyllabusViewer courseID={courseData.course_id} />
    </Paper>
  );
}