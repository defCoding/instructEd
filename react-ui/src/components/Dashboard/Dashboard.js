import React, { useEffect } from 'react';
import axios from 'axios';
import { Link as MuiLink, Button, Typography, Grid, Textfield, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function Dashboard() {

  let message = "Not found.";

  useEffect(() => {
    axios.get('/dashboard')
      .then(res => res.data )
      .then(data => { message = data; console.log(message); });
  }, [message]);

  return (
    <>
      <Paper>
        <div>
          <h1>{message}</h1>
        </div>
      </Paper>
    </>
  );
}
