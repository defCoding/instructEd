import React from 'react';
import { List, Drawer, Dialog, AppBar, Toolbar, Typography, IconButton, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { Form, InputGroup, Button } from 'react-bootstrap';

const drawerWidth = 250;
const senderid = "Contact 1";

var conversations = [{"id": ["Contact 2", "Contact 3"], "messages": [{"from": "Contact 1", "message": "Chat 1: Message 1 body"}]}, 
                        {"id": ["Contact 2", "Contact 4"], "messages": [{"from": "Contact 3", "message": "Chat 2: Message 1 body"}]}, 
                        {"id": ["Contact 3"], "messages": [{"from": "Contact 2", "message": "Chat 3: Message 1 body"}]}, 
                        {"id": ["Contact 3", "Contact 4"], "messages": [{"from": "Contact 3", "message": "Chat 4: Message 1 body"},
                                                                        {"from": "Contact 1", "message": "hello, it's from me"},
                                                                        {"from": "Contact 4", "message": "hello it's from contact 4"},{"from": "Contact 3", "message": "Chat 4: Message 1 body"},
                                                                        {"from": "Contact 1", "message": "hello, it's from me"},
                                                                        {"from": "Contact 4", "message": "hello it's from contact 4"},{"from": "Contact 3", "message": "Chat 4: Message 1 body"},
                                                                        {"from": "Contact 1", "message": "hello, it's from me"},
                                                                        {"from": "Contact 4", "message": "hello it's from contact 4"},{"from": "Contact 3", "message": "Chat 4: Message 1 body"},
                                                                        {"from": "Contact 1", "message": "hello, it's from me"},
                                                                        {"from": "Contact 4", "message": "hello it's from contact 4"},{"from": "Contact 3", "message": "Chat 4: Message 1 body"},
                                                                        {"from": "Contact 1", "message": "hello, it's from me"},
                                                                        {"from": "Contact 4", "message": "hello it's from contact 4"},{"from": "Contact 3", "message": "Chat 4: Message 1 body"},
                                                                        {"from": "Contact 1", "message": "hello, it's from me"},
                                                                        {"from": "Contact 4", "message": "hello it's from contact 4"},{"from": "Contact 3", "message": "Chat 4: Message 1 body"},
                                                                        {"from": "Contact 1", "message": "hello, it's from me"},
                                                                        {"from": "Contact 4", "message": "hello it's from contact 4"},{"from": "Contact 3", "message": "Chat 4: Message 1 body"},
                                                                        {"from": "Contact 1", "message": "hello, it's from me"},
                                                                        {"from": "Contact 4", "message": "hello it's from contact 4"},{"from": "Contact 3", "message": "Chat 4: Message 1 body"},
                                                                        {"from": "Contact 1", "message": "hello, it's from me"},
                                                                        {"from": "Contact 4", "message": "hello it's from contact 4"},{"from": "Contact 3", "message": "Chat 4: Message 1 body"},
                                                                        {"from": "Contact 1", "message": "hello, it's from me"},
                                                                        {"from": "Contact 4", "message": "hello it's from contact 4"},{"from": "Contact 3", "message": "Chat 4: Message 1 body"},
                                                                        {"from": "Contact 1", "message": "hello, it's from me"},
                                                                        {"from": "Contact 4", "message": "hello it's from contact 4"},{"from": "Contact 3", "message": "Chat 4: Message 1 body"},
                                                                        {"from": "Contact 1", "message": "hello, it's from me"},
                                                                        {"from": "Contact 4", "message": "hello it's from contact 4"},{"from": "Contact 3", "message": "Chat 4: Message 1 body"},
                                                                        {"from": "Contact 1", "message": "hello, it's from me"},
                                                                        {"from": "Contact 4", "message": "hello it's from contact 4"},{"from": "Contact 3", "message": "Chat 4: Message 1 body"},
                                                                        {"from": "Contact 1", "message": "hello, it's from me"},
                                                                        {"from": "Contact 4", "message": "hello it's from contact 4"}]}];

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

function DisplayMessages({conversation}) {
  if (conversation === null) {
    return (<div></div>);
  }
  else {
    return (
      <div className="d-flex flex-column flex-grow-1">
        <div className="flex-grow-1 overflow-auto">
          <div className="d-flex flex-column align-items-start justify-content-end px-3">
            {conversation.messages.map(message => {
              const fromMe = message.from === senderid;
              return (
                <div className={`my-1 d-flex flex-column ${fromMe ? 'align-self-end' : ''}`}>
                  <div  
                    className={`rounded px-2 py-1 ${fromMe ? 'bg-primary text-white' : 'border'}`}>
                    {message.message}
                  </div>
                  <div className={`text-muted small ${fromMe ? 'text-right' : ''}`}>
                    {fromMe ? 'You' : message.from}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default function Chat({ open, setOpen }) {
  const classes = useStyles();
  const [selectedChat, setSelectedChat] = React.useState(null);
  const [text, setText] = React.useState('');

  const handleClose = () => {
    setOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <Dialog fullScreen open={open} onClose={handleClose}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6"s>
            Chat
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <List>
          {conversations.map(conversation => (
            <ListItem button onClick={() => {
              setSelectedChat(conversation);
            }}>
              <Typography>{conversation.id.map(contact => {
                if (contact === conversation.id[conversation.id.length - 1]) {
                  return contact;
                }
                else return contact + ", ";
              
                })}
              </Typography>
              <Typography>{conversation.messages[0].from + ": " + conversation.messages[0].message}</Typography>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className="d-flex flex-column flex-grow-1" style={{ height: '90vh' }}>
          <div className="flex-grow-1 overflow-auto">
             <DisplayMessages conversation={selectedChat} />
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
      </main>
    </Dialog>
  );
}