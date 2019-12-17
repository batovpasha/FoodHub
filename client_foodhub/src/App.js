// Core
import React from 'react';

// Instruments
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import ProtectedRoute from './containers/ProtectedRoute';

// Components
import Restaurants from './pages/Restaurants';
import Dishes from './pages/Dishes';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';

export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/signIn" component={SignIn} />
                <Route exact path="/signUp" component={SignUp} />

                <ProtectedRoute exact path='/restaurants' component={Restaurants}/>
                <ProtectedRoute exact path='/:restaurant/dishes' component={Dishes}/>
                <ProtectedRoute exact path="/" component={Home}/>
            </Switch>
        </Router>
    );
}
