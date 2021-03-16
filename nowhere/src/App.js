import './App.css';
import SignIn from './SignIn.js';
import SignUp from './SignUp.js';
import Home from './Home.js';
import Search from './Search.js';
import Personal from './Personal.js'
import AccountDetails from "./AccountDetails.js";
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
        <h1>NowHere</h1>
      </div>

      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home </Link>
              </li>
              <li>
                <Link to="/signin">SignIn </Link>
              </li>
              <li>
                <Link to="/signup">SignUp </Link>
              </li>
              <li>
                <Link to="/search">Search Posts</Link>
              </li>
              <li>
                <Link to="/personal">Personal Information</Link>
              </li>
              {/*<li>*/}
              {/*  <Link to="/accountdetails" >Accountdetals</Link>*/}
              {/*</li>*/}
            </ul>
          </nav>

          <Switch>

            <Route path="/signin">
              <SignIn />
            </Route>

            <Route path="/signup">
              <SignUp />
            </Route>

            <Route path="/search">
              <Search />
            </Route>

            <Route path="/personal">
              <Personal />
            </Route>

            <Route path="/AccountDetails">
              <AccountDetails />
            </Route>
            
            <Route path="/">
              <Home />
            </Route>
            

          </Switch>
        </div>
      </Router>

    </header>

  );
}

export default App;
