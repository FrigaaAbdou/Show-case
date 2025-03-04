import { useState, useEffect } from 'react';

function Product() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/item')
      .then((res) => res.json())
      .then((data) => {
        // Check if the response contains the items array
        if (data.items && Array.isArray(data.items)) {
          setProducts(data.items);
        } else if (Array.isArray(data)) {
          // Fallback in case the API returns an array directly
          setProducts(data);
        } else {
          setError('Unexpected data format');
        }
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setError('Error fetching products');
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="container mx-auto px-6 py-16">
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
              <h2 className="text-2xl font-semibold text-blue-700">{product.name}</h2>
              <p className="text-blue-600">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-blue-800">
                  ${product.price}
                </span>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
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