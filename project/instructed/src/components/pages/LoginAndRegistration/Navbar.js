import React from 'react'
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import useForm from './useForm';
import MenuIcon from '@material-ui/icons/Menu'

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
        className={classes.navbar}
        color="primary">
        <Toolbar>
        <IconButton 
          edge="start"
          aria-label="menu">
            <MenuIcon style={{ color:'#ffffff' }} />
        </IconButton>
        <Typography 
          variant="h6"
          style={{ color:'#ffffff' }}
          className={classes.title}>
          instructED
        </Typography>
        </Toolbar>
      </AppBar>
    </>
  )
}