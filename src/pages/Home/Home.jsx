import { MostSearched } from "../../containers/MostSearched/MostSearched";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="backgroundStyle"></div>
      <section className="mostSearchedSection">
        <MostSearched />
      </section>
    </>
  );
};

export { Home };
