/*  
This is the frontend module for displaying the user's information.
The module retrieves all information from firebase database and also provide access to EditProfile. 
Note that all user's profile are referenced by their sign-up email.
*/

import React, { useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import EditIcon from "@material-ui/icons/Edit";
import PersonIcon from "@material-ui/icons/Person";
import CakeIcon from "@material-ui/icons/Cake";
import WcIcon from "@material-ui/icons/Wc";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LanguageIcon from "@material-ui/icons/Language";
import DescriptionIcon from "@material-ui/icons/Description";
import InfoIcon from "@material-ui/icons/Info";

import defaultPic from "../Image/man-user.png";
import auth, { f_database, storage } from "../Firebase.js";
import { BrowserRouter as Router, Link } from "react-router-dom";

//CSS Style for use in elements of the form
const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    margin: `${theme.spacing(1)}px auto`,
    alignItems: "left",
  },
  formControl: {
    margin: theme.spacing(3),
  },
  wrapIcon: {
    verticalAlign: "middle",
    display: "inline-flex",
  },
  removeBottomPadding: {
    paddingBottom: "0px",
  },
  editButton: {
    color: "white",
    backgroundColor: "blue",
    top: "50%",
    height: 30,
    float: "right",
    position: "relative",
    transform: "translateY(-50%)",
  },
});

//The Class Component of the module
class AccountDetails extends React.Component {
  constructor(props) {
    super(props);
    // State of this class
    this.state = {
      //Fields
      userName: "",
      age: "",
      firstName: "",
      lastName: "",
      sex: "",
      bio: "",
      img: defaultPic,
      nationality: "",
      phoneNum: "",
      smoker: false,
      car: false,
      diet: false,
      allergy: false,

      //For validating data is loaded
      dbImported: false,
    };
  }

  //Function that makes email a valid reference key in firebase due to not accepting the character "." within the reference key
  encodeUserEmail(userEmail) {
    return userEmail.replace(".", ",");
  }

  //Load all the saved data from firebase upon loading the module
  componentDidMount() {
    //Leave 1 sec of leeway such that the module can connect with the firebase server
    setTimeout(() => {
      //Access the user's profile on firebase
      let encoded_email = this.encodeUserEmail(auth.currentUser.email);
      let databaseRef = f_database.ref("users/" + encoded_email);

      databaseRef.on("value", (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();

          //Set the state as the data retrieved from firebase
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
        } else {
          //Load default form field for the states if unavailable
          this.setState({
            userName: "",
            age: "",
            firstName: "",
            lastName: "",
            sex: "",
            bio: "",
            img: defaultPic,
            phoneNum: "",
            smoker: false,
            car: false,
            nationality: "",
            img: defaultPic,
            diet: false,
            allergy: false,
            dbImported: false,
          });
        }
      });
    }, 1000);
  }

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography
            component="h1"
            variant="h5"
            style={{ bold: true, marginLeft: "20%" }}
          >
            {this.state.firstName + " " + this.state.lastName}'s Profile
            {/* Access to edit profile */}
            <Link to="/editprofile" style={{ textDecoration: "none" }}>
              <Button
                variant="outlined"
                size="small"
                style={{ float: "right" }}
              >
                <EditIcon />
                Edit Profile
              </Button>
            </Link>
          </Typography>
          <Grid container spacing={2} style={{ marginTop: "1%" }}>
            <Grid item xs={12}>
              <img
                src={this.state.img}
                style={{
                  width: 400,
                  height: 400,
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginBottom: "5%",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <hr class="rounded" />
              <Grid container direction="row" alignItems="center" wrap="wrap">
                <AccountCircleIcon style={{ fontSize: "30" }} />
                <Typography
                  component="h2"
                  variant="h5"
                  align="left"
                  class={classes.wrapIcon}
                >
                  Username
                </Typography>
                <Grid container direction="row" alignItems="center">
                  <Typography align="left">{this.state.userName}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <hr class="rounded" />
              <Grid container direction="row" alignItems="center" wrap="wrap">
                <PersonIcon style={{ fontSize: "30" }} />
                <Typography
                  component="h2"
                  variant="h5"
                  align="left"
                  class={classes.wrapIcon}
                >
                  Name
                </Typography>
                <Grid container direction="row" alignItems="center">
                  <Typography align="left">
                    {this.state.firstName + " " + this.state.lastName}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <hr class="rounded" />
              <Grid container direction="row" alignItems="center" wrap="wrap">
                <CakeIcon style={{ fontSize: "30" }} />
                <Typography
                  component="h2"
                  variant="h5"
                  align="left"
                  class={classes.wrapIcon}
                >
                  Age
                </Typography>
                <Grid container direction="row" alignItems="center">
                  <Typography align="left">{this.state.age}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <hr class="rounded" />
              <Grid container direction="row" alignItems="center" wrap="wrap">
                <WcIcon style={{ fontSize: "30" }} />
                <Typography
                  component="h2"
                  variant="h5"
                  align="left"
                  class={classes.wrapIcon}
                >
                  Sex
                </Typography>
                <Grid container direction="row" alignItems="center">
                  <Typography align="left">{this.state.sex}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <hr class="rounded" />
              <Grid container direction="row" alignItems="center" wrap="wrap">
                <PhoneIphoneIcon style={{ fontSize: "30" }} />
                <Typography
                  component="h2"
                  variant="h5"
                  align="left"
                  class={classes.wrapIcon}
                >
                  Phone Number
                </Typography>
                <Grid container direction="row" alignItems="center">
                  <Typography align="left">{this.state.phoneNum}</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <hr class="rounded" />
              <Grid container direction="row" alignItems="center" wrap="wrap">
                <LanguageIcon style={{ fontSize: "30" }} />
                <Typography
                  component="h2"
                  variant="h5"
                  align="left"
                  class={classes.wrapIcon}
                >
                  Nationality
                </Typography>
                <Grid container direction="row" alignItems="center">
                  <Typography align="left">{this.state.nationality}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <hr class="rounded" />
              <Grid container direction="row" alignItems="center" wrap="wrap">
                <DescriptionIcon style={{ fontSize: "30" }} />
                <Typography
                  component="h2"
                  variant="h5"
                  align="left"
                  class={classes.wrapIcon}
                >
                  Description
                </Typography>
                <Grid style={{ padding: 0 }}>
                  <Typography align="left">{this.state.bio}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <hr class="rounded" />
              <Grid container direction="row" alignItems="center" wrap="wrap">
                <InfoIcon style={{ fontSize: "30" }} />
                <Typography
                  component="h2"
                  variant="h5"
                  align="left"
                  class={classes.wrapIcon}
                >
                  Other Information
                </Typography>
                <Grid container direction="row" alignItems="center">
                  <FormControl component="fieldset">
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.smoker}
                            name="smoker"
                            color="primary"
                          />
                        }
                        label="Smoker"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.car}
                            name="car"
                            color="primary"
                          />
                        }
                        label="Driver's License"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.allergy}
                            name="allergy"
                            color="primary"
                          />
                        }
                        label="Allergies"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.diet}
                            name="diet"
                            color="primary"
                          />
                        }
                        label="Special Dietary Requirements"
                      />
                    </FormGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Container>
    );
  }
}

export default withStyles(useStyles)(AccountDetails);
