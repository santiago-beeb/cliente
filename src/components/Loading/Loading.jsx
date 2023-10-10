import CircularProgress from "@mui/material/CircularProgress";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading-screen">
      <CircularProgress color="inherit" />
    </div>
  );
};

export { Loading };
