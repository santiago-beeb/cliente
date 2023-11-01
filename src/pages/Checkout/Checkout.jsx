import { useContext } from "react";
import { Helmet } from "react-helmet";
import { AppContext } from "../../context/AppContext";
import "./Checkout.css";
import {
  Paper,
  Typography,
  Button,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import Confirm from "../../components/Confirm/Confirm";
import { Link } from "react-router-dom";

const Checkout = () => {
  const {
    cart,
    openModalConfirm,
    modalOpenConfirm,
    isEmptyAddress,
    handleAddressChange,
    street,
    number,
    city,
    department,
    postalCode,
    snackbarMessageConfirm,
    snackbarOpenConfirm,
    severityConfirm,
    handleSnackbarConfirmClose,
  } = useContext(AppContext);

  const completeAddress = `calle ${street} # ${number}, ${city} - ${department}, codigo postal ${postalCode}`;

  const invoiceSubtotal = cart.reduce(
    (acc, item) => acc + item.pdc_valor * item.quantity,
    0
  );

  const isCartEmpty = cart.length === 0;

  return (
    <div>
      <Helmet>
        <title>Checkout || General Shop</title>
      </Helmet>
      <div>
        {isCartEmpty ? (
          <div className="empty-cart-message">
            <Typography variant="h3">
              Tu carrito de compras está vacío
            </Typography>
            <Typography variant="body3">
              Para hacer una compra, navega por las categorías del sitio o busca
              un producto.
            </Typography>
            <Link to="/">
              <Button variant="outlined" color="secondary">
                Volver al inicio
              </Button>
            </Link>
          </div>
        ) : (
          <div className="checkout-product-container">
            <Typography variant="h4">Pedido</Typography>
            <Paper elevation={3} className="checkout-product-list">
              {cart.map((item) => (
                <div
                  key={item.pdc_descripcion}
                  className="checkout-product-item"
                >
                  <img
                    className="checkout-product-image"
                    src={item.pdc_imagen}
                    alt={item.pdc_descripcion}
                  />
                  <div className="checkout-product-details">
                    <Typography variant="subtitle1">
                      {item.pdc_descripcion}
                    </Typography>
                    <Typography variant="body2">{item.size}</Typography>
                  </div>
                  <div className="checkout-product-quantity">
                    <Typography variant="subtitle1">{item.quantity}</Typography>
                  </div>
                  <div className="checkout-product-price">
                    <Typography variant="body2">
                      ${item.pdc_valor} c/u
                    </Typography>
                    <Typography variant="subtitle1">
                      Total: ${item.pdc_valor * item.quantity}
                    </Typography>
                  </div>
                </div>
              ))}
              <div className="checkout-total">
                <Typography variant="subtitle1">Total :</Typography>
                <Typography variant="subtitle1">${invoiceSubtotal}</Typography>
              </div>
            </Paper>
            <div className="checkout-center-button">
              <div className="checkout-input">
                <TextField
                  label="Calle"
                  type="text"
                  variant="standard"
                  value={street}
                  onChange={(e) =>
                    handleAddressChange("street", e.target.value)
                  }
                />
              </div>
              <div className="checkout-input">
                <TextField
                  label="Número"
                  type="text"
                  variant="standard"
                  value={number}
                  onChange={(e) =>
                    handleAddressChange("number", e.target.value)
                  }
                />
              </div>
              <div className="checkout-input">
                <TextField
                  label="Ciudad"
                  type="text"
                  variant="standard"
                  value={city}
                  onChange={(e) => handleAddressChange("city", e.target.value)}
                />
              </div>
              <div className="checkout-input">
                <TextField
                  label="Departamento"
                  type="text"
                  variant="standard"
                  value={department}
                  onChange={(e) =>
                    handleAddressChange("department", e.target.value)
                  }
                />
              </div>
              <div className="checkout-input">
                <TextField
                  label="Código Postal"
                  type="text"
                  variant="standard"
                  value={postalCode}
                  onChange={(e) =>
                    handleAddressChange("postalCode", e.target.value)
                  }
                />
              </div>
              <div className="checkout-button">
                <Button
                  variant="outlined"
                  color="secondary"
                  disabled={isEmptyAddress() || isCartEmpty}
                  onClick={() => openModalConfirm(completeAddress)}
                >
                  Confirmar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      {modalOpenConfirm && (
        <Confirm
          completeAddress={completeAddress}
          invoiceSubtotal={invoiceSubtotal}
        />
      )}
      <Snackbar
        open={snackbarOpenConfirm}
        onClose={handleSnackbarConfirmClose}
        autoHideDuration={6000}
      >
        <Alert
          onClose={handleSnackbarConfirmClose}
          severity={severityConfirm}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessageConfirm}
        </Alert>
      </Snackbar>
    </div>
  );
};

export { Checkout };
