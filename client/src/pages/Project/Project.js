
import './Project.css';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import AddIcon from '@material-ui/icons/Add';
import Issue from '../../components/Issue'
import EditProjectModal from '../../components/EditProjectModal'
import AddMember from '../../components/AddMember'
import AddIssue from '../../components/AddIssue'
import ProjectIssueModal from '../../components/ProjectIssueModal'
import ProjectAPI from '../../utils/ProjectAPI'
import UserAPI from '../../utils/UserAPI'
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  Link,
  useParams
} from "react-router-dom";

import axios from 'axios'

// let mongoose = require('mongoose')

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  projecthead: {
    marginTop: 40,
  },
  projecttitle: {
    marginBottom: 20,
  },
  issueleft: {
    paddingRight: 20,
  },
  issueright: {
    paddingLeft: 20,
    borderLeft: '1px solid #ccc',
  },
  members: {
    // paddingLeft: 20,
    borderLeft: '1px solid #fff',
  },
  issuerightchip: {
    marginBottom: 20,
    borderLeft: '1px solid #ccc',
  },
  projectcard: {
    marginRight: 20,
    marginBottom: 20,
  },
  column: {
    marginRight: 20,
    marginBottom: 20,
  },
  right: {
    textAlign: 'right',
    paddingRight: 20,
    marginBottom: 20,
  },
  columntest: {
    backgroundColor: '#ffffff',
    borderTop: '3px solid #cccccc',
  }, 
  allmembers: {
    marginBottom: 12,
  },
  memberschip: {
    marginLeft: 6,
  },
  addbtn: {
    marginLeft: 6,
  }
});

const Project = () => {
  const classes = useStyles();
  
  // ====================== Modals ======================
  // Modal: Open an issue 
  const [openIssue, setIssueOpen] = useState(false);
  const [status, setStatus] = useState({ isLoading: true });
  const [projectStatus, setProjectStatus] = useState({ isLoading: true });
  const [members, setMembers] = useState([])
  const [issues, setIssues] = useState([])
  const params = useParams();
  const { isLoading, project, err } = status;

  const handleIssueOpen = _id => {
    setIssues(
      issues.map((issue) => {
        if (_id === issue._id) {
          issue.isOpen = !issue.isOpen;
        }
        return issue;
      })
    );
    // const project = status.project
    // project.issues = issues
    setStatus({ project })
  }

  // const [archived, setArchived] = useState({ isLoading: true });

  // const handleIssueArchive = _id => {
    
  //   issues = issues.map(issue => {
  //     if (_id === issue._id) {
  //       issue.isArchived = !issue.isArchived
  //     }
  //     return issue
  //   })
  //   const project = status.project
  //   project.issues = issues
  //   setIssues([...issues])
  //   setArchived({ project })
  // }

  //  Modal: Edit Project
  const [openEditProject, setEditProjectOpen] = useState(false);
  const handleEditProjectOpen = () => {
    setEditProjectOpen(true);
  };



  const [doomedMember, setDoomedMember] = useState('')

  const handleDelete = (memberId) => {
  
    let id = project._id
    console.log(id, 'this is the project id')
        //first param is the project dd, second param is the member id
        ProjectAPI.removeMember(id, {_id: memberId})
          .then((res) => {
           console.log(res, 'hi')
          setMembers([...res.data.members])
          })
          .catch(err => console.error(err))
  }


  // Modal: Add Issue
  const [openAddIssue, setAddIssueOpen] = useState(false);
  const handleAddIssueOpen = () => {
    setAddIssueOpen(true);
  };

  // Modal: Add Member
  const [openAddMember, setAddMemberOpen] = useState(false);
  const handleAddMemberOpen = () => {
    setAddMemberOpen(true);
  };
  
  // Modal: Close all Modals
  // eslint-disable-next-line
  const handleClose = () => {
    setIssueOpen(false);
    setAddIssueOpen(false);
    setAddMemberOpen(false);
    setEditProjectOpen(false)
  };

  const statusColor = {
    Open: "rgb(113, 153, 116)",
    'In Progress': "#f79d0c",
    Closed: "red"
  }

  const obj = {
    Medium: "#f79d0c",
    High: "red",
    Low: "#14a7fc"
  }

  // ====================== API CALLS ======================
  // Get Project Info

  useEffect(() => {
    ProjectAPI.getById(params.projectId)
      .then(res => {

        const project = res.data
        console.log(res.data);
        // project.issues = res.data.issues.map(issue => ({
        //   ...issue,
        //   isOpen: false,
        //   isArchived: false
        // }))
        
        setStatus({ project })
        setProjectStatus({
          projectTitle: res.data.title,
          projectDescription: res.data.description
        })
      
        setMembers(res.data.members)
        setIssues(
          res.data.issues.map((issue) => ({
            ...issue,
            isOpen: false,
            // isArchived: false,
          }))
        );

        
      })
      .catch(err => setStatus({ err: err }))
    }, [])

  return  isLoading ? <span>loading...</span> : err ? <h1>{err.message}</h1> : (
    <>
      {/* Project Header */}
      <Grid container className={classes.projecthead}>
        
        {/* Project Title */}
        <Grid item xs={12} md={11}>
          
          <Typography className={classes.projecttitle} variant="h3" component="h2">
              {projectStatus.projectTitle}
          </Typography>
          
        </Grid>
        {/* Edit Project Button */}
        <Grid className={classes.columngrid} item xs={1}>
          <div className={classes.editbtn}>
            <Link onClick={handleEditProjectOpen}>
              <Chip
              clickable
              label="Edit Project"
              variant="outlined"
              size='small'
            />
            </Link>
            <EditProjectModal 
              open={openEditProject} 
              setProjectStatus={setProjectStatus}
              title={projectStatus.projectTitle}
              description={projectStatus.projectDescription}
              owner={project.owner.name}
              members={members}
              handleClose={() => setEditProjectOpen(false)}
            />
          </div>
        </Grid>
        
        </Grid>
      {/* Project owner/member info bar */}
      <Grid container>
        <Grid className={classes.columngrid} item xs={12}>
          <Grid container className={classes.allmembers}>
            {/* Project Owner Chip */}
            <Grid item xs={12} md={3}>
              <span className={classes.title} color="textSecondary">
                Project Lead <Chip
                  // icon={<FaceIcon />}
                  label={project.owner.name}
                  variant="outlined"
                />
              </span>
            </Grid>
            {/* Project Members Chips */}

            
            <Grid item xs={12} md={9}>
              <span className="members">Project Members 
                {members.slice(1).map((member) => (
                  <span id={member._id}>
                    <Chip
                      key={member.id}
                      // icon={<FaceIcon />}
                      clickable
                      label={member.name}
                      className={classes.memberschip}
                      onDelete={() =>handleDelete(member._id)}
                      color="default"
                      variant="outlined"
                      label={member.name}
                    />
                    </span>
                ))}
                {/* Add Member Chip */}
                <Link onClick={handleAddMemberOpen}>
                  <Chip
                    icon={<AddIcon />}
                    clickable
                    className={classes.addbtn}
                    label="Add Member"
                    variant="outlined"
                  />
                </Link>
                <AddMember
                  open={openAddMember}
                  handleClose={() => setAddMemberOpen(false)}
                  members={members}
                  setMembers={setMembers}
                  projectId={params.projectId}
                />
              </span>
            </Grid>
          </Grid>
          
          {/* Project Description */}
          <div className={classes.column}>
            <Card>
              <CardContent>
                <Typography>
                 {projectStatus.projectDescription}
                </Typography>
              </CardContent>
            </Card>
          </div>
        </Grid>
      </Grid>

      {/* Add Issue Chip + Open/IP/Closedcolumns */}
      <Grid container>
        <Grid className={classes.right} item xs={12}>
          {/* Add Issue Chip */}
          <Link onClick={handleAddIssueOpen}>
            <Chip
              icon={<AddIcon />}
              clickable
              className={classes.addbtn}
              label="Add Issue"
              // variant="outlined"
              color="primary"
            />
          </Link>
          <AddIssue
            open={openAddIssue}
            issues={issues}
            setIssues={setIssues}
            handleClose={() => setAddIssueOpen(false)}
          />
        </Grid>

        {/* Open Issues column */}
        {['Open', 'In Progress', 'Closed'].map(column => (
          <Grid key={column} className={classes.columngrid} item xs={12} lg={4}>
            <div className={classes.column}>
              
              <Card className={classes.columntest} style={{ borderColor: statusColor[column] }}>
                  <CardContent>
                    <Typography className={classes.mb} variant="h5" component="h5">
                      {column}
                    </Typography>
                    
                    {issues.filter(issue => issue.status === column).map((issueData) => (
                      <>
                        <Link onClick={() => handleIssueOpen(issueData._id)}>
                          <Issue
                            title={issueData.title}
                            body={issueData.body}
                            priority={issueData.priority}
                          />
                        </Link>
                        
                        <ProjectIssueModal
                          issues={issues}
                          setIssues={setIssues}
                          key={issueData._id}
                          id={issueData._id}
                          title={issueData.title}
                          body={issueData.body}
                          status={issueData.status}
                          priority={issueData.priority}
                          isPublic={issueData.isPublic}
                          author={issueData.author.name}
                          replies={issueData.replies}
                          open={issueData.isOpen}
                          handleClose={() => handleIssueOpen(issueData._id)}
                        />
                      </>
                    ))}
                  </CardContent>
                </Card>
              
            </div>
          </Grid>
        ))}

      </Grid>
    </>
  )
}

export default Project