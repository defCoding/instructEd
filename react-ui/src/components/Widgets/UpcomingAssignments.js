import React from 'react';
import axios from 'axios';
import { List, ListItemText, ListItem, Divider } from '@material-ui/core'

export default function UpcomingAssignments() {
    const [assignments, setAssignments] = useState([]);
    
    useEffect(() => {
        axios.get('/roles')
        .then(res => {
            switch (res.data) {
            //Maybe not needed?
            //For all cases queries are needed
            case 'admin':
                axios.get('').then(getAssignmentsFromResponse);
                break;
            case 'instructor':
                axios.get('').then(getAssignmentsFromResponse);
                break;
            case 'student':
                axios.get('').then(getAssignmentsFromResponse);
                axios.get('').then(getAssignmentsFromResponse);
                break;
            default:
                throw new Error('Invalid role.');
            }
        })
        .catch(err => console.log(err));
    }, []);

    function getAssignmentsFromResponse(res) {
        assignmentsRef.current = assignmentsRef.current.concat(res.data);
        setAssignments(assignmentsRef.current);
    }

    return (
        <List>
            {assignments.map((assignment) =>
                <>
                    <ListItem>
                        <ListItemText primary={assignment.assignment_name} secondary={assignment.course_id}
                        secondary={assignment.deadline} />
                    </ListItem>
                    <Divider />
                </>
            )}
        </List>
    );
    
}