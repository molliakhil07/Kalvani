import { Link } from "react-router-dom";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

function ProductCard({
  id,
  name,
  price,
  image,
  category,
}: ProductCardProps) {
  return (
    <Link to={`/product/${id}`} className="product-card">
      <div className="product-image-container">
        <img
          src={image}
          alt={name}
          className="product-image"
        />

        <span className="product-category">
          {category}
        </span>
      </div>

      <div className="product-info">
        <h3>{name}</h3>
        <p>₹{price.toLocaleString("en-IN")}</p>
      </div>
    </Link>
  );
}

export default ProductCard;