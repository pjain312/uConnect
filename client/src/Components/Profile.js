import React, { Component } from 'react';
import { connect } from 'react-redux';

const Profile = (auth) => {
  const { user } = auth.auth;
  return (
    <div className="settings">
      <div className="img-container">
        <img
          src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
          alt="user-dp"
        />
      </div>
      <div className="field">
        <div className="field-label">Email</div>
        <div className="field-value">{user.email}</div>
      </div>
      <div className="field">
        <div className="field-label">Name</div>
        <div className="field-value">{user.name}</div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(Profile);
