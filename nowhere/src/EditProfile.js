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
import {nationData} from './NationList.js'


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
        console.log(url); // Would see a path?
    
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
              <Grid container alignmentItems='Center' justify='center'>
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
                style={{height:300,maxHeight:300,width:'auto',maxWidth:300}}>
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
              <div style={{justify:'center', alignmentItems:'center',}}>
                <Card className={this.props.cardName} style={{ height:300, width:300}}>
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
  const fnameRef = useRef()
  const lnameRef = useRef()
  const unameRef = useRef()
  const ageRef = useRef()
  const emailRef = useRef()
  const sexRef = useRef()
  const bioRef = useRef()

  const [sex, setSex] = React.useState('');


  async function handleSubmit(e){
    e.preventDefault()
    try{
        await f_database.ref("users/" + unameRef.current.value).set({
            username: unameRef.current.value,
            email: auth.currentUser.email,
            age: ageRef.current.value,
            first_name: fnameRef.current.value,
            last_name: lnameRef.current.value,
            sex: sexRef.current.value,
            
        })
        alert("Submitted to database users/"+ unameRef.current.value)
    } catch(e) {
      console.log(e)
      alert(e)
    }

  }

  const handleChange = (event) => {
    setSex(event.target.value);
  };
  
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
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
        <ImageUpload></ImageUpload>
          <Grid container spacing={2} style={{marginTop:1}}>
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
            <Grid item xs={12} sm={6}>
              <TextField
                  // autoComplete="fname"
                  name="email"
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  autoFocus
                  inputRef = {emailRef}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl className={classes.formControl} style={{minWidth: '30%', marginLeft:'2%'}}>
                    <InputLabel id="demo-simple-select-label">Sex</InputLabel>
                        <Select
                        label="Sex"
                        id="sex"
                        value={sex}
                        onChange={handleChange}
                        inputRef = {sexRef}
                        autoWidth
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
                options={nationData}
                getOptionLabel={(option) => option.name}
                style={{ width: '70%' }}
                renderInput={(params) => <TextField {...params} label="Nationality" variant="outlined" />}
                
                autoFocus
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
                    inputRef = {bioRef}
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
          
        </form>
      </div>
      
    </Container>
    
  );
}