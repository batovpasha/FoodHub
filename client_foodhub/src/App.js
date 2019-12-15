// Core
import React from 'react';

// Instruments
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

// Components
import Restaurants from './pages/Restaurants';
import Dishes from './pages/Dishes';

function App() {
    return (
        <Router>
            <Switch>
                <Route exactpath="/" render={() => <h1>Food Hub</h1>}/>

                <Route exact path="/test" render={() => <h1>test</h1>} />
                <Route exact path="/test/:id" render={props => <h1>{props.match.params.id}</h1>} />

                <Route exact path='/restaurants' component={Restaurants}/>
                <Route exact path='/:restaurant/dishes' component={Dishes}/>
            </Switch>
        </Router>
    );
}

export default App;
