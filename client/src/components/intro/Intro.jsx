import { Link } from "react-router-dom";
import "./intro.css";

const Intro = () => {
  return (
    <div className="intro-wrapper">
      <div className="intro-article">
        <div className="intro-article__title">
          A knowledge ecosystem for every individual
        </div>
        <div className="intro-article__desc">
          MyAdvice aims to be a catalyst for every individual to search for
          knowledge for their own improvement, but also for them to share their
          own expertise.
        </div>
        <Link to="/search">
          <button className="intro-article__more">Start Reading</button>
        </Link>
      </div>
    </div>
  );
};

export default Intro;
