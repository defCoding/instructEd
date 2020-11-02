import React, {  } from 'react';
import Calendar from 'react-calendar';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent } from '@material-ui/core';


export default function CalendarDialog({open, setOpen, time, setTime, date, setDate}) {
    const classes = useStyle();
  
    const handleTimeChange = e => {
      setTime(e.target.value);
    }
  
    const onClickDay = e => {
      setDate(e);
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
            <TextField className={classes.items} color="secondary" multiline="true" variant="outlined" label="Time" value={time} name="time" onChange={handleTimeChange} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Submit</Button>
                <Button onClick={handleClose} color="primary">Cancel</Button>
            </DialogActions>
        </Dialog>
    );
  }