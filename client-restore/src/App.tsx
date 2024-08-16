import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([
    { name: "ProductName1", price: 100.0 },
    { name: "ProductName2", price: 200.0 },
  ]);

  useEffect(() => {
    fetch("https://localhost:44376/api/Product")
    .then(response => response.json())
    .then(data => setProducts(data))
  }, []);

  const addProduct = () => {
    setProducts((prevState) => [
      ...prevState,
      {
        name: "ProductName" + (prevState.length + 1),
        price: (prevState.length * 100) + 100,
      }
    ]);
  };

  return (
    <div>
      <h1>E-commerce</h1>
      <ul>
        {products.map((item, index) => (
          <li key={index}>
            {item.name} & {item.price}
          </li>
        ))}
      </ul>
      <button onClick={addProduct}>Add Products</button>
    </div>
  );
}

export default App;
