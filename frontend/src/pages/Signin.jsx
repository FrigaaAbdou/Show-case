import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
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
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (!response.ok) {
        // If the registration failed, display the error message
        setError(data.message || 'Registration failed');
      } else {
        // Registration succeeded; redirect to login page
        navigate('/login');
      }
    } catch (err) {
      console.error(err);
      setError('Server error, please try again later.');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md p-8 bg-blue-50 shadow-md rounded-2xl space-y-6">
        <h1 className="text-2xl font-bold text-blue-800 text-center">Create Account</h1>
        <p className="text-sm text-blue-600 text-center">Join us on your mindful journey</p>
  
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Full Name"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
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
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>
  
        <p className="text-sm text-center text-blue-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-700 font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </section>
  );
}

export default SignUp;