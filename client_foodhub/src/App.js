// Core
import React from 'react';

// Instruments
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

// Components
import Restaurants from './pages/Restaurants';
import Dishes from './pages/Dishes';
import SignIn from './pages/SignIn';

import ProtectedRoute from './containers/ProtectedRoute';

function Home() {
    return (
        <h1>Food Hub Home</h1>
    );
}

export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/signIn">
                    <SignIn />
                </Route>

                <Route exact path='/restaurants' component={Restaurants}/>
                <Route exact path='/:restaurant/dishes' component={Dishes}/>

                <ProtectedRoute exact path="/" component={Home}/>
            </Switch>
        </Router>
    );
}
