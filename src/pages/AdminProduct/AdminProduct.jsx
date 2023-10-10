import { useContext, useEffect, useState } from "react";
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
} from "@mui/material";
import { useGetProducts } from "../../hooks/useGetProducts";
import { Loading } from "../../components/Loading/Loading";
import { AppContext } from "../../context/AppContext";
import "./AdminProduct.css";

const API = "https://server-general.up.railway.app/api/product/products";
const addApi = "https://server-general.up.railway.app/api/product/product-add";
const token = sessionStorage.getItem("token");

function AdminProduct() {
  const { cargando } = useContext(AppContext);
  const [update, setUpdate] = useState(false);
  const { products, loading, error } = useGetProducts(API, update);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [newProduct, setNewProduct] = useState({
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
  });

  const [secciones, setSecciones] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [colores, setColores] = useState([]);
  const [estados, setEstados] = useState([]);

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

  // Llama a la función para cargar los datos de los desplegables cuando el componente se monta
  useEffect(() => {
    loadDropdownData();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      // Enviar los datos del nuevo producto al servidor
      const response = await fetch(addApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: `${token}`,
        },
        body: JSON.stringify(newProduct),
      });
      console.log(newProduct);
      if (response.ok) {
        // Actualizar la lista de productos después de añadir uno nuevo
        setUpdate((prev) => !prev); // Cambia el valor de 'update' para forzar la actualización
        handleClose(); // Cerrar el modal
      } else {
        // Manejar errores si la solicitud no fue exitosa
        console.error("Error al añadir el producto");
      }
    } catch (error) {
      console.error("Error al añadir el producto", error);
    }
  };

  // Función para obtener las secciones
  const fetchSecciones = async () => {
    try {
      const response = await fetch(
        "https://server-general.up.railway.app/api/product/seccion",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Error al obtener las secciones");
        return [];
      }
    } catch (error) {
      console.error("Error al obtener las secciones", error);
      return [];
    }
  };

  // Función para obtener las marcas
  const fetchMarcas = async () => {
    try {
      const response = await fetch(
        "https://server-general.up.railway.app/api/product/marca",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Error al obtener las marcas");
        return [];
      }
    } catch (error) {
      console.error("Error al obtener las marcas", error);
      return [];
    }
  };

  // Función para obtener los colores
  const fetchColores = async () => {
    try {
      const response = await fetch(
        "https://server-general.up.railway.app/api/product/color",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Error al obtener los colores");
        return [];
      }
    } catch (error) {
      console.error("Error al obtener los colores", error);
      return [];
    }
  };

  // Función para obtener los estados
  const fetchEstados = async () => {
    try {
      const response = await fetch(
        "https://server-general.up.railway.app/api/product/estado",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Error al obtener los estados");
        return [];
      }
    } catch (error) {
      console.error("Error al obtener los estados", error);
      return [];
    }
  };

  // Función para obtener los estados
  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(
        `https://server-general.up.railway.app/api/product/product-delete/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        }
      );
      if (response.ok) {
        console.log(`Producto con ID ${productId} eliminado con éxito.`);
        setUpdate((prev) => !prev); // Cambia el valor de 'update' para forzar la actualización
      } else {
        // Manejar errores si la solicitud no fue exitosa
        console.error(`Error al eliminar el producto con ID ${productId}`);
      }
    } catch (error) {
      // Manejar errores de red u otros errores
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
    setSelectedProduct(product);
    setOpenUpdate(true);
  };

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleClose = () => {
    setSelectedProduct(null);
    setOpen(false);
    setOpenAdd(false);
    setOpenUpdate(false);
  };

  // Función para manejar el cambio de página
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Función para manejar el cambio de filas por página
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = () => {
    if (selectedProduct) {
      deleteProduct(selectedProduct.pdc_id);
      handleClose(); // Cerrar el modal después de eliminar
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error al cargar productos: {error.message}</p>;
  }

  return (
    <div className="container">
      <div className="container-title">
        <h2>Lista de productos</h2>
        <Button onClick={handleOpenAdd}>Añadir producto</Button>
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
            {products
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
                  <TableCell>{product.pdc_estado}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleOpenUpdate(product)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleOpen(product)}
                    >
                      Eliminar
                    </Button>
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
        <Box className="modal-box">
          <Typography variant="h6" component="h2">
            Añadir producto
          </Typography>
          <form action="" className="form" onSubmit={handleAddProduct}>
            <TextField
              required
              disabled={cargando}
              type="text"
              id="decripcion"
              name="decripcion" // Agregado: name para asociar con newProduct.descripcion
              label="Descripción"
              variant="standard"
              inputProps={{
                maxLength: 50,
              }}
              value={newProduct.pdc_descripcion} // Asigna el valor desde el estado
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  pdc_descripcion: e.target.value,
                })
              }
            />
            <TextField
              required
              select
              disabled={cargando}
              id="seccion"
              name="seccion" // Agregado: name para asociar con newProduct.seccion
              label="Sección"
              variant="standard"
              value={newProduct.pdc_fk_seccion}
              onChange={(e) =>
                setNewProduct({ ...newProduct, pdc_fk_seccion: e.target.value })
              }
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
              name="marca" // Agregado: name para asociar con newProduct.marca
              label="Marca"
              variant="standard"
              value={newProduct.pdc_fk_marca}
              onChange={(e) =>
                setNewProduct({ ...newProduct, pdc_fk_marca: e.target.value })
              }
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
              name="color" // Agregado: name para asociar con newProduct.color
              label="Color"
              variant="standard"
              value={newProduct.pdc_fk_color}
              onChange={(e) =>
                setNewProduct({ ...newProduct, pdc_fk_color: e.target.value })
              }
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
              name="cantidadTallaXS" // Agregado: name para asociar con newProduct.cantidadTallaXS
              label="Cantidad Talla XS"
              variant="standard"
              value={newProduct.cant_xs} // Asigna el valor desde el estado
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  cant_xs: e.target.value,
                })
              }
            />
            <TextField
              required
              disabled={cargando}
              type="number"
              id="cantidadTallaS"
              name="cantidadTallaS" // Agregado: name para asociar con newProduct.cantidadTallaS
              label="Cantidad Talla S"
              variant="standard"
              value={newProduct.cant_s} // Asigna el valor desde el estado
              onChange={(e) =>
                setNewProduct({ ...newProduct, cant_s: e.target.value })
              }
            />
            <TextField
              required
              disabled={cargando}
              type="number"
              id="cantidadTallaM"
              name="cantidadTallaM" // Agregado: name para asociar con newProduct.cantidadTallaM
              label="Cantidad Talla M"
              variant="standard"
              value={newProduct.cant_m} // Asigna el valor desde el estado
              onChange={(e) =>
                setNewProduct({ ...newProduct, cant_m: e.target.value })
              }
            />
            <TextField
              required
              disabled={cargando}
              type="number"
              id="cantidadTallaL"
              name="cantidadTallaL" // Agregado: name para asociar con newProduct.cantidadTallaL
              label="Cantidad Talla L"
              variant="standard"
              value={newProduct.cant_l} // Asigna el valor desde el estado
              onChange={(e) =>
                setNewProduct({ ...newProduct, cant_l: e.target.value })
              }
            />
            <TextField
              required
              disabled={cargando}
              type="number"
              id="cantidadTallaXL"
              name="cantidadTallaXL" // Agregado: name para asociar con newProduct.cantidadTallaXL
              label="Cantidad Talla XL"
              variant="standard"
              value={newProduct.cant_xl} // Asigna el valor desde el estado
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  cant_xl: e.target.value,
                })
              }
            />
            <TextField
              required
              disabled={cargando}
              type="number"
              id="valor"
              name="valor" // Agregado: name para asociar con newProduct.valor
              label="Valor"
              variant="standard"
              value={newProduct.pdc_valor} // Asigna el pdc_valor desde el estado
              onChange={(e) =>
                setNewProduct({ ...newProduct, pdc_valor: e.target.value })
              }
            />
            <TextField
              required
              disabled={cargando}
              type="text"
              id="imagen"
              name="imagen" // Agregado: name para asociar con newProduct.imagen
              label="Imagen"
              variant="standard"
              inputProps={{
                maxLength: 255,
              }}
              value={newProduct.pdc_imagen} // Asigna el valor desde el estado
              onChange={(e) =>
                setNewProduct({ ...newProduct, pdc_imagen: e.target.value })
              }
            />
            <TextField
              required
              select
              disabled={cargando}
              id="estado"
              name="estado" // Agregado: name para asociar con newProduct.estado
              label="Estado"
              variant="standard"
              value={newProduct.pdc_estado}
              onChange={(e) =>
                setNewProduct({ ...newProduct, pdc_estado: e.target.value })
              }
            >
              {estados.map((estado) => (
                <MenuItem key={estado.est_id} value={estado.est_id}>
                  {estado.est_nombre}
                </MenuItem>
              ))}
            </TextField>
            <div className="button-container">
              <Button variant="contained" onClick={handleClose}>
                Cancelar
              </Button>
              <Button type="submit" variant="contained" disabled={cargando}>
                Crear
              </Button>
            </div>
          </form>
        </Box>
      </Modal>

      {/* Modal de editar producto*/}
      <Modal
        keepMounted
        open={openUpdate}
        onClose={handleClose}
        variant="contained"
      >
        <Box className="modal-box">
          <Typography variant="h6" component="h2">
            Editar producto
          </Typography>
          {selectedProduct && (
            <>
              <Typography sx={{ mt: 2 }}>
                ¿Estás seguro de que deseas eliminar el producto{" "}
                {selectedProduct.pdc_descripcion}?
              </Typography>
              <Button variant="outlined" color="primary" onClick={handleDelete}>
                Confirmar
              </Button>
            </>
          )}
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
              <Button variant="outlined" color="primary" onClick={handleDelete}>
                Confirmar
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export { AdminProduct };
