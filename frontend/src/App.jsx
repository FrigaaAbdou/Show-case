import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageLoader from './components/PageLoader'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import { usePageLoader } from './hooks/usePageLoader'

function App() {
  const loading = usePageLoader()

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {loading && <PageLoader />}
      <main className="flex-grow container mx-auto px-6 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Product />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App