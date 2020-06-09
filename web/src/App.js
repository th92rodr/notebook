import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import LoginPage from './pages/Login';
import LandingPage from './pages/Landing';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/home' component={LandingPage} />
        <Route path='/login' component={LoginPage} />

        <Redirect from='/' to='/home' exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
