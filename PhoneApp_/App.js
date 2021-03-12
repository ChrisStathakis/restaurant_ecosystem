import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer, Router } from '@react-navigation/native';
import MyTabs from './src/views/general/NavbarTabs';

import store from './src/views/my_store/store';




export default function App() {

  return (
    <Provider store={store}>
      
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
      
    </Provider>
    
  );
}


