import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from '@material-ui/core';
import useForm from './useForm';
import MenuIcon from '@material-ui/icons/Menu'
import { Link } from 'react-router-dom';

const initialValues = {
}

export default function Navbar() {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const {
    useStyle
  } = useForm(initialValues);

  const classes = useStyle();

  return (
    <>
      <AppBar 
        position="static"
        className={classes.navbar}
        color="primary">
        <Toolbar>
        <IconButton 
          edge="start"
          aria-label="menu"
          onClick={handleClick}>
            <MenuIcon
            color="secondary" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
            }
          }}>
          <MenuItem component={Link} to="/login">Login</MenuItem>
          <MenuItem component={Link} to="/registration">Create Account</MenuItem>
          <MenuItem component={Link} to="/forgotpassword">Forgot Password</MenuItem>
        </Menu>
          
        <Typography 
          variant="h6"
          color="secondary"
          className={classes.title}>
          instructED
        </Typography>
        </Toolbar>
      </AppBar>
    </>
  )
}