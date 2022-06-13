import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-container">
        <div className="footer-about">
          <div className="footer-title">MyAdvice</div>
          MyAdvice aims to take your skillset to the next level. By sharing and
          giving, as a community we grow.
        </div>
        <div className="footer-links">
          <div className="footer-title">My Advice</div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/search">Categories</Link>
            </li>
            <li>
              <Link to="/write">Write</Link>
            </li>
          </ul>
        </div>
        <div className="footer-socials">
          <div className="footer-title">Socials</div>
          <ul>
            <li>
              <Link to="/">Facebook</Link>
            </li>
            <li>
              <Link to="/">Instagram</Link>
            </li>
            <li>
              <Link to="/">Twitter</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
