import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AlertDialog from "../components/AlertDialog";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch orders from backend on mount
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      navigate("/login");
      return;
    }
    fetch("http://localhost:3000/api/orders", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        // We assume data is an array of orders.
        setOrders(data);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders");
      });
  }, [navigate]);

  // Handler for deleting an order
  const handleDelete = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      // Use order._id based on your API's response
      const response = await fetch(`http://localhost:3000/api/orders/${selectedOrder._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Failed to delete order");
      } else {
        // Remove the deleted order from state
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== selectedOrder._id)
        );
      }
    } catch (err) {
      console.error("Error deleting order:", err);
      setError("Error deleting order");
    }
    setSelectedOrder(null);
  };

  // Handler for "See More Details" button
  const handleSeeMore = (order) => {
    navigate(`/order/${order._id}`);
  };

  return (
    <section className="flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-4xl bg-blue-50 p-8 rounded-2xl shadow-md space-y-6">
        <h1 className="text-3xl font-bold text-blue-800 text-center">
          Your Orders
        </h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="space-y-4">
          {orders.length === 0 ? (
            <h3 className="text-center text-blue-700 font-medium">
              There are no orders for now.
            </h3>
          ) : (
            orders.map((order) => (
              <div
                key={order._id}
                className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm"
              >
                <div>
                  <h2 className="text-lg font-medium text-blue-800">
                    {order.products &&
                    order.products.length > 0 &&
                    order.products[0].product?.name
                      ? order.products[0].product.name
                      : "Order"}
                  </h2>
                  <p className="text-sm text-blue-600">Status: {order.status}</p>
                  <p className="text-sm text-blue-600">
                    Total: ${order.totalPrice}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleSeeMore(order)}
                    className="px-3 py-1 text-sm text-blue-700 border border-blue-700 rounded-md hover:bg-blue-100 transition"
                  >
                    See More Details
                  </button>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedOrder && (
        <AlertDialog
          message="Are you absolutely sure?"
          subMessage={`This will delete "${
            selectedOrder.products &&
            selectedOrder.products.length > 0
              ? selectedOrder.products[0].product?.name
              : "this order"
          }" from your orders.`}
          onConfirm={handleDelete}
          onClose={() => setSelectedOrder(null)}
          deleteMode
        />
      )}
    </section>
  );
}

export default Orders;