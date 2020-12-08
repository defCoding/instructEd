import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, List, ListItemText, Paper, ListItem, Typography } from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    flexShrink: 0,
  },
  drawerPaper: {
    background: theme.palette.secondary.main,
  },
  appBar: {
    position: 'relative',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  dialog: {
    padding: theme.spacing(3),
    height: "100vh",
  }
}));

function GetAnnouncementList(props) {
  const [selectedAnnouncement, setSelectedAnnouncement] = React.useState(null);

  return (
    <List>
      {props.announcementList.map(announcement => {
        let date = moment(announcement.date_created).local();
        date = date.format('MM-DD-YY [at] h:mm A');
        if (announcement.announcement_name.toLowerCase().includes(props.searchValue.toLowerCase()) ||
              announcement.first_name.toLowerCase().includes(props.searchValue.toLowerCase()) ||
              announcement.last_name.toLowerCase().includes(props.searchValue.toLowerCase()) ||
              date.toLowerCase().includes(props.searchValue.toLowerCase())) {
                return (
                  <ListItem button style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '1em' }}
                  onClick={() => {
                      if (announcement === selectedAnnouncement) {
                          setSelectedAnnouncement(undefined);
                      } else {
                          setSelectedAnnouncement(announcement)
                      }
                  }}>
                    <ListItemText disableTypography primary={<Typography variant='h7' style={{ fontWeight: 'bold' }}>
                      {announcement.announcement_name}
                      </Typography>}
                      secondary={
                        <Typography style={{ color: 'grey' }}>
                          {`${announcement.first_name} ${announcement.last_name} on ${date}`}
                        </Typography>
                    } />
                    <ListItemText primary={
                      selectedAnnouncement && selectedAnnouncement === announcement ? 
                      (announcement.announcement_description) :
                      (announcement.announcement_description.slice(0, 80) + (announcement.announcement_description.length > 80 ? '...' : '')) 
                    } />
                  </ListItem>
                );
        }
      })}
    </List>
  );
}

export default function AnnouncementPanel(props) {
  const classes = useStyles();
  const announcements = props.announcements;
  var [searchValue, setSearchValue] = React.useState('');

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  }

  return (
    <Paper className={classes.dialog}>
      <Grid container justify="flex-end">
        <TextField label="Search" variant="outlined" color="secondary" onChange={handleSearchChange} />
      </Grid>
      <Typography variant="h6">
        Announcements
      </Typography>
      <GetAnnouncementList announcementList={announcements} searchValue={searchValue} />
    </Paper>
  );
}