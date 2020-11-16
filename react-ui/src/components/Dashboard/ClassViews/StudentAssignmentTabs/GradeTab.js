import React, { useEffect, useState, useRef} from 'react';
import axios from 'axios';
import { Box, Typography, Grid } from '@material-ui/core';

export default function GradeTab(props) {
  const classes = props.classes;
  const [grade, setGrade] = useState('');
  useEffect(() => {
    console.log(props.data.assignmentID);
    axios.get(`/grades/${props.data.assignmentID}/`)
    .then(res => {setGrade(String(res.data.grade))}).catch(console.log)
    console.log(grade);
  })

  return(
    <Box height={200}>
      <Grid container height="100%" spacing={1}>
        <Grid item xs={12}>
          <Typography className={classes.panelItems}>Grade</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h2" className={classes.panelItems}>{grade}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

