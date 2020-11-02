import React from 'react';
import { TextField, Button, Box, Tabs, Tab, Dialog, AppBar, Toolbar, IconButton, Typography, Grid, Drawer, Divider  } from '@material-ui/core';
import FileUpload from './../FileUpload';

export default function FileUploadTab(props) {
  const classes = props.classes;
  const [open, setOpen] = React.useState(false);
  const [uploadOpen, setUploadOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState(null);

  function uploadClicked(){
    setUploadOpen(true);
  }

  const onFileSubmit = (event) => {
    alert('file');
  };

  let courseID = 1;

  return(
    <Box height={200}>
      <Grid container height="100%" spacing={1}>
        <Grid item xs={12}>
          <Button className={classes.panelItems} onClick={uploadClicked} color="primary" variant="contained">Upload</Button>
          <FileUpload open={uploadOpen} setOpen={setUploadOpen} courseID={courseID} />
        </Grid>
        <Grid item xs={12}>
          <Button className={classes.panelItems} variant="contained" color="secondary" onClick={onFileSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}