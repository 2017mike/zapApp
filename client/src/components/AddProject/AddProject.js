import React, { useState, PureComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import PropTypes from "prop-types";
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import FaceIcon from '@material-ui/icons/Face';
import AddIcon from '@material-ui/icons/Add';
import Spacer from '../Spacer'
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';


const useStyles = makeStyles({
  issueleft: {
    paddingRight: 20,
  },
  mb: {
    marginBottom: 20,
  },
  right: {
    textAlign: 'right',
  },
  highpriority: {
    fontSize: 12,
    textAlign: 'center',
    marginRight: 10,
    color: 'red',
    fontWeight: '800'
  },
  mediumpriority: {
    fontSize: 12,
    textAlign: 'center',
    marginRight: 10,
    color: '#f79d0c',
    fontWeight: '800'
  },
  lowpriority: {
    fontSize: 12,
    textAlign: 'center',
    marginRight: 10,
    color: '#14a7fc',
    fontWeight: '800'
  },
  formControl: {
    marginBottom: 10,
    // minWidth: 220,
    width: '100%',
    fontSize: 12,
    textAlign: 'left',
  }
});



const SetModal = props => {
  const classes = useStyles();

  // projectState
  // const [projectState, setProjectState] = useState({
  //   title: '',
  //   description: '',
  //   owner: '',
  //   priority: '',
  //   issue: []
  // })

  return (
    <Dialog maxWidth='sm' fullWidth open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Project</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Grid container>
            <Grid className={classes.issueleft} item xs={12}>
                <form>
                  <p>
                    <TextField
                      id="title"
                      label="Project Title"
                      variant="outlined"
                      name='title'
                      fullWidth
                      value={props.title}
                      onChange={props.handleInputChange}
                    />
                  </p>
                  <p>
                    <TextField 
                      id="outlined-basic" 
                      label="Project Description" 
                      variant="outlined" 
                      name='body'
                      multiline
                      rows={6}
                      fullWidth
                      value={props.body}
                      onChange={props.handleInputChange}
                    />
                  </p>
                </form>
            </Grid>
          </Grid>
        </DialogContentText>

      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleAddProject} color="primary" variant="contained">
          Add Project
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SetModal