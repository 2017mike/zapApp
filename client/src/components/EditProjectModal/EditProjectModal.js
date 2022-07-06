import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FaceIcon from '@material-ui/icons/Face';
import Spacer from '../Spacer'
import ProjectAPI from '../../utils/ProjectAPI'
import {
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";


const useStyles = makeStyles({
  root: {
    minWidth: 175,
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    height: 200,
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
  issuerightchip: {
    marginBottom: 20,
    borderLeft: '1px solid #ccc',
  },
  projectcard: {
    marginRight: 20,
    marginBottom: 20,
  },
  codebox: {
    border: '1px solid #ddd',
    borderLeft: '3px solid blue',
    padding: 20,
    fontFamily: 'monospace',
    backgroundColor: '#eee'
  },
  priority: {
    fontSize: 12,
    textAlign: 'center',
    marginRight: 10,
    color: 'red',
    fontWeight: '800'
  },
  ask: {
    backgroundColor: 'red',
    width: '90%',
    marginLeft: 12,
    marginBottom: 12,
  },
  addbtn: {
    textAlign: 'center',
    margin: 'auto'
  },
  editbtn: {
    textAlign: 'right',
  },
  right: {
    textAlign: 'right',
  }
});





const EditProjectModal = props => {
  const classes = useStyles();

  
  // const [status, setStatus] = useState({ isLoading: true });
  const params = useParams();
  
  const [projectTitle, setProjectTitle] = useState(props.title);
  const [projectDescription, setProjectDescription] = useState(props.description)

  // useEffect(() => {
  //   ProjectAPI.getById(`${params.projectId}`)
  //     .then(res => {
  //       setStatus({ project: res.data })
  //     })
  //     .catch(err => setStatus({ err: err }))
  // }, [])

  function handleProjectTitle(e) {
    setProjectTitle(e.target.value)
  }

  function handleProjectDescription(e) {
    setProjectDescription(e.target.value)
  }


  function handleEditProject(e) {
    ProjectAPI.update({
      title: projectTitle,
      description: projectDescription
    },
      params.projectId
    )
    .then(res=> {
      console.log(res)
      if(res.status===200){
         props.setProjectStatus({
           ...props.projectStatus,
           projectTitle,
           projectDescription,
         });
         props.handleClose()
      } else {
        alert("there was an error updating your project's information")
      }
    })

  }

  function handleDeleteProject(e) {
    e.preventDefault()
    let doomedProject = params.projectId
    ProjectAPI.delete(params.projectId)
    window.location = '/'
    }
  const [open, setOpen] = React.useState (false);

  const handleClickOpen = () =>{
    setOpen (true)
  }

  const handleClose = () =>{
    setOpen (false)
  }

  return (
    <Dialog maxWidth='sm' fullWidth open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Project</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Grid container>
            <Grid className={classes.issueleft} item xs={12} lg={9}>
              <TextField
                id="title"
                label="Title"
                variant="outlined"
                name='title'
                fullWidth
                defaultValue={props.title}
                onChange={handleProjectTitle}
              />
              <TextField
                margin="dense"
                id="description"
                label="Description"
                type="text"
                variant="outlined"
                defaultValue={props.description}
                onChange={handleProjectDescription}
                multiline
                rows={6}
                fullWidth
              />
              
              <Spacer y={2} />
            </Grid>
            <Grid className={classes.issueright} item xs={12} lg={3}>
              <Typography className={classes.title} color="textSecondary">
                Project Lead
              </Typography>
              <Chip
                icon={<FaceIcon />}
                label={props.owner}
                variant="outlined"
              />
              <Spacer y={2} />


              <Typography className={classes.title} color="textSecondary">
                Project Members
              </Typography>
              {props.members.map((members) => (
                <Chip
                  key={members.id}
                  icon={<FaceIcon />}
                  label={members.name}
                  color="default"
                  variant="outlined"
                />
              ))}
              <Spacer y={2} />

            </Grid>
          </Grid>

        </DialogContentText>

      </DialogContent>
      <DialogActions>
        <Grid container>
          <Grid item xs={4} md={2}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.ask}
              onClick={handleClickOpen}
            >
              Delete
            </Button>
            <Dialog
              open={open}
              onClose={props.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Do You Wish To Delete?"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Warning! Once you delete, there is no coming back.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Disagree
                </Button>
                <Button onClick={handleDeleteProject} color="primary" autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
          <Grid item xs={12} md={5}>&nbsp;</Grid>
          <Grid item xs={12} md={2} className={classes.right}>
            <Button fullWidth variant="contained" color="default" onClick={props.handleClose}>
              Cancel
            </Button>
          </Grid>
          <Grid item xs={12} md={3} className={classes.right}>
            <Button onClick={handleEditProject} fullWidth color="primary" variant="contained">
              Save
            </Button>
          </Grid>
        </Grid>
        
      </DialogActions>
    </Dialog>
  )
}

export default EditProjectModal