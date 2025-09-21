import { useState } from "react";

const Login = () => {
  // Estados del formulario
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");

  // Estados de feedback
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  const validarDatos = (e) => {
    e.preventDefault();
    setError("");
    setExito("");

    // 1. Todos los campos obligatorios
    if (!email.trim() || !contraseña.trim()) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    // 2. Password mínimo 6 caracteres
    if (contraseña.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    // ✅ Si todo está bien
    setExito("inicio de seccion éxitoso 🎉");
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

      <button type="submit">Ingresar</button>
    </form>
  );
};

export default Login;
