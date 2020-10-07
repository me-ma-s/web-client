import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Chat from './pages/chat'
import Auto from './pages/auto'
import Reg from './pages/reg'


const App = () => {

  document.body.style.minWidth = '1px'

  return (
	  <Switch>
      <Route
        path="/"
        component={Chat}
        exact />
      <Route
        path="/authorization"
        component={Auto}
        exact />
      <Route
        path="/registration"
        component={Reg}
        exact />
	  </Switch>
  );
};


export default App;
