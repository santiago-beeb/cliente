import { useContext } from "react";
import { Helmet } from "react-helmet";
import { AppContext } from "../../context/AppContext";
import "./Checkout.css";

const Checkout = () => {
  const { cart } = useContext(AppContext);

  return (
    <div>
      <Helmet>
        <title>Checkout || General Shop</title>
      </Helmet>
      <div>
        <div className="product-container">
          <h1>Pedido</h1>
          <table>
            {cart.map((item) => (
              <div key={item._id}>
                <p>Producto: {item.pdc_descripcion}</p>
                <img
                  className="product-imagen"
                  src={item.pdc_imagen}
                  alt={item.pdc_descripcion}
                />
                <p>
                  Price: ${item.pdc_valor} x {item.quantity}
                </p>
              </div>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export { Checkout };
