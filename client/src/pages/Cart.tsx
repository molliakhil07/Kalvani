import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

import {
  WHATSAPP_NUMBER,
  BUSINESS_NAME,
} from "../config/business";

import { supabase } from "../lib/supabase";

function Cart() {
  const {
    cartItems,
    cartTotal,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  // Customer details
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);

  // =========================================
  // CREATE WHATSAPP ORDER
  // =========================================

  const createWhatsAppOrder = async () => {
    setIsOrdering(true);

    try {
      const cleanPhone = phone.replace(/\D/g, "");
      const cleanPincode = pincode.replace(/\D/g, "");

      // =========================================
      // VALIDATION
      // =========================================

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

      if (!state.trim()) {
  alert("Please enter your state.");
  return;
}

      if (!/^\d{6}$/.test(cleanPincode)) {
        alert("Please enter a valid 6-digit pincode.");
        return;
      }

      // =========================================
      // PREPARE ORDER ITEMS
      // =========================================

      const orderItems = cartItems.map((item) => ({
        product_id: item.id,
        product_name: item.name,
        product_price: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity,
      }));

      // =========================================
      // CREATE ORDER USING SECURE RPC
      // =========================================

      const { data: orderId, error: orderError } =
        await supabase.rpc(
          "create_kalvani_order",
          {
            p_customer_name: customerName.trim(),
            p_customer_phone: cleanPhone,
            p_address: address.trim(),
            p_city: city.trim(),
            p_state: state.trim(),
            p_pincode: cleanPincode,
            p_total_amount: cartTotal,
            p_items: orderItems,
          }
        );

      if (orderError) {
        throw orderError;
      }

      if (!orderId) {
        throw new Error(
          "Order was created but no order ID was returned."
        );
      }
      setOrderId(orderId);

      // =========================================
      // CREATE WHATSAPP ITEMS
      // =========================================

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

      // =========================================
      // CREATE WHATSAPP MESSAGE
      // =========================================

      const message = `Hi ${BUSINESS_NAME}! I'd like to place an order. 🥻

CUSTOMER DETAILS
Name: ${customerName.trim()}
Phone: ${cleanPhone}
Address: ${address.trim()}
City: ${city.trim()}
State: ${state.trim()}
Pincode: ${cleanPincode}

ORDER ID
KLV-${orderId}

ORDER DETAILS

${items}

-------------------------
Total: ₹${cartTotal.toLocaleString("en-IN")}
-------------------------

Please let me know the availability and delivery details.`;

      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        message
      )}`;

      // =========================================
      // OPEN WHATSAPP
      // =========================================

      window.open(
        whatsappUrl,
        "_blank",
        "noopener,noreferrer"
      );

      // =========================================
      // COMPLETE ORDER
      // =========================================

      clearCart();
      setOrderPlaced(true);
    } catch (err) {
      console.error("Failed to create order:", err);

      alert(
        "We couldn't place your order right now. Please try again."
      );
    } finally {
      setIsOrdering(false);
    }
  };

  // =========================================
  // ORDER SUCCESS
  // =========================================

  if (orderPlaced) {
    return (
      <main className="cart-page order-success-page">
        <div className="order-success-content">

          <div className="order-success-icon">
            ✓
          </div>

          <p className="section-label">
            KALVANI
          </p>

          <h1>
  Your Order Has Been Received!
</h1>

{orderId && (
  <p>
    Order ID: <strong>KLV-{orderId}</strong>
  </p>
)}

          <p className="order-success-message">
            Thank you for shopping with Kalvani.
            Any updates regarding your order will be
            shared with you on WhatsApp.
            Please keep an eye on WhatsApp for order
            confirmation and delivery updates.
          </p>

          <p className="happy-shopping">
            Happy Shopping! ❤️
          </p>

          <Link
            to="/shop"
            className="shop-more-button"
          >
            Shop More
          </Link>

        </div>
      </main>
    );
  }

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
            Kanchipuram silk and cotton sarees.
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
            KALVANI
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
                    setCustomerName(e.target.value)
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
  <label htmlFor="state">
    State
  </label>

  <input
    id="state"
    type="text"
    value={state}
    onChange={(e) =>
      setState(e.target.value)
    }
    placeholder="Enter your state"
    autoComplete="address-level1"
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
                Items (
                {cartItems.reduce(
                  (total, item) =>
                    total + item.quantity,
                  0
                )}
                )
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
              disabled={isOrdering}
            >
              {isOrdering
                ? "Preparing Order..."
                : "Order on WhatsApp"}
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