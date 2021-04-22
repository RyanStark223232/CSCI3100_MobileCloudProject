import React, {useRef, useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Switch from '@material-ui/core/Switch';

import defaultPic from '../Image/man-user.png'
import auth,{f_database,storage} from "../Firebase.js";
import PicUpload from "./ImageUpload.js";
import {nationData} from './NationList.js';
import {validate} from './Validate.js';

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
          //Fields
          userName: '',
          email: '',
          age: '',
          firstName: '',
          lastName: '',
          sex: '',
          bio: '',
          img: defaultPic,
          nationality:'',
          phoneNum: '',
          smoker: false,
          car: false,
          diet: false,
          allergy: false,

          //Form Controls
          touched: {},
          errors: {},
          submitError: false,
          submitSuccessful: false,
          dbImported: false,
          imgUploaded: false,
      };
      //Binding Methods
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleBlur = this.handleBlur.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleNationChange = this.handleNationChange.bind(this);
      this.handleImgChange = this.handleImgChange.bind(this);
      this.formValidate = this.formValidate.bind(this);
      this.handleToggleChange = this.handleToggleChange.bind(this)
      this.encodeUserEmail = this.encodeUserEmail.bind(this);
  }

  encodeUserEmail(userEmail) {
    return userEmail.replace(".", ",");
  }

  componentDidMount() {
    setTimeout(()=>{
    let encoded_email = this.encodeUserEmail(auth.currentUser.email)
    let databaseRef = f_database.ref('users/' + encoded_email);
   
    databaseRef.on('value', (snapshot) => {
      if (snapshot.exists()){
        const data = snapshot.val();

        this.setState({ 
          userName: data.username,
          age: data.age,
          firstName: data.first_name,
          lastName: data.last_name,
          sex: data.sex,
          bio: data.bio,
          phoneNum: data.phone_num,
          nationality: data.nationality,
          smoker: data.smoker,
          car: data.car,
          img: data.img,
          diet: data.diet,
          allergy: data.allergy,
          dbImported: true,
        });

        if (this.state.img === undefined){
          this.setState({img:defaultPic});
        }

      } else {
        this.setState({ 
          userName: '',
          age: '',
          firstName: '',
          lastName: '',
          sex: '',
          bio: '',
          img: defaultPic,
          phoneNum: '',
          smoker: false,
          car: false,
          nationality: '',
          img: defaultPic,
          diet: false,
          allergy: false,
          dbImported: false,
        });
      } 
    });
    },1000); 
  }

  formValidate = () => {
    //Check if all necessary fields are touched and that there are no errors in the form
    let noError = !Object.values(this.state.errors).some(x => (x !== null && x !== '' && x!= undefined ));
    let allTouched = Object.keys(this.state.touched).length >= 8; //There are 8 required fills
    return (allTouched && noError) || (this.state.dbImported && noError);
  } 

  async handleSubmit(e){
    e.preventDefault()

    //Form Validation
    if (!this.formValidate()){
      this.setState({submitError: true});
      return
    } 
    
    this.setState({submitSuccessful: true});
    //Update data according to the states
    try{
        let encoded_email = this.encodeUserEmail(auth.currentUser.email)
        let userDB = f_database.ref("users/" + encoded_email)
        userDB.set({
            username: this.state.userName,
            email: auth.currentUser.email,
            age: this.state.age,
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            sex: this.state.sex,
            phone_num: this.state.phoneNum,
            bio: this.state.bio,
            nationality: this.state.nationality,
            smoker: this.state.smoker,
            car: this.state.car,
            diet: this.state.diet,
            allergy: this.state.allergy,
        });
        if (this.state.imgUploaded || this.state.img == defaultPic){
          let img_upload = storage.ref('profile_pictures/'+encoded_email).child(encoded_email+'.jpg')
        img_upload.putString(this.state.img,'data_url',{contentType:'image/jpg'})
        .then((data,e)=> { if (e){console.log('Sad'); return};
        data.ref.getDownloadURL()
        .then(url =>{ userDB.update({img:url})
        .then((snapshot)=>{console.log('Image Uploaded!');
                            this.setState({imgUploaded:false});})
        });
      });
        } else {
            userDB.update({img:this.state.img});
        };
        console.log("Submitted to database users/"+ encoded_email)
    } catch(e) {
      console.log(e)
      //alert(e)
    }
  }

   

  handleClear = (e) =>{
    //Reset Fields
    e.target.reset();
    this.setState({
      userName: '',
      age: '',
      firstName: '',
      lastName: '',
      sex: '',
      bio: '',
      nationality: '',
      phoneNum: '',
      submitError: false,
      submitSuccessful: false,
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
  }

  handleChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value;

    //Update touched and state for the associated field
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
    //Workaround for the name retrieval problem of nationality field due to props with Material UI Autocomplete
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
    //For toggle switch fields
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
    //For use in PicUpload components to update img in the EditProfile Class
    this.setState({img: im,
                    imgUploaded: true,
    });
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
                <form onSubmit={this.handleSubmit} onReset={this.handleClear} id='editForm' noValidate>                
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
                        value={this.state.userName}

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
                        value = {this.state.firstName}

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
                        value = {this.state.lastName}
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
                        value = {this.state.age}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        helperText={this.state.errors.age}
                        min='0'
                        error={this.state.touched.age && this.state.errors.age}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        name="phoneNum"
                        variant="outlined"
                        required
                        fullWidth
                        id="phoneNum"
                        label="Phone Number"
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        helperText={this.state.errors.phoneNum}
                        value = {this.state.phoneNum}
                        error={this.state.touched.phoneNum && this.state.errors.phoneNum}
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
                                value = {this.state.sex}

                                >
                            <MenuItem value={'Male'}>Male</MenuItem>
                            <MenuItem value={'Female'}>Female</MenuItem>
                            <MenuItem value={'Other'}>Other</MenuItem>
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
                        value={{name: this.state.nationality}}

                        renderInput={(params) => 
                          <TextField 
                          {...params} 
                          label="Nationality" 
                          variant="outlined" 

                          
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
                            required
                            onChange={this.handleChange}
                            onBlur={this.handleBlur}
                            helperText={this.state.errors.bio}
                            error={this.state.touched.bio && this.state.errors.bio}
                            value= {this.state.bio}
                        />

                        
                    </Grid>
                    <Grid item xs={12} sm={6} >
                    <Typography component="div" style={{paddingInline:'3%'}}> Smoker?
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
                    <Typography component="div"  style={{paddingInline:'3%'}}> Have Driver's License?
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
                    <Grid item xs={12} sm={6} >
                    <Typography component="div" style={{paddingInline:'3%'}}> Allergies?
                        <Grid component="label" container alignItems="center" spacing={1}>
                          <Grid item>No</Grid>
                          <Grid item>
                            <Switch 
                            onChange={this.handleToggleChange} 
                            name="allergy" 
                            checked={this.state.allergy}
                            color='primary'
                            inputProps={{ 'aria-label': 'primary checkbox'}} />
                          </Grid>
                          <Grid item>Yes</Grid>
                        </Grid>
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} >
                    <Typography component="div"  style={{paddingInline:'3%'}}> Have a special dietary requirements?
                        <Grid component="label" container alignItems="center" spacing={1}>
                          <Grid item>No</Grid>
                          <Grid item>
                            <Switch 
                            onChange={this.handleToggleChange} 
                            name="diet" 
                            checked={this.state.diet}
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
            
            {(this.state.submitError && 
              <p style = {{color:'red', textAlign:'center'}}>
                Error detected in profile submission. Please update your information correctly.</p>)
                ||
              (this.state.submitSuccessful && 
                <p style = {{color:'green', textAlign:'center'}}>
                Successfully updated {this.state.userName}'s Profile!</p>)
            }
            </Container>            
        );
    }
}

export default withStyles(useStyles)(EditProfile);
  