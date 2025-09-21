const CardPizza = ({ name, price, ingredients, img }) => {
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

        {/* Ingredientes */}
        <p className="card-text mb-2">
          <strong>Ingredientes:</strong>
        </p>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>

        {/* Precio */}
        <p className="card-text mb-3">
          <strong>Precio:</strong> ${price.toLocaleString()}
        </p>

        {/* Botones */}
        <div className="d-flex gap-2 mt-auto">
          <button className="btn btn-outline-primary flex-fill">
            👀 Ver más
          </button>
          <button className="btn btn-primary flex-fill">🛒 Añadir</button>
        </div>
      </div>
    </div>
  );
};

export default CardPizza;
