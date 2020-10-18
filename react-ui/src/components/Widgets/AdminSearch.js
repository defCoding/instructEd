import React from 'react';
import { Paper, TextField, Grid, Button, MenuItem, FormControl, InputLabel, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const onSubmit = (e) => {
  e.preventDefault();
};

const useStyle = makeStyles(theme => ({
  items: {
    margin:theme.spacing(1)
  },
  searchIcon: { 
    marginTop: theme.spacing(2.9)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}))

export default function Announcements() {
  const classes = useStyle();

  const [filter, setFilter] = React.useState('');

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

    return (
      <Paper>
        <form>
          <Grid height="100%" spacing={1}>
            <Grid item xs="12">
              <SearchIcon className={classes.searchIcon} />
              <TextField
                className={classes.items}
                color="secondary"
                variant="outlined"
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }} />
            </Grid>
            <Grid item xs="12">
              <FormControl color="secondary" variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Filter</InputLabel>
                <Select
                  color="secondary"
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={filter}
                  onChange={handleChange}
                  label="Filter"
                >
                  <MenuItem value={10}>Users</MenuItem>
                  <MenuItem value={20}>Classes</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs="12">
              <Button variant="contained" color="secondary" className={classes.items} onSubmit={onSubmit}>Search</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    );
}