import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const clp = (n) => n.toLocaleString("es-CL");

const Navbar = () => {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);

  // Calcula total dinámico (si no hay qty, asume 1)
  const total = cart.reduce((acc, p) => acc + p.price * (p.qty ?? 1), 0);

  // Mientra no le meto autenticación, simulo un token
  // Cambia a `true` para probar estado "logueado"
  const token = false;

  return (
    <nav className="d-flex justify-content-between align-items-center p-3 bg-light shadow-sm">
      <div className="d-flex gap-2">
        <Link to="/" className="btn btn-outline-primary">🍕 Home</Link>

        {token ? (
          <>
            <Link to="/profile" className="btn btn-outline-primary">🔓 Profile</Link>
            <button type="button" className="btn btn-outline-primary">🔒 Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline-primary">🔐 Login</Link>
            <Link to="/register" className="btn btn-outline-primary">🔐 Register</Link>
          </>
        )}
      </div>

      <button
        type="button"
        className="btn btn-success"
        onClick={() => navigate("/cart")}
      >
        🛒 Total: ${clp(total)}
      </button>
    </nav>
  );
};

export default Navbar;
