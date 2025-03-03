function Product() {
    const products = [
      {
        id: 1,
        name: 'Mindful Journal',
        description: 'Capture your thoughts, reflections, and moments of gratitude daily.',
        price: '$19.99',
        image: 'https://via.placeholder.com/300x200', // Replace with real image later
      },
      {
        id: 2,
        name: 'Breathing Guide',
        description: 'A gentle guide to help you master mindful breathing techniques.',
        price: '$14.99',
        image: 'https://via.placeholder.com/300x200',
      },
      {
        id: 3,
        name: 'Meditation Playlist',
        description: 'Curated sounds to ease your mind and bring you peace.',
        price: '$9.99',
        image: 'https://via.placeholder.com/300x200',
      },
    ]
  
    return (
      <section className="container mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-12">
          Explore Our Mindful Products
        </h1>
  
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-blue-50 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 space-y-4">
                <h2 className="text-2xl font-semibold text-blue-700">{product.name}</h2>
                <p className="text-blue-600">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-blue-800">{product.price}</span>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }
  
  export default Product