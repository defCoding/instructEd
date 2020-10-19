import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';
import { Paper, Dialog, FormGroup, FormControlLabel, Typography, Switch, Menu, ListItem, MenuItem, Badge, ListItemIcon, IconButton, ListItemText } from '@material-ui/core';
import { makeStyles, withStyles} from '@material-ui/core/styles';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CloseIcon from '@material-ui/icons/Close';
import { ThumbDown, ThumbUp, Delete } from '@material-ui/icons';

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
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  notificationButton: {
    margin: theme.spacing(2),
  },
  toolbar: theme.mixins.toolbar,
  dialog: {
    padding: theme.spacing(3),
    height: "100vh",
  },
}));

function ProfileDialog ({ open, setOpen }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog fullScreen open={open} onClose={handleClose}>
      <AppBar>
        <Toolbar className={classes.toolbar}>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>Profile</Typography>
        </Toolbar>
      </AppBar>
      <Paper className={classes.dialog}>
      </Paper>
    </Dialog>
  );
}

export default function Navbar() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [toggleNotifications, setToggleNotifications] = React.useState(null);
  const [openProfile, setOpenProfile] = React.useState(false);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const displayNotifications = (event) => {
    setToggleNotifications(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

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
    <>
      <AppBar position="fixed" className={classes.appBar} color="primary">
        <Toolbar>
          <Typography color="secondary" align="left" variant="h6" className={classes.title}>
            instructED
          </Typography>
          <FormGroup>
            <FormControlLabel control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />} />
          </FormGroup>
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
            <MenuItem onClick={setOpenProfile}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <ProfileDialog open={openProfile} setOpen={setOpenProfile} />
    </>
  );
}