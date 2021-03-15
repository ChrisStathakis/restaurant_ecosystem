import { createStore, applyMiddleware } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}

import rootReducer from './reducers';


export const store = createStore(rootReducer);
export const persistor = persistStore(store);