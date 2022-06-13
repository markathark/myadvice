import React, { useContext, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { Context } from "../../context/Context";
import "./write.css";
import { axiosInstance } from "../../config";

const Write = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [shortdesc, setShortdesc] = useState("");
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !desc || !shortdesc || !categories) {
      setError("Please fill out the whole form!");
      return;
    }
    const newPost = {
      username: user.username,
      title,
      desc,
      shortdesc,
      categories,
    };
    if (file) {
      const data = new FormData();
      const filename = file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axiosInstance.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
      try {
        const res = await axiosInstance.post("/posts", newPost);
        window.location.replace("/post/" + res.data._id);
      } catch (err) {
        console.log(err);
      }
    } else {
      setError("Please upload an image!");
    }
  };
  return (
    <div className="write-wrapper">
      <div className="write-title">Create A Post</div>
      <div className="write">
        <input
          type="file"
          id="file-input"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor="file-input">
          Featured Image
          <br />
          {file ? (
            <img alt="" className="write-img" src={URL.createObjectURL(file)} />
          ) : (
            <div className="write-icon">
              <FaPlusCircle />
            </div>
          )}
        </label>
        <label>Title</label>
        <input
          type="text"
          placeholder="Title"
          className="write-input"
          autoFocus={true}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label>Categories (separate by commas)</label>
        <textarea
          placeholder="Categories"
          type="text"
          className="write-input write-cats"
          onChange={(e) =>
            setCategories(
              e.target.value.toLowerCase().replace(/\s+/g, "").trim().split(",")
            )
          }
        />
        <label>Short Summary</label>
        <textarea
          placeholder="Short Description"
          type="text"
          className="write-input write-summ"
          onChange={(e) => setShortdesc(e.target.value)}
        />
        <label>Content</label>
        <textarea
          placeholder="Tell your story..."
          type="text"
          className="write-input write-text"
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
        {error && <span className="write-error">{error}</span>}
        <button className="write-submit" onClick={(e) => handleSubmit(e)}>
          Publish
        </button>
      </div>
    </div>
  );
};

export default Write;
