import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Collapse, Toolbar, AppBar, IconButton, Typography } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
  container: {
    alignItems: 'center',
    textAlign: 'center',
  },
  title: {
    fontSize: '4rem',
  },
  body: {
    fontSize: '2rem',
    width: '70%',
    margin: '0 auto',
  },
  goDown: {
    color:'#00203F',
    fontSize:'4rem',
  },
  scrollRoot: {
    height: '100vh',
  },
}));

export default function Header() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);
  React.useEffect(() => {
    setChecked(true);
  },[])
  return (
    <div className={classes.root}>
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
          <IconButton>
            <ExpandMoreIcon className={classes.goDown} />
          </IconButton>
        </div>
      </Collapse>
    </div>
  );
}