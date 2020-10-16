import React from 'react';
import { Paper, IconButton, Menu, MenuItem, AppBar, Toolbar, Typography } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { makeStyles } from '@material-ui/core/styles';

const ITEM_HEIGHT = 50;

const options = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel',
];

var currentOption = 'None';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
}));

export default function WidgetCase() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  function sayHello(name) {
    setAnchorEl(null);
    currentOption = name;
  };

  return (
    <Paper className={classes.root}>
      <div>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClick}
              edge="start"
            >
              <ArrowDropDownIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={() => sayHello('James')}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: '20ch',
                },
              }}
            >
              {options.map((option) => (
                <MenuItem 
                  key={option} 
                  selected={option === currentOption} 
                  onClick={() => sayHello(option)}>
                  {option}
                </MenuItem>
              ))}
            </Menu>
            <Typography variant="h6" color="inherit">
              {currentOption}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    </Paper>
  );
}