import { Alert, Box, Button, Modal, Snackbar, Typography } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const Confirm = ({ deliveryAddress, invoiceSubtotal }) => {
  const {
    nombre,
    correo,
    confirmOrder,
    cart,
    id,
    closeModalConfirm,
    snackbarMessageConfirm,
    snackbarOpenConfirm,
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
      deliveryAddress: deliveryAddress,
      sizeUpdates: sizeUpdates,
      userEmail: correo,
    };

    confirmOrder(order);
  };

  return (
    <>
      <Modal open={true} onClose={closeModalConfirm}>
        <Box className="modal-container">
          <div className="modal-card">
            <div className="modal-info">
              <Typography variant="h4">Confirmación de Pedido</Typography>
              <Typography variant="h5" className="modal-price">
                Información Personal:
              </Typography>
              <Typography>Nombre: {nombre}</Typography>
              <Typography>Email: {correo}</Typography>

              <Typography variant="h5" className="modal-price">
                Dirección de Entrega:
              </Typography>
              <Typography>{deliveryAddress}</Typography>

              <div className="modal-button-container">
                <Button
                  className="modal-button checkout-icon"
                  variant="outlined"
                  color="secondary"
                  onClick={closeModalConfirm}
                >
                  Cancelar
                </Button>
                <Button
                  className="modal-button cart-icon"
                  variant="outlined"
                  color="secondary"
                  onClick={addOrder}
                >
                  Confirmar Pedido
                </Button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
      <Snackbar open={snackbarOpenConfirm} autoHideDuration={6000}>
        <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
          {snackbarMessageConfirm}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Confirm;
