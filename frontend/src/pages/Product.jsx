import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AlertDialog from "../components/AlertDialog";

const API_URL = import.meta.env.VITE_API_URL;

function Product() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [alertData, setAlertData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/item`)
      .then((res) => res.json())
      .then((data) => {
        if (data.items && Array.isArray(data.items)) {
          setProducts(data.items);
        } else if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setError('Unexpected data format');
        }
      })
      .catch(() => {
        setError('Error fetching products');
      });
  }, []);

  const handleOrderNow = async (product) => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      navigate('/login');
      return;
    }

    const orderData = {
      products: [
        {
          product: product._id,
          quantity: 1,
        },
      ],
      totalPrice: product.price,
    };

    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
          subMessage: "Thank you for your order! We're preparing your product with care and will keep you updated on its journey.",
          onConfirm: () => setAlertData(null),
        });
      }
    } catch {
      setAlertData({
        message: 'Error placing order',
        subMessage: '',
        onConfirm: () => setAlertData(null),
      });
    }
  };

  return (
    <section className="container mx-auto px-6 py-16">
      {alertData && (
        <AlertDialog
          message={alertData.message}
          subMessage={alertData.subMessage}
          onConfirm={alertData.onConfirm}
          onClose={() => setAlertData(null)}
        />
      )}
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-12">
        Explore Our Mindful Products
      </h1>

      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product._id || product.id}
            className="bg-blue-50 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={product.imgLink || product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold text-blue-700">
                {product.name}
              </h2>
              <p className="text-blue-600">{product.description}</p>
              <span className="text-xl font-bold text-blue-800 block">
                ${product.price}
              </span>

              <div className="flex flex-col gap-3 mt-4">
                <button
                  onClick={() => handleOrderNow(product)}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Order Now
                </button>
                <Link
                  to={`/product/${product._id}`}
                  className="w-full text-center px-4 py-2 text-blue-700 border border-blue-700 rounded-md hover:bg-blue-50 transition"
                >
                  See More
                </Link>
                <button className="w-full px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Product;