import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  WHATSAPP_NUMBER,
  BUSINESS_NAME,
} from "../config/business";

function Cart() {
  const {
    cartItems,
    cartTotal,
    updateQuantity,
    removeFromCart,
  } = useCart();

  // Customer details
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  // Create WhatsApp order
  const createWhatsAppOrder = () => {
    const cleanPhone = phone.replace(/\D/g, "");
    const cleanPincode = pincode.replace(/\D/g, "");

    // Validation
    if (!customerName.trim()) {
      alert("Please enter your full name.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      alert(
        "Please enter a valid 10-digit Indian mobile number."
      );
      return;
    }

    if (!address.trim()) {
      alert("Please enter your delivery address.");
      return;
    }

    if (!city.trim()) {
      alert("Please enter your city.");
      return;
    }

    if (!/^\d{6}$/.test(cleanPincode)) {
      alert("Please enter a valid 6-digit pincode.");
      return;
    }

    // Create order items
    const items = cartItems
      .map(
        (item, index) =>
          `${index + 1}. ${item.name}
   Quantity: ${item.quantity}
   Price: ₹${item.price.toLocaleString("en-IN")}
   Item Total: ₹${(
     item.price * item.quantity
   ).toLocaleString("en-IN")}`
      )
      .join("\n\n");

    // Create WhatsApp message
    const message = `Hi ${BUSINESS_NAME}! I'd like to place an order.

CUSTOMER DETAILS
Name: ${customerName.trim()}
Phone: ${cleanPhone}
Address: ${address.trim()}
City: ${city.trim()}
Pincode: ${cleanPincode}

ORDER DETAILS
${items}

-------------------------
Total: ₹${cartTotal.toLocaleString("en-IN")}
-------------------------

Please let me know the availability and delivery details.`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  /* =========================================
     EMPTY CART
  ========================================= */

  if (cartItems.length === 0) {
    return (
      <main className="cart-page empty-cart">
        <div className="empty-cart-content">
          <p className="section-label">
            KALVANI
          </p>

          <h1>Your Cart Is Empty</h1>

          <p>
            Discover something beautiful from
            our collection of authentic
            traditional kanchipuram silk sarees.
          </p>

          <Link
            to="/shop"
            className="shop-button"
          >
            Explore Sarees
          </Link>
        </div>
      </main>
    );
  }

  /* =========================================
     CART PAGE
  ========================================= */

  return (
    <main className="cart-page">
      <div className="cart-container">

        {/* HEADER */}
        <div className="cart-header">
          <p className="section-label">
            KALAVANI
          </p>

          <h1>Your Cart</h1>
        </div>

        <div className="cart-content">

          {/* =================================
              CART ITEMS
          ================================= */}

          <div className="cart-items">

            {cartItems.map((item) => (
              <div
                className="cart-item"
                key={item.id}
              >

                {/* PRODUCT IMAGE */}
                <img
                  src={item.image}
                  alt={item.name}
                />

                {/* PRODUCT INFORMATION */}
                <div className="cart-item-info">

                  <p className="cart-item-category">
                    {item.category}
                  </p>

                  <h2>
                    {item.name}
                  </h2>

                  <p className="cart-item-price">
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>

                  {/* QUANTITY */}
                  <div className="cart-quantity">

                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.quantity - 1
                        )
                      }
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      −
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.quantity + 1
                        )
                      }
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      +
                    </button>

                  </div>

                  {/* REMOVE */}
                  <button
                    type="button"
                    className="remove-item"
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                  >
                    Remove
                  </button>

                </div>

                {/* ITEM TOTAL */}
                <div className="cart-item-total">
                  ₹{(
                    item.price * item.quantity
                  ).toLocaleString("en-IN")}
                </div>

              </div>
            ))}

          </div>

          {/* =================================
              CHECKOUT / SUMMARY
          ================================= */}

          <aside className="cart-summary">

            {/* CUSTOMER DETAILS */}

            <div className="customer-details">

              <h2>
                Customer Details
              </h2>

              <div className="form-group">
                <label htmlFor="customerName">
                  Full Name
                </label>

                <input
                  id="customerName"
                  type="text"
                  value={customerName}
                  onChange={(e) =>
                    setCustomerName(
                      e.target.value
                    )
                  }
                  placeholder="Enter your full name"
                  autoComplete="name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">
                  Phone Number
                </label>

                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  inputMode="numeric"
                  autoComplete="tel"
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">
                  Delivery Address
                </label>

                <textarea
                  id="address"
                  value={address}
                  onChange={(e) =>
                    setAddress(e.target.value)
                  }
                  placeholder="Enter your delivery address"
                  rows={3}
                  autoComplete="street-address"
                />
              </div>

              <div className="form-group">
                <label htmlFor="city">
                  City
                </label>

                <input
                  id="city"
                  type="text"
                  value={city}
                  onChange={(e) =>
                    setCity(e.target.value)
                  }
                  placeholder="Enter your city"
                  autoComplete="address-level2"
                />
              </div>

              <div className="form-group">
                <label htmlFor="pincode">
                  Pincode
                </label>

                <input
                  id="pincode"
                  type="text"
                  value={pincode}
                  onChange={(e) =>
                    setPincode(e.target.value)
                  }
                  placeholder="6-digit pincode"
                  maxLength={6}
                  inputMode="numeric"
                  autoComplete="postal-code"
                />
              </div>

            </div>

            {/* ORDER SUMMARY */}

            <h2>
              Order Summary
            </h2>

            <div className="order-summary-row">

              <span>
                Items
              </span>

              <span>
                {cartItems.reduce(
                  (total, item) =>
                    total + item.quantity,
                  0
                )}
              </span>

            </div>

            <div className="order-summary-row">

              <span>
                Subtotal
              </span>

              <strong>
                ₹{cartTotal.toLocaleString("en-IN")}
              </strong>

            </div>

            <div className="order-summary-row">

              <span>
                Shipping
              </span>

              <span>
                To be confirmed
              </span>

            </div>

            {/* TOTAL */}

            <div className="order-summary-total">

              <span>
                Total
              </span>

              <strong>
                ₹{cartTotal.toLocaleString("en-IN")}
              </strong>

            </div>

            {/* WHATSAPP ORDER */}

            <button
              type="button"
              className="checkout-button"
              onClick={createWhatsAppOrder}
            >
              Order on WhatsApp
            </button>

            {/* CONTINUE SHOPPING */}

            <Link
              to="/shop"
              className="continue-shopping"
            >
              ← Continue Shopping
            </Link>

          </aside>

        </div>
      </div>
    </main>
  );
}

export default Cart;