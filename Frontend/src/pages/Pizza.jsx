import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Pizza = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);   // para mostrar "Cargando..."
  const [error, setError] = useState(null);       // por si falla la petición

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const pizzaId = id ?? "p001"; // si no hay id, usa p001
        const response = await fetch(`http://localhost:5000/api/pizzas/${pizzaId}`);

        if (!response.ok) {
          throw new Error("Error al obtener la pizza");
        }

        const data = await response.json();
        setPizza(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPizza();
  }, [id]);

  if (loading) return <p className="container py-4">Cargando pizza...</p>;
  if (error) return <p className="container py-4 text-danger">⚠ {error}</p>;

  return (
    <div className="container py-4">
      <div className="row g-4">
        {/* Imagen */}
        <div className="col-md-5">
          <img
            src={pizza.img}
            alt={pizza.name}
            className="img-fluid rounded shadow-sm"
          />
        </div>

        {/* Info */}
        <div className="col-md-7">
          <h2 className="text-capitalize">{pizza.name}</h2>
          <p className="text-muted">
            Ingredientes:{" "}
            {Array.isArray(pizza.ingredients)
              ? pizza.ingredients.join(", ")
              : ""}
          </p>
          <p>{pizza.desc}</p>

          <h4 className="fw-bold mb-3">
            Precio: ${pizza.price?.toLocaleString("es-CL")}
          </h4>

          <button className="btn btn-primary" type="button">
            🛒 Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pizza;
