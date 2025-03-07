import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AlertDialog from "../components/AlertDialog";

function SingleProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [alertData, setAlertData] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:3000/api/item/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch(() => setError("Error fetching product."));
  }, [id]);

  const handleOrderNow = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      navigate("/login");
      return;
    }

    if (!product) {
      setAlertData({
        message: "Product data is missing",
        onConfirm: () => setAlertData(null),
      });
      return;
    }

    const orderData = {
      products: [
        {
          product: product?._id,
          quantity,
        },
      ],
      totalPrice: product?.price * quantity,
    };

    try {
      const response = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });
      const data = await response.json();

      if (!response.ok) {
        setAlertData({
          message: data.message || "Failed to place order",
          onConfirm: () => setAlertData(null),
        });
      } else {
        setAlertData({
          message: "Order placed successfully",
          subMessage:
            "Thank you for your order! We're preparing your product with care and will keep you updated on its journey.",
          onConfirm: () => setAlertData(null),
        });
      }
    } catch {
      setAlertData({
        message: "Error placing order",
        onConfirm: () => setAlertData(null),
      });
    }
  };

  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!product) return <div className="text-center">Loading...</div>;

  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-6 py-12">
      {alertData && (
        <AlertDialog
          message={alertData.message}
          subMessage={alertData.subMessage}
          onConfirm={alertData.onConfirm}
          onClose={() => setAlertData(null)}
        />
      )}
      <div className="w-full max-w-4xl bg-blue-50 p-8 rounded-2xl shadow-md space-y-8">
        <div className="w-full h-64 bg-blue-100 rounded-xl flex items-center justify-center">
          <img
            src={product.imgLink || product.image}
            alt={product.name}
            className="object-cover h-full w-full rounded-xl"
          />
        </div>
        <h1 className="text-3xl font-bold text-blue-800">{product.name}</h1>
        <p className="text-blue-600 text-sm">{product.description}</p>
        <p className="text-2xl font-semibold text-blue-700 mt-4">
          ${product.price}
        </p>
        <div className="text-blue-700 text-sm leading-relaxed space-y-2">
          <p>{product.fullDescription || "No full description provided."}</p>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center gap-4 mt-6">
          <p className="text-blue-700 font-medium">Quantity:</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition"
            >
              –
            </button>
            <span className="w-10 text-center font-medium text-blue-800">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button className="w-full py-3 text-blue-700 border border-blue-700 rounded-md hover:bg-blue-50 transition">
            Add to Cart
          </button>
          <button
            onClick={handleOrderNow}
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Order Now
          </button>
        </div>
        <div className="mt-6 text-center text-xs text-blue-500">
          🚚 Free shipping • 🔒 Secure checkout • 💬 24/7 Support
        </div>
      </div>
    </section>
  );
}

export default SingleProduct;