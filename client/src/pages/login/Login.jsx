import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config";
import { Context } from "../../context/Context";
import "./login.css";

export default function Login(props) {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axiosInstance.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: "LOGIN_FAILURE" });
      setErrorMsg("Wrong Credentials");
    }
  };

  const handleGuest = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axiosInstance.post("/auth/login", {
        username: "Guest",
        password: "123456",
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: "LOGIN_FAILURE" });
      setErrorMsg("Wrong Credentials");
    }
  };

  return (
    <div className="login">
      <form action="" className="login-form" onSubmit={handleSubmit}>
        {props.message && (
          <span className="login-message">{props.message}</span>
        )}
        <span className="login-title">Login</span>

        <input
          id="user"
          type="text"
          className="login-input"
          placeholder="Enter your Username"
          ref={userRef}
        />
        <input
          id="pw"
          type="password"
          className="login-input"
          placeholder="Enter your Password"
          ref={passwordRef}
        />

        <button className="login-button" type="submit" disabled={isFetching}>
          Login
        </button>
        {errorMsg && (
          <span className="login-error">ERROR. PLEASE TRY AGAIN.</span>
        )}
      </form>

      <span className="login-register">
        <div className="login-test" onClick={handleGuest}>
          Click here to Log In as Guest (Testing)
        </div>
        <Link to="/register">Don't have an account? Register here</Link>
      </span>
    </div>
  );
}
