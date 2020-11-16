import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField, Divider } from '@material-ui/core';


export default function CalendarDialog({open, setOpen, time, setTime, date, setDate}) {
    const [newDate, setNewDate] = React.useState(null);
    const [newTime, setNewTime] = React.useState('');
  
    const handleTimeChange = e => {
      setNewTime(e.target.value);
    }
  
    const onClickDayCD = e => {
      console.log(e);
      setDate(e);
    }

    function submitClicked(e){
      //e.preventDefault();
        if (newDate !== null && newTime !== '') {
            date = newDate;
            time = newTime;
            handleClose();
        } else {
          alert('All fields must be filled.');
        }

    }

    function handleClose(){
        setOpen(false);
    }
  
    return (
        <Dialog 
        open = {open}
        onClose = {handleClose}
        aria-labelledby="calendar-dialog-title"
        aria-describedby="calendar-dialog"
        >
            <DialogTitle id="calendar-dialog-title">{"Select a date and time"}</DialogTitle>
            <DialogContent>
            <Calendar
            //onChange={onChange}
            onClickDay={onClickDayCD}
            value={newDate}
            />
            <Divider />
            <TextField color="secondary" multiline="true" variant="outlined" label="Time" value={newTime} name="time" onChange={handleTimeChange} />
            </DialogContent>
            <DialogActions>
                <Button onClick={submitClicked} color="primary">Submit</Button>
                <Button onClick={handleClose} color="primary">Cancel</Button>
            </DialogActions>
        </Dialog>
    );
  }