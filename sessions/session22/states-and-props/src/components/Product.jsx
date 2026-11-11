// Product.jsx - კომპონენტის განსაზღვრა
function Product({ name, price, inStock, tags, seller, onBuy }) {
  return (
    <div className="product-card">
      <h2>{name}</h2>
      <p>ფასი: {price} ₾</p>
      <p>სტატუსი: {inStock ? "მარაგშია" : "არ არის მარაგში"}</p>
      
      <ul>
        {tags.map((tag, index) => (
          <li key={index}>{tag}</li>
        ))}
      </ul>

      <p>გამყიდველი: {seller.name} (ID: {seller.id})</p>

      <button onClick={onBuy}>ყიდვა</button>
    </div>
  );
}

export default Product;