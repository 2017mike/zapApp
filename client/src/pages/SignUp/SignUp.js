import './SignUp.css'
import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.github.com/2017mike/project3">
        Zap
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundImage: 'url(https://cdn.pixabay.com/photo/2016/06/13/22/12/flash-1455285_1280.jpg)',
    backgroundSize: '100%',
    width: '100%'
  },
  paper: {
    margin: theme.spacing(2, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    borderColor: 'rgba(20, 167, 252, 0.8)'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: 'rgba(20, 167, 252, 0.8)',
  },
  center: {
    textAlign: 'center',
  }
}));



export default function SignUp() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

function handleName(e) {
  // console.log(e.target.value)
  setName(e.target.value)
}

  function handleUsername(e) {
    // console.log(e.target.value)
    setUsername(e.target.value)
  }

  function handleEmail(e) {
    // console.log(e.target.value)
    setEmail(e.target.value)
  }

  function handlePassword(e) {
    // console.log(e.target.value)
    setPassword(e.target.value)
  }

  function handleSubmit(e){
    e.preventDefault();
    fetch('/api/users/register',{
      method:'POST', 
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        username:username,
        name:name,
        email:email,
        password:password
      }
      )
    })
    window.location = '/login'
  }

  
  return (
    <Grid container component="main" className="login" align="center" justify="center" alignItems="center">
      
      <Grid item xs={10} sm={8} md={4} component={Paper} elevation={6} square >
      <div className={classes.paper}>
        <img src="https://i.imgur.com/Q0IAOwI.png" alt="" className={classes.avatar} style={{ maxHeight: '5vh' }} />
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} noValidate onSubmit={(e) => handleSubmit(e)}>
            
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                onChange = {(e) => handleName(e)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="userName"
                label="Username"
                name="userName"
                autoComplete="username"
                onChange={(e) => handleUsername(e)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => handleEmail(e)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => handlePassword(e)}
              />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Register
            </Button>

            <Grid item className={classes.center}>
              <Link href="/login" variant="body2">
                  Already have an account? Sign in‎‏‎ ‎‏‎
              </Link>
            </Grid>

            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
 
  );
}