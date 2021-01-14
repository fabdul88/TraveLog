import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./app.scss";
import ReactMap from "./Components/ReactMap/ReactMap";
import LandingPage from "./Components/LandingPage/LandingPage";
import Nav from "./Components/Nav/Nav";

function App() {
  return (
    <div className="app">
      <Router>
        <Nav />
        <Switch>
          <Route
            exact
            path="/"
            component={() => {
              return <LandingPage />;
            }}
          />
          <Route
            exact
            path="/map"
            component={() => {
              return <ReactMap />;
            }}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
