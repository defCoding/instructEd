import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, AppBar, Toolbar, IconButton, Typography, List, ListItem, ListItemText, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

export default function SubAndGradePanel({selectedStudent, open, setOpen}){
    const [submissions, setSubmissions] = useState([]);
    const grade = null;

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
          <List>
              {
                  submissions.map((submission) => {
                    let submissondate = moment(submission.time_submitted).local();
                    let name = selectedStudent.first_name + " " + selectedStudent.last_name;
                    submissondate = submissiondate.format('[Submitted on] MM-DD-YY [at] h:mm A');

                    return(<>
                        <ListItem>
                            <ListItemText primary={submissondate} secondary={name} />
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
      );
}