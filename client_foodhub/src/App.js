// Core
import React from 'react';

// Instruments
import CssBaseline from '@material-ui/core/CssBaseline';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import { routes } from './routes';

import Restaurants from './pages/Restaurants';
import MakeOrder from './pages/MakeOrder';
import Dishes from './pages/Dishes';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

// Components
import AppBar from './components/AppBar';

export default function App() {
    return (
        <>
            <CssBaseline />
            <Router>
                <AppBar />
                <Switch>
                    <Route exact path={routes.signIn} component={SignIn} />
                    <Route exact path={routes.signUp} component={SignUp} />

                    <ProtectedRoute exact path={routes.restaurants} component={Restaurants} />
                    <ProtectedRoute exact path={routes.home} component={Restaurants} />
                    <ProtectedRoute exact path={routes.dishes} component={Dishes} />
                    <ProtectedRoute exact path={routes.order} component={MakeOrder} />
                </Switch>
            </Router>
        </>
    );
}
