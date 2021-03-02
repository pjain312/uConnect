import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import { Redirect } from 'react-router-dom';

const Login = ({ auth, login }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const creds = { email, password };
    login(creds);
    setEmail('');
    setPassword('');
  };
  const { isLoggedin } = auth;
  // const { from } = this.props.location.state || { from: { pathname: '/' } };

  if (isLoggedin) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <span className="login-signup-header"> Log In </span>
      <div className="field">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="field">
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="field">
        <button>Log In</button>
      </div>
    </form>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: (creds) => {
      dispatch(login(creds));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
