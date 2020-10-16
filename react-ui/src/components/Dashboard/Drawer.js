import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: theme.palette.secondary.main,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
}));

export default function CurrentDrawer(props) {
  const classes = useStyles();
  const courses = props.courses;

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {courses.map((course) => (
            <ListItem button key={course.course_name}>
              <Typography color='primary'>{course.course_name}</Typography>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
