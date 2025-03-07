import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AlertDialog from "../components/AlertDialog";

const API_URL = import.meta.env.VITE_API_URL;

function SingleOrder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      navigate("/login");
      return;
    }
    fetch(`${API_URL}/orders/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Order not found");
        return res.json();
      })
      .then((data) => setOrder(data))
      .catch((err) => {
        console.error("Error fetching order:", err);
        setError("Error fetching order.");
      });
  }, [id, navigate]);

  const handleDeleteOrder = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/orders/${order._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Failed to delete order");
      } else {
        navigate("/orders");
      }
    } catch (err) {
      console.error("Error deleting order:", err);
      setError("Error deleting order");
    }
    setShowDeleteDialog(false);
  };

  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!order) return <div className="text-center">Loading...</div>;

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-12 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-3xl bg-blue-50 p-8 rounded-2xl shadow-md space-y-6"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-800 text-center max-w-full truncate">
          Order #{order._id}
        </h1>

        <div className="space-y-4">
          <div className="p-4 bg-white rounded-xl">
            <h2 className="text-lg font-medium text-blue-700">Status:</h2>
            <p className="text-blue-800 capitalize">{order.status}</p>
          </div>

          <div className="p-4 bg-white rounded-xl">
            <h2 className="text-lg font-medium text-blue-700">Total Price:</h2>
            <p className="text-blue-800">${order.totalPrice}</p>
          </div>

          <div className="p-4 bg-white rounded-xl space-y-3">
            <h2 className="text-lg font-medium text-blue-700">Products:</h2>
            {order.products.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-white rounded-md shadow-sm"
              >
                <div>
                  <p className="font-medium text-blue-800">
                    {item.product?.name || "Unknown Product"}
                  </p>
                  <p className="text-sm text-blue-600">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p className="text-sm text-blue-700">
                  {item.product?.price
                    ? `$${item.product.price * item.quantity}`
                    : "N/A"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            onClick={() => navigate("/orders")}
            className="w-full py-3 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition"
          >
            Back to Orders
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="w-full py-3 bg-blue-50 text-blue-700 border border-blue-200 rounded-md hover:bg-blue-100 transition"
          >
            Contact Support
          </button>
          <button
            onClick={() => setShowDeleteDialog(true)}
            className="w-full py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Delete Order
          </button>
        </div>
      </motion.div>

      {showDeleteDialog && (
        <AlertDialog
          message="Delete this order?"
          subMessage="This action cannot be undone. Are you sure you want to permanently delete this order?"
          onConfirm={handleDeleteOrder}
          onClose={() => setShowDeleteDialog(false)}
          deleteMode
        />
      )}
    </section>
  );
}

export default SingleOrder;
