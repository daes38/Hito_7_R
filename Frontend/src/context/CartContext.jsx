import { createContext, useMemo, useState } from "react";
import api from "../api/axios";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const checkout = async () => {
    const { data } = await api.post("/checkouts", { cart }); // protegido por Bearer automáticamente
    return data; // { ok, orderId, message }
  };

  const value = useMemo(() => ({ cart, setCart, checkout }), [cart]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
