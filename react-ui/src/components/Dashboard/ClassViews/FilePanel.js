import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, Paper, Typography, Button, TextField } from '@material-ui/core';
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
  const [role, setRole] = React.useState(0);
  const [search, setSearch] = React.useState('');

  const handleSearchChange = e => {
    setSearch(e.target);
  }

  useEffect(() => {
    axios.get(`/course_files/${courseID}`)
      .then(res => setFileList(res.data))
      .catch(console.log);

    axios.get('/roles')
      .then(res => {
        if (res.data === 'admin') {
          setRole(1);
        } else {
          axios.get(`/roles/course/${courseID}`)
            .then(res => {
              if (res.data === 'instructor') {
                setRole(1);
              }
            });
        }
      });
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
        {fileList.map((file) => (
          <ListItem button key={file.file_name} onClick={() => {
            setOpen(true);
            setSelectedFile(file.file_name);
          }}>
            <a href={file.url} target="_blank">
            <Typography color='secondary'>{file.file_name}</Typography>
            </a>
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
        <TextField color="secondary" variant="outlined" label="Search" name="search" onChange={handleSearchChange} className={classes.items} />
        <List>
        {fileList.map((file) => (
            <ListItem button key={file.file_name} onClick={() => {
              setOpen(true);
              setSelectedFile(file.file_name);
            }}>
              <a href={file.url} target="_blank">
                <Typography color='secondary'>{file.file_name}</Typography>
              </a>
            </ListItem>
        ))}
        </List>
        <Button onClick={uploadClicked} color="primary" variant="contained">Upload</Button>
      </Paper>
      <FileUpload open={uploadOpen} setOpen={setUploadOpen} endpoint='/course_files' data={{courseID}} />
    </>
    );

  }
}