// CardPizza.jsx (solo con lógica para el carrito)
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CardPizza = ({ id, name, price, ingredients, img }) => {
  const { cart, setCart } = useContext(CartContext);

  const handleAdd = () => {
    const found = cart.find((p) => p.id === id);

    if (found) {
      const updated = cart.map((p) =>
        p.id === id ? { ...p, qty: (p.qty ?? 1) + 1 } : p
      );
      setCart(updated);
    } else {
      setCart([...cart, { id, name, price, img, qty: 1 }]);
    }
  };

  return (
    <div className="card h-100 shadow-sm">
      {img && (
        <img
          src={img}
          className="card-img-top"
          alt={name}
          style={{ height: "200px", objectFit: "cover" }}
        />
      )}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{name}</h5>

        <p className="card-text mb-2"><strong>Ingredientes:</strong></p>
        <ul>
          {ingredients.map((ingredient, i) => (
            <li key={i}>{ingredient}</li>
          ))}
        </ul>

        <p className="card-text mb-3">
          <strong>Precio:</strong> ${price.toLocaleString("es-CL")}
        </p>

        <div className="d-flex gap-2 mt-auto">
          <button className="btn btn-outline-primary flex-fill">
            👀 Ver más
          </button>
          <button className="btn btn-primary flex-fill" onClick={handleAdd}>
            🛒 Añadir
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardPizza;

