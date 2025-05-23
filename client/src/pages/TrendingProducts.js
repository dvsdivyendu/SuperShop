import React from 'react';
import './TrendingProducts.css'; // Adjust the path as necessary

// Sample data for trending products
const trendingProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: "$120.00",
    description: "High-quality sound with noise cancellation.",
    image: "https://m.media-amazon.com/images/I/61YOkuWxYxL._AC_UF1000,1000_QL80_.jpg", // Replace with actual image URLs
  },
  {
    id: 2,
    name: "Smartwatch",
    price: "$250.00",
    description: "Track your fitness and stay connected on the go.",
    image: "https://media.croma.com/image/upload/v1715324219/Croma%20Assets/Wearable/Wearable%20Devices/Images/276060_hxetha.png", // Replace with actual image URLs
  },
  {
    id: 3,
    name: "Gaming Laptop",
    price: "$1,500.00",
    description: "Powerful performance for gaming and productivity.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDwOC6_XLG0gr4PCKqb1CzYd1SzD6yb39CkA&s", // Replace with actual image URLs
  },
];

const TrendingProductsPage = () => {
  return (
    <div className="trending-products-page">
      <h1 className="h1">Trending Products</h1>

      <section className="products-section">
        <ul className="product-list">
          {trendingProducts.map((product) => (
            <li className="product-item" key={product.id}>
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">{product.price}</p>
              <p className="product-description">{product.description}</p>
              <button className="add-to-cart-button">Add to Cart</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default TrendingProductsPage;