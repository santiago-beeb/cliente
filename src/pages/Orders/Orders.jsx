import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Button, Divider, Typography } from "@mui/material";
import OrderDetails from "../../components/OrderDetails/OrderDetails";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import { Loading } from "../../components/Loading/Loading";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const isOrdersEmpty = orders.length === 0;
  const { id } = useContext(AppContext);

  useEffect(() => {
    async function fetchOrders() {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_URL_ORDERS}${id}`);
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
          setLoading(false);
        } else {
          setLoading(false);
          throw new Error(
            `Error al obtener las ordenes: ${response.statusText}`
          );
        }
      } catch (error) {
        setLoading(false);
        console.error(error.message);
      }
    }

    fetchOrders();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>Ordenes || General Shop</title>
      </Helmet>
      {!isOrdersEmpty ? (
        <div className="Orders">
          {orders.map((order) => (
            <div key={order.orden_id}>
              <List>
                <ListItem>
                  <ListItemText
                    primary={`Orden #${order.orden_id}`}
                    secondary={`Direccion: ${order.orden_direccion}, Fecha: ${order.orden_fecha}, Total: ${order.orden_valor_total}`}
                  />
                </ListItem>
                <Typography sx={{ marginTop: 1, marginLeft: 2 }}>
                  Detalles de la Orden:
                </Typography>
                <OrderDetails details={order.detalle_orden} />
                <Divider orientation="horizontal" variant="middle" />
              </List>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-orders">
          <h1>No has hecho ninguna orden aún</h1>
          <Link to="/">
            <Button variant="outlined" color="secondary">
              Volver al inicio
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Orders;
