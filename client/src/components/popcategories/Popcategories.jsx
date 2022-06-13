import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config";
import "./popcategories.css";

const Popcategories = () => {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const fetchCats = async () => {
      const res = await axiosInstance.get("/categories");
      setCats(res.data.filter((cat) => cat.trending));
    };
    fetchCats();
  }, []);

  return (
    <div className="popcat-wrapper">
      <div className="popcat-title">Popular Categories</div>

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
  );
};

export default Popcategories;
