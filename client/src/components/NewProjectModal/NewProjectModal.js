import axios from 'axios'
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import ProjectAPI from '../../utils/ProjectAPI'


const useStyles = makeStyles({
  mb: {
    marginBottom: 20,
  },
  right: {
    textAlign: 'right',
  },
  issueleft: {
    paddingRight: 20,
  },
  formControl: {
    marginBottom: 10,
    width: '100%',
    fontSize: 12,
    textAlign: 'left',
  },
});



const SetModal = props => {
  const classes = useStyles();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState('')

  function handleTitle(e) {
    setTitle(e.target.value)
  }

  function handleDescription(e) {
    setDescription(e.target.value)
  }

  function handleProjectSubmit(e) {
    e.preventDefault();
    axios.post('/api/projects', {
      title: title,
      description: description
    },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
    .then(res => {
   
      console.log(res)
      // props.firstProject? 
      console.log(props.projectState)
      props.setProjectState([res.data, ...props.projectState])
    
      props.handleClose()
    
    }) 
  }

  return (
    <Dialog maxWidth='sm' fullWidth open={props.open} onClose={props.handleClose} aria-labelledby="newproject-title">
      <DialogTitle id="newproject-title">New Project</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Grid container>
            <Grid className={classes.issueleft} item xs={12}>
              <Typography className={classes.mb}>
                <form onSubmit={(e) => handleProjectSubmit(e)}>
                  <p>
                    <TextField
                      id="title"
                      label="Title"
                      variant="outlined"
                      name='title'
                      fullWidth
                      onChange={(e) => handleTitle(e)}
                    />
                  </p>
                  <p>
                    <TextField
                      id="description"
                      label="Description"
                      variant="outlined"
                      name='description'
                      multiline
                      rows={6}
                      fullWidth
                      onChange={(e) => handleDescription(e)}
                    />
                  </p>
                </form>
              </Typography>
            </Grid>
          </Grid>
        </DialogContentText>

      </DialogContent>
      <DialogActions>
        <Button 
          variant="contained"
          color="primary"
          className={classes.submit} 
          onClick={(e) => handleProjectSubmit(e)} 
          type="submit">
          Create Project
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SetModal