import React from 'react';
import { Switch, Route } from 'react-router-dom';
// COMPONENTS
import Home from './components/home';
import User from './components/user';
import Admin from './components/admin';

// UTILS
import { useAuth } from './utils/auth';
// import theme from "./utils/theme";

function App() {
  const auth = useAuth();
  return (
    <Switch>
      {auth.user.type === 'user' ? (
        <Route path="/" component={User} />
      ) : auth.user.type === 'admin' ? (
        <Route path="/" component={Admin} />
      ) : (
        <Route path="/" component={Home} />
      )}
    </Switch>
  );
}

export default App;
