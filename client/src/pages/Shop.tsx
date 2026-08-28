import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { allProducts } from "../data/products";

function Shop() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    "Kanchipuram Silk",
  ];

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="shop-page">

      {/* SHOP HEADER */}
      <section className="shop-header">
        <p className="section-label">
          KALVANI COLLECTION
        </p>

        <h1>Shop Sarees</h1>

        <p>
          Explore our collection of traditional kanchipuram
          silk sarees, crafted with timeless
          artistry and heritage.
        </p>
      </section>

      {/* FILTERS */}
      <section className="shop-controls">

        <div className="search-box">
          <input
            type="text"
            placeholder="Search sarees..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />
        </div>

        <div className="category-filters">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={
                category === item
                  ? "category-button active"
                  : "category-button"
              }
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

      </section>

      {/* PRODUCTS */}
      <section className="shop-products">

        <div className="shop-results">
          <p>
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1
              ? "saree"
              : "sarees"}{" "}
            found
          </p>
        </div>

        <div className="products-grid">

          {filteredProducts.map((product) => (
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

        {filteredProducts.length === 0 && (
          <div className="no-products">
            <h2>No sarees found</h2>

            <p>
              Try searching for another saree
              or category.
            </p>
          </div>
        )}

      </section>

    </main>
  );
}

export default Shop;