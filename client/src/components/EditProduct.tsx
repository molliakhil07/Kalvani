import { useState } from "react";
import { supabase } from "../lib/supabase";
import type { SupabaseProduct } from "../lib/products";

interface EditProductProps {
  product: SupabaseProduct;
  onClose: () => void;
  onProductUpdated: () => Promise<void>;
}

function EditProduct({
  product,
  onClose,
  onProductUpdated,
}: EditProductProps) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(String(product.price));
  const [category, setCategory] = useState(product.category);
  const [description, setDescription] = useState(
    product.description ?? ""
  );
  const [featured, setFeatured] = useState(product.featured);

  const [image, setImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      let imageUrl = product.image;

      /*
       * If a new image was selected,
       * upload it and use the new URL.
       */
      if (image) {
        const fileExtension =
          image.name.split(".").pop();

        const fileName = `${Date.now()}.${fileExtension}`;

        const { error: uploadError } =
          await supabase.storage
            .from("product-images")
            .upload(fileName, image);

        if (uploadError) {
          throw uploadError;
        }

        const {
          data: publicUrlData,
        } = supabase.storage
          .from("product-images")
          .getPublicUrl(fileName);

        imageUrl = publicUrlData.publicUrl;
      }

      /*
       * Update product in Supabase.
       */
      const { error: updateError } =
        await supabase
          .from("products")
          .update({
            name,
            price: Number(price),
            category,
            description,
            image: imageUrl,
            featured,
          })
          .eq("id", product.id);

      if (updateError) {
        throw updateError;
      }

      /*
       * Refresh dashboard.
       */
      await onProductUpdated();

      /*
       * Close edit form.
       */
      onClose();

    } catch (err) {
      console.error(
        "Failed to update product:",
        err
      );

      setError(
        "Failed to update product. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-form-overlay">

      <div className="admin-form-container">

        <div className="admin-form-header">
          <div>
            <p className="section-label">
              KALVANI ADMIN
            </p>

            <h2>Edit Saree</h2>

            <p>
              Product ID: KLV{product.id}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="admin-close-button"
          >
            ×
          </button>
        </div>

        <form
          className="admin-product-form"
          onSubmit={handleSubmit}
        >

          <div className="admin-form-field">
            <label htmlFor="edit-product-name">
              Saree Name
            </label>

            <input
              id="edit-product-name"
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              required
            />
          </div>

          <div className="admin-form-field">
            <label htmlFor="edit-product-price">
              Price
            </label>

            <input
              id="edit-product-price"
              type="number"
              min="0"
              value={price}
              onChange={(event) =>
                setPrice(event.target.value)
              }
              required
            />
          </div>

          <div className="admin-form-field">
            <label htmlFor="edit-product-category">
              Category
            </label>

            <select
              id="edit-product-category"
              value={category}
              onChange={(event) =>
                setCategory(event.target.value)
              }
            >
              <option value="Kanchipuram Silk">
                Kanchipuram Silk
              </option>

              <option value="Kanchipuram Cotton">
                Kanchipuram Cotton
              </option>
            </select>
          </div>

          <div className="admin-form-field">
            <label htmlFor="edit-product-description">
              Description
            </label>

            <textarea
              id="edit-product-description"
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              rows={5}
            />
          </div>

          <div className="admin-form-field">
            <label htmlFor="edit-product-image">
              Product Image
            </label>

            <input
              id="edit-product-image"
              type="file"
              accept="image/*"
              onChange={(event) =>
                setImage(
                  event.target.files?.[0] ?? null
                )
              }
            />

            <small>
              Leave empty to keep the current image.
            </small>
          </div>

          <div className="admin-current-image">
            <p>Current Image</p>

            <img
              src={product.image}
              alt={product.name}
            />
          </div>

          <label className="admin-featured-checkbox">
            <input
              type="checkbox"
              checked={featured}
              onChange={(event) =>
                setFeatured(event.target.checked)
              }
            />

            <span>
              Mark as Featured ⭐
            </span>
          </label>

          {error && (
            <p className="admin-form-error">
              {error}
            </p>
          )}

          <div className="admin-form-actions">

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Saving Changes..."
                : "Save Changes"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditProduct;