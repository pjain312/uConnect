import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/auth';
import { fetchUser } from '../actions/fetchUser';

const NavBar = ({ auth, home, logoutUser, fetchUser, fetchUsers }) => {
  const history = useHistory();
  const users = home.users;
  const logOut = (e) => {
    e.preventDefault();
    logoutUser();

    history.push('/login');
  };

  // const handleFetchUser = (e, id) => {
  //   e.preventDefault();
  //   console.log(id);
  //   fetchUser(id);
  // };

  return (
    <div>
      <nav className="nav">
        {auth.isLoggedin && (
          <div className="left-div">
            <Link to="/">
              <h1>Logo</h1>
            </Link>
          </div>
        )}
        <div className="search-container">
          <img
            className="search-icon"
            src="https://image.flaticon.com/icons/svg/483/483356.svg"
            alt="search-icon"
          />
          <input placeholder="Search" />
          <div className="search-results">
            <ul>
              {home.length !== 0 &&
                users.map((user) => (
                  <li
                    className="search-results-row"
                    key={user._id}
                    // onClick={(e) => {
                    //   handleFetchUser(e, user._id);
                    // }}
                  >
                    <Link to={`/user/${user._id}`}>
                      <img
                        src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                        alt="user-dp"
                      />
                    </Link>
                    <span>{user.name}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="right-nav">
          {auth.isLoggedin && (
            <div className="user">
              <Link to="/profile">
                <img
                  src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                  alt="user-dp"
                  id="user-dp"
                />
              </Link>
              <span>{auth.user.name}</span>
            </div>
          )}

          <div className="nav-links">
            <ul>
              {!auth.isLoggedin && (
                <li>
                  <Link to="/login">Log in</Link>
                </li>
              )}
              {!auth.isLoggedin && (
                <li>
                  <Link to="/signup"> Sign up</Link>
                </li>
              )}
              {auth.isLoggedin && <li onClick={logOut}>Log out</li>}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    auth: state.auth,
    home: state.home,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logoutUser: () => {
      dispatch(logoutUser());
    },
    // fetchUser: (id) => {
    //   dispatch(fetchUser(id));
    // },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
