import { useEffect, useState } from "react";
import Header from "../components/Header";
import CardPizza from "../components/CardPizza";

const Home = () => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/pizzas")
      .then((res) => res.json())
      .then((data) => setPizzas(data))
      .catch((error) => console.error("Error al cargar pizzas:", error));
  }, []);

  return (
    <div className="container mt-4">
      {/* Header */}
      <Header />

      {/* Sección de Pizzas */}
      <h2 className="my-4">Nuestras Pizzas</h2>
      <div className="row">
        {pizzas.map((pizza) => (
          <div className="col-md-4 mb-3" key={pizza.id}>
            <CardPizza
              id={pizza.id}
              name={pizza.name}
              price={pizza.price}
              ingredients={pizza.ingredients}
              img={pizza.img}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
