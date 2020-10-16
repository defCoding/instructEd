import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { List, ListItemText, ListItem, Divider } from '@material-ui/core';

//const announcements = [{"header":"P465", "body":"This is announcement 1"}, {"header":"P465", "body":"This is announcement 2"}];

export default function Announcements(props) {
    const [announcements, setAnnouncements] = useState([]);
    const announcementsRef = useRef([]);

    useEffect(() => {
        axios.get('/roles')
        .then(res => {
            switch (res.data) {
            case 'admin':
                axios.get('/announcements').then(getAnnouncementsFromResponse);
                break;
            case 'instructor':
                axios.get('/announcements/instructor').then(getAnnouncementsFromResponse);
                break;
            case 'student':
                axios.get('/announcements/instructor').then(getAnnouncementsFromResponse);
                axios.get('/announcements/student').then(getAnnouncementsFromResponse);
                break;
            default:
                throw new Error('Invalid role.');
            }
        })
        .catch(err => console.log(err));
    }, []);

    function getAnnouncementsFromResponse(res) {
        announcementsRef.current = announcementsRef.current.concat(res.data);
        setAnnouncements(announcementsRef.current);
    }

    return (
        <List>
            {announcements.map((announcement) => (
                <>
                    <ListItem>
                        <ListItemText primary={announcement.announcement_name} secondary={announcement.course_id} />
                    </ListItem>
                    <Divider />
                </>
            ))}
        </List>
    );
}