import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { CardMedia } from "@mui/material";
import { useState } from "react";
import { ProductInfo } from "../ProductInfo/ProductInfo";

function SearchItem({ product }) {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <List
        onClick={openModal}
        sx={{
          width: "100%",
          bgcolor: "background.paper",
        }}
      >
        <ListItem button>
          <ListItemAvatar>
            <CardMedia
              component="img"
              height="150"
              image={product.pdc_imagen}
              alt={product.pdc_descripcion}
            />
          </ListItemAvatar>
          <ListItemText
            primary={product.pdc_descripcion}
            secondary={`$${product.pdc_valor}`}
          />
        </ListItem>
      </List>
      {modalOpen && <ProductInfo product={product} onClose={closeModal} />}
    </div>
  );
}

export default SearchItem;