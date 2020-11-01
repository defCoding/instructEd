import React, { useState } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'

export default function FileUpload({open, setOpen}){
  const [file, setFile] = useState(null);

  const handleClose = () => {  
    setOpen(false);
  };

  const submitFile = async () => {
    try {
      if (!file) {
        throw new Error('Select a file first!');
      }
      const formData = new FormData();
      formData.append('file', file[0]);
      await axios.post(`/test-upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // handle success
    } catch (error) {
      // handle error
    }
  };

  return (
    <Dialog
        open = {open}
        onClose = {handleClose}
        aria-labelled-by="approve-dialog-title"
        aria-described-by="approve-dialog-filename" //will be filled by actual filename variable
    >
        <DialogTitle id="approve-dialog-title">{"Upload File"}</DialogTitle>
        <DialogContent>
        <TextField
          name="upload-file"
          type="file"
          onChange={event => setFile(event.target.files)}
        />
        </DialogContent>
        <DialogActions>
            <Button onClick={submitFile} color="primary">
                Upload
            </Button>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
        </DialogActions>
    </Dialog>
  );

 // return (
 //   <form onSubmit={submitFile}>
 //     <label>Upload file</label>
 //     <input type="file" onChange={event => setFile(event.target.files)} />
 //     <button type="submit">Send</button>
 //   </form>
 // );
}