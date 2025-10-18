import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";

const clp = (n) => n.toLocaleString("es-CL");

export default function Cart() {
  const { cart, setCart, checkout } = useContext(CartContext);
  const { isAuth } = useContext(UserContext);
  const [msg, setMsg] = useState("");

  const inc = (id) => setCart(x => x.map(p => p.id===id?{...p, qty:(p.qty??1)+1}:p));
  const dec = (id) => setCart(x => x.map(p => p.id===id?{...p, qty:(p.qty??1)-1}:p).filter(p => (p.qty??1)>0));
  const rmv = (id) => setCart(x => x.filter(p => p.id!==id));
  const clr = () => setCart([]);

  const total = cart.reduce((a,p)=>a+p.price*(p.qty??1),0);

  const pagar = async () => {
    const data = await checkout();          // { ok, orderId, message }
    setMsg(data?.message || "Compra OK");
    clr();
  };

  if (!cart.length) {
    return (
      <div className="container py-4">
        <h2>Tu carrito</h2>
        <p>Sin productos.</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2>Tu carrito</h2>
      {msg && <p style={{color:"green"}}>{msg}</p>}

      {cart.map(p=>(
        <div key={p.id} className="d-flex align-items-center gap-2 my-2">
          {p.img && <img src={p.img} alt={p.name} width={60} height={60} />}
          <div className="me-auto">{p.name}</div>
          <div className="d-flex align-items-center gap-2">
            <button onClick={()=>dec(p.id)}>−</button>
            <div>{p.qty??1}</div>
            <button onClick={()=>inc(p.id)}>+</button>
          </div>
          <div>${clp(p.price*(p.qty??1))}</div>
          <button className="btn btn-sm btn-outline-danger" onClick={()=>rmv(p.id)}>Quitar</button>
        </div>
      ))}

      <div className="d-flex justify-content-between align-items-center mt-3">
        <button className="btn btn-outline-secondary" onClick={clr}>Vaciar</button>
        <h4>Total: ${clp(total)}</h4>
        <button className="btn btn-primary" disabled={!isAuth} onClick={pagar}>Pagar</button>
      </div>
    </div>
  );
}
