import { useState } from "react";
import { Helmet } from "react-helmet";
import { Button, TextField } from "@mui/material";
import "./PasswordRecovery.css";

const PasswordRecovery = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="recovery">
      <Helmet>
        <title>Recuperar Contraseña || General Shop</title>
      </Helmet>
      <div className="recovery-container">
        <h1 className="title">Recuperar contraseña</h1>
        <form className="form">
          <TextField
            required
            //disabled={cargando}
            type="email"
            id="email"
            label="Correo Electrónico"
            variant="standard"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button variant="contained">Enviar</Button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default PasswordRecovery;
