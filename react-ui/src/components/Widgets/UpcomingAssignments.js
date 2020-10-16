import React from 'react';
import { List, ListItemText, ListItem, Divider } from '@material-ui/core'

export default function UpcomingAssignments() {
    //const data = [{"Announcement 1":"This is announcement 1"}, {"Announcement 2":"This is announcement 2"}];
    const [assignments, setAssignments] = useState([]);
    setAssignments();

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
    
    function setAssignments(){
        //get student assignments
        //assignments = axios.get();
    }
    
}