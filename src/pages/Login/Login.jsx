import { useRef } from "react";
import "./Login.css";
import { Button, TextField } from "@mui/material";

const Login = () => {
  const form = useRef(null);

  return (
    <div className="Login">
      <div className="Login-container">
      <h1 className="title">Iniciar sesion</h1>
        <form action="/" className="form" ref={form}>
          <TextField
            required
            type="email"
            id="email"
            label="Correo Electronico"
            variant="standard"
          />

          <TextField
            required
            id="standard-password-input"
            label="Contraseña"
            type="password"
            autoComplete="current-password"
            variant="standard"
          />
          <Button variant="contained">Iniciar Sesion</Button>

          <a href="/password-recovery">Olvidé mi contraseña</a>
          <Button href="/signup" variant="outlined">Registrarse</Button>{" "}
        </form>
      </div>
    </div>
  );
};

export { Login };
