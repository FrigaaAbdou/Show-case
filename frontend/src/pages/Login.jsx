import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Login failed');
      } else {
        // Save token and user info to localStorage
        localStorage.setItem('jwtToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        // Navigate to home page and refresh the page
        navigate('/');
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
    } catch (err) {
      console.error(err);
      setError('Server error, please try again later.');
    }
  };

  return (
    <section className=" flex items-center justify-center ">
      <div className="w-full max-w-md p-8 bg-blue-50 shadow-md rounded-2xl space-y-6 md:py-52">
        <h1 className="text-2xl font-bold text-blue-800 text-center">Welcome Back</h1>
        <p className="text-sm text-blue-600 text-center">Please sign in to your account</p>
  
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
  
        <p className="text-sm text-center text-blue-600">
          Don't have an account?{" "}
          <a href="/signin" className="text-blue-700 font-medium hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </section>
  );
}

export default Login;