import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import { Button, Typography, Grid } from "@mui/material"; // Se agrega Grid
import CartItem from "../../components/CartItem/CartItem";
import "./ShoppingCart.css";

const ShoppingCart = () => {
  const { isCartOpen, closeCart, cart } = useContext(AppContext);

  const total = cart.reduce(
    (acc, item) => acc + item.pdc_valor * item.quantity,
    0
  );

  return (
    <aside className={`shopping-cart ${isCartOpen ? "open" : ""}`}>
      <div className="title-container">
        <Typography variant="h4" className="title">
          Carrito de compras
        </Typography>
        <hr />
      </div>
      {cart.length > 0 ? (
        <div className="my-order-content">
          {cart.map((item) => (
            <CartItem key={item.pdc_id} item={item} />
          ))}
          <Grid container className="total">
            <Grid item xs={7}>
              <Typography variant="h6">
                <span>Total: </span>
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="h6">{`$${total}`}</Typography>
            </Grid>
          </Grid>
          {cart.length > 0 && (
            <div className="center-button">
              <Link onClick={closeCart} to="/checkout">
                <Button variant="outlined" color="secondary">
                  Comprar
                </Button>
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="empty-cart">
          <h1>😮</h1>
          <p className="p-cart">El carrito está vacío.</p>
          <p className="p-cart">Prueba agregando más productos</p>
        </div>
      )}
    </aside>
  );
};

export { ShoppingCart };
