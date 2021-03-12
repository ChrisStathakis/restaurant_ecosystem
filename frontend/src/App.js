import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import MyNavbar from './components/Navbar'
import Homepage from './views/Homepage';
import CreateOrderView from './views/CreateOrderView';
import ProductListView from './views/products/ProductListView';
import LoginView from './views/LoginView';
import {persistor, store } from './my_store/store';


import { logout } from './my_store/actions/auth';
import { clearMessage} from "./my_store/actions/message";
import { history} from "./helpers/history";
import UpdateOrderView from "./views/orders/UpdateOrderView";


function App() {
  return (
      <Provider store={store}>
          <PersistGate persistor={persistor} loading={null} >
          <Router>
              <MyNavbar />
              <Switch>
                  <Route exact path={'/'} component={Homepage}/>
                  <Route exact path={'/create-order/'} component={CreateOrderView} />
                  <Route exact path={'/products/'} component={ProductListView} />
                  <Route exact path={'/login/'} component={LoginView} />
                  <Route exact path={'/orders/update/:id'} component={UpdateOrderView} />
              </Switch>
          </Router>
      </PersistGate>
      </Provider>
  );
}

export default App;
