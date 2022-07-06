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
import ProjectIssueModal from '../../components/ProjectIssueModal'
import EditProjectModal from '../../components/EditProjectModal'
import AddIssue from '../../components/AddIssue'
import AddMember from '../../components/AddMember'
import ProjectAPI from '../../utils/ProjectAPI'
// eslint-disable-next-line
import {
  Link,
  useParams
} from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  mb: {
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
    backgroundColor: '#ddd'
  }, 
});

const Project = () => {
  const classes = useStyles();

  // Modals
  const [open, setOpen] = useState(false);
  const [openEditProject, setEditProjectOpen] = useState(false);
  const [openAddIssue, setAddIssueOpen] = useState(false);
  const [openAddMember, setAddMemberOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleEditProjectOpen = () => {
    setEditProjectOpen(true);
  };
  
  const handleAddIssueOpen = () => {
    setAddIssueOpen(true);
  };

  const handleAddMemberOpen = () => {
    setAddMemberOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
    setAddIssueOpen(false);
    setAddMemberOpen(false);
    setEditProjectOpen(false)
  };

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  // Get Project Info
  const [status, setStatus] = useState({ isLoading: true });
  const params = useParams();
  const { isLoading, project, err } = status;

  useEffect(() => {
    ProjectAPI.getById(`${params.projectId}`)
      .then(res => {
        // console.log(res)
        setStatus({ project: res.data })
      })
      .catch(err => setStatus({ err: err }))
      // eslint-disable-next-line
  }, [])

  return  isLoading ? <span>loading...</span> : err ? <h1>{err.message}</h1> : (
    <>
      <Grid container>
        {/* Project Title */}
        <Grid className={classes.columngrid} item xs={12} md={11}>
          <Typography className={classes.mb} variant="h3" component="h2">
              {project.title}
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
              handleClose={() => setEditProjectOpen(false)}
            />
          </div>
        </Grid>
        <Grid className={classes.columngrid} item xs={12}>
          <Grid container>
            {/* Project Owner Chip */}
            <Grid item xs={12} md={3}>
              <span className={classes.title} color="textSecondary">
                Project Lead <Chip
                  icon={<FaceIcon />}
                  label={project.owner.name}
                  variant="outlined"
                />
              </span>
            </Grid>
            {/* Project Members Chips */}
            <Grid item xs={12} md={9}>
              <span className="members">Project Members <Chip
                icon={<FaceIcon />}
                clickable
                label="Matt Bitt"
                onDelete={handleDelete}
                color="default"
                variant="outlined"
              />
                <Chip
                  icon={<FaceIcon />}
                  clickable
                  label="Simon Cowell"
                  onDelete={handleDelete}
                  color="default"
                  variant="outlined"
                />
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
                />
              </span>
            </Grid>
          </Grid>
          
          {/* Project Description */}
          <div className={classes.column}>
            <Card className={classes.columntest}>
              <CardContent>
                <Typography>
                 {project.description}
                </Typography>
              </CardContent>
            </Card>
          </div>
        </Grid>
      </Grid>

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
            handleClose={() => setAddIssueOpen(false)}
          />
        </Grid>

        {/* Open Issues column */}
        <Grid className={classes.columngrid} item xs={12} lg={4}>
          <div className={classes.column}>
            <Card className={classes.columntest}>
              <CardContent>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography className={classes.mb} variant="h5" component="h5">
                      Open
                    </Typography>
                  </Grid>
                </Grid>
              


              
                <Link onClick={handleClickOpen} i={1}>
                  <Issue />
                </Link>
                <ProjectIssueModal 
                  open={open}
                  handleClose={handleClose}
                />

                <Link onClick={handleClickOpen} i={2}>
                  <Issue />
                </Link>
                <ProjectIssueModal 
                  open={open}
                  handleClose={handleClose}
                />

                
                <Issue />
                <Issue />
                <Issue />
                <Issue />
                <Issue />
                <Issue />
                <Issue />
                <Issue />
                <Issue />

              </CardContent>
            </Card>
          </div>
        </Grid>
        <Grid className={classes.columngrid} item xs={12} lg={4}>
          <div className={classes.column}>
            <Card className={classes.columntest}>
            <CardContent>
              <Grid container>
                <Grid item xs={6}>
                  <Typography className={classes.mb} variant="h5" component="h5">
                    In Progress
                  </Typography>
                </Grid>
              </Grid>
              <Issue />
              <Issue />
              <Issue />
              <Issue />
              
            </CardContent>
          </Card>
          </div>
        </Grid>
        <Grid className={classes.columngrid} item xs={12} lg={4}>
          <div className={classes.column}>
            <Card className={classes.columntest}>
              <CardContent>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography className={classes.mb} variant="h5" component="h5">
                      Closed
                    </Typography>
                  </Grid>
                </Grid>
                <Issue />
                <Issue />
                <Issue />
                <Issue />
                <Issue />
                <Issue />
                <Issue />
                <Issue />
                <Issue />
                <Issue />
                <Issue />
                <Issue />
                <Issue />
                <Issue />
                <Issue />

              </CardContent>
            </Card>
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default Project