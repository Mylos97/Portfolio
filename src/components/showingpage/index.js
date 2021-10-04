import React from "react";
import {Home, OldProjects, Contact, LoginPage} from '../../components'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const ShowingPage = () => {
  return (
    <div className="showing-content">
      <Router>
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/oldprojects" exact component={() => <OldProjects />} />
          <Route path="/contact" exact component={() => <Contact />} />
          <Route path="/login" exact component={() => <LoginPage/>} />
        </Switch>
      </Router>
    </div>
  );
};

export default ShowingPage;