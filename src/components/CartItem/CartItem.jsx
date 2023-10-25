import { List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const CartItem = ({ item }) => {
  const { removeFromCart, selectedSize } = useContext(AppContext);

  return (
    <div className="cart-item">
      <List>
        <ListItem>
          <ListItemAvatar>
            <img
              height={100}
              width={100}
              src={item.pdc_imagen}
              alt={item.pdc_descripcion}
            />
          </ListItemAvatar>
          <ListItemText
            primary={item.pdc_descripcion}
            secondary={`$${item.pdc_valor} x${item.quantity}`}
          />
          <ListItemText secondary={`Talla: ${selectedSize}`} />
          <CloseIcon
            style={{ cursor: "pointer" }}
            onClick={() => removeFromCart(item.pdc_id)}
          />
        </ListItem>
      </List>
    </div>
  );
};

export default CartItem;
