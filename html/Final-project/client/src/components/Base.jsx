import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import Auth from '../modules/Auth';

function getMoviesFromApiAsync() {
    return fetch('https://facebook.github.io/react-native/movies.json')
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson.movies;
        })
        .catch((error) => {
            console.error(error);
        });
}
console.log('errrorroror', getMoviesFromApiAsync())

const Base = ({children}) => (
    <div>
        <nav className="navbar navbar-default">
            <div className="container">
                <div className="navbar-header navWelc">
                    Vr-Dreams
                </div>

                {Auth.isUserAuthenticated() ? (
                    <div className="top-bar-right logout">
                        <Link to="/logout">Log out</Link>
                        <br/>
                        <p>Signed in as: <a href="/" className="navbar-link">   </a></p>

                    </div>
                ) : (
                    <div className="top-bar-right">
                        {/*<Link to="/login">Log in</Link>*/}
                        {/*<Link to="/signup">Sign up</Link>*/}
                    </div>
                )}
            </div>
        </nav>

        {children}

    </div>
);

Base.propTypes = {
    children: PropTypes.object.isRequired
};

export default Base;