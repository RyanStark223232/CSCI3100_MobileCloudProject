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
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Autocomplete from '@material-ui/lab/Autocomplete';



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

class ImageUpload extends React.Component{
    
    constructor(){
        super();
    }

    state = {
        mainState: "initial", // initial, search, gallery, uploaded
        imageUploaded: 0,
        selectedFile: null
      };
    
      handleUploadClick = event => {
        console.log();
        var file = event.target.files[0];
        const reader = new FileReader();
        var url = reader.readAsDataURL(file);
    
        reader.onloadend = function(e) {
          this.setState({
            selectedFile: [reader.result]
          });
        }.bind(this);
        console.log(url); 
    
        this.setState({
          mainState: "uploaded",
          selectedFile: event.target.files[0],
          imageUploaded: 1
        });
      };
    
     
      renderInitialState() {
        return (
          <React.Fragment>
            <CardContent> 
              {/* alignmentItems='Center' */}
              <Grid container  justify='center'>
              <input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={this.handleUploadClick}
                  style={{display:'none'}}
                />
                <label htmlFor="contained-button-file">
                    <Fab component="span">
                    <AddPhotoAlternateIcon />
                    </Fab>
                </label>
                
              </Grid>
            </CardContent>
          </React.Fragment>
        );
      }
    
      renderUploadedState() {
        return (
          <React.Fragment>
            <CardActionArea onClick={this.imageResetHandler}>
            <CardMedia 
                image={this.state.selectedFile}
                title="Contemplative Reptile"
                style={{height:300,maxHeight:'auto',width:'100%',maxWidth:'auto', objectFit:'cover'}}>
            </CardMedia>
                
            </CardActionArea>
          </React.Fragment>
        );
      }
    
      imageResetHandler = event => {
        console.log("Click!");
        this.setState({
          mainState: "initial",
          selectedFile: null,
          imageUploaded: 0
        });
      };
    
      render() {    
        return (
          <React.Fragment>
              <div style={{justify:'center'}}>
                <Card className={this.props.cardName} style={{ height:300, marginLeft:'auto',marginRight:'auto', display:'block'}}>
                    {(this.state.mainState == "initial" && this.renderInitialState()) ||
                    (this.state.mainState == "uploaded" &&
                        this.renderUploadedState())}
                </Card>
              </div>
              
          </React.Fragment>
        );
      }
}



export default function EditProfile() {
  const classes = useStyles();

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = evt => {
    const { name, value: newValue, type } = evt.target;


    // keep number fields as numbers
    const value = type === 'number' ? +newValue : newValue;
    
    
      //save field values
    setValues({
      ...values,
      [name]: value,
    });

    // was the field modified
    setTouched({
      ...touched,
      [name]: true,
    });
    

    
  };

  const handleBlur = evt => {
    let { name, value } = evt.target;


    // remove whatever error was there previously
    const { [name]: removedError, ...rest } = errors;

    // check for a new error
    const error = validate[name](value);

    // // validate the field if the value has been touched
    setErrors({
      ...rest,
      ...(error && { [name]: touched[name] && error }),
    });
  };

  

  async function handleSubmit(e){
    e.preventDefault()

    //not finished, needs form validation
   
    alert("Updating "+values.userName+"'s Profile")

    try{
        await f_database.ref("users/" + values.userName).set({
            username: values.userName,
            email: auth.currentUser.email,
            age: values.age,
            first_name: values.firstName,
            last_name: values.lastName,
            sex: values.sex,
            bio: values.bio,
            
        })
        alert("Submitted to database users/"+ values.userName)
    } catch(e) {
      console.log(e)
      alert(e)
    }
  }

  
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit Profile
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
        <ImageUpload></ImageUpload>
          <Grid container spacing={2} style={{marginTop:1}}>
            <Grid item xs={12}>
              <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="userName"
                  label="UserName"
                  name="userName"

                  value={values.userName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // helperText={errors.userName}
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

                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                // helperText={errors.firstName}
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
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                // helperText={errors.lastName}
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
                  value={values.age}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // helperText={errors.age}
                  min='0'
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
                  autoFocus
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl className={classes.formControl} style={{minWidth: '30%', marginLeft:'2%'}}>
                    <InputLabel id="demo-simple-select-label">Sex</InputLabel>
                        <Select
                        label="Sex"
                        id="sex"
                        name='sex'
                        autoWidth
                        value={values.sex}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // helperText={errors.sex}
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
                value={values.nationality}
                onChange={(e,v)=>{ setValues({...values,['nationality']: v.name,});
                                    setTouched({ ...touched,['nationality']: true,});
                }}
                renderInput={(params) => <TextField {...params} label="Nationality" variant="outlined" name='nationality'
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
                    autoFocus
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // helperText={errors.email}
                    value = {values.bio}
                    // helperText={errors.bio}
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
            Submit
          </Button>

            
          {/* For Debugging
          <code>Values: {JSON.stringify(values)}</code>
          <br />
      <code>Errors: {JSON.stringify(errors)}</code>
      <br />
      <code>Touched: {JSON.stringify(touched)}</code>
              <br />*/}
          
        </form>
      </div>
      
    </Container>
    
  );
}