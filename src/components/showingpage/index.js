import React from "react";
import {Home, OldProjects, Contact} from '../../components'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const ShowingPage = () => {
  return (
    <div className="showing-content">
      <Router>
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/oldprojects" exact component={() => <OldProjects />} />
          <Route path="/contact" exact component={() => <Contact />} />
        </Switch>
      </Router>
    </div>
  );
};

export default ShowingPage;