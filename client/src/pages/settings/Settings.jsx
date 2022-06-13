import { useContext, useState } from "react";
import { axiosInstance } from "../../config";
import { Context } from "../../context/Context";
import "./settings.css";

export default function Settings() {
  const [file, setFile] = useState(null);
  const { user, dispatch } = useContext(Context);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const PF = "https://myadvice-app.herokuapp.com/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    let updatedUser = { userId: user._id, username, email };
    if (password) {
      updatedUser.password = password;
    }
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axiosInstance.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axiosInstance.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  return (
    <div className="settings">
      <div className="settings-wrapper">
        <div className="settings-title">Account Settings</div>
        <form className="settings-form" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settings-profilepic">
            {user.profilePic ? (
              <img
                src={file ? URL.createObjectURL(file) : PF + user.profilePic}
                alt=""
              />
            ) : null}

            <label htmlFor="file-input">
              <b
                className={
                  username === "Guest" ? "settings-disabled" : "settings-img"
                }
              >
                {username === "Guest"
                  ? "Upload Photo Disabled"
                  : "Upload New Photo"}
              </b>
            </label>
            <input
              type="file"
              id="file-input"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
              disabled={username === "Guest" ? true : null}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>New Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className={
              username === "Guest" ? "settings-disabled" : "settings-submit"
            }
            disabled={username === "Guest" ? true : null}
          >
            {username === "Guest" ? "Updating Disabled for Guest" : "Update"}
          </button>
          {success && (
            <span className="settings-success">Profile has been updated!</span>
          )}
        </form>
      </div>
    </div>
  );
}
