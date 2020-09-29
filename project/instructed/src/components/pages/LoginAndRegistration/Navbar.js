import React from 'react'
import { AppBar, Toolbar } from '@material-ui/core';
import useForm from './useForm';

const initialValues = {
}

export default function Navbar() {

  const {
    useStyle
  } = useForm(initialValues);

  const classes = useStyle();

  return (
    <>
      <AppBar 
        position="static"
        color="secondary"
        className={classes.navbar}>
        <Toolbar>
        </Toolbar>
      </AppBar>
    </>
  )
}