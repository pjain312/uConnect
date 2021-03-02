import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CreatePost, Post } from './';

const PostsLists = ({ home }) => {
  const posts = home.posts;
  return (
    <div>
      {Object.keys(home).length > 0 && (
        <div className="posts-list">
          <CreatePost />
          {posts.map((post) => (
            <Post post={post} key={post._id} />
          ))}
        </div>
      )}
    </div>
  );
};

PostsLists.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostsLists;
