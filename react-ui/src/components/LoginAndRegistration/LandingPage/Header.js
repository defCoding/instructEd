import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Collapse, Toolbar, AppBar, IconButton, Typography, Menu, MenuItem,  } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link as Scroll } from 'react-scroll';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  appbar: {
    background: 'none',
  },
  appbarWrapper: {
    width: '80%',
    margin: '0 auto',
  },
  appbarTitle: {
    flexGrow: '1',
    color: "#fff",
    fontSize: '3rem',
  },
  icon: {
    color: "#fff",
    fontSize: '2rem',
  },
  colorText: {
    color: "#ADEFD1",
  },
  container: {
    alignItems: 'center',
    textAlign: 'center',
  },
  title: {
    fontSize: '4rem',
    color: "#fff",
  },
  body: {
    color: "#fff",
    fontSize: '2rem',
    width: '70%',
    margin: '0 auto',
  },
  goDown: {
    color:'#fff',
    fontSize:'4rem',
  },
  scrollRoot: {
    height: '100vh',
  },
}));

export default function Header() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    setChecked(true);
  },[]);

  return (
    <div className={classes.root} id="header">
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.appbarWrapper}>
          <Typography variant="h1" className={classes.appbarTitle}>instruct
            <span className={classes.colorText}>ED</span>
          </Typography>
          <IconButton          
            aria-label="menu"
            onClick={handleClick}>
            <SortIcon className={classes.icon}/>
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

        </Toolbar>
      </AppBar>
      <Collapse 
        in={checked}
        { ...(checked ? { timeout : 1000 } : {})}
        collapsedHeight={0}
      >
        <div className={classes.container}>
          <Typography variant="h1" className={classes.title}>
            Welcome to <br /> instruct<span className={classes.colorText}>ED</span>
          </Typography>
          <Typography variant="h2" className={classes.body}>
            An online solution for teachers and students to organize and augment the learning experience
          </Typography>
          <Scroll to="click-options" smooth={true}>
            <IconButton>
              <ExpandMoreIcon className={classes.goDown} />
            </IconButton>
          </Scroll>
        </div>
      </Collapse>
    </div>
  );
}