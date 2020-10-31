import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, List, ListItemText, ListItemSecondaryAction, ListItem, Divider, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'

export default function UnapprovedFiles(){
    const [files, setFiles] = useState(["File"]); //Will be [] after testing
    const [open, setOpen] = React.useState(false);
    const [file, setFile] = useState(null);
    useEffect(() => {
        //Place for get request
    });

    function getFilesFromResponse(res){
        filesRef.current = filesRef.current.concat(res.data);
        setFiles(filesRef.current);
    }

    function viewBtnClicked(){
        //If a video file load the video in the video player
        //If not a video file then download the file for viewing
    }

    function fileListItemClicked(filelistitem){
        //Bring up dialog that gives the option to approve/disapprove of the file's upload
        setOpen(true);
        setFile(filelistitem);
    }

    return (
        <div>
            <List>
                {files.map((file) =>
                    <>
                        <ListItem onClick={fileListItemClicked} button={true}>
                            <ListItemText primary={file} secondary={"Uploader/CourseID"} />
                            <ListItemSecondaryAction>
                                <Button onClick={viewBtnClicked} variant="contained" color="primary">
                                    View
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
        aria-labelled-by="approve-dialog-title"
        aria-described-by="approve-dialog-filename" //will be filled by actual filename variable
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