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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
        setError(data.message || 'Échec de l\'inscription');
      } else {
        navigate('/login');
      }
    } catch (err) {
      console.error(err);
      setError('Erreur serveur, veuillez réessayer plus tard.');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r ">
      <div className="w-full max-w-md p-10 bg-white shadow-2xl rounded-3xl space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-800">Créer un compte</h1>
          <p className="text-md text-blue-600 mt-2">
            Rejoignez-nous et commencez votre parcours
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom complet
            </label>
            <input
              type="text"
              name="username"
              placeholder="Votre nom complet"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="votre.email@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && (
            <p className="text-red-500 text-center text-sm">{error}</p>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            S'inscrire
          </button>
        </form>
        <div className="text-center">
          <p className="text-sm text-blue-600">
            Vous avez déjà un compte ?{' '}
            <a href="/login" className="font-medium hover:underline text-blue-700">
              Se connecter
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default SignUp;