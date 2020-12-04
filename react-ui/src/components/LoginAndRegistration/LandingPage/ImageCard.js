import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 375,
    background:'rgba(0,0,0,0.5)',
    margin: '20px',
    [theme.breakpoints.down('md')]:{
      width: 600,
    },
    [theme.breakpoints.down('xs')]:{
      height: 400,
    },
  },
  media: {
    height: 300,
    [theme.breakpoints.down('md')]:{
      height: 150,
    }
  },
  title: {
    fontWeight: 'bold',
    color: '#fff',
  },
  desc: {
    color: '#ddd',
  }
}));

export default function ImageCard( props ) {
  const classes = useStyles();
  const imageURL = props.imageUrl;

  return (
    <Collapse 
      in={props.checked}
      { ... (props.checked ? { timeout: 1000 } : {})}>
      <Card className={classes.root}>
        <CardActionArea
          component={Link}
          to={props.link}>
          <CardMedia
            className={classes.media}
            image={imageURL}
            title={props.title}
          />
          <CardContent>
            <Typography 
              gutterBottom 
              variant="h5" 
              component="h2"
              className={classes.title}>
              {props.title}
            </Typography>
            <Typography 
              variant="body2" 
              color="textSecondary" 
              component="p" 
              className={classes.desc}>
              {props.desc}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Collapse>
  );
}