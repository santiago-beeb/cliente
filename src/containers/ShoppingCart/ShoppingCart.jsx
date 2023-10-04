import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import Checkout from "../../pages/Checkout/Checkout";
import "./ShoppingCart.css";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";

const ShoppingCart = () => {
  const { isCartOpen, toggleCart } = useContext(AppContext);

  const sumTotal = () => {
    const reducer = (accumulator, currentValue) =>
      accumulator + currentValue.price;
    return reducer;
  };

  return (
    <aside className={`ShoppingCart ${isCartOpen ? "open" : ""}`}>
      <div className="title-container">
        <Typography variant="h6" onClick={toggleCart} className="title">
          My order
        </Typography>
      </div>
      <div className="my-order-content">
        <div className="order">
          <Typography variant="body1">
            <span>Total</span>
          </Typography>
          <Typography variant="h6">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(sumTotal())}
          </Typography>
        </div>
        <Link onClick={toggleCart} to="/checkout">
          <Button variant="contained" className="primary-button">
            Checkout
          </Button>
        </Link>
      </div>
      {isCartOpen && <Checkout />}
    </aside>
  );
};

export { ShoppingCart };
