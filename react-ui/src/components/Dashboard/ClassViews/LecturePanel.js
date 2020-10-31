import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, Paper, Typography } from '@material-ui/core';
import VideoPlayer from './VideoPlayer';

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

const lectureList = ['https://www.youtube.com/watch?v=Rq5SEhs9lws', 'https://www.youtube.com/watch?v=-MkClg7XgRI'];

export default function LecturePanel() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedLecture, setSelectedLecture] = React.useState(null);
  var role = 0; //0 for non-instructor, 1 for instructor

  useEffect(() => {
    //Determine the role for the given class
    //If instructor set role to 1, if admin or student set role to 0
  });

  return (
    <>
    <Paper className={classes.dialog}>
      <Typography variant="h6">
        Lectures
      </Typography>
      <List>
      {lectureList.map((text) => (
        <ListItem button key={text} onClick={() => {
          setOpen(true);
          setSelectedLecture(text);
        }}>
          <Typography color='secondary'>{text}</Typography>
        </ListItem>
      ))}
      </List>
    </Paper>
    <VideoPlayer open={open} setOpen={setOpen} videoFile={selectedLecture}/>
  </>
  );
}