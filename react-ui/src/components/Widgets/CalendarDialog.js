import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItemText, Paper, IconButton, Button, Drawer, Divider, ListItem, Typography, Dialog, DialogActions, DialogTitle, DialogContent, AppBar, Toolbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import moment from 'moment';

export default function CalendarDialog({open, setOpen, time, date}) {
    const classes = useStyle();
    date = Date.now();
    const [open, setOpen] = React.useState(false);
    const [values, setValues] = useState({time: ''});
    const [anchorEl, setAnchorEl] = React.useState(null);
    
    const handleInputChange = e => {
        const {name, value} = e.target;
        setValues({
          ...values,
          [name] : value
        });
      }
  
    //const onChange = date => {
      //setDate(date);
    //};
  
    const onClickDay = date => {
      setDate(date);
    }

    function handleClose(e){
        e.preventDefault();
        if (date !== null && time !== '') {
            setOpen(false);
            return {date, time};
        } else {
          alert('All fields must be filled.');
        }
    }
  
    return (
        <Dialog 
        open = {open}
        onClose = {handleClose}
        aria-labelled-by="calendar-dialog-title"
        aria-described-by="calendar-dialog"
        >
            <DialogTitle id="calendar-dialog-title">{"Select a date and time"}</DialogTitle>
            <DialogContent>
            <Calendar
            //onChange={onChange}
            onClickDay={onClickDay}
            value={date}
            />
            <TextField className={classes.items} color="secondary" multiline="true" variant="outlined" label="Time" value={time} name="time" onChange={handleInputChange} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Submit</Button>
                <Button onClick={handleClose} color="primary">Cancel</Button>
            </DialogActions>
        </Dialog>
    );
  }