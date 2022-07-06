import './Login.css'
import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
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
    padding: '0!important',
    margin: '0!important',
    width: '100%'
  },
  gridContainer: {
    backgroundImage: 'url(https://cdn.pixabay.com/photo/2016/06/13/22/12/flash-1455285_1280.jpg)'
  },
  
  image: {
    backgroundImage: 'url(https://cdn.pixabay.com/photo/2016/06/13/22/12/flash-1455285_1280.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh'
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
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: 'rgba(20, 167, 252, 0.8)'
  },
  center: {
    textAlign: 'center',
  }
}));

const Login = () =>{
  const classes = useStyles();

  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handlePassword(e) {
    // console.log(e.target.value)
    setPassword(e.target.value)
  }

  function handleUsername(e) {
    // console.log(e.target.value)
    setUsername(e.target.value)
  }

  function handleLogin(e) {
    e.preventDefault()
    axios.post('api/users/login', {
      username: username,
      password: password
    })
      .then(({ data: token }) => {
        if (token) {
          localStorage.setItem('token', token)
          window.location = '/'
        } else {
          alert('Invalid username or password')
        }
      })
      .catch(err => console.error(err))
  }

  return (
    <Grid container component="main" className="login" align="center" justify="center" alignItems="center">

      <Grid item xs={10} sm={8} md={4} component={Paper} elevation={6} square >
        <div className={classes.paper}>
          <img src="https://i.imgur.com/Q0IAOwI.png" alt="" className={classes.avatar} style={{ maxHeight: '5vh' }} />
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <form className={classes.form} noValidate onSubmit={(e) => handleLogin(e)}>
            
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoComplete="username"
              onChange={(e) => handleUsername(e)}
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
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Log In
            </Button>

              <Grid item className={classes.center}>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
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

export default Login

