import { useEffect, useState } from "react";
import { axiosInstance } from "../../config";
import Posts from "../posts/Posts";
import "./popposts.css";

const PopPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axiosInstance.get("/posts/?feat=trending");
      setPosts(res.data);
    };
    fetchPosts();
  }, []);
  return (
    <div className="poppost-wrapper">
      <div className="poppost-title">Top Posts</div>
      <Posts posts={posts} />
    </div>
  );
};

export default PopPosts;
