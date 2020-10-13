import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';
import { FormGroup, FormControlLabel, Typography, Switch } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { createMuiTheme } from '@material-ui/core/styles';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(3),
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);


  const handleChange = (event) => {
    setAuth(event.target.checked);
    setDarkMode(!darkMode);

  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography align="left" variant="h6" className={classes.title}>
          instructED
        </Typography>
        <FormGroup>
          <FormControlLabel control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />} />
        </FormGroup>
        <NotificationsIcon className={classes.menuButton} />
        <AccountCircleIcon className={classes.menuButton} />
      </Toolbar>
    </AppBar>
  );
}