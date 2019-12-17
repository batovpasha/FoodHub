// Core
import React from 'react';

// Instruments
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Restaurants from './pages/Restaurants';
import MakeOrder from './pages/MakeOrder';
import Dishes from './pages/Dishes';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';

// Components
import AppBar from './components/AppBar';

export default function App() {
    return (
        <Router>
            <AppBar />
            <Switch>
                <Route exact path="/signIn" component={SignIn} />
                <Route exact path="/signUp" component={SignUp} />

                <ProtectedRoute exact path='/restaurants' component={Restaurants}/>
                <ProtectedRoute exact path='/:restaurant/dishes' component={Dishes}/>
                <ProtectedRoute exact path="/" component={Home}/>
                <ProtectedRoute exact path='/order' component={MakeOrder}/>
            </Switch>
        </Router>
    );
}
