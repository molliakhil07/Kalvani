import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const { products, loading, error } = useProducts();

  const [isImageOpen, setIsImageOpen] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const product = products.find(
    (item) => item.id === Number(id)
  );

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <main className="product-not-found">
        <div className="product-not-found-content">

          <p className="section-label">
            KALVANI
          </p>

          <h1>
            Loading Product...
          </h1>

          <p>
            Please wait while we load the saree details.
          </p>

        </div>
      </main>
    );
  }

  /* ================= ERROR ================= */

  if (error) {
    return (
      <main className="product-not-found">
        <div className="product-not-found-content">

          <p className="section-label">
            KALVANI
          </p>

          <h1>
            Unable to Load Product
          </h1>

          <p>
            {error}
          </p>

          <Link
            to="/shop"
            className="back-to-shop"
          >
            ← Back to Shop
          </Link>

        </div>
      </main>
    );
  }

  /* ================= PRODUCT NOT FOUND ================= */

  if (!product) {
    return (
      <main className="product-not-found">
        <div className="product-not-found-content">

          <p className="section-label">
            KALVANI
          </p>

          <h1>
            Product Not Found
          </h1>

          <p>
            The saree you are looking for could not
            be found.
          </p>

          <Link
            to="/shop"
            className="back-to-shop"
          >
            ← Back to Shop
          </Link>

        </div>
      </main>
    );
  }

  /* ================= WHATSAPP ================= */

  const whatsappMessage = encodeURIComponent(
    `Hi Kalvani, I'm interested in the ${product.name} (Product ID: KLV${product.id}). Is it available?`
  );

  const whatsappUrl =
  `https://wa.me/918519914348?text=${whatsappMessage}`;

  /* ================= ADD TO CART ================= */

  const handleAddToCart = () => {

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image,
    });

    setIsAddedToCart(true);
  };

  return (
    <main className="product-details-page">

      {/* ================= BREADCRUMB ================= */}

      <div className="product-breadcrumb">

        <Link to="/">
          Home
        </Link>

        <span> / </span>

        <Link to="/shop">
          Shop
        </Link>

        <span> / </span>

        <span>
          {product.name}
        </span>

      </div>


      <div className="product-details-container">

        {/* ================= IMAGE ================= */}

        <div className="product-details-image-wrapper">

          <div
            className="product-details-image"
            onClick={() => setIsImageOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {

              if (
                event.key === "Enter" ||
                event.key === " "
              ) {
                setIsImageOpen(true);
              }

            }}
            aria-label={`View ${product.name} image`}
          >

            <img
              src={product.image}
              alt={product.name}
            />

            <span className="image-zoom-hint">
              Click to Zoom
            </span>

          </div>


          <p className="product-image-caption">
            Authentic Kanchipuram Sarees
          </p>

        </div>


        {/* ================= INFORMATION ================= */}

        <div className="product-details-info">

          <p className="product-details-category">
            {product.category}
          </p>


          <h1>
            {product.name}
          </h1>


          <p className="product-details-price">
            ₹{product.price.toLocaleString("en-IN")}
          </p>


          <div className="product-divider"></div>


          <p className="product-description">

            {product.category
              .toLowerCase()
              .includes("cotton")

              ? "Discover the timeless beauty of authentic Kanchipuram cotton weaving. This saree reflects skilled craftsmanship, traditional artistry and elegant design passed down through generations."

              : "Discover the timeless beauty of authentic Kanchipuram silk weaving. This saree reflects skilled craftsmanship, traditional artistry and elegant design passed down through generations."
            }

          </p>


          {/* ================= SPECIFICATIONS ================= */}

          <div className="product-specifications">

            <div>

              <span>
                Category
              </span>

              <strong>
                {product.category}
              </strong>

            </div>


            <div>

              <span>
                Availability
              </span>

              <strong>
                Available
              </strong>

            </div>

          </div>


          {/* ================= ACTIONS ================= */}

          <div className="product-actions">

            <button
              type="button"
              className="add-cart-button"
              onClick={handleAddToCart}
            >

              {isAddedToCart
                ? "✓ Added to Cart"
                : "Add to Cart"
              }

            </button>


            {isAddedToCart && (

              <button
                type="button"
                className="go-to-cart-button"
                onClick={() => navigate("/cart")}
              >
                Go to Cart →
              </button>

            )}


            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-button"
            >
              Order on WhatsApp
            </a>

          </div>


          <Link
            to="/shop"
            className="back-to-shop"
          >
            ← Continue Shopping
          </Link>

        </div>

      </div>


      {/* ================= IMAGE LIGHTBOX ================= */}

      {isImageOpen && (

        <div
          className="product-image-lightbox"
          onClick={() => setIsImageOpen(false)}
        >

          <button
            type="button"
            className="lightbox-close"
            onClick={() => setIsImageOpen(false)}
            aria-label="Close image"
          >
            ×
          </button>


          <img
            src={product.image}
            alt={product.name}
            onClick={(event) =>
              event.stopPropagation()
            }
          />

        </div>

      )}

    </main>
  );
}

export default ProductDetails;