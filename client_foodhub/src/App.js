// Core
import React from 'react';

// Instruments
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { increment, decrement } from './store/actions';
import { useSelector, useDispatch } from 'react-redux';

// Components
import Restaurants from './pages/Restaurants';
import Dishes from './pages/Dishes';
import { Button } from '@material-ui/core';

function App() {
    const dispatch = useDispatch();
    const counter = useSelector((state) => state.getIn(['store', 'counter']));

    console.log(counter);

    return (
        <Router>
            <Switch>
                <Route
                    exact
                    path="/"
                    render={() => (
                        <>
                            <h1>{counter}</h1>
                            <Button variant="contained" color="primary" onClick={() => dispatch(increment(10))}>
                                increment
                            </Button>
                            <Button variant="contained" color="primary" onClick={() => dispatch(decrement(5))}>
                                decrement
                            </Button>
                        </>
                    )}
                />
                <Route exact path="/test" render={() => <h1>test</h1>} />
                <Route exact path="/test/:id" render={props => <h1>{props.match.params.id}</h1>} />

                <Route exact path='/restaurants' component={Restaurants}/>
                <Route exact path='/:restaurant/dishes' component={Dishes}/>
            </Switch>
        </Router>
    );
}

export default App;
