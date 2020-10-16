import React from 'react';
import { List, ListItemText, ListItem, Divider } from '@material-ui/core';

//const announcements = [{"header":"P465", "body":"This is announcement 1"}, {"header":"P465", "body":"This is announcement 2"}];

export default function Announcements() {
    const [announcements, setAnnouncements] = useState([]);
    setAnnouncements();
    return (
        <List>
            {announcements.map((announcement) => (
                <>
                    <ListItem>
                        <ListItemText primary={announcement.announcement_title} secondary={announcement.course_id} />
                    </ListItem>
                    <Divider />
                </>
            ))}
        </List>
    );

    function setAnnouncements(){
        announcements = axios.get("/student/announcements");
    }
}