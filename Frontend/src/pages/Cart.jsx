import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../components/cart.css";

const clp = (n) => n.toLocaleString("es-CL");

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);

  const increase = (id) => {
    setCart((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, qty: (p.qty ?? 1) + 1 } : p
      )
    );
  };

  const decrease = (id) => {
    setCart((prev) =>
      prev
        .map((p) =>
          p.id === id ? { ...p, qty: (p.qty ?? 1) - 1 } : p
        )
        .filter((p) => (p.qty ?? 1) > 0)
    );
  };

  const remove = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const clear = () => setCart([]);

  const total = cart.reduce((acc, p) => acc + p.price * (p.qty ?? 1), 0);

  if (!cart.length) {
    return (
      <div className="container py-4 cart-page">
        <h2 className="mb-3">Tu carrito</h2>
        <p>No tienes productos en el carrito.</p>
      </div>
    );
  }

  return (
    <div className="container py-4 cart-page">
      <h2 className="mb-3">Tu carrito</h2>

      {cart.map((p) => (
        <div key={p.id} className="cart-row">
          {p.img && (
            <img
              src={p.img}
              alt={p.name}
              width={72}
              height={72}
              className="cart-thumb"
            />
          )}

          <div className="cart-name">{p.name}</div>

          <div className="cart-qty">
            <button
              className="qty-btn qty-btn--minus"
              onClick={() => decrease(p.id)}
              aria-label={`Disminuir ${p.name}`}
            >
              −
            </button>
            <div className="qty-box">{p.qty ?? 1}</div>
            <button
              className="qty-btn qty-btn--plus"
              onClick={() => increase(p.id)}
              aria-label={`Aumentar ${p.name}`}
            >
              +
            </button>
          </div>

          <div className="cart-price">
            ${clp(p.price * (p.qty ?? 1))}
          </div>

          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => remove(p.id)}
            aria-label={`Eliminar ${p.name}`}
          >
            🗑️ Quitar
          </button>
        </div>
      ))}

      <div className="d-flex justify-content-between align-items-center mt-4">
        <button className="btn btn-outline-secondary" onClick={clear}>
          Vaciar carrito
        </button>
        <h4 className="m-0">Total: ${clp(total)}</h4>
      </div>
    </div>
  );
};

export default Cart;
