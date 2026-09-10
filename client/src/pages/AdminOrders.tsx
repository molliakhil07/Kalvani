import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

interface Order {
  id: number;
  customer_name: string;
  customer_phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  total_amount: number;
  status: string;
  created_at: string;
}

interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  product_name: string;
  product_price: number;
  quantity: number;
  subtotal: number;
}

function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedOrder, setSelectedOrder] =
    useState<Order | null>(null);

  const [orderItems, setOrderItems] =
    useState<OrderItem[]>([]);

  const [loadingDetails, setLoadingDetails] =
    useState(false);

  const [updatingStatus, setUpdatingStatus] =
    useState<number | null>(null);

  // =========================================
  // FETCH ORDERS
  // =========================================

  const fetchOrders = async () => {
    setLoading(true);
    setError("");

    try {
      const { data, error: ordersError } =
        await supabase
          .from("orders")
          .select("*")
          .order("created_at", {
            ascending: false,
          });

      if (ordersError) {
        throw ordersError;
      }

      setOrders(data ?? []);
    } catch (err) {
      console.error(
        "Failed to fetch orders:",
        err
      );

      setError(
        "Failed to load orders. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // =========================================
  // VIEW ORDER DETAILS
  // =========================================

  const handleViewOrder = async (
    order: Order
  ) => {
    setSelectedOrder(order);
    setOrderItems([]);
    setLoadingDetails(true);

    try {
      const {
        data,
        error: itemsError,
      } = await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", order.id)
        .order("id", {
          ascending: true,
        });

      if (itemsError) {
        throw itemsError;
      }

      setOrderItems(data ?? []);
    } catch (err) {
      console.error(
        "Failed to fetch order items:",
        err
      );

      alert(
        "Failed to load order details. Please try again."
      );
    } finally {
      setLoadingDetails(false);
    }
  };

  // =========================================
  // CLOSE DETAILS
  // =========================================

  const handleCloseDetails = () => {
    setSelectedOrder(null);
    setOrderItems([]);
  };

  // =========================================
  // UPDATE ORDER STATUS
  // =========================================

  const handleStatusChange = async (
    orderId: number,
    newStatus: string
  ) => {
    setUpdatingStatus(orderId);

    try {
      const {
        error: updateError,
      } = await supabase
        .from("orders")
        .update({
          status: newStatus,
        })
        .eq("id", orderId);

      if (updateError) {
        throw updateError;
      }

      // Update orders list
      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === orderId
            ? {
                ...order,
                status: newStatus,
              }
            : order
        )
      );

      // Update selected order if modal is open
      setSelectedOrder((currentOrder) =>
        currentOrder?.id === orderId
          ? {
              ...currentOrder,
              status: newStatus,
            }
          : currentOrder
      );
    } catch (err) {
      console.error(
        "Failed to update order status:",
        err
      );

      alert(
        "Failed to update order status. Please try again."
      );
    } finally {
      setUpdatingStatus(null);
    }
  };

  return (
    <main className="admin-page">
      <div className="admin-container">

        {/* =========================================
            HEADER
        ========================================= */}

        <div className="admin-header">

  <div>
    <p className="section-label">
      KALVANI ADMIN
    </p>

    <h1>Orders</h1>

    <p>
      View and manage customer orders.
    </p>

    <p className="admin-product-count">
      {orders.length}{" "}
      {orders.length === 1
        ? "Order"
        : "Orders"}
    </p>
  </div>

  <div className="admin-header-actions">

    <Link
      to="/admin"
      className="admin-nav-button"
    >
      Products
    </Link>

    <Link
      to="/admin/orders"
      className="admin-nav-button active"
    >
      Orders
    </Link>

  </div>

</div>

        {/* =========================================
            LOADING
        ========================================= */}

        {loading && (
          <p>Loading orders...</p>
        )}

        {/* =========================================
            ERROR
        ========================================= */}

        {error && (
          <p>{error}</p>
        )}

        {/* =========================================
            ORDERS
        ========================================= */}

        {!loading && !error && (
          <div className="admin-products">

            <div className="admin-orders-header">
              <span>Order</span>
              <span>Customer</span>
              <span>Phone</span>
              <span>Total</span>
              <span>Status</span>
              <span>Date</span>
            </div>

            {orders.map((order) => (
              <div
                className="admin-order-row"
                key={order.id}
              >

                {/* ORDER */}

                <div>
                  <button
                    type="button"
                    className="admin-order-link"
                    onClick={() =>
                      handleViewOrder(order)
                    }
                  >
                    KLV-{order.id}
                  </button>
                </div>

                {/* CUSTOMER */}

                <div>
                  {order.customer_name}
                </div>

                {/* PHONE */}

                <div>
                  {order.customer_phone}
                </div>

                {/* TOTAL */}

                <div>
                  ₹
                  {order.total_amount.toLocaleString(
                    "en-IN"
                  )}
                </div>

                {/* STATUS */}

                <div>
                  <select
                    className="admin-order-status"
                    value={order.status}
                    disabled={
                      updatingStatus === order.id
                    }
                    onChange={(event) =>
                      handleStatusChange(
                        order.id,
                        event.target.value
                      )
                    }
                  >
                    <option value="pending">
                      Pending
                    </option>

                    <option value="confirmed">
                      Confirmed
                    </option>

                    <option value="shipped">
                      Shipped
                    </option>

                    <option value="delivered">
                      Delivered
                    </option>

                    <option value="cancelled">
                      Cancelled
                    </option>
                  </select>
                </div>

                {/* DATE */}

                <div>
                  {new Date(
                    order.created_at
                  ).toLocaleDateString(
                    "en-IN"
                  )}
                </div>

              </div>
            ))}

            {orders.length === 0 && (
              <div
                style={{
                  padding: "40px",
                  textAlign: "center",
                }}
              >
                <p>
                  No orders found.
                </p>
              </div>
            )}

          </div>
        )}

      </div>

      {/* =========================================
          ORDER DETAILS MODAL
      ========================================= */}

      {selectedOrder && (
        <div className="admin-form-overlay">

          <div className="admin-form-container admin-order-details">

            {/* HEADER */}

            <div className="admin-form-header">

              <div>
                <p className="section-label">
                  KALVANI ADMIN
                </p>

                <h2>
                  Order KLV-{selectedOrder.id}
                </h2>
              </div>

              <button
                type="button"
                onClick={handleCloseDetails}
                className="admin-close-button"
              >
                ×
              </button>

            </div>

            {/* CUSTOMER DETAILS */}

            <div className="admin-order-section">

              <h3>
                Customer Details
              </h3>

              <div className="admin-order-info">

                <div>
                  <span>Name</span>

                  <strong>
                    {selectedOrder.customer_name}
                  </strong>
                </div>

                <div>
                  <span>Phone</span>

                  <strong>
                    {selectedOrder.customer_phone}
                  </strong>
                </div>

              </div>

            </div>

            {/* DELIVERY DETAILS */}

            <div className="admin-order-section">

              <h3>
                Delivery Details
              </h3>

              <div className="admin-order-info">

                <div>
                  <span>Address</span>

                  <strong>
                    {selectedOrder.address}
                  </strong>
                </div>

                <div>
                  <span>City</span>

                  <strong>
                    {selectedOrder.city}
                  </strong>
                </div>

                 <div>
    <span>State</span>
    <strong>{selectedOrder.state}</strong>
  </div>

                <div>
                  <span>Pincode</span>

                  <strong>
                    {selectedOrder.pincode}
                  </strong>
                </div>

              </div>

            </div>

            {/* ORDER INFORMATION */}

            <div className="admin-order-section">

              <h3>
                Order Information
              </h3>

              <div className="admin-order-info">

                <div>
                  <span>Status</span>

                  <select
                    className="admin-order-status admin-order-status-large"
                    value={selectedOrder.status}
                    disabled={
                      updatingStatus ===
                      selectedOrder.id
                    }
                    onChange={(event) =>
                      handleStatusChange(
                        selectedOrder.id,
                        event.target.value
                      )
                    }
                  >
                    <option value="pending">
                      Pending
                    </option>

                    <option value="confirmed">
                      Confirmed
                    </option>

                    <option value="shipped">
                      Shipped
                    </option>

                    <option value="delivered">
                      Delivered
                    </option>

                    <option value="cancelled">
                      Cancelled
                    </option>
                  </select>
                </div>

                <div>
                  <span>Date</span>

                  <strong>
                    {new Date(
                      selectedOrder.created_at
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </strong>
                </div>

              </div>

            </div>

            {/* ORDER ITEMS */}

            <div className="admin-order-section">

              <h3>
                Ordered Sarees
              </h3>

              {loadingDetails ? (
                <p>
                  Loading order items...
                </p>
              ) : (
                <div className="admin-order-items">

                  {orderItems.map((item) => (
                    <div
                      className="admin-order-item"
                      key={item.id}
                    >

                      <div>

                        <strong>
                          {item.product_name}
                        </strong>

                        <span>
                          ₹
                          {item.product_price.toLocaleString(
                            "en-IN"
                          )}{" "}
                          × {item.quantity}
                        </span>

                      </div>

                      <strong>
                        ₹
                        {item.subtotal.toLocaleString(
                          "en-IN"
                        )}
                      </strong>

                    </div>
                  ))}

                  {orderItems.length === 0 && (
                    <p>
                      No items found for this order.
                    </p>
                  )}

                </div>
              )}

            </div>

            {/* TOTAL */}

            <div className="admin-order-total">

              <span>
                Total
              </span>

              <strong>
                ₹
                {selectedOrder.total_amount.toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>

          </div>

        </div>
      )}

    </main>
  );
}

export default AdminOrders;