import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { InputBase, FormGroup, FormControlLabel, Typography, Switch, Menu, ListItem, MenuItem, Badge, ListItemIcon, IconButton, ListItemText } from '@material-ui/core';
import { fade, makeStyles, withStyles} from '@material-ui/core/styles';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { ThumbDown, ThumbUp, Delete } from '@material-ui/icons';
import cookieParser from 'cookie-parser';
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';

var notifications = [{"type": "File Upload", "body": "Upload approval"}, 
                        {"type": "Message", "body": "Message notification"},
                        {"type": "File Upload", "body": "Upload approval"}, 
                        {"type": "Message", "body": "Message notification"}];

const drawerWidth = 250;

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
    width: 500,
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const useStyles = makeStyles((theme) => ({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
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
  search: {
    margin: theme.spacing(2),
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
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
}));

function Navbar(props) {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [toggleNotifications, setToggleNotifications] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const displayNotifications = (event) => {
    setToggleNotifications(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    axios.post('/logout')
      .then(res => props.history.push('/login'))
      .catch(console.log);
  }

  const notificationClose = () => {
    setToggleNotifications(null);
  }

  const handleChange = (event) => {
    setAuth(event.target.checked);
    setDarkMode(!darkMode);
  };

  function needsThumbs(type) {
    if (type === "File Upload") {
      return (
      <ListItemIcon>
        <IconButton
          className={classes.notificationButton}> 
          <ThumbUp /> 
        </IconButton>
        <IconButton
          className={classes.notificationButton}> 
          <ThumbDown /> 
        </IconButton>
      </ListItemIcon>
      );
    }
    else {
      return null;
    }
  }

  function renderNotifications(notification) {
    if (notifications.length === 0) {
      return (
        <ListItemText
          className={classes.notificationButton}
          primary="No Notifications to Display!" />
      );
    }
    else {
      return (
        <>
          <ListItemText 
            className={classes.notificationButton}  
            primary={notification.type} 
            secondary={notification.body} />
          {needsThumbs(notification.type)}
          <IconButton
            className={classes.notificationButton}>
            <Delete /> 
          </IconButton>
        </>
      );
    }
  }

  return (
    <AppBar position="fixed" className={classes.appBar} color="primary">
      <Toolbar>
        <Typography color="secondary" align="left" variant="h6" className={classes.title}>
          instructED
        </Typography>
      {/*
        <FormGroup>
          <FormControlLabel control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />} />
        </FormGroup>
      */}
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        <IconButton
          color="secondary"
          onClick={displayNotifications}
          className={classes.menuButton}>
            <Badge badgeContent={notifications.length} color="secondary">
              <NotificationsIcon />
            </Badge>
        </IconButton>
        <StyledMenu
          id="customized-menu"
          anchorEl={toggleNotifications}
          keepMounted
          open={Boolean(toggleNotifications)}
          onClose={notificationClose}
        >
          {notifications.map((notification) => (
            <ListItem>
              {renderNotifications(notification)}
            </ListItem>
          ))}
        </StyledMenu>
        <IconButton
          color="secondary"
          onClick={handleClick}
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
  );
}

export default withRouter(Navbar);