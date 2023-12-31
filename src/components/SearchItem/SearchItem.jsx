import { useState } from "react";
import { ProductInfo } from "@components/ProductInfo/ProductInfo";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";

function SearchItem({ product, handleClick }) {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
    handleClick();
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <List onClick={openModal}>
        <ListItem button>
          <ListItemAvatar>
            <img
              className="img-search-item"
              height={150}
              width={150}
              src={`data:image/jpeg;base64,${product.pdc_imagen}`}
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
