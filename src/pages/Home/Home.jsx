import { Helmet } from "react-helmet";
import { MostSearched } from "../../containers/MostSearched/MostSearched";
import "./Home.css";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>General Shop</title>
      </Helmet>
      <div className="backgroundStyle"></div>
      <section className="mostSearchedSection">
        <MostSearched />
      </section>
    </>
  );
};

export { Home };
