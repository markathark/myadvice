import React, { useContext, useEffect, useRef, useState } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import { IoPersonCircleOutline, IoChevronDownOutline } from "react-icons/io5";
import Image from "../../img/logo.svg";

const Navbar = () => {
  const { user, dispatch } = useContext(Context);
  const PF = "https://myadvice-app.herokuapp.com/images/";
  const [menu, setMenu] = useState(true);
  const navNode = useRef();
  let navigate = useNavigate();

  useEffect(() => {
    let maybeHandler = (event) => {
      if (!navNode.current.contains(event.target)) {
        setMenu(true);
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <div className="navbar-wrapper">
      <div className="top">
        <div className="top-left">
          <Link to="/" className="nav-logo">
            <img src={Image} alt="" />
          </Link>
        </div>
        <div className="top-right">
          <ul className="top-menu">
            <li className="top-menu__link">
              <Link to="/search/">Posts</Link>
            </li>
            <li className="top-menu__link">
              <Link to="/categories">Categories</Link>
            </li>
            <li className="top-menu__link write-link">
              <Link to="/write">Advise</Link>
            </li>
          </ul>
          <Link to="/settings">
            {user?.profilePic ? (
              <img src={PF + user.profilePic} alt="" className="top-usericon" />
            ) : (
              <IoPersonCircleOutline className="top-usericon top-usericon__logo" />
            )}
          </Link>
          <div ref={navNode}>
            <IoChevronDownOutline
              className="top-icon"
              onClick={() => setMenu(!menu)}
            />

            <div className={menu ? "nav-menu" : "nav-menu active"}>
              <ul className="nav-menu__links">
                {user && (
                  <>
                    <li className="nav-menu__link">
                      <Link to={"/search/?user=" + user.username}>
                        My Posts
                      </Link>
                    </li>
                  </>
                )}
                <li className="nav-menu__link active">
                  <Link
                    to="/write"
                    onClick={() => {
                      setMenu(true);
                    }}
                  >
                    New Post
                  </Link>
                </li>
                <li className="nav-menu__link active">
                  <Link
                    to="/search"
                    onClick={() => {
                      setMenu(true);
                    }}
                  >
                    Browse Posts
                  </Link>
                </li>
                <li className="nav-menu__link active">
                  <Link
                    to="/categories"
                    onClick={() => {
                      setMenu(true);
                    }}
                  >
                    Categories{" "}
                  </Link>
                </li>

                {user ? (
                  <li className="nav-menu__link" onClick={handleLogout}>
                    <span
                      onClick={() => {
                        setMenu(true);
                      }}
                    >
                      Logout
                    </span>
                  </li>
                ) : (
                  <>
                    <li
                      className="nav-menu__link"
                      onClick={() => {
                        setMenu(true);
                      }}
                    >
                      <Link to="/login">Login</Link>
                    </li>
                    <li
                      className="nav-menu__link"
                      onClick={() => {
                        setMenu(true);
                      }}
                    >
                      <Link to="/register">Register</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
