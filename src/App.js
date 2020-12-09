import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Main from "./pages/Main";
import News from "./pages/News";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/news/:id">
          <News />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
