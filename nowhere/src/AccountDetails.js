import React, {useRef} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import auth,{f_database} from "./Firebase.js";




const useStyles = makeStyles((theme) => ({
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AccountDetails() {
  const classes = useStyles();
  const fnameRef = useRef()
  const lnameRef = useRef()
  const unameRef = useRef()
  const ageRef = useRef()


  async function handleSubmit(e){
    // console.log("inside handleSignUp")
    e.preventDefault()
    // console.log(emailRef.current.value)

    try{
        await f_database.ref("users/" + auth.currentUser.uid).set({
            username: unameRef.current.value,
            email: auth.currentUser.email,
            age: ageRef.current.value,
            first_name: fnameRef.current.value,
            last_name: lnameRef.current.value,
        })
    } catch(e) {
      console.log(e)
    }

  }
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Fill in account details
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="usernam"
                  // autoComplete=
                  inputRef = {unameRef}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                inputRef = {fnameRef}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                inputRef = {lnameRef}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                  // autoComplete="fname"
                  name="age"
                  variant="outlined"
                  required
                  fullWidth
                  id="age"
                  label="Age"
                  autoFocus
                  inputRef = {ageRef}
              />
            </Grid>
            {/*<Grid item xs={12} sm={6}>*/}
            {/*  <TextField*/}
            {/*      variant="outlined"*/}
            {/*      required*/}
            {/*      fullWidth*/}
            {/*      id="sex"*/}
            {/*      label="Sex"*/}
            {/*      name="lastName"*/}
            {/*      // autoComplete="lname"*/}
            {/*  />*/}
            {/*</Grid>*/}
            
            
          {/*  <Grid item xs={12}>*/}
          {/*    <FormControlLabel*/}
          {/*      control={<Checkbox value="allowExtraEmails" color="primary" />}*/}
          {/*      label="I want to receive inspiration, marketing promotions and updates via email."*/}
          {/*    />*/}
          {/*  </Grid>*/}
          </Grid>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              {/*<Link href="/personal" variant="body2">*/}
              {/*<Link href="/personal" >*/}
              {/*  Already have an account? Sign in*/}
              {/*</Link>*/}
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        {/*<Copyright />*/}
      </Box>
    </Container>
  );
}