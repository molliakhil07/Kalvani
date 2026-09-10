import { useState } from "react";
import { supabase } from "../lib/supabase";

interface AddProductProps {
  onClose: () => void;
  onProductAdded: () => Promise<void>;
}

function AddProduct({
  onClose,
  onProductAdded,
}: AddProductProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Kanchipuram Silk");
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState(false);

  const [image, setImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    if (!image) {
      setError("Please select a product image.");
      return;
    }

    setLoading(true);

    try {
      /*
       * 1. Create a unique image filename
       */
      const fileExtension =
        image.name.split(".").pop();

      const fileName = `${Date.now()}.${fileExtension}`;

      /*
       * 2. Upload image to Supabase Storage
       */
      const { error: uploadError } =
        await supabase.storage
          .from("product-images")
          .upload(fileName, image);

      if (uploadError) {
        throw uploadError;
      }

      /*
       * 3. Get public image URL
       */
      const {
        data: publicUrlData,
      } = supabase.storage
        .from("product-images")
        .getPublicUrl(fileName);

      const imageUrl =
        publicUrlData.publicUrl;

      /*
       * 4. Insert product into database
       */
      const { error: insertError } =
        await supabase
          .from("products")
          .insert({
            name,
            price: Number(price),
            category,
            description,
            image: imageUrl,
            featured,
          });

      if (insertError) {
        throw insertError;
      }

      /*
       * 5. Refresh dashboard
       */
      await onProductAdded();

      /*
       * 6. Close form
       */
      onClose();

    } catch (err) {
      console.error(
        "Failed to add product:",
        err
      );

      setError(
        "Failed to add product. Please try again."
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

            <h2>Add New Saree</h2>
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
            <label htmlFor="product-name">
              Saree Name
            </label>

            <input
              id="product-name"
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="Enter saree name"
              required
            />
          </div>

          <div className="admin-form-field">
            <label htmlFor="product-price">
              Price
            </label>

            <input
              id="product-price"
              type="number"
              min="0"
              value={price}
              onChange={(event) =>
                setPrice(event.target.value)
              }
              placeholder="Enter price"
              required
            />
          </div>

          <div className="admin-form-field">
            <label htmlFor="product-category">
              Category
            </label>

            <select
              id="product-category"
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
            <label htmlFor="product-description">
              Description
            </label>

            <textarea
              id="product-description"
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              placeholder="Describe the saree..."
              rows={5}
            />
          </div>

          <div className="admin-form-field">
            <label htmlFor="product-image">
              Product Image
            </label>

            <input
              id="product-image"
              type="file"
              accept="image/*"
              onChange={(event) =>
                setImage(
                  event.target.files?.[0] || null
                )
              }
              required
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
                ? "Adding Product..."
                : "Add Product"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddProduct;