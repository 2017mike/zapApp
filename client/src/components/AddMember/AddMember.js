import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ProjectAPI from '../../utils/ProjectAPI.js'
import UserAPI from '../../utils/UserAPI.js'

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
  right: {
    textAlign: 'right',
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
    marginRight: 10,
    color: 'red',
    fontWeight: '800'
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
  ask: {
    backgroundColor: 'red',
    width: '90%'
  },
  addbtn: {
    textAlign: 'center',
    margin: 'auto'
  },
  editbtn: {
    textAlign: 'right',
  },
  formControl: {
    marginBottom: 10,
    // minWidth: 220,
    width: '100%',
    fontSize: 12,
    textAlign: 'left',
  },
  selectEmpty: {
    marginTop: 20,
  },
});


const SetModal = props => {
  const classes = useStyles();

  //autocomplete default value grabber
  const [userState, setUserState] = useState({
    users: [],
    newUser: [],
    username: ''
  })

  const handleInputChange = ({ target }) => {
    setUserState({ ...userState, [target.name]: target.value })
  }

  const handleAddMember = () => {
    // get the user as obj
    UserAPI.getOne(userState.username)
      .then( ({ data: user }) => {
        ProjectAPI.addMember(props.projectId, user)
          .then(res => {
            props.setMembers([...res.data.members])
            props.handleClose()
          })
          .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
  }


  useEffect(() => {
    UserAPI.getAll()
      .then(res => {
        const users = [...userState.users]
        res.data.forEach(user => {
          users.push(user)
        })
        setUserState({ ...userState, users})
      })
      .catch(err => console.log(err))
      // eslint-disable-next-line
  }, [])

  return (
    <Dialog maxWidth='sm' fullWidth open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Member to Project</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Grid container>
            <Grid className={classes.issueleft} item xs={12}>
              
              <Autocomplete
                freeSolo
                id="add-member"
                disableClearable
                name="username"
                onChange={(event, value) => { setUserState({ ...userState, username: value }) }}
                onInputChange={(event, value) => { setUserState({ ...userState, username: value }) }}
                value={userState.username}
                options={userState.users.map((option) => option.username)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    key={params.id}
                    label="Add Member by Username"
                    id="member"
                    margin="normal"
                    variant="outlined"
                    InputProps={{ ...params.InputProps, type: 'search' }}
                  />
                )}
              />
            
            </Grid>
          </Grid>
        </DialogContentText>
        
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddMember} color="primary" variant="contained">Add Member</Button>
      </DialogActions>
    </Dialog>
  )
}

export default SetModal