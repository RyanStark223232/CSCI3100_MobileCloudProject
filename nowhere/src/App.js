import './App.css';
import SignIn from './SignIn.js';
import SignUp from './SignUp.js';
import Home from './Home.js';
import Search from './Search.js';
import AccountDetails from "./AccountDetails.js";
import CreatePost from "./CreatePost.js";
import EditProfile from "./EditProfile.js";
import Button from '@material-ui/core/Button';


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

      <div name="title">
        <h1>&nbsp;&nbsp;</h1>
      </div>

      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">
                  <Button variant="outlined">Home</Button>
                </Link>
              </li>
              <li>
                <Link to="/signin">SignIn </Link>
              </li>
              <li>
                <Link to="/signup">SignUp </Link>
              </li>
              <li>
                <Link to="/search">
                  <Button variant="outlined">Search Post</Button>
                </Link>
              </li>
              <li>
                <Link to="/accountdetails" >   Accountdetails</Link>
              </li>
              <li>
                <Link to="/createpost">
                  <Button variant="outlined">Create Post</Button>
                </Link>
              </li>
              <li>
                <Link to="/editprofile" >
                  <Button variant="outlined">Edit Profile</Button>
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
