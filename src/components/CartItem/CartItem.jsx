import { useContext } from "react";
import { List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AppContext } from "@context/AppContext";

const CartItem = ({ item }) => {
  const { removeFromCart } = useContext(AppContext);

  return (
    <div className="cart-item">
      <List>
        <ListItem>
          <ListItemAvatar>
            <img
            className="cart-image"
              height={100}
              width={100}
              src={`data:image/jpeg;base64,${item.pdc_imagen}`}
              alt={item.pdc_descripcion}
            />
          </ListItemAvatar>
          <ListItemText
            primary={item.pdc_descripcion}
            secondary={`$${item.pdc_valor} x${item.quantity}`}
          />
          <ListItemText secondary={`Talla: ${item.size}`} />{" "}
          <CloseIcon
            style={{ cursor: "pointer" }}
            onClick={() => removeFromCart(item.pdc_id, item.size)}
          />
        </ListItem>
      </List>
    </div>
  );
};

export default CartItem;
