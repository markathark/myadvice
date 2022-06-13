import { Routes, Route } from "react-router-dom";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import React, { useContext } from "react";
import Login from "./pages/login/Login";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Search from "./pages/search/Search";
import { Context } from "./context/Context";
import Wrapper from "./components/wrapper/Wrapper";
import Categories from "./pages/categories/Categories";

function App() {
  const { user } = useContext(Context);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Wrapper />}>
          <Route index element={<Home />} />
          <Route path="categories" element={<Categories />} />
          <Route path="search" element={<Search />} />
          <Route path="login" element={user ? <Home /> : <Login />} />
          <Route
            path="write"
            element={
              user ? (
                <Write />
              ) : (
                <Login message="You must be logged in to create an advisory post" />
              )
            }
          />
          <Route path="settings" element={user ? <Settings /> : <Login />} />
          <Route path="post/:postId" element={<Single />} />
          <Route path="register" element={user ? <Home /> : <Register />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
