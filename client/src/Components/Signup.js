import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import { signup, signupWithGoogle } from '../actions/auth';

const Signup = ({ signup, signupWithGoogle, auth }) => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      name,
      email,
      dob,
      password,
      confirmPassword,
    };
    signup(user);
    setName('');
    setEmail('');
    setPassword('');
    setDob('');
    setConfirmPassword('');
    history.push('/login');
  };

  const handleSubmit1 = (e) => {
    e.preventDefault();
    signupWithGoogle();
  };

  const { isLoggedin } = auth;

  if (isLoggedin) {
    return <Redirect to="/" />;
  }

  return (
    <form className="login-form">
      <span className="login-signup-header"> Sign Up </span>
      <div className="field">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="field">
        <input
          type="date"
          name="dob"
          placeholder="DoB"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
      </div>
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
        <input
          type="password"
          name="confirm-password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <div className="field">
        <button type="submit" onClick={handleSubmit}>
          Sign Up
        </button>
      </div>
      <div> OR </div>
      <div className="field">
        <button type="submit" onClick={handleSubmit1}>
          Sign up with google
        </button>
      </div>
    </form>
  );
};
function matchStateToProps(state) {
  return {
    auth: state.auth,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    signup: (user) => {
      dispatch(signup(user));
    },
    signupWithGoogle: () => {
      dispatch(signupWithGoogle());
    },
  };
}

export default connect(matchStateToProps, mapDispatchToProps)(Signup);
