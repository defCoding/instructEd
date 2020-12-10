import React, { useEffect } from 'react'; import { Paper, IconButton, Menu, MenuItem, AppBar, Toolbar, Typography, Dialog } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { makeStyles } from '@material-ui/core/styles';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import Announcements from '../Widgets/Announcements';
import Calendar from '../Widgets/TaskCalendar';
import AddCourse from '../Widgets/AddCourse';
import CreateAnnouncement from '../Widgets/CreateAnnouncement';
import AddToClass from '../Widgets/AddToClass';
import SetRole from '../Widgets/SetRole';
import UpcomingAssignments from '../Widgets/UpcomingAssignments';
import CreateAssignment from '../Widgets/CreateAssignment';
import UnapprovedFiles from '../Widgets/UnapprovedFiles';
import Search from '../Widgets/Search';
import CloseIcon from '@material-ui/icons/Close';

const ITEM_HEIGHT = 50;

const useStyles = makeStyles((theme) => ({
  root: {
  },
  menuButton: {
    marginRight: theme.spacing(3),
  },
  dialog: {
    padding: theme.spacing(3),
    height: "100vh",
  },
  appBar: {
    position: 'relative',
  },
  allWidgets: {
    padding: theme.spacing(1),
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
  }
}));

function WidgetSelect({currentWidget}) {
  switch (currentWidget) {
    case 'Add Course':
      return (<AddCourse />);
    case 'Set Role':
      return (<SetRole />);
    case 'Add User to Class':
      return (<AddToClass />);
    case 'Announcements':
      return (<Announcements />);
    case 'Create Announcement':
      return (<CreateAnnouncement />);
    case 'Calendar':
      return (<Calendar />);
    case 'Assignments':
      return (<UpcomingAssignments />);
    case 'Create Assignment':
      return (<CreateAssignment />);
    case 'Unapproved Files':
      return (<UnapprovedFiles />);
    case 'Search':
      return (<Search />);
    default:
      return null;
  }
}

function WidgetDialog ({currentWidgetName, openDialog, setOpenDialog}) {
  const classes = useStyles();

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <Dialog fullScreen openDialog={openDialog} onClose={handleClose}>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {currentWidgetName}
          </Typography>
        </Toolbar>
      </AppBar>
      <Paper className={classes.dialog}>
        <WidgetSelect currentWidget={currentWidgetName} />
      </Paper>
    </Dialog>
  );
}

export default function WidgetCase({currentRoleWidgets, currentWidget, removeWidgetClick, updateWidgetClick}) {
  const currentWidgetPosn = currentWidget.posn;
  const currentWidgetName = currentWidget.name;
  //const [currentWidget, setCurrentWidget] = React.useState(undefined);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const open = Boolean(anchorEl);
  const classes = useStyles();
  /*
  useEffect(() => {
    setCurrentWidget(props.displayWidgets[props.widgetPosn]);
  }, [props]);
*/
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  function handleClose(name) {
    setAnchorEl(null);
    updateWidgetClick(name, currentWidgetPosn);
  }

  return (
    <Paper className={classes.root}>
      <div>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton 
              color="secondary"
              edge="end"
              onClick={() => setOpenDialog(true)}>
              <FullscreenIcon />
            </IconButton>
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClick}
              color="secondary"
            >
              <ArrowDropDownIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={() => handleClose('Select a widget...')}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                },
              }}
            >
              {currentRoleWidgets.map((option) => (
                <MenuItem 
                  key={option}
                  selected={option === currentWidgetName}
                  onClick={() => handleClose(option)}>
                  {option}
                </MenuItem>
              ))}
            </Menu>
            <Typography align="right" variant="h6" color="inherit">
              {currentWidgetName}
            </Typography>
            <IconButton
              color="secondary"
              className={classes.title}
              onClick={() => removeWidgetClick(currentWidgetPosn)}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
      <WidgetSelect currentWidget={currentWidgetName} />
      <Dialog fullScreen open={openDialog} onClose={() => setOpenDialog(false)}>
        <AppBar className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <IconButton edge="start" color="inherit" onClick={() => setOpenDialog(false)} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {currentWidgetName}
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper style={{ height: "100vh" }}>
          <WidgetSelect currentWidget={currentWidgetName} className={classes.allWidgets} />
        </Paper>
      </Dialog>
    </Paper>
  );
}
