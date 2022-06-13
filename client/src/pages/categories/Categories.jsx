import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config";
import "./categories.css";

const Categories = () => {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const fetchCats = async () => {
      const res = await axiosInstance.get("/categories");
      setCats(res.data);
    };
    fetchCats();
  }, []);

  return (
    <div className="cats-wrapper">
      <div className="cats">
        <div className="cats-title">Categories</div>
        <div className="cats-list">
          {cats
            ? cats?.map((c) => (
                <div className="cats-card" key={c.name}>
                  <Link to={"/search/?cat=" + c.name.toLowerCase()}>
                    <img src={c.image} className="cats-card__img" />
                    <div className="cats-card__title">{c.name}</div>
                    <div className="cats-card__desc">{c.desc}</div>
                    <div className="cats-readmore">→</div>
                  </Link>
                </div>
              ))
            : "No Categories Found"}
        </div>
      </div>
    </div>
  );
};

export default Categories;
