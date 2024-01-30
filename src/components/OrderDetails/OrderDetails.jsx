import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { CardMedia } from "@mui/material";

const OrderDetails = ({ details }) => (
  <List>
    {details.map((product) => (
      <ListItem key={product.detalle_id}>
        <ListItemAvatar>
          <CardMedia
            component="img"
            loading="lazy"
            height="80"
            image={`data:image/jpeg;base64,${product.producto_imagen}`}
            alt={product.producto_nombre}
          />
        </ListItemAvatar>
        <ListItemText
          primary={product.producto_nombre}
          secondary={`Cantidad: ${product.cantidad} - Talla: ${product.producto_talla}`}
        />
      </ListItem>
    ))}
  </List>
);

export default OrderDetails;
