/*
CSCI3100 Project NowHere
Group D2

LIN Chuanfeng 1155110077
CHIU ChiKeung 1155109788
name sid....
name sid....
name sid....
*/


import './App.css';
import SignIn from './SignIn.js';
import SignUp from './SignUp.js';
import Home from './Home.js';
import Search from './Search.js';
import AccountDetails from "./AccountDetails.js";
import CreatePost from "./CreatePost.js";
import MyPost from "./MyPost.js";
import Post from "./Post.js"
import EditProfile from "./EditProfile.js";
import Button from '@material-ui/core/Button';
import nowhere from './Logo_Temp.jpg';
import React, { useState }from 'react';
import ReactDOM from "react-dom";
import auth from "./Firebase";

// import { withRouter } from "react-router";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";



export function setLogedIn() {
  console.log("in setloged in");
  document.getElementById("beforeAuth").style.display = "none";
  document.getElementById("afterAuth").style.display = "inline";
}

export function setLogedOut() {
  console.log("in setloged out");
  document.getElementById("beforeAuth").style.display = "inline";
  document.getElementById("afterAuth").style.display = "none";
  auth.signOut();
}

function App() {
  const [logedIN, setLogedInState] = useState(false);
  const onSet =()=>{setLogedInState(true)}
  return (
    <header>
      <Router>
        <div name="title">
          <Link to="/">
            <img src={nowhere} alt="logo" className="logo"></img>
          </Link>
          <div className="accountSetting">
            <div className="toHide" id="afterAuth" >
              <Link to="/accountdetails" onClick = {onSet}>Welcome, { auth.currentUser?auth.currentUser.email:"guest"  }</Link>
              <Link to="/accountdetails" >
                <Button variant="contained" size="small" color="primary">
                  Accountdetails
            </Button>
              </Link>
              <Link to="/editprofile" >
                <Button variant="contained" size="small" color="primary">
                  Edit Profile
            </Button>
              </Link>
              <Link to="/">
                <Button variant="contained" size="small" color="primary" onClick={setLogedOut}>
                  Log Out
            </Button>
              </Link>
            </div>
            <div id="beforeAuth" >
              <Link to="/signup" >
                <Button variant="contained" size="small" color="primary" >
                  Sign Up
              </Button>
              </Link>
              <Link to="/signin" >
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
                <Link to="/">
                  <Button variant="outlined" size="large">Home</Button>
                </Link>
              </li>
              <li>
                <Link to="/search">
                  <Button variant="outlined" size="large">Search Post</Button>
                </Link>
              </li>
              <li>
                <Link to="/mypost">
                  <Button variant="outlined" size="large">My Post</Button>
                </Link>
              </li>

            </ul>
          </nav>

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

            <Route path="/post" component={Post}>
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
