import React, {useRef, useState} from 'react';
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
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Switch from '@material-ui/core/Switch';
import PicUpload from "./ImageUpload.js";
import defaultPic from './man-user.png'

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import Fab from "@material-ui/core/Fab";


import auth,{f_database} from "./Firebase.js";
import {nationData} from './NationList.js';
import {validate} from './Validate.js';
import { FlipCameraIosRounded } from '@material-ui/icons';

const useStyles =  (theme) => ({
    paper: {
      marginTop: theme.spacing(10),
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
  });



class EditProfile extends React.Component{
    constructor(props){
      super(props);
      // State of this class
      this.state = {
          userName: '',
          email: '',
          age: -1,
          firstName: '',
          lastName: '',
          sex: '',
          bio: '',
          touched: {},
          errors: {},
          img: defaultPic,
          submitError: false,
          smoker: false,
          car: false,
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleBlur = this.handleBlur.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleNationChange = this.handleNationChange.bind(this);
      this.handleImgChange = this.handleImgChange.bind(this);
      this.formValidate = this.formValidate.bind(this);
      this.handleToggleChange = this.handleToggleChange.bind(this);
      
          
  }

  formValidate = () => {
    let noError = !Object.values(this.state.errors).some(x => (x !== null && x !== '' && x!= undefined ));
    let allTouched = Object.keys(this.state.touched).length >= 7; //There are 7 required fills
    return allTouched && noError;
  } 

  async handleSubmit(e){
    e.preventDefault()

    if (!this.formValidate()){
      this.setState({submitError: true});
      return
    } 
    
   
    alert("Updating "+this.state.userName+"'s Profile")

    try{
        await f_database.ref("users/" + this.state.userName).set({
            username: this.state.userName,
            email: auth.currentUser.email,
            age: this.state.age,
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            sex: this.state.sex,
            bio: this.state.bio,
            nationality: this.state.nationality,
            smoker: this.state.smoker,
            car: this.state.car,
        })
        alert("Submitted to database users/"+ this.state.userName)
    } catch(e) {
      console.log(e)
      alert(e)
    }
  }

  handleClear = (e) =>{
    e.target.reset();
    this.setState({
      userName: '',
      email: '',
      age: -1,
      firstName: '',
      lastName: '',
      sex: '',
      bio: '',
      nationality: '',
    })
  }

  handleBlur = (event) => {
    let nam = event.target.name;
    let val = event.target.value;

    // check for a new error
    const error = validate[nam](val);

    // // validate the field if the value has been touched
    this.setState((prevState, props) => { 
        return {
            errors: {                   
            ...prevState.errors,   
            [nam]: prevState.touched[nam] && error
        }}
    });
    this.formValidate();
  }

  handleChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value;

    this.setState((prevState, props) => { 
        return {
          [nam]:val,
            touched: {                   
            ...prevState.touched,   
            [nam]: true     
          }
        }
    });
  }

  handleNationChange = (e,v)=>{
    let nation_val = (v != undefined) ? v.name : null;
    const error = validate.nationality(nation_val);
    this.setState((prevState, props) => { 
        return {
          nationality: (v != null) ? v.name : null,
          touched: {                   
            ...prevState.touched, nationality:true  
          },
          errors: {                   
            ...prevState.errors,   
            nationality: prevState.touched.nationality && error
          }
    }}
    );}

  handleToggleChange = (e) => {
    let nam = e.target.name;
    let val = e.target.checked;

    this.setState((prevState, props) => { 
        return {
          [nam]:val,
            touched: {                   
            ...prevState.touched,   
            [nam]: true     
          }
        }
    });
  }
  

  handleImgChange = (im) =>{
    this.setState({img: im})
  }
  

  render(){
    const {classes} = this.props;
        return (
            <Container component="main" maxWidth="md">
            <CssBaseline />
            <div className={classes.paper}>

                <Typography component="h1" variant="h5">
                Edit Profile
                </Typography>
                <form onSubmit={this.handleSubmit} onReset={this.handleClear} className={classes.form} id='editForm' noValidate>                
                <Grid container spacing={2} style={{marginTop:1}}>
                    <Grid item xs={12}>
                    <PicUpload img={this.state.img} onSave={this.handleImgChange}/>  
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="userName"
                        label="UserName"
                        name="userName"
                       

                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        helperText={this.state.errors.userName}
                        error={this.state.touched.userName && this.state.errors.userName}
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

                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        helperText={this.state.errors.firstName}
                        error={this.state.touched.firstName && this.state.errors.firstName}
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
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        helperText={this.state.errors.lastName}
                        error={this.state.touched.lastName && this.state.errors.lastName}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        name="age"
                        variant="outlined"
                        required
                        fullWidth
                        id="age"
                        label="Age"
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        helperText={this.state.errors.age}
                        min='0'
                        error={this.state.touched.age && this.state.errors.age}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        name="email"
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        helperText={this.state.errors.email}
                        error={this.state.touched.email && this.state.errors.email}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl className={classes.formControl} style={{minWidth: '30%', marginLeft:'2%'}} required>
                            <InputLabel id="demo-simple-select-label">Sex</InputLabel>
                                <Select
                                label="Sex"
                                id="sex"
                                name='sex'
                                autoWidth
                                onChange={this.handleChange}
                                onClose = {this.handleSelect}

                                >
                            <MenuItem value={'M'}>Male</MenuItem>
                            <MenuItem value={'F'}>Female</MenuItem>
                            <MenuItem value={'O'}>Other</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <Autocomplete
                        id="nationality"
                        name='nationality'
                        options={nationData}
                        getOptionLabel={(option) => option.name}
                        style={{ width: '70%' }}
                        onChange={this.handleNationChange}
                        renderInput={(params) => 
                          <TextField 
                          {...params} 
                          label="Nationality" 
                          variant="outlined" 
                          name='nationality' 
                          required 
                          error={this.state.touched.nationality && this.state.errors.nationality}
                          helperText={this.state.errors.nationality}
                        />}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            name="bio"
                            variant="outlined"
                            multiline
                            rows={4}
                            id="bio"
                            label="Description"
                            fullWidth
                            onChange={this.handleChange}
                            onBlur={this.handleBlur}
                            helperText={this.state.errors.bio}
                            error={this.state.touched.bio && this.state.errors.bio}
                        />

                        
                    </Grid>
                    <Grid item xs={12} sm={6} >
                    <Typography component="div" style={{paddingInline:'1%'}}> Smoker?
                        <Grid component="label" container alignItems="center" spacing={1}>
                          <Grid item>No</Grid>
                          <Grid item>
                            <Switch 
                            onChange={this.handleToggleChange} 
                            name="smoker" 
                            checked={this.state.smoker}
                            color='primary'
                            inputProps={{ 'aria-label': 'primary checkbox'}} />
                          </Grid>
                          <Grid item>Yes</Grid>
                        </Grid>
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} >
                    <Typography component="div"  style={{paddingInline:'1%'}}> Have Car License?
                        <Grid component="label" container alignItems="center" spacing={1}>
                          <Grid item>No</Grid>
                          <Grid item>
                            <Switch 
                            onChange={this.handleToggleChange} 
                            name="car" 
                            checked={this.state.car}
                            color='primary'
                            inputProps={{ 'aria-label': 'primary checkbox'}} />
                          </Grid>
                          <Grid item>Yes</Grid>
                        </Grid>
                      </Typography>
                    </Grid>
                    
                </Grid>
                <Grid style={{marginTop:'5%'}}>
                  <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      mx='auto'
                      style = {{width:'30%', marginInline:'10%'}}
                  >
                      Submit
                  </Button>

                  <Button
                      type="reset"
                      variant="contained"
                      color="default"
                      className={classes.submit}
                      mx='auto'
                      style = {{width:'30%', marginInline:'10%'}}
                  >
                      Clear
                  </Button>         
                </Grid>
                

                
                </form>
            </div>
            
            {this.state.submitError && 
              <p style = {{color:'red', textAlign:'center'}}>
                Error detected in profile submission. Please update your information correctly.</p>
            }

            </Container>
            //https://codesandbox.io/s/ui788?file=/src/components/StepForm.js
        );
    }
}

export default withStyles(useStyles)(EditProfile);
  