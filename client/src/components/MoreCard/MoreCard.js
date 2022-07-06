import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 175,
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    height: 200,
    flexDirection: "column",
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.15)'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  add: {
    fontSize: 92,
    color: '#fff'
  },
  pos: {
    fontSize: 13,
    marginBottom: 12,
  },
});

const MoreCard = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        
        <Typography className={classes.add}>
          +
        </Typography>
        
      </CardContent>
    </Card>
  )
}

export default MoreCard