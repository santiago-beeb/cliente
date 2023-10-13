import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="vertical-center">
      <Helmet>
        <title>Página no encontrada || General Shop</title>
      </Helmet>
      <div className="container">
        <div id="notfound" className="text-center ">
          <h1>😮</h1>
          <h2>¡Ups! Página no encontrada</h2>
          <p>Lo siento, pero la página que estás buscando no existe.</p>
          <Link to="/">Volver a la página de inicio</Link>
        </div>
      </div>
    </div>
  );
};

export { NotFound };
