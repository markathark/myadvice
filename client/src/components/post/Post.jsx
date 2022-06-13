import React from "react";
import "./post.css";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  const PF = "https://myadvice-app.herokuapp.com/images/";
  return (
    <div className="post">
      <Link to={`/post/${post._id}`}>
        <div className="post-cats">
          {post.categories.map((cat) => (
            <span className="post-cat">{cat}</span>
          ))}
        </div>

        <span className="post-title">{post.title}</span>

        {post.photo && (
          <img src={PF + post.photo} alt="" className="post-img" />
        )}

        <p className="post-desc">{post.shortdesc}</p>
      </Link>
    </div>
  );
};

export default Post;
