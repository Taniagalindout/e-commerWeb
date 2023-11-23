import React from 'react';
import Landing from './components/landing/Landing';
import Login from './modules/login/Login';
import Register from './modules/login/Register';
import './assets/css/globlal.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import HomeSeller from './modules/seller/HomeSeller';
function App() {

  return (
    <div className="App ">

      <Router>
        <Switch> 
          <Route exact path='/' component={Landing} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route path="/home-seller">
              <HomeSeller />
            </Route>
        </Switch>
      </Router>


    </div>
  );
}

export default App;
