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
        maxWidth: 800,
        margin: "16px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="400"
          image={product.pdc_imagen}
          alt={product.pdc_descripcion}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.pdc_descripcion}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            {product.pdc_descripcion}
          </Typography> */}
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
