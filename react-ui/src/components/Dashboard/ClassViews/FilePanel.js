import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, Paper, Typography, Button } from '@material-ui/core';
import FileUpload from "./FileUpload";
import axios from 'axios';

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


export default function FilePanel({courseID}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [uploadOpen, setUploadOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [fileList, setFileList] = React.useState([]);
  var role = 1; //0 for non-instructor, 1 for instructor

  useEffect(() => {
    axios.get(`/course_files/${courseID}`)
      .then(res => setFileList(res.data))
      .catch(console.log);
  }, []);

  function uploadClicked(){
    setUploadOpen(true);
  }

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
        {fileList.map((file) => (
          <a href={file.url} target="_blank">
            <ListItem button key={file.file_name} onClick={() => {
              setOpen(true);
              setSelectedFile(file.file_name);
            }}>
              <Typography color='secondary'>{file.file_name}</Typography>
            </ListItem>
          </a>
        ))}
        </List>
        <Button onClick={uploadClicked} color="primary" variant="contained">Upload</Button>
      </Paper>
      <FileUpload open={uploadOpen} setOpen={setUploadOpen} endpoint='/course_files' data={{courseID}} />
    </>
    );

  }
}