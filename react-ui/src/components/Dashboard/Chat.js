import React, {useState, useEffect} from 'react';
import { List, Drawer, Dialog, AppBar, Toolbar, Typography, IconButton, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { SocketProvider } from './SocketProvider';
import ConversationsProvider from './ConversationsProvider';
import ChatSidebar from './ChatSidebar';
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
  const classes = useStyles();
  const [selectedChat, setSelectedChat] = React.useState(null);
  const [text, setText] = React.useState('');
  const [userID, setUserID] = useState();
  const [selectedCourseID, setSelectedCourseID] = useState(-1);

  useEffect(() => {
      axios.get('/userID')
          .then(res => {
              setUserID(res.data);
          })
          .catch(console.log);
  }, [])
  

  const handleClose = () => {
    setOpen(false);
  }

  const sendMessage = () => {
    return
  }

  function handleSubmit(e) {
    e.preventDefault();
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
        <ConversationsProvider courseID={selectedCourseID} id={userID}>
          <ChatSidebar selectedCourseID={selectedCourseID} setSelectedCourseID={setSelectedCourseID}/>
        </ConversationsProvider>
        <div className="d-flex flex-column flex-grow-1" style={{ height: '93vh' }}>
          <div className="flex-grow-1 overflow-auto">
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <InputGroup>
                <Form.Control
                  as="textarea"
                  required
                  value={text}
                  onChange={e => setText(e.target.value)}
                  style={{ height: '75px', resize: 'none' }}
                />
                <InputGroup.Append>
                  <Button type="submit">Send</Button>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
          </Form>
        </div>
      </div>
    </Dialog>
  );
}