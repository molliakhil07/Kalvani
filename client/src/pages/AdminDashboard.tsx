import { useState } from "react";
import { Link } from "react-router-dom";

import { supabase } from "../lib/supabase";
import { signOutAdmin } from "../lib/auth";

import { useProducts } from "../context/ProductContext";

import type { SupabaseProduct } from "../lib/products";

import AddProduct from "../components/AddProduct";
import EditProduct from "../components/EditProduct";

function AdminDashboard() {
  const {
    products,
    loading,
    error,
    refreshProducts,
  } = useProducts();

  // =========================
  // ADD PRODUCT STATE
  // =========================

  const [showAddProduct, setShowAddProduct] =
    useState(false);

  // =========================
  // EDIT PRODUCT STATE
  // =========================

  const [editingProduct, setEditingProduct] =
    useState<SupabaseProduct | null>(null);

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = async () => {
    try {
      await signOutAdmin();

      window.location.href = "/admin/login";
    } catch (err) {
      console.error("Failed to logout:", err);

      alert(
        "Failed to sign out. Please try again."
      );
    }
  };

  // =========================
  // DELETE PRODUCT
  // =========================

  const handleDeleteProduct = async (
    productId: number,
    productName: string
  ) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${productName}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      // =========================
      // DELETE PRODUCT FROM DATABASE
      // =========================

      const { error: deleteError } =
        await supabase
          .from("products")
          .delete()
          .eq("id", productId);

      if (deleteError) {
        throw deleteError;
      }

      // =========================
      // REFRESH PRODUCTS
      // =========================

      await refreshProducts();

      alert(
        "Product deleted successfully."
      );

    } catch (err) {
      console.error(
        "Failed to delete product:",
        err
      );

      alert(
        "Failed to delete product. Please try again."
      );
    }
  };

  // =========================
  // EDIT PRODUCT
  // =========================

  const handleEditProduct = (
    product: SupabaseProduct
  ) => {
    setEditingProduct(product);
  };

  // =========================
  // CLOSE EDIT FORM
  // =========================

  const handleCloseEdit = () => {
    setEditingProduct(null);
  };

  // =========================
  // PRODUCT UPDATED
  // =========================

  const handleProductUpdated = async () => {
    await refreshProducts();

    setEditingProduct(null);
  };

  // =========================
  // PRODUCT ADDED
  // =========================

  const handleProductAdded = async () => {
    await refreshProducts();

    setShowAddProduct(false);
  };

  // =========================
  // PAGE
  // =========================

  return (
    <main className="admin-page">

      <div className="admin-container">

        {/* =========================
            ADMIN HEADER
        ========================= */}

        <div className="admin-header">

          <div>

            <p className="section-label">
              KALVANI ADMIN
            </p>

            <h1>
              Product Management
            </h1>

            <p>
              Manage your Kanchipuram saree
              collection.
            </p>

            <p className="admin-product-count">
              {products.length}{" "}
              {products.length === 1
                ? "Product"
                : "Products"}{" "}
              in Collection
            </p>

          </div>

          <div className="admin-header-actions">

            <Link
              to="/admin"
              className="admin-nav-button active"
            >
              Products
            </Link>

            <Link
              to="/admin/orders"
              className="admin-nav-button"
            >
              Orders
            </Link>

            <button
              type="button"
              className="admin-add-button"
              onClick={() =>
                setShowAddProduct(true)
              }
            >
              + Add Product
            </button>

            <button
              type="button"
              className="admin-logout-button"
              onClick={handleLogout}
            >
              Sign Out
            </button>

          </div>

        </div>

        {/* =========================
            LOADING
        ========================= */}

        {loading && (
          <p>
            Loading products...
          </p>
        )}

        {/* =========================
            ERROR
        ========================= */}

        {error && (
          <p>
            {error}
          </p>
        )}

        {/* =========================
            PRODUCTS
        ========================= */}

        {!loading &&
          !error && (
            <div className="admin-products">

              {/* TABLE HEADER */}

              <div className="admin-products-header">

                <span>
                  Product
                </span>

                <span>
                  Category
                </span>

                <span>
                  Price
                </span>

                <span>
                  Featured
                </span>

                <span>
                  Actions
                </span>

              </div>

              {/* PRODUCT ROWS */}

              {products.map(
                (product) => (

                  <div
                    className="admin-product-row"
                    key={product.id}
                  >

                    {/* PRODUCT */}

                    <div className="admin-product-info">

                      <img
                        src={product.image}
                        alt={product.name}
                      />

                      <div>

                        <h3>
                          {product.name}
                        </h3>

                        <p>
                          KLV{product.id}
                        </p>

                      </div>

                    </div>

                    {/* CATEGORY */}

                    <div>
                      {product.category}
                    </div>

                    {/* PRICE */}

                    <div>
                      ₹
                      {product.price.toLocaleString(
                        "en-IN"
                      )}
                    </div>

                    {/* FEATURED */}

                    <div>
                      {product.featured
                        ? "⭐ Yes"
                        : "No"}
                    </div>

                    {/* ACTIONS */}

                    <div className="admin-actions">

                      <button
                        type="button"
                        onClick={() =>
                          handleEditProduct(
                            product
                          )
                        }
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteProduct(
                            product.id,
                            product.name
                          )
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                )
              )}

              {/* NO PRODUCTS */}

              {products.length === 0 && (
                <div
                  style={{
                    padding: "40px",
                    textAlign: "center",
                  }}
                >
                  <p>
                    No products found.
                  </p>
                </div>
              )}

            </div>
          )}

      </div>

      {/* =========================
          ADD PRODUCT MODAL
      ========================= */}

      {showAddProduct && (
        <AddProduct
          onClose={() =>
            setShowAddProduct(false)
          }
          onProductAdded={
            handleProductAdded
          }
        />
      )}

      {/* =========================
          EDIT PRODUCT MODAL
      ========================= */}

      {editingProduct && (
        <EditProduct
          product={editingProduct}
          onClose={handleCloseEdit}
          onProductUpdated={
            handleProductUpdated
          }
        />
      )}

    </main>
  );
}

export default AdminDashboard;