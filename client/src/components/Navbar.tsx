import { useState } from "react";
import { useCart } from "../context/CartContext";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { cartCount } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // =========================
  // ABOUT NAVIGATION
  // =========================

  const handleAboutClick = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();

    closeMenu();

    if (location.pathname === "/") {
      document
        .getElementById("about")
        ?.scrollIntoView({
          behavior: "smooth",
        });

      window.history.replaceState(
        null,
        "",
        "/#about"
      );
    } else {
      navigate("/#about");
    }
  };

  // =========================
  // CONTACT NAVIGATION
  // =========================

  const handleContactClick = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();

    closeMenu();

    if (location.pathname === "/") {
      document
        .getElementById("contact")
        ?.scrollIntoView({
          behavior: "smooth",
        });

      window.history.replaceState(
        null,
        "",
        "/#contact"
      );
    } else {
      navigate("/#contact");
    }
  };

  // =========================
  // SEARCH
  // =========================

  const handleSearchClick = () => {
    closeMenu();
    navigate("/shop?search=");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* =========================
            LOGO
        ========================= */}

        <div className="logo">
          <Link
            to="/"
            onClick={closeMenu}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
            }}
          >
            {/* LOGO IMAGE */}
            <img
              src="https://raw.githubusercontent.com/molliakhil07/Kalavani/main/Kalvani-logo.png"
              alt="Kalvani logo"
              className="logo-image"
              style={{
                width: "42px",
                height: "42px",
                objectFit: "contain",
                flexShrink: 0,
              }}
            />

            {/* BRAND NAME + TAGLINE */}
            <span
              className="logo-text"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <span className="logo-main">
                Kalvani
              </span>

              <span className="logo-tagline">
                Handwoven Heritage
              </span>
            </span>
          </Link>
        </div>

        {/* =========================
            DESKTOP NAVIGATION
        ========================= */}

        <div className="nav-links">

          <Link
            to="/"
            className={
              location.pathname === "/"
                ? "active"
                : ""
            }
          >
            Home
          </Link>

          <Link
            to="/shop"
            className={
              location.pathname === "/shop"
                ? "active"
                : ""
            }
          >
            Shop
          </Link>

          <Link
            to="/shop"
            className={
              location.pathname === "/shop"
                ? "active"
                : ""
            }
          >
            Collections
          </Link>

          {/* ABOUT */}

          <a
            href="/#about"
            onClick={handleAboutClick}
          >
            About Us
          </a>

          {/* CONTACT */}

          <a
            href="/#contact"
            onClick={handleContactClick}
          >
            Contact
          </a>

        </div>

        {/* =========================
            ACTIONS
        ========================= */}

        <div className="nav-actions">

          {/* SEARCH */}

          <button
            type="button"
            aria-label="Search sarees"
            onClick={handleSearchClick}
          >
            ⌕
          </button>

          {/* CART */}

          <Link
            to="/cart"
            className="cart-link"
            aria-label="Shopping cart"
          >
            🛍️

            {cartCount > 0 && (
              <span className="cart-count">
                {cartCount}
              </span>
            )}
          </Link>

          {/* MOBILE MENU BUTTON */}

          <button
            type="button"
            className="mobile-menu-button"
            aria-label={
              menuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
          >
            {menuOpen ? "×" : "☰"}
          </button>

        </div>
      </div>

      {/* =========================
          MOBILE NAVIGATION
      ========================= */}

      <div
        className={
          menuOpen
            ? "mobile-nav open"
            : "mobile-nav"
        }
      >

        <Link
          to="/"
          onClick={closeMenu}
        >
          Home
        </Link>

        <Link
          to="/shop"
          onClick={closeMenu}
        >
          Shop
        </Link>

        <Link
          to="/shop"
          onClick={closeMenu}
        >
          Collections
        </Link>

        {/* MOBILE ABOUT */}

        <a
          href="/#about"
          onClick={handleAboutClick}
        >
          About
        </a>

        {/* MOBILE CONTACT */}

        <a
          href="/#contact"
          onClick={handleContactClick}
        >
          Contact
        </a>

      </div>
    </nav>
  );
}

export default Navbar;