import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { InputBase, FormGroup, FormControlLabel, Typography, Switch, Menu, ListItem, MenuItem, Badge, ListItemIcon, IconButton, ListItemText } from '@material-ui/core';
import { fade, makeStyles, withStyles} from '@material-ui/core/styles';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { ThumbDown, ThumbUp, Delete } from '@material-ui/icons';
import cookieParser from 'cookie-parser';
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';
import useAutocomplete from '@material-ui/lab/useAutocomplete';

var notifications = [{"type": "File Upload", "body": "Upload approval"}, 
                        {"type": "Message", "body": "Message notification"},
                        {"type": "File Upload", "body": "Upload approval"}, 
                        {"type": "Message", "body": "Message notification"}];

const drawerWidth = 250;

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
    width: 500,
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const useStyles = makeStyles((theme) => ({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  notificationButton: {
    margin: theme.spacing(2),
  },
  search: {
    margin: theme.spacing(2),
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  listbox: {
    width: 200,
    margin: 0,
    padding: 0,
    zIndex: 1,
    position: 'absolute',
    listStyle: 'none',
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
    maxHeight: 200,
    border: '1px solid rgba(0,0,0,.25)',
    '& li[data-focus="true"]': {
      backgroundColor: '#4a8df6',
      color: 'white',
      cursor: 'pointer',
    },
    '& li:active': {
      backgroundColor: '#2977f5',
      color: 'white',
    },
  },
}));

function Navbar(props) {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [toggleNotifications, setToggleNotifications] = React.useState(null);
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: 'use-autocomplete-demo',
    options: top100Films,
    getOptionLabel: (option) => option.title,
  });
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const displayNotifications = (event) => {
    setToggleNotifications(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    axios.post('/logout')
      .then(res => props.history.push('/login'))
      .catch(console.log);
  }

  const notificationClose = () => {
    setToggleNotifications(null);
  }

  const handleChange = (event) => {
    setAuth(event.target.checked);
    setDarkMode(!darkMode);
  };

  function needsThumbs(type) {
    if (type === "File Upload") {
      return (
      <ListItemIcon>
        <IconButton
          className={classes.notificationButton}> 
          <ThumbUp /> 
        </IconButton>
        <IconButton
          className={classes.notificationButton}> 
          <ThumbDown /> 
        </IconButton>
      </ListItemIcon>
      );
    }
    else {
      return null;
    }
  }

  function renderNotifications(notification) {
    if (notifications.length === 0) {
      return (
        <ListItemText
          className={classes.notificationButton}
          primary="No Notifications to Display!" />
      );
    }
    else {
      return (
        <>
          <ListItemText 
            className={classes.notificationButton}  
            primary={notification.type} 
            secondary={notification.body} />
          {needsThumbs(notification.type)}
          <IconButton
            className={classes.notificationButton}>
            <Delete /> 
          </IconButton>
        </>
      );
    }
  }

  return (
    <AppBar position="fixed" className={classes.appBar} color="primary">
      <Toolbar>
        <Typography color="secondary" align="left" variant="h6" className={classes.title}>
          instructED
        </Typography>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
          {groupedOptions.length > 0 ? (
            <ul className={classes.listbox} {...getListboxProps()}>
              {groupedOptions.map((option, index) => (
                <li {...getOptionProps({ option, index })}>{option.title}</li>
              ))}
            </ul>
          ) : null}
        </div>
        <IconButton
          color="secondary"
          onClick={displayNotifications}
          className={classes.menuButton}>
            <Badge badgeContent={notifications.length} color="secondary">
              <NotificationsIcon />
            </Badge>
        </IconButton>
        <StyledMenu
          id="customized-menu"
          anchorEl={toggleNotifications}
          keepMounted
          open={Boolean(toggleNotifications)}
          onClose={notificationClose}
        >
          {notifications.map((notification) => (
            <ListItem>
              {renderNotifications(notification)}
            </ListItem>
          ))}
        </StyledMenu>
        <IconButton
          color="secondary"
          onClick={handleClick}
          className={classes.menuButton}>
            <AccountCircleIcon />
        </IconButton>
        <Menu
          id="profile"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(Navbar);

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
  { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
  { title: 'Casablanca', year: 1942 },
  { title: 'City Lights', year: 1931 },
  { title: 'Psycho', year: 1960 },
  { title: 'The Green Mile', year: 1999 },
  { title: 'The Intouchables', year: 2011 },
  { title: 'Modern Times', year: 1936 },
  { title: 'Raiders of the Lost Ark', year: 1981 },
  { title: 'Rear Window', year: 1954 },
  { title: 'The Pianist', year: 2002 },
  { title: 'The Departed', year: 2006 },
  { title: 'Terminator 2: Judgment Day', year: 1991 },
  { title: 'Back to the Future', year: 1985 },
  { title: 'Whiplash', year: 2014 },
  { title: 'Gladiator', year: 2000 },
  { title: 'Memento', year: 2000 },
  { title: 'The Prestige', year: 2006 },
  { title: 'The Lion King', year: 1994 },
  { title: 'Apocalypse Now', year: 1979 },
  { title: 'Alien', year: 1979 },
  { title: 'Sunset Boulevard', year: 1950 },
  { title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', year: 1964 },
  { title: 'The Great Dictator', year: 1940 },
  { title: 'Cinema Paradiso', year: 1988 },
  { title: 'The Lives of Others', year: 2006 },
  { title: 'Grave of the Fireflies', year: 1988 },
  { title: 'Paths of Glory', year: 1957 },
  { title: 'Django Unchained', year: 2012 },
  { title: 'The Shining', year: 1980 },
  { title: 'WALL·E', year: 2008 },
  { title: 'American Beauty', year: 1999 },
  { title: 'The Dark Knight Rises', year: 2012 },
  { title: 'Princess Mononoke', year: 1997 },
  { title: 'Aliens', year: 1986 },
  { title: 'Oldboy', year: 2003 },
  { title: 'Once Upon a Time in America', year: 1984 },
  { title: 'Witness for the Prosecution', year: 1957 },
  { title: 'Das Boot', year: 1981 },
  { title: 'Citizen Kane', year: 1941 },
  { title: 'North by Northwest', year: 1959 },
  { title: 'Vertigo', year: 1958 },
  { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
  { title: 'Reservoir Dogs', year: 1992 },
  { title: 'Braveheart', year: 1995 },
  { title: 'M', year: 1931 },
  { title: 'Requiem for a Dream', year: 2000 },
  { title: 'Amélie', year: 2001 },
  { title: 'A Clockwork Orange', year: 1971 },
  { title: 'Like Stars on Earth', year: 2007 },
  { title: 'Taxi Driver', year: 1976 },
  { title: 'Lawrence of Arabia', year: 1962 },
  { title: 'Double Indemnity', year: 1944 },
  { title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
  { title: 'Amadeus', year: 1984 },
  { title: 'To Kill a Mockingbird', year: 1962 },
  { title: 'Toy Story 3', year: 2010 },
  { title: 'Logan', year: 2017 },
  { title: 'Full Metal Jacket', year: 1987 },
  { title: 'Dangal', year: 2016 },
  { title: 'The Sting', year: 1973 },
  { title: '2001: A Space Odyssey', year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: 'Toy Story', year: 1995 },
  { title: 'Bicycle Thieves', year: 1948 },
  { title: 'The Kid', year: 1921 },
  { title: 'Inglourious Basterds', year: 2009 },
  { title: 'Snatch', year: 2000 },
  { title: '3 Idiots', year: 2009 },
  { title: 'Monty Python and the Holy Grail', year: 1975 },
];