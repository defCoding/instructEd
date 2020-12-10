import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, Paper, Typography, Button } from '@material-ui/core';
import VideoPlayer from './VideoPlayer';
import FileUpload from './FileUpload';
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


export default function LecturePanel({courseID}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [uploadOpen, setUploadOpen] = React.useState(false);
  const [selectedLecture, setSelectedLecture] = React.useState(null);
  const [lectureList, setLectureList] = React.useState([]);
  const [role, setRole] = React.useState(0);

  useEffect(() => {
    axios.get(`/course_videos/approved/${courseID}`)
      .then(res => {
        setLectureList(res.data)
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

  if(role == 0){

    return (
      <>
      <Paper className={classes.dialog}>
        <Typography variant="h6">
          Lectures
        </Typography>
        <List>
        {lectureList.map((file) => (
          <ListItem button key={file.file_name} onClick={() => {
            setOpen(true);
            setSelectedLecture(file);
          }}>
            <Typography>{file.file_name}</Typography>
          </ListItem>
        ))}
        </List>
      </Paper>
      <VideoPlayer open={open} setOpen={setOpen} videoFile={selectedLecture}/>
    </>
    );

  }
  else if(role == 1){

    return (
      <>
      <Paper className={classes.dialog}>
        <Typography variant="h6">
          Lectures
        </Typography>
        <List>
        {lectureList.map((file) => (
          <>
          <ListItem button key={file.file_name} onClick={() => {
            if (selectedLecture && selectedLecture.file_name == file.file_name) {
              setOpen(false);
              setSelectedLecture(null);
            } else {
              setOpen(true);
              setSelectedLecture(file);
            }
          }}>
            <Typography>{file.file_name}</Typography>
          </ListItem>
          {selectedLecture && selectedLecture.file_name==file.file_name && open && <VideoPlayer videoFile={selectedLecture} />}
          </>
        ))}
        </List>
        <Button onClick={uploadClicked} color="primary" variant="contained">Upload</Button>
      </Paper>
      <FileUpload open={uploadOpen} setOpen={setUploadOpen} endpoint='/course_videos' data={{courseID}} ext={['mp4', 'mkv']}/>
    </>
    );

  }
}