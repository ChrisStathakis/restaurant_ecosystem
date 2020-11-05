import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";

import MyNavbar from './components/Navbar'
import Homepage from './views/Homepage';
import CreateOrderView from './views/CreateOrderView';
import ProductListView from './views/products/ProductListView';

function App() {
  return (
    <Router>
      <MyNavbar />
      <Switch>
          <Route exact path={'/'} component={Homepage}/>
          <Route exact path={'/create-order/'} component={CreateOrderView} />
          <Route exact path={'/products/'} component={ProductListView} />
      </Switch>
    </Router>
  );
}

export default App;
