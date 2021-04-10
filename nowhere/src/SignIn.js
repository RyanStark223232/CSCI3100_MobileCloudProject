import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router";

import auth from "./Firebase";
// import { Comment, Functions } from "@material-ui/icons";
// import { IconButton } from '@material-ui/core';
import App, { setLogedIn } from './App';


const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});


class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.emailRef = React.createRef();
    this.pwRef = React.createRef();
    // this.state = {
    //   logedIn: false      
    // }
    
  }
  
  onStateChange =()=>{
    console.log("in onStateChange");
    if(this.state.logedIn ===true) console.log("it is true!!");
  }

  handleSignin = async (e) => {
    e.preventDefault()
    try {
      await auth.signInWithEmailAndPassword(this.emailRef.current.value, this.pwRef.current.value).then(value => {
        if (auth.currentUser != null) {
          // alert("Sign in succeeded with email =" + this.emailRef.current.value)
          setLogedIn();
          this.props.history.push("/")
        } else {
          alert("login failed")
        }
      }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      })
    } catch (e) {
      alert(e)
    }


  };


  render() {
    const classes = this.props.classes;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
        </Typography>
          <form onSubmit={this.handleSignin} className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              inputRef={this.emailRef}
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
              inputRef={this.pwRef}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
          </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
              </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
        </Box>
      </Container>
    );
  }
}



SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(SignIn);