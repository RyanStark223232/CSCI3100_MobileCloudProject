import logo from './logo.svg';
import './App.css';
import SignIn from './SignIn.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/about">Home</Link>
            </li>
            <li>
              <Link to="/try">Click Here</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <SignIn />
          </Route>
          <Route path="/try">
            <Unfinished />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Unfinished() {
  return (
    <div>
      <h1>Underconstruction</h1>
      <img src={logo} alt="logo"></img>
    </div>
  );
}

export default App;
