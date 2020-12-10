import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, List, ListItem, Paper, Typography, Button, TextField } from '@material-ui/core';
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

function GetFileList(props) {
  if (props.searchValue === '') {
    return (
      <List>
        {props.fileList.map((file) => (
          <a href={file.url} target="_blank">
          <ListItem button key={file.file_name}>
            <Typography>{file.file_name}</Typography>
          </ListItem>
          </a>
        ))}
      </List>
    );
  }
  else {
    return (
      <List>
        {props.fileList.map((file) => {
          if (file.file_name.toLowerCase().includes(props.searchValue.toLowerCase())) {
            return (
              <a href={file.url} target="_blank">
              <ListItem button key={file.file_name}>
                <Typography>{file.file_name}</Typography>
              </ListItem>
              </a>
            );
          }
        })}
      </List>
    )
  }
}

export default function FilePanel({courseID}) {
  const classes = useStyles();
  const setOpen = React.useState(false);
  const [uploadOpen, setUploadOpen] = React.useState(false);
  const setSelectedFile = React.useState(null);
  var [fileList, setFileList] = React.useState([]);
  var [searchValue, setSearchValue] = React.useState('');
  const [role, setRole] = React.useState(0);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  }

  useEffect(() => {
    axios.get(`/course_files/approved/${courseID}`)
      .then(res => {
        console.log(res.data);
        setFileList(res.data)
      })
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

  if (role == 0) {
    return (
      <>
      <Paper className={classes.dialog}>
        <Grid container justify="flex-end">
          <TextField label="Search" variant="outlined" color="secondary" onChange={handleSearchChange} />
        </Grid>
        <Typography variant="h6">
          Files
        </Typography>
        <GetFileList fileList={fileList} searchValue={searchValue} setOpen={setOpen} setSelectedFile={setSelectedFile} />
      </Paper>
    </>
    );
  }
  else if (role == 1) {
    return (
      <>
      <Paper className={classes.dialog}>
        <Grid container justify="flex-end">
          <TextField label="Search" variant="outlined" color="secondary" onChange={handleSearchChange} />
        </Grid>
        <Typography variant="h6">
          Files
        </Typography>
        <GetFileList fileList={fileList} searchValue={searchValue} setOpen={setOpen} setSelectedFile={setSelectedFile} />
        <Button onClick={uploadClicked} color="primary" variant="contained">Upload</Button>
      </Paper>
      <FileUpload open={uploadOpen} setOpen={setUploadOpen} endpoint='/course_files' data={{courseID}} />
    </>
    );
  }
}