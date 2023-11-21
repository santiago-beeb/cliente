import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  MenuItem,
  ButtonGroup,
  Snackbar,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { useGetProducts } from "@hooks/useGetProducts";
import { Loading } from "@components/Loading/Loading";
import { AppContext } from "@context/AppContext";
import "./AdminProduct.css";

const API = "https://server-orcin-seven.vercel.app/api/product/products";
const addApi = "https://server-orcin-seven.vercel.app/api/product/product-add";
const token = localStorage.getItem("token");

function AdminProduct() {
  const { cargando, fetchMarcas, fetchColores, fetchEstados, fetchSecciones } =
    useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [update, setUpdate] = useState(false);
  const { products, loading, error } = useGetProducts(API, update);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const initialNewProduct = {
    pdc_descripcion: "",
    pdc_fk_seccion: "",
    pdc_fk_marca: "",
    pdc_fk_color: "",
    cant_xs: "",
    cant_s: "",
    cant_m: "",
    cant_l: "",
    cant_xl: "",
    pdc_valor: "",
    pdc_imagen: "",
    pdc_estado: "",
  };

  const [newProduct, setNewProduct] = useState(initialNewProduct);

  const [secciones, setSecciones] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [colores, setColores] = useState([]);
  const [estados, setEstados] = useState([]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setSeverity("");
  };

  // Llama a la función para cargar los datos de los desplegables cuando el componente se monta
  useEffect(() => {
    loadDropdownData();
  }, []);

  // Función para cargar los datos de secciones, marcas, colores y estados
  const loadDropdownData = async () => {
    const seccionesData = await fetchSecciones();
    setSecciones(seccionesData);

    const marcasData = await fetchMarcas();
    setMarcas(marcasData);

    const coloresData = await fetchColores();
    setColores(coloresData);

    const estadosData = await fetchEstados();
    setEstados(estadosData);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const productId = editedProduct.pdc_id;

    let productToSend;
    if (isEditing) {
      productToSend = { ...editedProduct };
    } else {
      productToSend = { ...newProduct };
    }

    try {
      const response = await fetch(
        isEditing
          ? `https://server-orcin-seven.vercel.app/api/product/product-edit/${productId}`
          : addApi,
        {
          method: isEditing ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify(productToSend),
        }
      );
      if (response.ok) {
        setSnackbarOpen(true);
        setSeverity("success");
        if (isEditing) {
          setSnackbarMessage("Producto editado con exito");
        } else {
          setSnackbarMessage("Producto agregado con exito");
        }
        setUpdate((prev) => !prev);
        handleClose();
      } else {
        console.error("Error al añadir el producto");
        setSnackbarOpen(true);
        setSeverity("error");
        setSnackbarMessage("Se a producido el siguiente error" + error);
      }
    } catch (error) {
      console.error(
        `Error al ${isEditing ? "editar" : "añadir"} el producto`,
        error
      );
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(
        `https://server-orcin-seven.vercel.app/api/product/product-delete/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        }
      );
      if (response.ok) {
        setSnackbarOpen(true);
        setSeverity("success");
        setSnackbarMessage("Producto eliminado con exito");
        setUpdate((prev) => !prev);
      } else {
        console.error(`Error al eliminar el producto con ID ${productId}`);
      }
    } catch (error) {
      console.error(
        `Error al eliminar el producto con ID ${productId}:`,
        error
      );
    }
  };

  const handleOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleOpenUpdate = (product) => {
    setIsEditing(true);

    const colorValue = colores.find(
      (color) => color.col_nombre === product.pdc_fk_color
    );

    const seccionValue = secciones.find(
      (seccion) => seccion.sec_nombre === product.pdc_fk_seccion
    );

    const marcaValue = marcas.find(
      (marca) => marca.mar_nombre === product.pdc_fk_marca
    );

    const estadoValue = estados.find(
      (estado) => estado.est_nombre === product.pdc_fk_estado
    );

    const updatedProduct = {
      ...product,
      pdc_fk_seccion: seccionValue ? seccionValue.sec_id : null,
      pdc_fk_marca: marcaValue ? marcaValue.mar_id : null,
      pdc_fk_color: colorValue ? colorValue.col_id : null,
      pdc_estado: estadoValue ? estadoValue.est_id : null,
    };

    setNewProduct(updatedProduct);
    setEditedProduct({ ...updatedProduct });

    setOpenAdd(true);
  };

  const handleOpenAdd = () => {
    setIsEditing(false);
    setOpenAdd(true);
  };

  const handleClose = () => {
    setSelectedProduct(null);
    setOpen(false);
    setOpenAdd(false);
    setNewProduct(initialNewProduct);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = () => {
    if (selectedProduct) {
      deleteProduct(selectedProduct.pdc_id);
      handleClose();
    }
  };

  const filteredProducts = products.filter((product) =>
    product.pdc_descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error al cargar productos: {error.message}</p>;
  }

  return (
    <div className="container">
      <Helmet>
        <title>Administrar Productos || General Shop</title>
      </Helmet>
      <div className="container-title">
        <h2>Lista de productos</h2>
        <TextField
          id="search"
          className="search-product-admin"
          label="Buscar producto"
          type="text"
          variant="standard"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: "15px" }}
        />
        <Button color="success" variant="contained" onClick={handleOpenAdd}>
          <AddIcon></AddIcon>
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Descripción</TableCell>
              <TableCell>Sección</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>XS</TableCell>
              <TableCell>S</TableCell>
              <TableCell>M</TableCell>
              <TableCell>L</TableCell>
              <TableCell>XL</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product) => (
                <TableRow key={product.pdc_id}>
                  <TableCell>{product.pdc_descripcion}</TableCell>
                  <TableCell>{product.pdc_fk_seccion}</TableCell>
                  <TableCell>{product.pdc_fk_marca}</TableCell>
                  <TableCell>{product.pdc_fk_color}</TableCell>
                  <TableCell>{product.cant_xs}</TableCell>
                  <TableCell>{product.cant_s}</TableCell>
                  <TableCell>{product.cant_m}</TableCell>
                  <TableCell>{product.cant_l}</TableCell>
                  <TableCell>{product.cant_xl}</TableCell>
                  <TableCell>{product.pdc_valor}</TableCell>
                  <TableCell>{product.pdc_fk_estado}</TableCell>
                  <TableCell>
                    <ButtonGroup>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleOpenUpdate(product)}
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleOpen(product)}
                      >
                        <DeleteForeverIcon />
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Modal de añadir producto*/}
      <Modal
        keepMounted
        open={openAdd}
        onClose={handleClose}
        variant="contained"
      >
        <Box className="modal-box-add">
          <Typography variant="h6" component="h2">
            {isEditing ? "Editar producto" : "Añadir producto"}
          </Typography>
          <form action="" className="form" onSubmit={handleAddProduct}>
            <TextField
              required
              disabled={cargando}
              type="text"
              id="decripcion"
              name="decripcion"
              label="Descripción"
              variant="standard"
              inputProps={{
                maxLength: 50,
              }}
              value={newProduct.pdc_descripcion}
              onChange={(e) => {
                const newValue = e.target.value;
                setNewProduct({
                  ...newProduct,
                  pdc_descripcion: newValue,
                });
                setEditedProduct({
                  ...editedProduct,
                  pdc_descripcion: newValue,
                });
              }}
            />
            <TextField
              required
              select
              disabled={cargando}
              id="seccion"
              name="seccion"
              label="Sección"
              variant="standard"
              value={newProduct.pdc_fk_seccion}
              onChange={(e) => {
                const newValue = e.target.value;
                setNewProduct({ ...newProduct, pdc_fk_seccion: newValue });
                setEditedProduct({
                  ...editedProduct,
                  pdc_fk_seccion: newValue,
                });
              }}
            >
              {secciones.map((seccion) => (
                <MenuItem key={seccion.sec_id} value={seccion.sec_id}>
                  {seccion.sec_nombre}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              required
              select
              disabled={cargando}
              id="marca"
              name="marca"
              label="Marca"
              variant="standard"
              value={newProduct.pdc_fk_marca}
              onChange={(e) => {
                const newValue = e.target.value;
                setNewProduct({ ...newProduct, pdc_fk_marca: newValue });
                setEditedProduct({ ...editedProduct, pdc_fk_marca: newValue });
              }}
            >
              {marcas.map((marca) => (
                <MenuItem key={marca.mar_id} value={marca.mar_id}>
                  {marca.mar_nombre}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              required
              select
              disabled={cargando}
              id="color"
              name="color"
              label="Color"
              variant="standard"
              value={newProduct.pdc_fk_color}
              onChange={(e) => {
                const newValue = e.target.value;
                setNewProduct({ ...newProduct, pdc_fk_color: newValue });
                setEditedProduct({ ...editedProduct, pdc_fk_color: newValue });
              }}
            >
              {colores.map((color) => (
                <MenuItem key={color.col_id} value={color.col_id}>
                  {color.col_nombre}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              required
              disabled={cargando}
              type="number"
              id="cantidadTallaXS"
              name="cantidadTallaXS"
              label="Cantidad Talla XS"
              variant="standard"
              value={newProduct.cant_xs}
              onChange={(e) => {
                const newValue = e.target.value;
                setNewProduct({ ...newProduct, cant_xs: newValue });
                setEditedProduct({ ...editedProduct, cant_xs: newValue });
              }}
              inputProps={{
                min: 0,
              }}
            />

            <TextField
              required
              disabled={cargando}
              type="number"
              id="cantidadTallaS"
              name="cantidadTallaS"
              label="Cantidad Talla S"
              variant="standard"
              value={newProduct.cant_s}
              onChange={(e) => {
                const newValue = e.target.value;
                setNewProduct({ ...newProduct, cant_s: newValue });
                setEditedProduct({ ...editedProduct, cant_s: newValue });
              }}
              inputProps={{
                min: 0,
              }}
            />
            <TextField
              required
              disabled={cargando}
              type="number"
              id="cantidadTallaM"
              name="cantidadTallaM"
              label="Cantidad Talla M"
              variant="standard"
              value={newProduct.cant_m}
              onChange={(e) => {
                const newValue = e.target.value;
                setNewProduct({ ...newProduct, cant_m: newValue });
                setEditedProduct({ ...editedProduct, cant_m: newValue });
              }}
              inputProps={{
                min: 0,
              }}
            />
            <TextField
              required
              disabled={cargando}
              type="number"
              id="cantidadTallaL"
              name="cantidadTallaL"
              label="Cantidad Talla L"
              variant="standard"
              value={newProduct.cant_l}
              onChange={(e) => {
                const newValue = e.target.value;
                setNewProduct({ ...newProduct, cant_l: newValue });
                setEditedProduct({ ...editedProduct, cant_l: newValue });
              }}
              inputProps={{
                min: 0,
              }}
            />
            <TextField
              required
              disabled={cargando}
              type="number"
              id="cantidadTallaXL"
              name="cantidadTallaXL"
              label="Cantidad Talla XL"
              variant="standard"
              value={newProduct.cant_xl}
              onChange={(e) => {
                const newValue = e.target.value;
                setNewProduct({ ...newProduct, cant_xl: newValue });
                setEditedProduct({ ...editedProduct, cant_xl: newValue });
              }}
            />
            <TextField
              required
              disabled={cargando}
              type="number"
              id="valor"
              name="valor"
              label="Valor"
              variant="standard"
              value={newProduct.pdc_valor}
              onChange={(e) => {
                const newValue = e.target.value;
                setNewProduct({ ...newProduct, pdc_valor: newValue });
                setEditedProduct({ ...editedProduct, pdc_valor: newValue });
              }}
              inputProps={{
                min: 0,
              }}
            />

            <TextField
              required
              disabled={cargando}
              type="text"
              id="imagen"
              name="imagen"
              label="Imagen"
              variant="standard"
              inputProps={{
                maxLength: 255,
              }}
              value={newProduct.pdc_imagen}
              onChange={(e) => {
                const newValue = e.target.value;
                setNewProduct({ ...newProduct, pdc_imagen: newValue });
                setEditedProduct({ ...editedProduct, pdc_imagen: newValue });
              }}
            />
            <TextField
              required
              select
              disabled={cargando}
              id="estado"
              name="estado"
              label="Estado"
              variant="standard"
              value={newProduct.pdc_estado}
              onChange={(e) => {
                const newValue = e.target.value;
                setNewProduct({ ...newProduct, pdc_estado: newValue });
                setEditedProduct({ ...editedProduct, pdc_estado: newValue });
              }}
            >
              {estados.map((estado) => (
                <MenuItem key={estado.est_id} value={estado.est_id}>
                  {estado.est_nombre}
                </MenuItem>
              ))}
            </TextField>

            <div className="container-button">
              <Button variant="outlined" color="error" onClick={handleClose}>
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="success"
                disabled={cargando}
              >
                {isEditing ? "Guardar cambios" : "Crear"}
              </Button>
            </div>
          </form>
        </Box>
      </Modal>

      {/* Modal de confirmación de eliminación */}
      <Modal keepMounted open={open} onClose={handleClose} variant="contained">
        <Box className="modal-box">
          <Typography variant="h6" component="h2">
            Confirmar eliminación
          </Typography>
          {selectedProduct && (
            <>
              <Typography sx={{ mt: 2 }}>
                ¿Estás seguro de que deseas eliminar el producto{" "}
                {selectedProduct.pdc_descripcion}?
              </Typography>
              <div className="container-button">
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleClose}
                >
                  No
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDelete}
                >
                  Sí
                </Button>
              </div>
            </>
          )}
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export { AdminProduct };
