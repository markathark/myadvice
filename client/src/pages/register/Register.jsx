import { useState } from "react";
import { axiosInstance } from "../../config";
import "./register.css";

export default function Register(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    if (confirmPass !== password) {
      setError(true);
    } else {
      try {
        const res = await axiosInstance.post("auth/register", {
          username,
          email,
          password,
        });
        res.data && window.location.replace("/login");
      } catch (error) {
        console.log(error);
        setError(true);
      }
    }
  };

  return (
    <div className="register">
      <form action="" className="register-form" onSubmit={handleSubmit}>
        <span> {props.message} </span>
        <span className="register-title">Register</span>
        <label>Username</label>
        <input
          type="text"
          className="register-input"
          autoFocus
          placeholder="Enter your Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          type="text"
          className="register-input"
          placeholder="Enter your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          className="register-input"
          placeholder="Enter your Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Confirm Password</label>
        <input
          type="password"
          className="register-input"
          placeholder="Confirm your Password"
          onChange={(e) => setConfirmPass(e.target.value)}
        />
        {error && (
          <span className="register-error">ERROR. PLEASE TRY AGAIN.</span>
        )}

        <button className="register-button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
