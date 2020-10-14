import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import MyNavbar from './components/Navbar'
import Homepage from './views/Homepage';
import CreateOrderView from './views/CreateOrderView'

function App() {
  return (
    <Router>
      <MyNavbar />
      <Switch>
          <Route exact path={'/'} component={Homepage}/>
          <Route exact path={'/create-order/'} component={CreateOrderView} />
      </Switch>
    </Router>
  );
}

export default App;
