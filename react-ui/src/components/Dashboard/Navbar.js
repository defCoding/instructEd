import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Typography, Switch, Menu, MenuItem, IconButton } from '@material-ui/core';
import { fade, makeStyles, withStyles} from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import axios from 'axios';
import ChatIcon from '@material-ui/icons/Chat';
import Chat from './Chat';
import AddIcon from '@material-ui/icons/Add';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  appBar: {
    width: `100%`,
    marginLeft: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  notificationButton: {
    margin: theme.spacing(2),
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  listbox: {
    width: 200,
    margin: 0,
    padding: 0,
    zIndex: 1,
    position: 'absolute',
    listStyle: 'none',
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
    maxHeight: 200,
    border: '1px solid rgba(0,0,0,.25)',
    '& li[data-focus="true"]': {
      backgroundColor: '#4a8df6',
      color: 'white',
      cursor: 'pointer',
    },
    '& li:active': {
      backgroundColor: '#2977f5',
      color: 'white',
    },
  },
}));

function Navbar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  
  const handleAccountClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    axios.post('/logout')
      .then(res => {
        props.history.push('/')
        if (props.darkState == true) {
          props.handleThemeChange();
        }
      })
      .catch(console.log);
  }

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar} color="primary">
        <Toolbar>
          <Typography color="secondary" align="left" variant="h6" className={classes.title}>
            instructED
          </Typography>
          <IconButton
            color="secondary"
            onClick={props.addWidgetClick}
            className={classes.menuButton} >
            <AddIcon />
          </IconButton>
          <Switch
            checked={props.darkState}
            onChange={props.handleThemeChange}
            className={classes.menuButton} />
          <IconButton
            color="secondary"
            onClick={() => {
              setOpen(true);
            }}
            className={classes.menuButton} >
              <ChatIcon />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={handleAccountClick}
            className={classes.menuButton}>
              <AccountCircleIcon />
          </IconButton>
          <Menu
            id="profile"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Chat darkState={props.darkState} open={open} setOpen={setOpen} />
    </div>
  );
}

export default withRouter(Navbar);
