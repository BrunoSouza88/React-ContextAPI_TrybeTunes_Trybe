import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  render() {
    return (
      <div>
        <p>TrybeTunes</p>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/Search" component={ Search } />
          <Route exact path="/Album/:id" component={ Album } />
          <Route exact path="/Favorites" component={ Favorites } />
          <Route exact path="/Profile" component={ Profile } />
          <Route exact path="/Profile/Edit" component={ ProfileEdit } />
          <Route exact path="*" component={ NotFound } />
          {/* Lembrar: https://stackoverflow.com/questions/32128978/react-router-no-not-found-route */}
        </Switch>
      </div>
    );
  }
}

export default App;
