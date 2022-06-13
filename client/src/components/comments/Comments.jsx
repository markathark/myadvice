import { useState } from "react";
import { axiosInstance } from "../../config";
import "./comments.css";

const Comments = (props) => {
  const [comment, setComment] = useState("");
  const [newName, setNewName] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleComment = async () => {
    if (comment && newName) {
      try {
        await axiosInstance.put(`/posts/comments/${props.id}`, {
          name: newName,
          date: new Date(),
          comment: comment,
          email,
        });
        setSuccess("Thank you! Your comment has been submitted for approval.");
      } catch (error) {
        console.log(error);
      }
    } else {
      setError("Please fill out the whole form!");
    }
  };
  return (
    <div className="comments-wrapper">
      <div className="comments-title">Comments</div>
      <div className="comments-submit">
        {success ? (
          success
        ) : (
          <div className="comments-form">
            <label for="name">Name</label>
            <input
              id="name"
              placeholder="name"
              onChange={(e) => setNewName(e.target.value)}
            />
            <label for="email">Email</label>
            <input
              id="email"
              placeholder="email"
              onChange={(e) => setNewName(e.target.value)}
            />
            <label for="comment">Comment</label>
            <textarea
              id="comment"
              placeholder="comment"
              onChange={(e) => setComment(e.target.value)}
            />
            {error}
            <button onClick={(e) => handleComment()}>post</button>
          </div>
        )}
      </div>

      {props.comments?.map(
        (c) =>
          c.approved && (
            <div className="comments-approved">
              <div className="comments-approved__title">
                <span className="comments-author">{c.name}</span>
                <span className="comments-date">
                  {new Date(c.date).toDateString()}
                </span>
              </div>
              <div className="comments-approved__comment">{c.comment}</div>
            </div>
          )
      )}
    </div>
  );
};

export default Comments;
