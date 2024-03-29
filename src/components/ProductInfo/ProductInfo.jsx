import { useContext, useState } from "react";
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
import { AppContext } from "@context/AppContext";
import "./ProductInfo.css";

const ProductInfo = ({ product, onClose }) => {
  const { addToCart, selectedSize, setSelectedSize, sizeQuantities } =
    useContext(AppContext);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setSnackbarMessage("");
    setSeverity("");
  };

  const handleAddToCart = () => {
    if (
      quantity > 0 &&
      quantity <= sizeQuantities[product.pdc_id][selectedSize]
    ) {
      addToCart(product, selectedSize, quantity);
      setSelectedSize("");
      setAddedToCart(true);
      setSnackbarOpen(true);
      setSnackbarMessage("Producto agregado al carrito");
      setSeverity("success");
      setTimeout(() => {
        setAddedToCart(false);
      }, 3000);
    } else {
      setSnackbarOpen(true);
      setSnackbarMessage("Cantidad sin stock para la talla seleccionada.");
      setSeverity("error");
    }
  };

  return (
    <>
      <Modal open={true} onClose={onClose}>
        <Box className="modal-container">
          <div className="modal-card">
            <div className="modal-image">
              <img
                src={`data:image/jpeg;base64,${product.pdc_imagen}`}
                alt={product.pdc_descripcion}
              />
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
                    disabled={
                      sizeQuantities[product.pdc_id] &&
                      sizeQuantities[product.pdc_id].XS <= 0
                    }
                  >
                    XS
                  </Button>
                  <Button
                    onClick={() => setSelectedSize("S")}
                    variant={selectedSize === "S" ? "contained" : "text"}
                    disabled={
                      sizeQuantities[product.pdc_id] &&
                      sizeQuantities[product.pdc_id].S <= 0
                    }
                  >
                    S
                  </Button>
                  <Button
                    onClick={() => setSelectedSize("M")}
                    variant={selectedSize === "M" ? "contained" : "text"}
                    disabled={
                      sizeQuantities[product.pdc_id] &&
                      sizeQuantities[product.pdc_id].M <= 0
                    }
                  >
                    M
                  </Button>
                  <Button
                    onClick={() => setSelectedSize("L")}
                    variant={selectedSize === "L" ? "contained" : "text"}
                    disabled={
                      sizeQuantities[product.pdc_id] &&
                      sizeQuantities[product.pdc_id].L <= 0
                    }
                  >
                    L
                  </Button>
                  <Button
                    onClick={() => setSelectedSize("XL")}
                    variant={selectedSize === "XL" ? "contained" : "text"}
                    disabled={
                      sizeQuantities[product.pdc_id] &&
                      sizeQuantities[product.pdc_id].XL <= 0
                    }
                  >
                    XL
                  </Button>
                </ButtonGroup>

                {/* <ButtonGroup variant="text" aria-label="text button group">
                  {["XS", "S", "M", "L", "XL"].map((size) => (
                    <Button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      variant={selectedSize === size ? "contained" : "text"}
                      disabled={
                        sizeQuantities[product.pdc_id] &&
                        sizeQuantities[product.pdc_id][size] <= 0
                      }
                    >
                      {size}
                    </Button>
                  ))}
                </ButtonGroup> */}

                <div className="quantity-selector">
                  <TextField
                    label="Cantidad"
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      let value = parseInt(e.target.value, 10);
                      if (value < 1) {
                        value = 1;
                      }
                      setQuantity(value);
                    }}
                    min={1}
                    max={product[`cant_${selectedSize.toLowerCase()}`]}
                  />
                </div>
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
                  disabled={!selectedSize.length}
                  onClick={handleAddToCart}
                >
                  {addedToCart ? (
                    <ShoppingCartCheckoutIcon />
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
