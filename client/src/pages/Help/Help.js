import './Help.css';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
// import ProjectIssue from '../../components/ProjectIssue'
import Spacer from '../../components/Spacer';
import CommunityIssueCard from '../../components/CommunityIssueCard'
import CommunityIssueModal from '../../components/CommunityIssueModal'
import ProjectCard from '../../components/ProjectCard'
import ProjectIssueModal from '../../components/ProjectIssueModal'
import UserAPI from '../../utils/UserAPI'
import IssueAPI from '../../utils/IssueAPI'
import {
  Link
} from "react-router-dom";


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  contactcontainer: {
    maxWidth: 1200,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  cct: {
    marginBottom: 40,
  },
  ccinfo: {
    marginLeft: 40,
    marginBottom: 20,
  },
  ccicon: {
    marginRight: 40,
  },
  column: {
    paddingRight: 12,

  },
  right: {
    textAlign: 'right',
  }
});

const Help = () => {
  const classes = useStyles();

  const [issueState, setIssueState] = useState([])
  
  const [communityissue, setCommunityIssue] = useState(false);


  const handleCommunityIssueOpen = _id => {
    let issues = issueState

    issues = issues.map(issue => {
      if (_id === issue._id) {
        issue.openCommunity = !issue.openCommunity
      }
      return issue
    })

    const project = communityissue.project
    project.issues = issues
    setCommunityIssue({ project })
  }

  const handleClose = () => {
    setCommunityIssue(false)
  };

  const [myid, setMyId] = useState('');

  //displays all comm issues
  useEffect(() => {
    IssueAPI.getAll()
      .then( ({ data: issues}) => {
        issues.map(issue => ({
          ...issue,
          isOpen: false,
          openCommunity: false
        }))
        issues.reverse()
        setIssueState(issues)
      })
      .catch(err => console.log(err ))
  //used for opening an issue modal
    UserAPI.me()
      .then(res => {
        const project = res.data
        setCommunityIssue({ project })
        setMyId(res.data._id)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <h1>Community Issues </h1>
      <Grid container>
        <Grid item xs={12} lg={9} md={9} sm={12} className={classes.column}>
          <Typography variant="h6" component="h2">
            Help Answer Others' Issues
          </Typography>
          {issueState.filter(issue => issue.isPublic === true && issue.status === 'Open' || issue.status === 'In Progress' ).slice(0, 8).map((issueData) => (
            <>
              <Link onClick={() => handleCommunityIssueOpen(issueData._id)}>
                <CommunityIssueCard
                  key={issueData.id}
                  id={issueData._id}
                  title={issueData.title}
                  status={issueData.status}
                  date={issueData.createdAt}
                  author={issueData.author.name}
                  replycount={issueData.replies.length}
                />
              </Link>

              <CommunityIssueModal
                id={issueData._id}
                date={issueData.createdAt}
                title={issueData.title}
                body={issueData.body}
                author={issueData.author.username}
                status={issueData.status}
                open={issueData.openCommunity}
                handleClose={() => handleCommunityIssueOpen(issueData._id)}
              />
            </>
          ))}

        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={3} className={classes.column}>

          <Typography variant="h6" component="h2">
            Recently Solved Issues
          </Typography>
            {issueState.filter(issue => issue.isPublic === true && issue.status === 'Closed').slice(0, 8).map((issueData) => (
              <>
                <Link onClick={() => handleCommunityIssueOpen(issueData._id)}>
                  <CommunityIssueCard
                    key={issueData.id}
                    id={issueData._id}
                    title={issueData.title}
                    status={issueData.status}
                    date={issueData.createdAt}
                    author={issueData.author.name}
                    replycount={issueData.replies?.length}
                  />
                </Link>

                <CommunityIssueModal
                  id={issueData._id}
                  date={issueData.createdAt}
                  title={issueData.title}
                  body={issueData.body}
                  author={issueData.author.username}
                  status={issueData.status}
                  open={issueData.openCommunity}
                  handleClose={() => handleCommunityIssueOpen(issueData._id)}
                />
              </>
            ))}

          </Grid>

        </Grid>
   
    </>
  )
}

export default Help