import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, Paper, Typography, Button } from '@material-ui/core';

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

const fileList = ['syllabus.pdf', 'lecture1.mp3'];

export default function FilePanel() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState(null);
  var role = 0; //0 for non-instructor, 1 for instructor

  useEffect(() => {
    //Determine the role for the given class
    //If instructor set role to 1, if admin or student set role to 0
  });

  function uploadClicked(){}

  if(role == 0){

    return (
      <>
      <Paper className={classes.dialog}>
        <Typography variant="h6">
          Files
        </Typography>
        <List>
        {fileList.map((text) => (
          <ListItem button key={text} onClick={() => {
            setOpen(true);
            setSelectedFile(text);
          }}>
            <Typography color='secondary'>{text}</Typography>
          </ListItem>
        ))}
        </List>
      </Paper>
    </>
    );
  }
  else if(role == 1){

    return (
      <>
      <Paper className={classes.dialog}>
        <Typography variant="h6">
          Files
        </Typography>
        <List>
        {fileList.map((text) => (
          <ListItem button key={text} onClick={() => {
            setOpen(true);
            setSelectedFile(text);
          }}>
            <Typography color='secondary'>{text}</Typography>
          </ListItem>
        ))}
        </List>
        <Button onClick={uploadClicked} color="primary" variant="contained">Upload</Button>
      </Paper>
    </>
    );

  }
}