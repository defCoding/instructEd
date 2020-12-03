import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, AppBar, CssBaseline, IconButton, Typography } from '@material-ui/core';
import LandingPic from '../../assets/landing_pic.jpg';
import SortIcon from '@material-ui/icons/Sort';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage: 'url(' + LandingPic + ')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  appbarRoot: {
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
    color: "#00203F",
    fontSize: '3rem',
  },
  icon: {
    color: "#ADEFD1",
    fontSize: '2rem',
  },
  colorText: {
    color: "#ADEFD1",
  },
  welcomeTitleContainer: {
    alignItems: 'center',
    textAlign: 'center',
  },
  welcomeTitle: {
    fontSize: '4rem',
  },
  welcomeContent: {
    fontSize: '2rem',
    width: '70%',
    margin: '0 auto',
  }
}));

export default function LandingPage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <div className={classes.appbarRoot}>
        <AppBar className={classes.appbar} elevation={0}>
          <Toolbar className={classes.appbarWrapper}>
            <Typography variant="h1" className={classes.appbarTitle}>instruct
              <span className={classes.colorText}>ED</span>
            </Typography>
            <IconButton>
              <SortIcon className={classes.icon}/>
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className={classes.welcomeTitleContainer}>
          <Typography variant="h1" className={classes.welcomeTitle}>
            Welcome to <br /> instruct<span className={classes.colorText}>ED</span>
          </Typography>
          <Typography variant="h2" className={classes.welcomeContent}>
            An online solution for teachers and students to organize and augment the learning experience
          </Typography>
        </div>
      </div>
    </div>
  );
}