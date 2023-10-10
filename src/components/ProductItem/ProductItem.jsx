import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { CardActions } from "@mui/material";

const ProductItem = ({ product }) => {
  return (
    <Card
      sx={{
        width: "100%",
        backgroundColor: "#f5f5f5",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="450"
          image={product.pdc_imagen}
          alt={product.pdc_descripcion}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.pdc_descripcion}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Añadir al carrito
        </Button>
      </CardActions>
    </Card>
  );
};

export { ProductItem };
