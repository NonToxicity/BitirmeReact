import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
  Login,
  MainPage,
  OAuth2RedirectHandler,
  WhatIf
} from './pages';

export const Routes = ({ children, ...props }) => {
  return (
    <Router {...props}>
      {children}
      <Route exact path="/" component={MainPage} />
      <Route path="/auth" component={OAuth2RedirectHandler} />
      <Route path="/login" component={Login} />
      <Route path="/whatIf" component={WhatIf} />

    </Router>
  );
};
