import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import {Provider} from 'react-redux';

import MyNavbar from './components/Navbar'
import Homepage from './views/Homepage';
import CreateOrderView from './views/CreateOrderView';
import ProductListView from './views/products/ProductListView';

import store from './my_store/store';


function App() {
  return (
      <Provider store={store}>
          <Router>
              <MyNavbar />
              <Switch>
                  <Route exact path={'/'} component={Homepage}/>
                  <Route exact path={'/create-order/'} component={CreateOrderView} />
                  <Route exact path={'/products/'} component={ProductListView} />
              </Switch>
          </Router>
      </Provider>
  );
}

export default App;
