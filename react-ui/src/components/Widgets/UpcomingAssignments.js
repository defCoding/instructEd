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
        <List style={{maxHeight: '300px', overflow: 'auto'}}>
            {
                assignments.map((assignment) => {
                    let assignmentdate = moment(assignment.deadline).local();
                    assignmentdate = assignmentdate.format('[Due on] MM-DD-YY [at] h:mm A');

                    return (<>
                        <ListItem style={{borderBottom: '1px solid #e0e0e0'}}>
                            <ListItemText primary={assignment.assignment_name} secondary={assignmentdate} />
                        </ListItem>
                    </>);
                })
            }
        </List>
    );
    
}