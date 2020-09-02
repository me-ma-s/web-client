import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Chat from './pages/chat'


const App = () => {

  return (
	  <Switch>
      <Route
        path="/"
        component={Chat}
        exact />
	  </Switch>
  );
};


export default App;
