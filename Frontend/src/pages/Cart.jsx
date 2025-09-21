import { useMemo, useState } from "react";

const clp = (n) => n.toLocaleString("es-CL");

const Cart = () => {
  const [cart, setCart] = useState([]); // inicia vacío

  const inc = (id) =>
    setCart((prev) =>
      prev.map((p) => (p.id === id ? { ...p, count: p.count + 1 } : p))
    );

  const dec = (id) =>
    setCart((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, count: Math.max(0, p.count - 1) } : p))
        .filter((p) => p.count > 0)
    );

  const total = useMemo(
    () => cart.reduce((acc, p) => acc + p.price * p.count, 0),
    [cart]
  );

  return (
    <div className="container mt-4">
      <h5 className="mb-3 fw-semibold">Detalles del pedido:</h5>

      {cart.length === 0 && <p className="text-muted">Tu carrito está vacío.</p>}

      {cart.map((item) => (
        <div key={item.id} className="d-flex align-items-center gap-3 py-2 border-bottom">
          <img src={item.img} alt={item.name} width={56} height={56} className="rounded" />
          <div className="text-capitalize flex-grow-1">{item.name}</div>
          <div className="fw-semibold">${clp(item.price)}</div>
          <div className="d-flex align-items-center gap-2">
            <button className="btn btn-outline-secondary" onClick={() => dec(item.id)} aria-label="Disminuir">−</button>
            <span className="px-2">{item.count}</span>
            <button className="btn btn-outline-secondary" onClick={() => inc(item.id)} aria-label="Aumentar">+</button>
          </div>
        </div>
      ))}

      <h3 className="mt-4 fw-bold">Total: ${clp(total)}</h3>
      <button className="btn btn-dark mt-3 px-4" disabled={cart.length === 0}>Pagar</button>
    </div>
  );
};

export default Cart;