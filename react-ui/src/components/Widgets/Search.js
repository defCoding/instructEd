import React, { useState, useEffect } from 'react';
import { InputLabel, FormControl, Select, Paper, TextField, Grid, MenuItem, Menu, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';

const ITEM_HEIGHT = 50;

const useStyle = makeStyles(theme => ({
  items: {
    margin: theme.spacing(1)
  },
  root: {
    '& .MuiFormControl-root': {
      width: '75%',
      margin: theme.spacing(1),
      display: 'flex'
    }
  },
}))

function DisplaySearchResults(props) {
  console.log(props.filter);
  console.log(props.searchResults);

  if (props.filter === 'Classes') {
    return (
      <table border="2" width="100%">
        <tr>
          <th>ID</th>
          <th>Department</th>
          <th>Number</th>
          <th>Name</th>
          <th>Term</th>
        </tr>
        {props.searchResults.map((result) => {
          return (
            <tr>
              <td>{result.course_id}</td>
              <td>{result.course_dept}</td>
              <td>{result.course_number}</td>
              <td>{result.course_name}</td>
              <td>{result.term}</td>
            </tr>
            )
          }
        )}
      </table>
    );
  }
  else {
    return(
      <table border="2" width="100%">
        <tr>
          <th>ID</th>
          <th>First</th>
          <th>Last</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
        {props.searchResults.map((result) => {
          return (
            <tr>
              <td>{result.id}</td>
              <td>{result.first_name}</td>
              <td>{result.last_name}</td>
              <td>{result.email}</td>
              <td>{result.main_role}</td>
            </tr>
          );
        })}
      </table>
    );
  }
}


export default function Search() {
  const classes = useStyle();
  const [filter, setFilter] = React.useState("All Users");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    {/*if (searchQuery > 1) {*/}
      if (filter === 'Classes') {
        axios.get(`/search/courses/${event.target.value}`).then(res => {
          setSearchResults(res.data);
          console.log(searchResults);
        }).catch(console.log);
      }
      else {
        let role = filter;
        if (role === "All Users") {
          role = '';
        }
        axios.get(`/search/users/${event.target.value}/filter/${role}`).then(res => {
          setSearchResults(res.data);
          console.log(searchResults);
        }).catch(console.log);
      }
    }


  return (
    <Grid height="100%" spacing={1}>
      <Grid item xs="12">
        <div style={{ width: 300 }}>
          <TextField 
            onChange={handleSearchChange}
            label="Search..." 
            margin="normal" 
            variant="outlined" 
            className={classes.items} />
        </div>
      </Grid>
      <Grid item xs="12">
        <FormControl color="secondary" variant="outlined" className={classes.items}>
          <InputLabel>Filter</InputLabel>
          <Select
              color="secondary"
              style={{ width: 150 }}
              onChange={handleFilterChange}
              value={filter}
              label="Filter"
              name="filter"
              required
            >
              <MenuItem value='Classes'>Classes</MenuItem>
              <MenuItem value='Students'>Students</MenuItem>
              <MenuItem value='Instructors'>Instructors</MenuItem>
              <MenuItem value='All Users'>All Users</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs="12">
        <Typography className={classes.items}>{filter}</Typography>
      </Grid>
      <Grid item xs="12">
        {/*<DisplaySearchResults filter={filter} searchResults={searchResults} />*/}
      </Grid>
    </Grid>
  );
}
