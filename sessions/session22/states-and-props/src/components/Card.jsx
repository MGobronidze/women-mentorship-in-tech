function Card({ title, price }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{price}₾</p>
    </div>
  );
}

export default Card;