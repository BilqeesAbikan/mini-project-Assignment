import React, { useState, useEffect } from "react";

const Form = () => {
  const [products, setOrders] = useState([]);
  const baseUrl = "https://fakestoreapi.com";

  const rankSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    console.log(form.name.value);
    const newCakeOrder = {
      name: form.name.value,
      email: form.email.value,
      price: form.price.value,
      deliveryaddress: form.deliveryaddress.value,
    };

    await fetch(`${baseUrl}/products`, {
      method: "POST",
      body: JSON.stringify(newCakeOrder),
    })
      .then((res) => res.json())
      .then((product) => console.log({ newCake: product }))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetch(`${baseUrl}/products`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div style={{ display: "flex", columnGap: "2rem" }}>
      <form
        style={{ display: "flex", flexDirection: "column", rowGap: "0.5rem" }}
        onSubmit={rankSubmit}
      >
        <input type="text" name="name" placeholder="Name" required />
        <input type="text" name="Email" id="email" placeholder="Email" />
        <input type="text" name="price" placeholder="Price" />
        <input type="text" placeholder="Delivery Address" />

        <label htmlFor="Cakes">Choose a size:</label>
        <select name="Cake" id="cake" required>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>

        <label htmlFor="Flavor">Flavor:</label>
        <select name="Flavor" id="" required>
          <option value="Strawberry">Strawberry</option>
          <option value="Vanilla">Vanilla</option>
          <option value="Chocolate">Chocolate</option>
          <option value="Butterscotch">Butterscotch</option>
        </select>
        <button type="submit">Add Order</button>
      </form>
      <div>
        <h1>orders</h1>
        {products.length === 0 ? (
          <div>Retrieving orders...</div>
        ) : (
          products.map((product) => (
            <div key={product.id}>
              <span>{product.id}.</span>
              <span>{product.title}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Form;
