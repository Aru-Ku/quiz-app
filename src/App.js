import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
// COMPONENTS
import Home from './components/home';
import Admin from './components/admin';
import Navbar from './components/common/_navbar';
import FirstPage from './components/user';
import TakeQuiz from './components/user/takeQuiz';
// UTILS
import { useAuth } from './utils/auth';

function App() {
  const auth = useAuth();
  return (
    <Switch>
      {auth.user.type === 'user' ? (
        <Fragment>
          <Navbar />
          <Route exact path="/topic/:id" component={TakeQuiz} />
          <Route exact path="/" component={FirstPage} />
        </Fragment>
      ) : auth.user.type === 'admin' ? (
        <Route path="/" component={Admin} />
      ) : (
        <Route path="/" component={Home} />
      )}
    </Switch>
  );
}

export default App;
