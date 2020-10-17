import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { List, ListItemText, ListItem, Divider } from '@material-ui/core';
import moment from 'moment';
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
            {announcements.map((announcement) => {
                const title = announcement.course_name + ": " + announcement.announcement_name;
                let date = moment(announcement.date_created).local();
                date = date.format('MM-DD-YY h:mm A');

                return (
                <>
                    <ListItem>
                        <ListItemText primary={title} secondary={date} />
                    </ListItem>
                    <Divider />
                </>
                );
            })}
        </List>
    );
}