/*
CSCI3100 Project NowHere
Group D2

LIN Chuanfeng 1155110077
CHIU ChiKeung 1155109788
HO Chak Sum Felix 1155114044
WONG Hin 1155109054
*/


import './App.css';
import SignIn from './SignIn.js';
import SignUp from './SignUp.js';
import Home from './Home.js';
import Search from './Search.js';
import AccountDetails from "./AccountDetails.js";
import CreatePost from "./CreatePost.js";
import EditPost from "./EditPost.js";
import MyPost from "./MyPost.js";
import Post from "./Post.js"
import EditProfile from "./EditProfile.js";
import Button from '@material-ui/core/Button';
import nowhere from './Logo_Temp.jpg';
import React, { useState }from 'react';
import ReactDOM from "react-dom";
import auth from "./Firebase";
import EditIcon from '@material-ui/icons/Edit';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Fab from '@material-ui/core/fab'
import { blue } from '@material-ui/core/colors';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";




export function setLogedIn() {
  // console.log("in setloged in");
  document.getElementById("beforeAuth").style.display = "none";
  // document.getElementById("myPostButton").style.display = "inline";
  document.getElementById("displayName").innerHTML =  auth.currentUser.email;
  document.getElementById("afterAuth").style.display = "inline";
}

export function setLogedOut() {
  // console.log("in setloged out");
  document.getElementById("beforeAuth").style.display = "inline";
  // document.getElementById("myPostButton").style.display = "none";
  document.getElementById("afterAuth").style.display = "none";
  auth.signOut();
}


function onAuthStateChanged(){
  if (auth.currentUser)
    setLogedIn()

  else setLogedOut()
}



function App() {
  return (
    <header>
      <Router>
        <div name="title">
          <Link to="/">
            <img src={nowhere} alt="logo" className="logo"></img>
          </Link>
          
          <div className="accountSetting">
            <div className="toHide" id="afterAuth" >
            <Link to="/accountdetails" style={{ textDecoration: 'none' , margin: 5}} ><Fab variant="extended"  id="displayName" style={{backgroundColor: blue[200]}} ></Fab></Link>
            <Link to="/mypost" style={{ textDecoration: 'none' , margin: 5}} >
            <Badge badgeContent="" color="secondary" >
            <Button variant="contained" size="small" color="primary">
            <AssignmentTurnedInIcon/>My Posts
                </Button>
                </Badge>
                </Link>
              <Link to="/accountdetails" style={{ textDecoration: 'none' , margin: 5}} >
                <Button variant="contained" size="small" color="primary">
                   <AccountCircleIcon/> My Profile
                </Button>
              </Link>
              {/* <Link to="/editprofile" style={{ textDecoration: 'none' , margin: 5}}>
                <Button variant="contained" size="small" color="primary">
                  <EditIcon/> Edit Profile
                </Button>
              </Link> */}
              <Link to="/" style={{ textDecoration: 'none' , margin: 5}}>
                <Button variant="contained" size="small" color="secondary" onClick={setLogedOut}>
                  <ExitToAppIcon/> Log Out
                </Button>
              </Link>
            </div>
            <div id="beforeAuth" >
              <Link to="/signup" style={{ textDecoration: 'none', margin: 5}}>
                <Button variant="contained" size="small" color="primary" >
                  Sign Up
                </Button>
              </Link>
              <Link to="/signin" style={{ textDecoration: 'none', margin: 5}}>
                <Button variant="contained" size="small" color="primary" >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <Button variant="outlined" size="large">Home</Button>
                </Link>
              </li>
              <li>
                <Link to="/search" style={{ textDecoration: 'none' }}>
                  <Button variant="outlined" size="large">Search Post</Button>
                </Link>
              </li>
              {/* <li>
                <Link to="/mypost" style={{ textDecoration: 'none' }}>
                  <Button variant="outlined" size="large" id="myPostButton">My Post</Button>
                </Link>
              </li> */}

            </ul>
          </nav>
          <script>{ auth.onAuthStateChanged(onAuthStateChanged)}</script>

          <Switch>

            <Route path="/signin" component={SignIn}>
            </Route>

            <Route path="/signup" component={SignUp}>
            </Route>

            <Route path="/search" component={Search}>
            </Route>

            <Route path="/AccountDetails" component={AccountDetails}>
            </Route>

            <Route path="/mypost" component={MyPost}>
            </Route>

            <Route path="/createpost" component={CreatePost}>
            </Route>

            <Route path="/editpost/:id" component={EditPost}>
            </Route>

            <Route path="/post/:id" component={Post}>
            </Route>

            <Route path="/editprofile" component={EditProfile}>
            </Route>

            <Route path="/" component={Home}>
            </Route>


          </Switch>
        </div>
      </Router>

    </header>

  );

}
// }

export default App;
