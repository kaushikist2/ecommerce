import React, { useState } from "react";
import { ShoppingCart, Star, Trash2 } from "lucide-react";

const productsData = [
  { id: 1, name: "Minimal Hoodie", price: 1999, rating: 4.5, image: "https://images.unsplash.com/photo-1520975916090-3105956dac38" },
  { id: 2, name: "Aesthetic Sneakers", price: 3499, rating: 4.8, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff" },
  { id: 3, name: "Canvas Tote Bag", price: 999, rating: 4.2, image: "https://images.unsplash.com/photo-1585386959984-a4155222c9fa" },
  { id: 4, name: "Street Cap", price: 699, rating: 4.0, image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f" },
];

export default function EcommerceApp() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  const filteredProducts = productsData.filter(
    (p) => p.rating >= minRating && p.price <= maxPrice
  );

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold tracking-wide">irisverseee shop</h1>
        <button
          onClick={() => setShowCart(!showCart)}
          className="flex items-center gap-2"
        >
          <ShoppingCart />
          <span>{cart.length}</span>
        </button>
      </header>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8 bg-neutral-900 p-4 rounded-2xl">
        <div>
          <label className="text-sm text-neutral-400">Min Rating</label>
          <select
            className="block bg-neutral-800 p-2 rounded mt-1"
            onChange={(e) => setMinRating(Number(e.target.value))}
          >
            <option value={0}>All</option>
            <option value={4}>4★+</option>
            <option value={4.5}>4.5★+</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-neutral-400">Max Price (₹)</label>
          <input
            type="range"
            min={500}
            max={5000}
            step={500}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="mt-2"
          />
          <p className="text-sm">₹{maxPrice}</p>
        </div>
      </div>

      {/* Product Grid */}
      {!showCart && (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-neutral-900 rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-56 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star size={16} />
                  <span className="text-sm">{product.rating}</span>
                </div>
                <p className="mt-2 font-bold">₹{product.price}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-4 w-full bg-white text-black py-2 rounded-xl font-medium hover:bg-neutral-200"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Cart Page */}
      {showCart && (
        <section className="max-w-2xl mx-auto bg-neutral-900 p-6 rounded-2xl">
          <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>

          {cart.length === 0 && (
            <p className="text-neutral-400">Your cart is empty.</p>
          )}

          {cart.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center mb-4 border-b border-neutral-800 pb-3"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-neutral-400">₹{item.price}</p>
              </div>
              <button
                onClick={() => removeFromCart(index)}
                className="text-red-400 hover:text-red-500"
              >
                <Trash2 />
              </button>
            </div>
          ))}

          {cart.length > 0 && (
            <div className="mt-6">
              <p className="text-lg font-semibold">Total: ₹{total}</p>
              <button className="mt-4 w-full bg-white text-black py-2 rounded-xl font-medium">
                Checkout (UI Only)
              </button>
            </div>
          )}
        </section>
      )}

      <footer className="mt-16 text-center text-neutral-400 text-sm">
        E-Commerce UI Demo • React + Tailwind • Cart, Filters, State Management
      </footer>
    </div>
  );
}

