import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link as MuiLink, Button, Typography, Grid, Textfield, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function Dashboard() {

  const [message, setMessage] = useState('Page not found.');

  useEffect(() => {
    axios.get('/dashboard')
      .then(res => res.data )
      .then(data => { setMessage('Access granted!'); });
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
