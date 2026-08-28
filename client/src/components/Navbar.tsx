import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { cartCount } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* LOGO */}
        <div className="logo">
          <Link to="/">
            <span className="logo-main">
              Kalvani
            </span>

            <span className="logo-tagline">
              Handwoven Heritage
            </span>
          </Link>
        </div>

        {/* NAVIGATION */}
        <div className="nav-links">
          <Link to="/">Home</Link>

          <Link to="/shop">
            Shop
          </Link>

          <Link to="/shop">
            Collections
          </Link>

          <Link to="/">
            About
          </Link>

          <Link to="/">
            Contact
          </Link>
        </div>

        {/* ACTIONS */}
        <div className="nav-actions">

          <button
            type="button"
            aria-label="Search"
          >
            ⌕
          </button>

          <Link
            to="/cart"
            className="cart-link"
            aria-label="Shopping cart"
          >
            🛒

            {cartCount > 0 && (
              <span className="cart-count">
                {cartCount}
              </span>
            )}
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;