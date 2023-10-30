import {
  Alert,
  Box,
  Button,
  Modal,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import "./Confirm.css";

const Confirm = ({ completeAddress, invoiceSubtotal }) => {
  const {
    nombre,
    correo,
    confirmOrder,
    cart,
    id,
    closeModalConfirm,
    snackbarMessageConfirm,
    snackbarOpenConfirm,
    severityConfirm,
    loadingConfirm,
  } = useContext(AppContext);

  const addOrder = () => {
    const sizeUpdates = cart.map((item) => ({
      productId: item.pdc_id,
      size: `cant_${item.size}`,
      quantity: item.quantity,
    }));

    const order = {
      total: invoiceSubtotal,
      usr_id: id,
      deliveryAddress: completeAddress,
      sizeUpdates: sizeUpdates,
      userEmail: correo,
    };

    confirmOrder(order);
  };

  return (
    <>
      <Modal open={true} onClose={closeModalConfirm}>
        <Box className="confirm-modal-container">
          <div className="confirm-modal-card">
            <div className="confirm-modal-info">
              <Typography variant="h5">Confirmación de orden</Typography>
              <Typography variant="h6" className="confirm-modal-price">
                Información Personal:
              </Typography>
              <Typography>Nombre: {nombre}</Typography>
              <Typography>Email: {correo}</Typography>

              <Typography variant="h6" className="confirm-modal-price">
                Dirección de Entrega:
              </Typography>
              <Typography>{completeAddress}</Typography>

              <div className="confirm-modal-button-container">
                <Stack direction="row" spacing={2}>
                  <Button
                    className="confirm-modal-button checkout-icon"
                    variant="outlined"
                    color="secondary"
                    onClick={closeModalConfirm}
                    disabled={loadingConfirm}
                  >
                    Cancelar
                  </Button>
                  <Button
                    className="confirm-modal-button cart-icon"
                    variant="contained"
                    color="success"
                    onClick={addOrder}
                    disabled={loadingConfirm}
                  >
                    Confirmar Pedido
                  </Button>
                </Stack>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
      <Snackbar open={snackbarOpenConfirm} autoHideDuration={6000}>
        <Alert
          severity={severityConfirm}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessageConfirm}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Confirm;
