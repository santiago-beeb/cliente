import { Button, MenuItem, TextField } from "@mui/material";
import "./CreateAccount.css";

const CreateAccount = () => {
    const currencies = [
        {
          value: 'CC',
          label: 'CC',
        },
        {
        }
      ];
  return (
    <div className="signup">
      <div className="signup-container">
        <h1 className="title">Registro</h1>
        <form action="/login" className="form">
          <TextField
            required
            type="text"
            id="nombre-basic"
            label="Nombre"
            variant="standard"
          />
          <TextField
            required
            type="text"
            id="apellidos-basic"
            label="Apellidos"
            variant="standard"
          />
          <TextField
          id="standard-select-tipo-documento"
          select
          label="Tipo documento"
          defaultValue="CC"
          helperText="Selecciona tu tipo de documento"
          variant="standard"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
            required
            type="text"
            id="numero-documento-basic"
            label="Número documento"
            variant="standard"
          />
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
          <TextField
            required
            id="standard-password-input"
            label="Repetir contraseña"
            type="password"
            autoComplete="current-password"
            variant="standard"
          />
          <Button variant="contained">Crear</Button>
        </form>
      </div>
    </div>
  );
};

export { CreateAccount };
