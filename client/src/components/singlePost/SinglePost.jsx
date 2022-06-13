import React, { useContext, useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "./singlepost.css";
import { Context } from "../../context/Context";
import ReactMarkdown from "react-markdown";
import Comments from "../comments/Comments";
import { axiosInstance } from "../../config";

const SinglePost = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "https://myadvice-app.herokuapp.com/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [likes, setLikes] = useState(0);
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axiosInstance.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setLikes(res.data.likes.length);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete("/posts/" + path, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axiosInstance.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });

      setUpdateMode(false);
    } catch (error) {}
  };

  const handleLikes = async () => {
    try {
      await axiosInstance.put(`/posts/likes/${post._id}`, {
        username: user.username,
      });
      if (post.likes.includes(user.username)) {
        setLikes(likes - 1);
      } else {
        setLikes(likes + 1);
      }
    } catch (error) {}
  };

  return (
    <div className="singlepost">
      <div className="post-wrapper">
        <ul className="singlepost-cats">
          {post.categories?.map((c) => (
            <li>
              <Link to={"/search/?cat=" + c}>{c}</Link>
            </li>
          ))}
        </ul>
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlepost-title__input"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlepost-title">{title}</h1>
        )}
        {post.username === user?.username && (
          <div className="singlepost-edit">
            <FaEdit
              className="singlepost-icon"
              onClick={() => setUpdateMode(true)}
            />
            <FaTrashAlt className="singlepost-icon" onClick={handleDelete} />
          </div>
        )}

        <div className="singlepost-info">
          <span className="singlepost-info__author">
            BY:
            <Link to={`/search/?user=${post.username}`}>
              <b> {post.username}</b>
            </Link>
          </span>

          <span className="singlepost-info__date">
            POSTED AT: <b>{new Date(post.createdAt).toDateString()}</b>
          </span>

          {user ? (
            <button
              className="singlepost-info__likes button"
              onClick={(e) => {
                handleLikes();
              }}
            >
              {likes} Likes
            </button>
          ) : (
            <span className="singlepost-info__likes">{likes} Likes</span>
          )}
        </div>

        {post.photo && (
          <img className="singlepost-img" src={PF + post.photo} alt="" />
        )}

        {updateMode ? (
          <textarea
            className="singlepost-desc__input"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <div className="singlepost-desc">
            <ReactMarkdown>{desc}</ReactMarkdown>
          </div>
        )}
        {updateMode && (
          <button className="singlepost-button" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
      <Comments comments={post.comments} id={post._id} />
    </div>
  );
};

export default SinglePost;
