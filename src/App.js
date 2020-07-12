import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Players } from "./Players";
import { CheckBox } from "./checkbox";
import { passes } from "./input";
import "./App.css";
import logo from "./logo.svg";

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Players</Link>
          </li>
          <li>
            <Link to="/ch">CheckBox</Link>
          </li>
        </ul>

        <hr />

        {/*
        A <Switch> looks through all its children <Route>
        elements and renders the first one whose path
        matches the current URL. Use a <Switch> any time
        you have multiple routes, but you want only one
        of them to render at a time
      */}
        <Switch>
          <Route exact path="/">
            <Players passes={passes} />
          </Route>
          <Route exact path="/ch">
            <CheckBox />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
