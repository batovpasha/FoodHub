import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectIsAuthenticated } from '../../store';

// export default function AuthExample() {
//   return (
//     <Router>
//       <div>
//         <AuthButton />

//         <ul>
//           <li>
//             <Link to="/public">Public Page</Link>
//           </li>
//           <li>
//             <Link to="/protected">Protected Page</Link>
//           </li>
//         </ul>

//         <Switch>
//           <Route path="/public">
//             <PublicPage />
//           </Route>
//           <Route path="/login">
//             <LoginPage />
//           </Route>
//           <PrivateRoute path="/protected">
//             <ProtectedPage />
//           </PrivateRoute>
//         </Switch>
//       </div>
//     </Router>
//   );
// }

export default function ProtectedRoute({ children, ...rest }) {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/singIn",
                            state: { from: location }
                        }}
                    />
                )}
        />
    );
}

// function LoginPage() {
//   let history = useHistory();
//   let location = useLocation();

//   let { from } = location.state || { from: { pathname: "/" } };
//   let login = () => {
//     fakeAuth.authenticate(() => {
//       history.replace(from);
//     });
//   };

//   return (
//     <div>
//       <p>You must log in to view the page at {from.pathname}</p>
//       <button onClick={login}>Log in</button>
//     </div>
//   );
// }
