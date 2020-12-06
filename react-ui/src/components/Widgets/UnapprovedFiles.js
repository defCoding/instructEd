import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Button, List, ListItemText, Select, InputLabel, FormControl, Grid, MenuItem, ListItemSecondaryAction, ListItem, Divider, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(theme => ({
    items: {
      margin: theme.spacing(1)
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
    const [videos, setVideos] = useState([]);
    const [assignmentFiles, setAssignmentFiles] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [filter, setFilter] = React.useState('Course Files');
    const [file, setFile] = useState(null);
    const filesRef = useRef([]);
    useEffect(() => {
        //Get request for course files
        if(filter == 'Course Files'){
            axios.get(`/course_files/unapproved/${''}`) // ''
            .then(res => {getFilesFromResponse(res)})
            .catch(console.log);
            console.log(files);
        }
        else if(filter == 'Assignment Files'){
            //Get request for assignment files
            axios.get(`/assignment_files/unapproved/${''}`)
            .then(res => {getFilesFromResponse(res)})
            .catch(console.log);
        }
        else if(filter == 'Course Videos'){
            //Get request for course videos
            axios.get(`/course_videos/unapproved/${''}`)
            .then(res => {getFilesFromResponse(res)})
            .catch(console.log);
        }
    });

    const handleFilterChange = (event) => {
        setFilter(event.target.value);

        if(filter == 'Course Files'){
            console.log("Course Files");
        }
        else if(filter == 'Course Videos'){
            console.log("Course Videos");
        }
        else if(filter == 'Assignment Files'){
            console.log("Assignment Files");
        }
    }

    function getFilesFromResponse(res){
        filesRef.current = filesRef.current.concat(res.data);
        setFiles(filesRef.current);
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
        <FormControl color="secondary" variant="outlined" className={classes.items}>
          <InputLabel>Filter</InputLabel>
          <Select
              color="secondary"
              style={{ width: 250 }}
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
                {files.map((file) =>
                    <>
                        <ListItem divider={true}>
                            <a href={file.url} target="_blank">
                                <Typography color='secondary'>{file.file_name}</Typography>
                            </a>
                            <ListItemSecondaryAction>
                                <Button onClick={viewBtnClicked} variant="contained" color="primary">
                                    Approve/Disapprove
                                </Button>
                            </ListItemSecondaryAction>

                        </ListItem>
                        <Divider />
                    </>
                )}
            </List>
            <ApprovalDialog selectedFile={file} open={open} setOpen={setOpen}/>
        </div>
    );
}

function ApprovalDialog({selectedFile, open, setOpen}){
    var approved = null;

    useEffect(() => {
        //check if selected file is null
        if(selectedFile == null){}
    });

  const handleClose = () => {  
    setOpen(false);
  };

  function approveClicked(){
      approved = true;
      //handle approval of file upload then close
      handleClose();

  }
  function disapproveClicked(){
      approved = false;
      //handle disapproval of file upload then close
      handleClose();
  }

  return (
    <Dialog
        open = {open}
        onClose = {handleClose}
        aria-labelledby="approve-dialog-title"
        aria-describedby="approve-dialog-filename" //will be filled by actual filename variable
    >
        <DialogTitle id="approve-dialog-title">{"Approve/Disapprove"}</DialogTitle>
        <DialogContent>
            <DialogContentText id="approve-dialog-filename">
                FileName
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={approveClicked} color="primary">
                Approve
            </Button>
            <Button onClick={disapproveClicked} color="primary">
                Disapprove
            </Button>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
        </DialogActions>
    </Dialog>
  );
}