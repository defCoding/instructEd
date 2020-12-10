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
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(undefined);
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

  if (announcements.length > 0) {
    return (
      <List style={{maxHeight: '300px', overflow: 'auto'}}>
      {announcements.map((announcement) => {
        const title = announcement.course_name + ": " + announcement.announcement_name;
        let date = moment(announcement.date_created).local();
        date = date.format('MM-DD-YY h:mm A');

        return (
          <>
          <ListItem button style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', borderBottom: '1px solid #e0e0e0'}}
          onClick={() => {
            if (announcement === selectedAnnouncement) {
              setSelectedAnnouncement(undefined);
            } else {
              setSelectedAnnouncement(announcement)
            }
          }}>
          <ListItemText disableTypography primary={<Typography variant='h7' style={{ fontWeight: 'bold' }}>
            {title}
            </Typography>}
          secondary={
            <Typography style={{ color: 'grey' }}>
            {date}
            </Typography>
          } />
          <ListItemText primary={
            selectedAnnouncement && selectedAnnouncement === announcement ? 
            (announcement.announcement_description) :
            (announcement.announcement_description.slice(0, 80) + (announcement.announcement_description.length > 80 ? '...' : '')) 
          } />
          </ListItem>
          </>
        );
      })}
      </List>);
  } else {
    return (
      <Typography variant="body" className={classes.items}>No announcements to display!</Typography>
    );
  }
  
}
