import { useState } from "react";

const Register = () => {
  // Estados del formulario
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");

  // Estados de feedback
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  const validarDatos = (e) => {
    e.preventDefault();
    setError("");
    setExito("");

    // 1. Todos los campos obligatorios
    if (!email.trim() || !contraseña.trim() || !confirmarContraseña.trim()) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    // 2. Password mínimo 6 caracteres
    if (contraseña.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    // 3. Coincidencia de password
    if (contraseña !== confirmarContraseña) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    // Si todo está bien
    setExito("Registro completado con éxito 🎉");
  };

  return (
    <form className="formulario" onSubmit={validarDatos}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {exito && <p style={{ color: "green" }}>{exito}</p>}

      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label>Contraseña</label>
        <input
          type="password"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
        />
      </div>

      <div>
        <label>Confirmar contraseña</label>
        <input
          type="password"
          value={confirmarContraseña}
          onChange={(e) => setConfirmarContraseña(e.target.value)}
        />
      </div>

      <button type="submit">Registrarse</button>
    </form>
  );
};

export default Register;
