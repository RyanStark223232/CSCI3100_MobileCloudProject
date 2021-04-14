import React from 'react';
// import { Redirect } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import auth from "./Firebase.js";
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

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.emailRef = React.createRef();
    this.pwRef = React.createRef();
    this.pwVRef = React.createRef();

  }


  handleSignUp = (e) => {
    e.preventDefault()
    if(this.pwRef.current.value != this.pwVRef.current.value){
      alert("the two passwords are different, please try again")
      return
    }
    try {
      auth.createUserWithEmailAndPassword(this.emailRef.current.value, this.pwRef.current.value).then((authData) => {
        alert("Signed up successfully with email " + this.emailRef.current.value +"\n Please fill in more information about you.")
        if (auth.currentUser != null) {
          this.props.history.push("/editprofile")
          setLogedIn();
        } else {
          alert("login failed")
        }
      }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      })

    } catch (e) {
      console.log(e)
    }

  }

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
            Sign up
          </Typography>
          <form onSubmit={this.handleSignUp} className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  inputRef={this.emailRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  inputRef={this.pwRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password_verifier"
                  label="Enter Again Your Password"
                  type="password"
                  id="password_verifier"
                  autoComplete="current-password"
                  inputRef={this.pwVRef}
                />
              </Grid>

            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/signin" >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
        </Box>
      </Container>
    );
  }
}
SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(SignUp);

