import { Link, useNavigate, useParams } from "react-router-dom";
import { allProducts } from "../data/products";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = allProducts.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <main className="product-not-found">
        <div className="product-not-found-content">
          <p className="section-label">
            KALAVANI
          </p>

          <h1>Product Not Found</h1>

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

  const whatsappMessage = encodeURIComponent(
    `Hi Kalavani, I'm interested in the ${product.name} (Product ID: KLV${product.id}). Is it available?`
  );

  const whatsappUrl =
    `https://wa.me/?text=${whatsappMessage}`;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image,
    });

    navigate("/cart");
  };

  return (
    <main className="product-details-page">

      {/* BREADCRUMB */}
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

        {/* IMAGE */}
        <div className="product-details-image-wrapper">

          <div className="product-details-image">
            <img
              src={product.image}
              alt={product.name}
            />
          </div>

          <p className="product-image-caption">
            Authentic Kanchipuram Silk
          </p>

        </div>


        {/* INFORMATION */}
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
            Discover the timeless beauty of authentic
            Kanchipuram silk weaving. This saree reflects
            skilled craftsmanship, traditional artistry
            and elegant design passed down through
            generations.
          </p>


          {/* SPECIFICATIONS */}
          <div className="product-specifications">

            <div>
              <span>
                Craft
              </span>

              <strong>
                Kanchipuram Silk
              </strong>
            </div>

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


          {/* ACTIONS */}
          <div className="product-actions">

            <button
              type="button"
              className="add-cart-button"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>

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

    </main>
  );
}

export default ProductDetails;