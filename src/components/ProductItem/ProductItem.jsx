import { useState } from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { ProductInfo } from "../ProductInfo/ProductInfo";

const ProductItem = ({ product }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Card
        sx={{
          width: "100%",
          backgroundColor: "#f5f5f5",
        }}
      >
        <CardActionArea onClick={openModal}>
          <CardMedia
            component="img"
            loading="lazy"
            height="450"
            image={product.pdc_imagen}
            alt={product.pdc_descripcion}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.pdc_descripcion}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              ${product.pdc_valor}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      {modalOpen && <ProductInfo product={product} onClose={closeModal} />}
    </>
  );
};

export default ProductItem;
