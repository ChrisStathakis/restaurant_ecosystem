import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer, Router } from '@react-navigation/native';
import MyTabs from './src/general/NavbarTabs';
import {store, persistor } from './src/my_store/store';




export default function App() {

  return (

      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>

  );
}


