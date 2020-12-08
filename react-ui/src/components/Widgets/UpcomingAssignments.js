import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItemText, ListItem, Divider, Typography } from '@material-ui/core'
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(theme => ({
    items: {
      margin:theme.spacing(1),
    },
    root: {
      '& .MuiFormControl-root': {
        width:'75%',
        margin:theme.spacing(1),
        display:'flex'
      }
    },
  }))

export default function UpcomingAssignments() {
    const classes = useStyle();
    const [assignments, setAssignments] = useState([]);
    
    useEffect(() => {
        axios.get('/roles')
        .then(res => {
            if (res.data !== 'admin') {
                axios.get(`/assignments/upcoming/${moment(Date.now()).utc().format()}`)
                    .then(res => setAssignments(res.data))
                    .catch(console.log);
            }
        })
        .catch(err => console.log(err));
    }, []);

    {
        if (assignments.length > 0) {
            return (
                <List>
                {
                    assignments.map((assignment) => {
                        let assignmentdate = moment(assignment.deadline).local();
                        assignmentdate = assignmentdate.format('[Due on] MM-DD-YY [at] h:mm A');
    
                        return (<>
                            <ListItem>
                                <ListItemText primary={assignment.assignment_name} secondary={assignmentdate} />
                            </ListItem>
                            <Divider />
                        </>);
                    })
                }
                </List>
            );
        }
        else {
            return (
                <Typography variant="body" className={classes.items}>No assignments to display!</Typography>
            );
        }
    }
}