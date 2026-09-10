import "./App.css";
import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";

import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import { CartProvider } from "./context/CartContext";
import { ProductProvider, useProducts } from "./context/ProductContext";

import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";

import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";

import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import AdminOrders from "./pages/AdminOrders";

function Home() {
  const { products, loading, error } = useProducts();

  return (
    <main className="home-page">

      {/* ================= HERO ================= */}
      <section className="hero">

        <div className="hero-overlay"></div>

        <div className="hero-content">

          <p className="hero-label">
            AUTHENTIC TRADITIONAL KANCHIPURAM SAREES
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
            Discover beautiful traditional Kanchipuram sarees,
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
            Discover handpicked Kanchipuram sarees,
            <br />
            woven with tradition, elegance and timeless beauty.
          </p>

        </div>

        <div className="products-grid">

          {loading ? (
  <p>Loading products...</p>
) : error ? (
  <p>{error}</p>
) : (
  products
    .filter((product) => product.featured)
    .slice(0, 4)
    .map((product) => (
      <ProductCard
        key={product.id}
        id={product.id}
        name={product.name}
        price={product.price}
        category={product.category}
        image={product.image}
      />
    ))
)}

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


      {/* ================= FLOATING WHATSAPP BUTTON ================= */}
      <a
        href="https://wa.me/918519914348"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp"
        aria-label="Chat with Kalvani on WhatsApp"
      >
        <span className="whatsapp-tooltip">
          Chat with us
        </span>

        <FaWhatsapp />
      </a>


      {/* ================= ABOUT KALVANI ================= */}
      <section
        id="about"
        className="about-section"
      >

        <div className="about-content">

          <p className="section-label">
            ABOUT KALVANI
          </p>

          <h2>
            Woven With Tradition,
            <br />
            Made With Love
          </h2>

          <div className="section-divider">
            <span></span>
            <span>⋆⊱༻𖥸༺⊰⋆</span>
            <span></span>
          </div>

          <p className="about-description">
            At Kalvani, we celebrate the timeless beauty
            of authentic Kanchipuram sarees. Every
            saree reflects traditional craftsmanship,
            elegant design and the rich heritage of
            generations of skilled weaving.
          </p>

          <p className="about-description">
            Our collection is carefully chosen for those
            who appreciate the beauty of tradition and
            the elegance of handcrafted Kanchipuram sarees.
          </p>

        </div>

      </section>


      {/* ================= WHY SHOP WITH KALVANI ================= */}
      <section className="trust-section">

        <div className="trust-content">

          <p className="section-label">
            WHY KALVANI
          </p>

          <h2>
            Why Shop With Kalvani?
          </h2>

          <div className="trust-points">

            <div className="trust-point">
              <span className="trust-icon">🧵</span>

              <div>
                <h3>
                  Traditional Craftsmanship
                </h3>

                <p>
                  Sarees inspired by the timeless weaving
                  traditions of Kanchipuram.
                </p>
              </div>
            </div>


            <div className="trust-point">
              <span className="trust-icon">🥻</span>

              <div>
                <h3>
                  Silk & Cotton Sarees
                </h3>

                <p>
                  Discover beautiful Kanchipuram silk
                  and cotton sarees for every occasion.
                </p>
              </div>
            </div>


            <div className="trust-point">
              <span className="trust-icon">💬</span>

              <div>
                <h3>
                  Easy WhatsApp Ordering
                </h3>

                <p>
                  Choose your saree and place your order
                  directly through WhatsApp.
                </p>
              </div>
            </div>


            <div className="trust-point">
              <span className="trust-icon">🚚</span>

              <div>
                <h3>
                  Nearby Delivery
                </h3>

                <p>
                  Same-day delivery is available for
                  eligible nearby orders.
                </p>
              </div>
            </div>

          </div>

        </div>

      </section>


      {/* ================= DELIVERY SECTION ================= */}
      <section className="delivery-section">

        <div className="delivery-content">

          <p className="section-label">
            KALVANI DELIVERY
          </p>

          <h2>
            Delivery Made Simple
          </h2>

          <p className="delivery-description">
            Every order is prepared with care and delivered
            with attention to your convenience.
          </p>

          <div className="delivery-points">

            <div className="delivery-point">
              <span className="delivery-icon">🚚</span>

              <div>
                <h3>
                  Nearby Delivery
                </h3>

                <p>
                  Same-day delivery is available for
                  eligible nearby orders.
                </p>
              </div>
            </div>


            <div className="delivery-point">
              <span className="delivery-icon">💬</span>

              <div>
                <h3>
                  WhatsApp Updates
                </h3>

                <p>
                  Order confirmation and updates will
                  be shared through WhatsApp.
                </p>
              </div>
            </div>


            <div className="delivery-point">
              <span className="delivery-icon">⏱️</span>

              <div>
                <h3>
                  Flexible Timing
                </h3>

                <p>
                  Delivery timing may vary depending
                  on your location.
                </p>
              </div>
            </div>

          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <footer
        id="contact"
        className="site-footer"
      >

        <div className="footer-content">

          {/* BRAND */}
          <div className="footer-brand">

            <h2>
              Kalvani
            </h2>

            <p>
              Handwoven Heritage
            </p>

            <span>
              Authentic Kanchipuram Sarees
            </span>

          </div>


          {/* CONTACT */}
          <div className="footer-contact">

            <p className="footer-contact-title">
              Connect With Us
            </p>

            <div className="footer-contact-links">

              {/* INSTAGRAM */}
              <a
                href="https://instagram.com/kalvanicollection"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="contact-icon" />

                <span>
                  Instagram
                </span>
              </a>


              {/* WHATSAPP */}
              <a
                href="https://wa.me/918519914348"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="contact-icon" />

                <span>
                  WhatsApp
                </span>
              </a>


              {/* EMAIL */}
              <a
                href="mailto:kalvani.shop@gmail.com"
              >
                <MdEmail className="contact-icon" />

                <span>
                  kalvani.shop@gmail.com
                </span>
              </a>

            </div>

          </div>

        </div>


        {/* COPYRIGHT */}
        <div className="footer-bottom">

          <p>
            © 2026 Kalvani. All rights reserved.
          </p>

          <p>
            Crafted by{"   "}

            {/* DEVELOPER */}
            <a
              href="mailto:molliakhil07@gmail.com"
            >
              <span>
                Molli Akhil kumar
              </span>
            </a>

          </p>

        </div>

      </footer>

    </main>
  );
}


function ScrollToHash() {

  const location = useLocation();

  useEffect(() => {

    if (
      location.pathname === "/" &&
      (
        location.hash === "#about" ||
        location.hash === "#contact"
      )
    ) {

      const scrollToSection = () => {

        const element = document.getElementById(
          location.hash.substring(1)
        );

        if (element) {

          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          return true;
        }

        return false;
      };


      // Try after the Home page has rendered
      const timeout = setTimeout(() => {
        scrollToSection();
      }, 150);

      return () => clearTimeout(timeout);
    }

  }, [location.pathname, location.hash]);

  return null;
}


function App() {

  return (

    <CartProvider>

      <ProductProvider>

        <BrowserRouter>

          <ScrollToHash />

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

            

             <Route element={<AdminRoute />}>
               <Route path="/admin" element={<AdminDashboard />} />
               <Route path="/admin/orders" element={<AdminOrders />} />
             </Route>

             <Route
  path="/admin/login"
  element={<AdminLogin />}
/>

          <Route
  path="/admin/orders"
  element={<AdminOrders />}
/>
          </Routes>

        </BrowserRouter>

      </ProductProvider>

    </CartProvider>
  );
}

export default App;