import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { AppContext } from "../../context/AppContext";
import "./Checkout.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import Confirm from "../../components/Confirm/Confirm";

const Checkout = () => {
  const { cart } = useContext(AppContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState("");

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const invoiceSubtotal = cart.reduce(
    (acc, item) => acc + item.pdc_valor * item.quantity,
    0
  );

  return (
    <div>
      <Helmet>
        <title>Checkout || General Shop</title>
      </Helmet>
      <div>
        <div className="product-container">
          <TableContainer component={Paper}>
            <Table aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={5}>
                    <Typography variant="h4">Pedido</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h5">Total</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Descripción</TableCell>
                  <TableCell>Talla</TableCell>
                  <TableCell align="right">Cantidad</TableCell>
                  <TableCell align="right">Precio Unitario</TableCell>
                  <TableCell align="right">Precio Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((item) => (
                  <TableRow key={item.pdc_descripcion}>
                    <TableCell>
                      <img
                        className="product-imagen"
                        src={item.pdc_imagen}
                        alt={item.pdc_descripcion}
                      />
                    </TableCell>
                    <TableCell>{item.pdc_descripcion}</TableCell>
                    <TableCell>{item.size}</TableCell>
                    <TableCell align="right">{item.quantity}</TableCell>
                    <TableCell align="right">${item.pdc_valor}</TableCell>
                    <TableCell align="right">
                      ${item.pdc_valor * item.quantity}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={5}>Total</TableCell>
                  <TableCell align="right">${invoiceSubtotal}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="center-button">
          <TextField
            label="Dirección de entrega"
            type="text"
            disabled={cart.length === 0}
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
          />
          <div>
            <Button
              variant="outlined"
              color="secondary"
              disabled={deliveryAddress.trim() === ""}
              onClick={openModal}
            >
              Confirmar
            </Button>
          </div>
        </div>
      </div>
      {modalOpen && (
        <Confirm
          onClose={closeModal}
          deliveryAddress={deliveryAddress}
          invoiceSubtotal={invoiceSubtotal}
        />
      )}
    </div>
  );
};

export { Checkout };
