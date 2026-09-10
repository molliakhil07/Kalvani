import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../context/ProductContext";

function Shop() {
  const { products, loading, error } = useProducts();

  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState("all");

  useEffect(() => {
    if (searchTerm) {
      setSearchParams(
        { search: searchTerm },
        { replace: true }
      );
    } else {
      setSearchParams({}, { replace: true });
    }
  }, [searchTerm, setSearchParams]);

  const categories = [
    "All",
    "Kanchipuram Silk",
    "Kanchipuram Cotton",
  ];

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

     const matchesCategory =
  category === "All" ||
  product.category.trim().toLowerCase() ===
    category.trim().toLowerCase();

      const matchesPriceRange =
        priceRange === "all" ||
        (priceRange === "under-1500" &&
          product.price < 1500) ||
        (priceRange === "1500-2500" &&
          product.price >= 1500 &&
          product.price <= 2500) ||
        (priceRange === "2500-3500" &&
          product.price > 2500 &&
          product.price <= 3500) ||
        (priceRange === "above-3500" &&
          product.price > 3500);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPriceRange
      );
    })
    .sort((a, b) => {
      if (sortBy === "low-to-high") {
        return a.price - b.price;
      }

      if (sortBy === "high-to-low") {
        return b.price - a.price;
      }

      if (sortBy === "category") {
        return a.category.localeCompare(b.category);
      }

      return 0;
    });

  return (
    <main className="shop-page">

      {/* SHOP HEADER */}
      <section className="shop-header">

        <p className="section-label">
          KALVANI COLLECTION
        </p>

        <h1>
          Shop Sarees
        </h1>

        <p>
          Explore our collection of traditional
          Kanchipuram sarees, crafted with timeless
          artistry and heritage.
        </p>

      </section>


      {/* FILTERS */}
      <section className="shop-controls">

        <div className="shop-search-sort">

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


          <div className="sort-box">

            <label htmlFor="sort-products">
              Sort By
            </label>

            <select
              id="sort-products"
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value)
              }
            >

              <option value="default">
                Default
              </option>

              <option value="low-to-high">
                Lowest Price First
              </option>

              <option value="high-to-low">
                Highest Price First
              </option>

              <option value="price-range">
                Price Range
              </option>

              <option value="category">
                Category
              </option>

            </select>


            {sortBy === "price-range" && (

              <select
                className="price-range-select"
                value={priceRange}
                onChange={(event) =>
                  setPriceRange(event.target.value)
                }
              >

                <option value="all">
                  All Prices
                </option>

                <option value="under-1500">
                  Under ₹1,500
                </option>

                <option value="1500-2500">
                  ₹1,500 – ₹2,500
                </option>

                <option value="2500-3500">
                  ₹2,501 – ₹3,500
                </option>

                <option value="above-3500">
                  Above ₹3,500
                </option>

              </select>

            )}

          </div>

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

        {/* LOADING */}
        {loading && (

          <div className="shop-results">
            <p>
              Loading sarees...
            </p>
          </div>

        )}


        {/* ERROR */}
        {!loading && error && (

          <div className="no-products">

            <h2>
              Unable to load sarees
            </h2>

            <p>
              {error}
            </p>

          </div>

        )}


        {/* PRODUCTS */}
        {!loading && !error && (

          <>

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

                <h2>
                  No sarees found
                </h2>

                <p>
                  Try searching for another saree
                  or category.
                </p>

              </div>

            )}

          </>

        )}

      </section>

    </main>
  );
}

export default Shop;