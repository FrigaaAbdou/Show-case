function Home() {
    return (
      <div className="space-y-20">
  
        {/* Hero Section */}
        <section className=" min-h-[70vh] flex flex-col justify-center items-center text-center space-y-6 px-6">
          <h1 className="text-5xl font-bold text-blue-800">
            Welcome to MindfulApp
          </h1>
          <p className="max-w-2xl text-blue-700 text-lg leading-relaxed">
            Find balance, calm, and clarity. MindfulApp helps you slow down, breathe,
            and stay present in your daily journey. 🌿
          </p>
          <div className="flex gap-4 mt-6">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
              Get Started
            </button>
            <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition">
              Learn More
            </button>
          </div>
        </section>
  
        {/* Inspirational Quote */}
        <section className="bg-blue-50 py-12 px-6 text-center">
          <blockquote className="text-2xl italic text-blue-800 max-w-3xl mx-auto">
            “Peace is not found by seeking it, but by creating it within yourself.”
          </blockquote>
        </section>
  
        {/* Features Section */}
        <section className="container mx-auto px-6 py-12">
          <h2 className="text-3xl font-semibold text-blue-800 text-center mb-12">
            Why choose MindfulApp?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-blue-50 rounded-xl shadow-sm text-center">
              <h3 className="text-xl font-medium text-blue-700 mb-2">🧘 Guided Practices</h3>
              <p className="text-blue-600">
                Access meditations and breathing exercises to stay grounded.
              </p>
            </div>
            <div className="p-6 bg-blue-50 rounded-xl shadow-sm text-center">
              <h3 className="text-xl font-medium text-blue-700 mb-2">📅 Daily Reminders</h3>
              <p className="text-blue-600">
                Gentle prompts to pause, reflect, and breathe during your day.
              </p>
            </div>
            <div className="p-6 bg-blue-50 rounded-xl shadow-sm text-center">
              <h3 className="text-xl font-medium text-blue-700 mb-2">📈 Progress Tracking</h3>
              <p className="text-blue-600">
                See your growth as you build mindful habits over time.
              </p>
            </div>
          </div>
        </section>
  
        {/* Final Call to Action */}
        <section className="bg-blue-600 text-white py-16 text-center space-y-6">
          <h2 className="text-4xl font-bold">Start your mindful journey today</h2>
          <button className="px-8 py-4 bg-white text-blue-700 rounded-full font-medium hover:bg-blue-100 transition">
            Join Now
          </button>
        </section>
  
      </div>
    )
  }
  
  export default Home