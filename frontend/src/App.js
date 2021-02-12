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
import LoginView from './views/LoginView';
import store from './my_store/store';

import { logout } from './my_store/actions/auth';
import { clearMessage} from "./my_store/actions/message";
import { history} from "./helpers/history";


function App() {
  return (
      <Provider store={store}>
          <Router>
              <MyNavbar />
              <Switch>
                  <Route exact path={'/'} component={Homepage}/>
                  <Route exact path={'/login/'} component={LoginView} />
                  <Route exact path={'/create-order/'} component={CreateOrderView} />
                  <Route exact path={'/products/'} component={ProductListView} />
              </Switch>
          </Router>
      </Provider>
  );
}

export default App;
