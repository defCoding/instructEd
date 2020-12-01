import React, {useState, useEffect} from 'react';
import { List, Drawer, Dialog, AppBar, Toolbar, Typography, IconButton, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { SocketProvider } from './SocketProvider';
import ConversationsProvider from './ConversationsProvider';
import ChatSidebar from './ChatSidebar';
import OpenConversation from './OpenConversation';
import axios from 'axios';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    flexShrink: 0,
    background: theme.palette.secondary.main,
  },
  appBar: {
    position: "relative",
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  // necessary for content to be below app bar
  content: {
    padding: theme.spacing(1),
    marginLeft: drawerWidth,
  },
}));

export default function Chat({ open, setOpen }) {
  const [user, setUser] = useState({id: -1});
  const [selectedCourseID, setSelectedCourseID] = useState(-1);

  useEffect(() => {
      axios.get('/userInfo')
          .then(res => {
              setUser(res.data);
          })
          .catch(console.log);
  }, [])
  

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <Dialog fullScreen open={open} onClose={handleClose}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" s>
            Chat
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="d-flex" style={{height: '93vh'}}>
        <SocketProvider id={user.id}>
          <ConversationsProvider courseID={selectedCourseID} user={user}>
            <ChatSidebar selectedCourseID={selectedCourseID} setSelectedCourseID={setSelectedCourseID}/>
            <OpenConversation />
          </ConversationsProvider>
        </SocketProvider>
      </div>
    </Dialog>
  );
}