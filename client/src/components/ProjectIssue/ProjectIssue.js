import './ProjectIssue.css'
import React, { useEffect, useState } from 'react';
// ====================== Material UI cores ======================
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
// ====================== API Calls ======================
import IssueDetail from '../IssueDetail'
import IssueAPI from '../../utils/IssueAPI'
// eslint-disable-next-line
import {
  Route,
  Link,
  useParams
} from "react-router-dom";
// ====================== RTF Draft WYSIWYG Editor ======================
import { stateToHTML } from 'draft-js-export-html';
import { convertFromRaw } from 'draft-js'


const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginBottom: 12,
    borderLeft: '3px solid #cccccc',
    borderRight: '3px solid #cccccc',
    paddingBottom: 6,
  },
  projectissue: {
    paddingTop: 10,
    color: '#ccc',
  },
  title: {
    fontWeight: 500,
    fontSize:  15 ,
  },
  secondary: {
    fontSize: 11,
    textAlign: 'right',
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
  body: {
    fontSize: 11,
    color: 'rgba(0,0,0,0.3)',
    marginLeft: 12,
  },
  gray: {
    color: ''
  }
});

const ProjectIssue = props => {
  const classes = useStyles();

  const obj = {
    Low: "#14a7fc",
    Medium: "#f79d0c",
    High: "red",
  }

  const status = {
    Open: "rgb(113, 153, 116)",
    'In Progress': "#f79d0c",
    Closed: "red"
  } 

  const convertFromJSONToHTML = (text) => {
    try {
      return { __html: stateToHTML(convertFromRaw(text)) }
    } catch (exp) {
      console.log(exp)
      return { __html: 'Error' }
    }
  }

  return (

    <Card className={classes.root} style={{ borderLeftColor: obj[props.priority], borderRightColor: status[props.status] }}>
      <CardContent className={classes.projectissue}>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          className="issuecard"
        >
          <IssueDetail 
            author={props.author}
            project={props.project ? props.project.title : null}
            pid={props.project ? props.project.title : null}
          />

          <Grid item className="title" xs={12}>
            <Icon className={classes.priority} style={{ color: obj[props.priority] }} >radio_button_unchecked</Icon>

            {props.title} <i className="body">{props.body}</i>
            

          </Grid>
        </Grid>
      </CardContent>
    </Card>

  )
}

export default ProjectIssue