import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, Paper, Typography } from '@material-ui/core';

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