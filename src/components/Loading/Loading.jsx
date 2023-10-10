import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading-screen">
      <CircularProgress />
      <Typography variant="body2">Cargando...</Typography>
    </div>
  );
};

export { Loading };
