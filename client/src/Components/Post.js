import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Comment } from './';
import { createComment, addLikes, deletePost } from '../actions/home';

const Post = ({ post, auth, createComment, addLikes, deletePost }) => {
  const history = useHistory();
  const [contents, setContents] = useState('');

  const handleAddComment = (e) => {
    e.preventDefault();
    const posts = post._id;
    const id = auth.user._id;
    const comment = {
      contents,
      posts,
      id,
    };
    createComment(comment);
    setContents('');
    window.location.reload();
  };

  const handlePostLikes = (e) => {
    e.preventDefault();
    const id = post._id;
    const user = auth.user._id;
    const type = 'Post';

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
    const id = post._id;
    const user = auth.user._id;
    const postInfo = {
      id,
      user,
    };
    deletePost(postInfo);
    window.location.reload();
  };

  return (
    <div className="post-wrapper" key={post._id}>
      <div className="post-header">
        <div className="post-avatar">
          <img
            src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
            alt="user-pic"
          />
          <div>
            <span className="post-author">{post.user.name}</span>
            <span className="post-time">a minute ago</span>
          </div>
          <button onClick={handleDelete}>Delete</button>
        </div>
        <div className="post-content">{post.content}</div>

        <div className="post-actions">
          <button className="post-like no-btn" onClick={handlePostLikes}>
            <img
              src="https://image.flaticon.com/icons/svg/1077/1077035.svg"
              alt="likes-icon"
            />
            <span>{post.likes.length}</span>
          </button>

          <div className="post-comments-icon">
            <img
              src="https://image.flaticon.com/icons/svg/1380/1380338.svg"
              alt="comments-icon"
            />
            <span>{post.comments.length}</span>
          </div>
        </div>
        <div className="post-comment-box">
          <input
            placeholder="Start typing a comment"
            value={contents}
            onChange={(e) => setContents(e.target.value)}
          />
        </div>
        <button onClick={handleAddComment}>Add Comment</button>
        <div className="post-comments-list">
          {post.comments.map((comment) => (
            <Comment comment={comment} key={comment._id} postId={post._id} />
          ))}
        </div>
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
    createComment: (comment) => {
      dispatch(createComment(comment));
    },
    addLikes: (likeData) => {
      dispatch(addLikes(likeData));
    },
    deletePost: (postInfo) => {
      dispatch(deletePost(postInfo));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
