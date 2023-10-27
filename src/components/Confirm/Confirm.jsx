import { Box, Button, Modal, Typography } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const Confirm = ({ onClose, deliveryAddress, invoiceSubtotal }) => {
  const { nombre, correo, confirmOrder, cart, id } = useContext(AppContext);

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
    };
  
    confirmOrder(order);
  };
  

  return (
    <Modal open={true} onClose={onClose}>
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
                onClick={onClose}
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
  );
};

export default Confirm;
