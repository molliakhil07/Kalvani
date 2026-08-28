import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";

import ProductCard from "./components/ProductCard";
import { allProducts } from "./data/products";

function Home() {
  return (
    <main className="home-page">

      {/* ================= HERO ================= */}
      <section className="hero">

        <div className="hero-overlay"></div>

        <div className="hero-content">

          <p className="hero-label">
            AUTHENTIC TRADITIONAL KANCHIPURAM SILK SAREES
          </p>

          <div className="hero-divider">
            <span></span>
            <span className="lotus">ꕥ</span>
            <span></span>
          </div>

          <h1>
            Tradition
            <br />
            Woven With Love
          </h1>

          <div className="hero-divider">
            <span></span>
            <span className="lotus">ꕥ</span>
            <span></span>
          </div>
          
          <p className="hero-description">
            Discover beautiful traditional Kanchipuram silk sarees,
            <br />
            handcrafted with timeless artistry and heritage.
          </p>

          <Link
            to="/shop"
            className="shop-button"
          >
            <span className="button-lotus">🔍︎</span>
            Explore Collection
          </Link>

        </div>

      </section>


      {/* ================= FEATURED SAREES ================= */}
      <section className="featured-section">

        <div className="section-heading">

          <h2>
            Our Featured Sarees
          </h2>

          <div className="section-divider">
            <span></span>
            <span>⋆⊱༻𖥸༺⊰⋆</span>
            <span></span>
          </div>

          <p className="section-description">
            Discover handpicked Kanchipuram silk sarees,
            <br />
            woven with tradition, elegance and timeless beauty.
          </p>

        </div>


        <div className="products-grid">

          {allProducts.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              category={product.category}
              image={product.image}
            />
          ))}

        </div>


        {/* VIEW ALL */}
        <div className="view-all-container">

          <Link
            to="/shop"
            className="view-all-button"
          >
            View All Sarees
            <span>→</span>
          </Link>

        </div>

      </section>

    </main>
  );
}


function App() {
  return (
    <CartProvider>

      <BrowserRouter>

        <Navbar />

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/shop"
            element={<Shop />}
          />

          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

        </Routes>

      </BrowserRouter>

    </CartProvider>
  );
}

export default App;