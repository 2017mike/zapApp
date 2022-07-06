import './Projects.css'
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ProjectCard from '../../components/ProjectCard'
import MoreCard from '../../components/MoreCard'
import UserAPI from '../../utils/UserAPI'
import NewProjectModal from '../../components/NewProjectModal'
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
  title: {
    fontSize: 14,
  },
  cct: {
    marginBottom: 40,
  },
  projectcard: {
    padding: 4,
  },
});

const Projects = () => {
  const classes = useStyles();

  const [openNewProjectModal, setNewProjectModalOpen] = useState(false);

  const [projectState, setProjectState] = useState([])

  const handleNewProjectModalOpen = () => {
    setNewProjectModalOpen(true);
  };

  useEffect(() => {
    UserAPI.me()
      .then(data => {
        data=data.data.projects.reverse()
        setProjectState(data)
        console.log('this is projectState in Projects.js', projectState)
      
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <>
    <h1>View My Projects</h1>
      <Grid container>
        <Grid className={classes.projectcard} item xs={12} sm={4} lg={2}>
          <Link onClick={handleNewProjectModalOpen}>
            <MoreCard
              clickable
            />
          </Link>
          <NewProjectModal
            projectState={projectState}
            setProjectState={setProjectState}
            open={openNewProjectModal}
            handleClose={() => setNewProjectModalOpen(false)}
          />
        </Grid>
        {projectState.map((projectData) => (
          <Grid className={classes.projectcard} item xs={12} sm={4} lg={2}>
            {/* <Link to={`/projects/${id}`}> */}
            <Link to={`/project/${projectData._id}`}>
            <ProjectCard 
              key={projectData._id}
              title={projectData.title}
              description={projectData.description}
              owner={projectData.owner.username}
            />
          </Link>
          </Grid>
        ))}
        
        
      </Grid>
    </>
  )
}

export default Projects