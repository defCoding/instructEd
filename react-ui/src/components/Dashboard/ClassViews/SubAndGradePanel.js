import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, AppBar, Toolbar, IconButton, Typography, List, ListItem, ListItemText, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

export default function SubAndGradePanel({selectedStudent, open, setOpen}){
    const classes = useStyles();
    const [submissions, setSubmissions] = useState([]);
    const grade = '';

    useEffect(() => {
        //Place for get request to retrieve all submissions for this assignment for the given student
      });

      function getSubmissionsFromResponse(res){
        submissionsRef.current = submissonsRef.current.concat(res.data);
        setSubmissions(submissionsRef.current);
      }

      function viewBtnClicked(){
        //If a video file load the video in the video player
        //If not a video file then download the file for viewing
    }

      const handleClose = () => {
        setOpen(false);
      };

      return (
        <Dialog fullScreen open={open} onClose={handleClose}>
        <AppBar className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {selectedStudent}
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
              {
                  submissions.map((submission) => {
                    let submissondate = moment(submission.time_submitted).local();
                    let name = selectedStudent.first_name + " " + selectedStudent.last_name;
                    submissondate = submissiondate.format('[Submitted on] MM-DD-YY [at] h:mm A');

                    return(<>
                        <ListItem>
                            <ListItemText primary={submissondate} secondary={name + " " + grade} />
                            <ListItemSecondaryAction>
                                <Button onClick={viewBtnClicked} variant="contained" color="primary">
                                    View
                                </Button>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </>);
                  })
              }
          </List>
      </Dialog>
      );
}