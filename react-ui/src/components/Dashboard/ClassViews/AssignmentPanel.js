import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItemText, Paper, ListItem, Typography } from '@material-ui/core';
import moment from 'moment';
import StudentAssignment from './StudentAssignment';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    flexShrink: 0,
  },
  drawerPaper: {
    background: theme.palette.secondary.main,
  },
  appBar: {
    position: 'relative',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  dialog: {
    padding: theme.spacing(3),
    height: "100vh",
  }
}));

export default function AssignmentPanel(props) {
  const classes = useStyles();
  const assignments = props.assignments;
  const [open, setOpen] = React.useState(false);
  const [selectedAssignment, setSelectedAssignment] = React.useState(null);

  return (
    <>
      <Paper className={classes.dialog}>
        <Typography variant="h6">
          Assignments
      </Typography>
        <List>
          {
          assignments.map(assignment => {
            let date = moment(assignment.deadline).local();
            date = date.format('[Due on] MM-DD-YY [at] h:mm A');
            
            return (
              <ListItem onClick={() => {
                setOpen(true);
                setSelectedAssignment(assignment.assignment_name);
              }}>
                <ListItemText primary={assignment.assignment_name} secondary={date} />
              </ListItem>
            );
          })
          }
        </List>
      </Paper>
      <StudentAssignment selectedAssignment={selectedAssignment} open={open} setOpen={setOpen} />
    </>
  );
}