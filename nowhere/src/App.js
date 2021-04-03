import './App.css';
import SignIn from './SignIn.js';
import SignUp from './SignUp.js';
import Home from './Home.js';
import Search from './Search.js';
import AccountDetails from "./AccountDetails.js";
import CreatePost from "./CreatePost.js";
import EditProfile from "./EditProfile.js";
import Button from '@material-ui/core/Button';
import nowhere from './Logo_Temp.jpg';
// import Firebase from "./Firebase";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <header>
      <Router>
        <div name="title">
          <Link to="/">
            <img src={nowhere} alt="logo" class="logo"></img>
          </Link>
          <div class="accountSetting">
            <Link to="/signup" > 
              <Button variant="contained" size="small" color="primary">
                Sign Up
              </Button>
            </Link>
            <Link to="/signin" > 
              <Button variant="contained" size="small" color="primary">
                Sign In
              </Button>
            </Link>
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
                <Link to="/createpost">
                  <Button variant="outlined" size="large">Create Post</Button>
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

            <Route path="/createpost" component={CreatePost}>
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

export default App;
// withRouter(observer(MyComponent))
