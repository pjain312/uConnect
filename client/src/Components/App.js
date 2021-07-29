import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { getHome } from '../actions/home';
import { authenticateUser } from '../actions/auth';
import { PostsList, NavBar, Page404, Login, Signup, Profile } from './';
import PropTypes from 'prop-types';
import jwt_decode from 'jwt-decode';

const PrivateRoute = (privateRouteProps) => {
  const { isLoggedin, path, render: Component } = privateRouteProps;

  return (
    <Route
      path={path}
      render={(props) => {
        return isLoggedin ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
};

const PrivateRoute1 = (privateProps) => {
  const { isLoggedin, path, component: Component } = privateProps;

  return (
    <Route
      path={path}
      render={(props) => {
        return isLoggedin ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
};

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(getHome());

    const token = localStorage.getItem('token');

    if (token) {
      const user = jwt_decode(token);

      this.props.dispatch(
        authenticateUser({
          email: user.email,
          _id: user._id,
          name: user.name,
        })
      );
    }
  }

  render() {
    const { home, auth } = this.props;
    return (
      <Router>
        <NavBar />
        <Switch>
          <PrivateRoute
            exact
            path="/"
            isLoggedin={auth.isLoggedin}
            render={(props) => {
              return <PostsList {...props} home={home} />;
            }}
          />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute1
            path="/profile"
            isLoggedin={auth.isLoggedin}
            component={Profile}
          />
          {/* <PrivateRoute1
            path="/user/:userId"
            isLoggedin={auth.isLoggedin}
            component={UsersProfile}
          /> */}
          <Route component={Page404} />
        </Switch>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    home: state.home,
    auth: state.auth,
  };
};

App.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(App);
