import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Button, List, ListItemText, Select, InputLabel, FormControl, Grid, MenuItem, ListItemSecondaryAction, ListItem, Divider, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@material-ui/core'
import { spacing } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(theme => ({
    items: {
      margin: theme.spacing(1),
      paddingRight: theme.spacing(2)
    },
    root: {
      '& .MuiFormControl-root': {
        width: '75%',
        margin: theme.spacing(1),
        display: 'flex'
      }
    },
  }))

export default function UnapprovedFiles(){
    const classes = useStyle();
    const [files, setFiles] = useState([]); //Will be [] after testing
    //const [videos, setVideos] = useState([]);
    //const [assignmentFiles, setAssignmentFiles] = useState([]);
    const [file, setFile] = useState(null);
    const [open, setOpen] = useState(false);
    const [filter, setFilter] = React.useState('Course Files');
    const filesRef = useRef([]);
    const videosRef = useRef([]);
    const assignmentFilesRef = useRef([]);
    const courseFilesRef = useRef([]);
    useEffect(() => {
        videosRef.current = [];
        assignmentFilesRef.current = [];
        courseFilesRef.current = [];
        filesRef.current = [];
        //Get request for course files
        if(filter === 'Course Files'){
            axios.get(`/course_files/unapproved`) // ''
            .then(res => {getCourseFilesFromResponse(res)})
            .catch(console.log);   
        }
        else if(filter === 'Assignment Files'){
            //Get request for assignment files
            axios.get(`/assignment_files/unapproved`)
            .then(res => {getAssignmentFilesFromResponse(res)})
            .catch(console.log); 
        }
        else if(filter === 'Course Videos'){
            //Get request for course videos
            axios.get(`/course_videos/unapproved`)
            .then(res => {getVideosFromResponse(res)})
            .catch(console.log);   
        }
    }, [filter]);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
        if(filter === 'Course Files'){
            console.log("Course Files");
            filesRef.current = courseFilesRef.current;
        }
        else if(filter === 'Course Videos'){
            console.log("Course Videos");
            filesRef.current = videosRef.current;
        }
        else if(filter === 'Assignment Files'){
            console.log("Assignment Files");
            filesRef.current = assignmentFilesRef.current;
        }
    }

    function getCourseFilesFromResponse(res){
        courseFilesRef.current = courseFilesRef.current.concat(res.data);
        console.log(courseFilesRef.current);
        //filesRef.current = courseFilesRef.current;
        setFiles(courseFilesRef.current);
    }

    function getVideosFromResponse(res){
        videosRef.current = videosRef.current.concat(res.data);
        //filesRef.current = videosRef.current;
        setFiles(videosRef.current);
    }

    function getAssignmentFilesFromResponse(res){
        assignmentFilesRef.current = assignmentFilesRef.current.concat(res.data);
        //filesRef.current = assignmentFilesRef.current;
        setFiles(assignmentFilesRef.current);
    }

    const viewBtnClicked =(filelistitem) => () => {
        setOpen(true);
        setFile(filelistitem);
    }

    //function fileListItemClicked(filelistitem){
        //Bring up dialog that gives the option to approve/disapprove of the file's upload
        //setFile(filelistitem);
        
    //}

    return (
        
        <div>
        <Grid item xs="12">
        <FormControl color="secondary" variant="outlined" className={classes.items} fullWidth>
          <InputLabel>Filter</InputLabel>
          <Select
              color="secondary"
              onChange={handleFilterChange}
              value={filter}
              label="Filter"
              name="filter"
              required
            >
              <MenuItem value='Course Files'>Course Files</MenuItem>
              <MenuItem value='Course Videos'>Course Videos</MenuItem>
              <MenuItem value='Assignment Files'>Assignment Files</MenuItem>
          </Select>
        </FormControl>
      </Grid>
            <List>
                {files.map((file) => //filesRef.current
                    <>
                        <ListItem divider={true}>
                            <a href={file.url} target="_blank">
                                <Typography color='secondary'>{file.file_name}</Typography>
                            </a>
                            <ListItemSecondaryAction>
                                <Button onClick={viewBtnClicked(file)} variant="contained" color="secondary" size="small">
                                    Approve/Disapprove
                                </Button>
                            </ListItemSecondaryAction>

                        </ListItem>
                    </>
                )}
            </List>
            <ApprovalDialog selectedFile={file} open={open} setOpen={setOpen} currentFilter={filter}/>
        </div>
    );
}

function ApprovalDialog({selectedFile, open, setOpen, currentFilter}){
    var approved = null;
    var fileName = '';
    var filterString = currentFilter.substring(0, currentFilter.length - 1);
    if(selectedFile == null){
        setOpen(false);
    }
    else{
        fileName = selectedFile.file_name;
    }
    useEffect(() => {
        //check if selected file is null
    });

  const handleClose = () => {  
    setOpen(false);
  };

  function approveClicked(){
    if(currentFilter === 'Course Files'){

    }
    else if(currentFilter === 'Course Videos'){
 
    }
    else if(currentFilter === 'Assignment Files'){

    }
      handleClose();

  }
  function disapproveClicked(){
    if(currentFilter === 'Course Files'){

    }
    else if(currentFilter === 'Course Videos'){
 
    }
    else if(currentFilter === 'Assignment Files'){

    }
      handleClose();
  }

  return (
    <Dialog
        open = {open}
        onClose = {handleClose}
        aria-labelledby="approve-dialog-title"
        aria-describedby="approve-dialog-filename" //will be filled by actual filename variable
    >
        <DialogTitle id="approve-dialog-title">{"Approve/Disapprove:"}</DialogTitle>
        <DialogContent>
            <DialogContentText id="approve-dialog-filename">
                {filterString + ": " + fileName}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={approveClicked} color="secondary">
                Approve
            </Button>
            <Button onClick={disapproveClicked} color="secondary">
                Disapprove
            </Button>
            <Button onClick={handleClose} color="secondary">
                Cancel
            </Button>
        </DialogActions>
    </Dialog>
  );
}