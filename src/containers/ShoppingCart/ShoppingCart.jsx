import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Checkout } from "../../pages/Checkout/Checkout";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import CartItem from "../../components/CartItem/CartItem";
import "./ShoppingCart.css";

const ShoppingCart = () => {
  const { isCartOpen, closeCart, cart } = useContext(AppContext);

  const total = cart.reduce(
    (acc, item) => acc + item.pdc_valor * item.quantity,
    0
  );

  return (
    <aside className={`ShoppingCart ${isCartOpen ? "open" : ""}`}>
      <div className="title-container">
        <Typography variant="h4" className="title">
          Carrito de compras
        </Typography>
        <hr />
      </div>
      <div className="my-order-content">
        {cart.length > 0 ? (
          <div>
            {cart.map((item) => (
              <CartItem key={item.pdc_id} item={item} />
            ))}
            <div className="order">
              <Typography variant="body1">
                <span>Total</span>
              </Typography>
              <Typography variant="h6">{`$${total}`}</Typography>
            </div>
            {cart.length > 0 && (
              <Link onClick={closeCart} to="/checkout">
                <Button variant="contained">Checkout</Button>
              </Link>
            )}
          </div>
        ) : (
          <p className="p-cart">El carrito está vacío.</p>
        )}
      </div>
      {isCartOpen && <Checkout />}
    </aside>
  );
};

export { ShoppingCart };
