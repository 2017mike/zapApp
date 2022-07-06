import './CommunityIssueCard.css';
import React from 'react';
// ====================== Material UI cores ======================
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
// ====================== Material UI icons ======================
import ChatIcon from '@material-ui/icons/Chat';
// ====================== API Calls ======================
// eslint-disable-next-line
import {
  Switch,
  Route,
  Link
} from "react-router-dom";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginBottom: 12,
    borderLeft: '3px solid #cccccc',
    paddingBottom: 6,
  },
  title: {
    fontWeight: 500,
    fontSize: 15,
  },
  secondary: {
    fontSize: 11,
    color: 'rgba(0,0,0,0.5)',
    display: 'block',
  },
  priority: {
    fontSize: 13,
    textAlign: 'center',
    marginRight: 10,
    fontWeight: '800'
  },
  center: {
    flexDirection: "column",
    justifyContent: "center",
    verticalAlign: 'center',
  },
  answer: {
    textAlign: 'right',
  }
});

const obj = {
  Open: "#719974",
  'In Progress': "#f79d0c",
  Closed: "red"
}

const CommunityIssue = props => {
  const classes = useStyles();

  let formatdate = new Date(props.date)
  let timestamp = formatdate.toLocaleString('en-US', { timeZone: 'PST' })

  return(
    <Card className={classes.root} style={{ borderColor: obj[props.status] }}>
      <CardContent>
        <Grid container>
          <Grid item xs={8}>
            <Typography variant="body2" component={'span'} className={classes.title}>
              {props.title}
            </Typography>
            <span className={classes.secondary} color="textSecondary">
              asked on {timestamp}</span>
          </Grid>
          <Grid className={classes.answer} item xs={4}>
            <Badge badgeContent={props.replycount} color="secondary">
              {/* <Button size="small" variant="outlined" color="primary" href="#contained-buttons">
                {props.replycount}
              </Button> */}
              <ChatIcon style={{ color: 'rgba(0,0,0,0.5)' }}/>
            </Badge>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CommunityIssue