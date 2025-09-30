import { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  // Array de productos en el carrito
  const [cart, setCart] = useState([]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
