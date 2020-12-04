import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageCard from './ImageCard';
import LoginPic from './assets/login_card.jpg';
import SignUpPic from './assets/signup_card.jpg';
import ForgotPasswordPic from './assets/forgot_password_card.jpg';
import useWindowPosition from './hook/useWindowPosition';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]:{
      flexDirection: 'column',
    }
  },
}));

export default function LandingScroll () {
  const classes = useStyles();
  const checked = useWindowPosition("header");
  return (
    <div className={classes.root} id="click-options">
      <ImageCard title='Login' desc='Login to your account' imageUrl={LoginPic} link="/login" checked={checked}/>
      <ImageCard title='Sign Up' desc='Sign up for an account' imageUrl={SignUpPic} link="/registration" checked={checked}/>
      <ImageCard title='Forgot Password' desc='Forgot your password? Reset your password' imageUrl={ForgotPasswordPic} link="/forgotpassword" checked={checked}/>
    </div>
  );
}