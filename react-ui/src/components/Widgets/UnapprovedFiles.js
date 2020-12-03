import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Button, List, ListItemText, ListItemSecondaryAction, ListItem, Divider, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@material-ui/core'

export default function UnapprovedFiles(){
    const [files, setFiles] = useState([]); //Will be [] after testing
    const [open, setOpen] = React.useState(false);
    const [file, setFile] = useState(null);
    const [fOpen, setFopen] = React.useState(false);
    const filesRef = useRef([]);
    useEffect(() => {
        //Get request for course files
        axios.get(`/course_files/unapproved/${9999}`) // ''
        .then(res => {getFilesFromResponse(res)})
        .catch(console.log);
        console.log(files);

        //Get request for assignment files
        axios.get(`/assignment_files/unapproved/${''}`)
        .then(res => {getFilesFromResponse(res)})
        .catch(console.log);

        //Get request for course videos
        axios.get(`/course_videos/unapproved/${''}`)
        .then(res => {getFilesFromResponse(res)})
        .catch(console.log);

    });

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
            <List>
                {files.map((file) =>
                    <>
                        <ListItem onClick={() => {
                        setFopen(true);
                        setFile(file.file_name);
                        }} button={true}>
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