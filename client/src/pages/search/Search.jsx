import React, { useEffect, useState } from "react";
import Posts from "../../components/posts/Posts";

import "./search.css";
import { useLocation } from "react-router-dom";
import { axiosInstance } from "../../config";

const Search = () => {
  const [posts, setPosts] = useState([]);

  const { search } = useLocation();
  const title = search.split("=");

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axiosInstance.get("/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  return (
    <div className="search">
      {title[1] ? (
        <div className="search-title">{title[1]}</div>
      ) : (
        <div className="search-title">Posts</div>
      )}
      <div className="search-posts">
        <Posts posts={posts} />
      </div>
    </div>
  );
};

export default Search;
