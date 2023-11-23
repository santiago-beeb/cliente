import { useContext } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  Paper,
  Typography,
  Button,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Confirm from "@components/Confirm/Confirm";
import { AppContext } from "@context/AppContext";
import "./Checkout.css";

const Checkout = () => {
  const {
    cart,
    openModalConfirm,
    modalOpenConfirm,
    isEmptyAddress,
    handleAddressChange,
    street,
    streetName,
    number,
    plateNumber,
    info,
    city,
    department,
    snackbarMessageConfirm,
    snackbarOpenConfirm,
    severityConfirm,
    handleSnackbarConfirmClose,
    removeFromCart,
  } = useContext(AppContext);

  const completeAddress = `${street} ${streetName} # ${number} - ${plateNumber} ${info}, ${city} - ${department}`;

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
                    src={`data:image/jpeg;base64,${item.pdc_imagen}`}
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
                  <CloseIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => removeFromCart(item.pdc_id, item.size)}
                  />
                </div>
              ))}
              <div className="checkout-total">
                <Typography variant="subtitle1">Total :</Typography>
                <Typography variant="subtitle1">${invoiceSubtotal}</Typography>
              </div>
            </Paper>
            <div className="checkout-form-address">
              <div className="checkout-input">
                <TextField
                  label="Tipo de via"
                  placeholder="Ej: calle"
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
                  label="Nombre de via"
                  placeholder="23 sur"
                  type="text"
                  variant="standard"
                  value={streetName}
                  onChange={(e) =>
                    handleAddressChange("streetName", e.target.value)
                  }
                />
              </div>
              <div className="checkout-input-number">
                <p>#</p>
                <TextField
                  label="Número"
                  placeholder="36C"
                  type="text"
                  variant="standard"
                  value={number}
                  onChange={(e) =>
                    handleAddressChange("number", e.target.value)
                  }
                />
              </div>
              <div className="checkout-input-number">
                <p>-</p>
                <TextField
                  label="Número de placa"
                  placeholder="20"
                  type="text"
                  variant="standard"
                  value={plateNumber}
                  onChange={(e) =>
                    handleAddressChange("plateNumber", e.target.value)
                  }
                />
              </div>
              <div className="checkout-input">
                <TextField
                  label="Info adicional"
                  placeholder="Ej: barrio"
                  type="text"
                  variant="standard"
                  value={info}
                  onChange={(e) => handleAddressChange("info", e.target.value)}
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
