import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Header from './Header';
import LandingPic from './landing.jpg';
import LandingDark from './landing_dark.jpg';



const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage: 'url(' + LandingDark + ')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
}));

export default function LandingPage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
    </div>
  );
}