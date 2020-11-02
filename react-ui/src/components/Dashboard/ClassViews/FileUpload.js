import React, { useState } from 'react';
import axios from 'axios';
import { Button, Dialog, TextField, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'

export default function FileUpload({open, setOpen, endpoint, data}){
  const [file, setFile] = useState(null);

  const handleClose = () => {  
    setOpen(false);
  };

  const submitFile = () => {
    if (!file) {
      throw new Error('Select a file first!');
    }
    const formData = new FormData();
    formData.append('file', file[0]);

    for (const key in data) {
      formData.append(key, data[key]);
    }

    axios.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(res => {
      if (res.status === 201) {
        alert('File uploaded successfully!');
      } 
      setOpen(false);
    }).catch(err => {
      alert('There was an issue with uploading the file.');
    });
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