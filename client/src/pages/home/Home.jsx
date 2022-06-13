import "./home.css";
import Intro from "../../components/intro/Intro";
import Newsletter from "../../components/newsletter/Newsletter";
import Popcategories from "../../components/popcategories/Popcategories";
import PopPosts from "../../components/popposts/PopPosts";

const Home = () => {
  return (
    <div className="home">
      <Intro />
      <PopPosts />
      <Popcategories />
      <Newsletter />
    </div>
  );
};

export default Home;
