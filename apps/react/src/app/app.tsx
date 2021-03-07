import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@internship/config';
import { Routes } from './Routes';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
import { Navigation } from '@internship/ui';

// ... normal setup, create store and persistor, import components etc.
const store = configureStore();

export const App = () => {
  const persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Routes>
          <Navigation />
        </Routes>
      </PersistGate>
    </Provider>
  );
};

export default App;
