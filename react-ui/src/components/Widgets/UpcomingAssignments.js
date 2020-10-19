import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItemText, ListItem, Divider } from '@material-ui/core'
import moment from 'moment';

export default function UpcomingAssignments() {
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

    return (
        <List>
            {
            assignments.map((assignment) =>
                <>
                    <ListItem>
                        <ListItemText primary={assignment.assignment_name} secondary={assignment.course_id}
                        secondary={assignment.deadline} />
                    </ListItem>
                    <Divider />
                </>
            )
            }
        </List>
    );
    
}