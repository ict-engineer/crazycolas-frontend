import React, { Component } from "react";
import { Route, Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import Layout from "layouts";
import Home from "pages/home";

var hist = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Router history={hist}>
        <Layout fullWidth>
          <Switch>
            <Route path="/" exact component={Home} />
          </Switch>
        </Layout>
      </Router>
    );
  }
}

export default App;
