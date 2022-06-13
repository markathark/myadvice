import React from "react";
import Post from "../post/Post";
import "./posts.css";

const Posts = ({ posts }) => {
  console.log(posts);
  return (
    <div className="posts">
      {posts.length === 0 ? (
        <div>There seem to be no posts here.</div>
      ) : (
        posts.map((p) => <Post post={p} key={p._id} />)
      )}
    </div>
  );
};

export default Posts;
