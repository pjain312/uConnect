import React from 'react';
import { connect } from 'react-redux';
import { addLikes, deleteComment } from '../actions/home';

function Comment({ comment, addLikes, auth, deleteComment }) {
  const handleCommentLikes = (e) => {
    e.preventDefault();
    const id = comment._id;
    const user = auth.user._id;
    const type = 'Comment';
    const likeData = {
      id,
      user,
      type,
    };

    addLikes(likeData);
    window.location.reload();
  };
  const handleDelete = (e) => {
    e.preventDefault();
    const id = comment._id;
    const user = auth.user._id;
    const commentInfo = {
      id,
      user,
    };
    deleteComment(commentInfo);
    window.location.reload();
  };
  return (
    <div className="post-comment-item">
      <div className="post-comment-header">
        <span className="post-comment-author">{comment.user.name}</span>
        <span className="post-comment-time">a minute ago</span>
        <button className="post-like no-btn" onClick={handleCommentLikes}>
          <img
            src="https://image.flaticon.com/icons/svg/1077/1077035.svg"
            alt="likes-icon"
          />
          <span>{comment.likes.length}</span>
        </button>
        <button className="comment-delete" onClick={handleDelete}>
          Delete
        </button>
      </div>

      <div className="post-comment-content">{comment.content}</div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addLikes: (likeData) => {
      dispatch(addLikes(likeData));
    },
    deleteComment: (commentInfo) => {
      dispatch(deleteComment(commentInfo));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
