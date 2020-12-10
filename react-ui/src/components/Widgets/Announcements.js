import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { List, ListItemText, ListItem, Divider, Typography } from '@material-ui/core';
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

export default function Announcements(props) {
    const classes = useStyle();
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

    {
        if (announcements.length > 0) {
            return (
                <List>
                {announcements.reverse().map((announcement) => {
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
        else {
            return (
                <Typography variant="body" className={classes.items}>No announcements to display!</Typography>
            );
        }
    }
}