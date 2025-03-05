import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageLoader from './components/PageLoader';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import { usePageLoader } from './hooks/usePageLoader';
import Login from './pages/Login';
import SignUp from './pages/Signin';
import Profile from './pages/Profile';
import { Navigate } from 'react-router-dom';

// ProtectedRoute: Only accessible if logged in.
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('jwtToken');
  return token ? children : <Navigate to="/login" replace />;
};

// PublicRoute: Only accessible if NOT logged in.
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('jwtToken');
  return token ? <Navigate to="/" replace /> : children;
};

function App() {
  const loading = usePageLoader();

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
          
          {/* Public Routes: redirect if already logged in */}
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/signin" element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          } />
          
          {/* Protected Routes: require login */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;