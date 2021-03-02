import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../actions/home';

const CreatePost = ({ addPost, auth }) => {
  const [content, setContent] = useState('');
  const handleOnClick = (e) => {
    e.preventDefault();
    const user = auth.user._id;
    const newPost = {
      content,
      user,
    };
    addPost(newPost);
    setContent('');
    window.location.reload();
  };

  return (
    <div className="create-post">
      <textarea
        className="add-post"
        placeholder="Enter your text here"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div>
        <button id="add-post-btn" onClick={handleOnClick}>
          Add Post
        </button>
      </div>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    addPost: (newPost) => {
      dispatch(addPost(newPost));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
