import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Modal,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useContext, useState } from "react";
import "./ProductInfo.css";
import { AppContext } from "../../context/AppContext";

const ProductInfo = ({ product, onClose }) => {
  const { addToCart, sizeQuantities, selectedSize, setSelectedSize } =
    useContext(AppContext);

  console.log(sizeQuantities);
  const [quantity, setQuantity] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setSeverity("");
  };

  const handleAddToCart = () => {
    if (
      quantity > 0 &&
      quantity <= product[`cant_${selectedSize.toLowerCase()}`]
    ) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product, selectedSize, quantity);
      }
      setSelectedSize("");
      setAddedToCart(true);
      setSnackbarMessage("Producto agregado al carrito");
      setSeverity("success");
      setErrorMessage("");
      setTimeout(() => {
        setAddedToCart(false);
      }, 3000);
    } else {
      setErrorMessage("Cantidad no válida para la talla seleccionada.");
      setSeverity("error");
    }
  };

  return (
    <>
      <Modal open={true} onClose={onClose}>
        <Box className="modal-container">
          <div className="modal-card">
            <div className="modal-image">
              <img src={product.pdc_imagen} alt={product.pdc_descripcion} />
            </div>
            <div className="modal-info">
              <Typography variant="h4">{product.pdc_descripcion}</Typography>
              <Typography variant="h5" className="modal-price">
                ${product.pdc_valor}
              </Typography>
              <Typography>
                {product.pdc_descripcion}, diseñado por {product.pdc_fk_marca}{" "}
                en un tono {product.pdc_fk_color} especialmente para{" "}
                {product.pdc_fk_seccion}.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  "& > *": {
                    m: 1,
                  },
                }}
              >
                <ButtonGroup variant="text" aria-label="text button group">
                  <Button
                    onClick={() => setSelectedSize("XS")}
                    variant={selectedSize === "XS" ? "contained" : "text"}
                    disabled={sizeQuantities[product.pdc_id].XS === 0}
                  >
                    XS
                  </Button>
                  <Button
                    onClick={() => setSelectedSize("S")}
                    variant={selectedSize === "S" ? "contained" : "text"}
                    disabled={sizeQuantities[product.pdc_id].S === 0}
                  >
                    S
                  </Button>
                  <Button
                    onClick={() => setSelectedSize("M")}
                    variant={selectedSize === "M" ? "contained" : "text"}
                    disabled={sizeQuantities[product.pdc_id].M === 0}
                  >
                    M
                  </Button>
                  <Button
                    onClick={() => setSelectedSize("L")}
                    variant={selectedSize === "L" ? "contained" : "text"}
                    disabled={sizeQuantities[product.pdc_id].L <= 0}
                  >
                    L
                  </Button>
                  <Button
                    onClick={() => setSelectedSize("XL")}
                    variant={selectedSize === "XL" ? "contained" : "text"}
                    disabled={sizeQuantities[product.pdc_id].XL === 0}
                  >
                    XL
                  </Button>
                </ButtonGroup>

                <div className="quantity-selector">
                  <TextField
                    label="Cantidad"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min={1}
                    max={product[`cant_${selectedSize.toLowerCase()}`]}
                  />
                </div>
                {errorMessage && (
                  <Typography variant="caption" color="red">
                    {errorMessage}
                  </Typography>
                )}
              </Box>
              <div className="modal-button-container">
                <Button
                  className="modal-button checkout-icon"
                  variant="outlined"
                  color="secondary"
                  onClick={onClose}
                >
                  Cerrar
                </Button>
                <Button
                  className="modal-button cart-icon"
                  variant="outlined"
                  color="secondary"
                  onClick={handleAddToCart}
                >
                  {addedToCart ? (
                    <ShoppingCartCheckoutIcon disabled />
                  ) : (
                    <AddShoppingCartIcon />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export { ProductInfo };
