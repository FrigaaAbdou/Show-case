import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AlertDialog from "../components/AlertDialog";

const API_URL = import.meta.env.VITE_API_URL;

function Product() {
  const [formations, setFormations] = useState([]);
  const [error, setError] = useState(null);
  const [alertData, setAlertData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/api/item`)
      .then((res) => res.json())
      .then((data) => {
        if (data.items && Array.isArray(data.items)) {
          setFormations(data.items);
        } else if (Array.isArray(data)) {
          setFormations(data);
        } else {
          setError('Format de données inattendu');
        }
      })
      .catch(() => {
        setError("Erreur lors du chargement des formations");
      });
  }, []);

  const handleRegisterNow = async (formation) => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      navigate('/login');
      return;
    }

    const orderData = {
      products: [
        {
          product: formation._id,
          quantity: 1,
        },
      ],
      totalPrice: formation.price,
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
          message: data.message || "Échec de l'inscription",
          onConfirm: () => setAlertData(null),
        });
      } else {
        setAlertData({
          message: "Inscription réussie",
          subMessage: "Merci de votre inscription ! Nous vous contacterons sous peu pour la suite.",
          onConfirm: () => setAlertData(null),
        });
      }
    } catch {
      setAlertData({
        message: "Erreur lors de l'inscription",
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
        Découvrez les formations du CESI Algérie
      </h1>

      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
        {formations.map((formation) => {
          // Formatage de la date si elle est disponible
          const formationDate = formation.formationDate
            ? new Date(formation.formationDate).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            : null;

          return (
            <div
              key={formation._id || formation.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              <div className="relative">
                <img
                  src={formation.imgLink || formation.image}
                  alt={formation.name}
                  className="w-full h-56 object-cover"
                />
                {formation.category && (
                  <div className="absolute top-0 left-0 bg-blue-600 bg-opacity-75 text-white px-3 py-1 text-sm font-medium">
                    {formation.category}
                  </div>
                )}
              </div>
          
              {/* Conteneur du contenu (titre, date, description, boutons) */}
              <div className="p-6 flex flex-col h-full">
                <h2 className="text-2xl font-bold text-blue-800 mb-1">
                  {formation.name}
                </h2>
                {/* Badge de date avec icône calendrier */}
                {formationDate && (
                  <div className="flex items-center gap-1 mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10m-9 4h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm text-blue-600 font-medium">
                      {formationDate}
                    </span>
                  </div>
                )}
                <p className="text-gray-600 mb-4 flex-grow">
                  {formation.description}
                </p>
            
                {/* Boutons poussés en bas grâce à mt-auto */}
                <div className="mt-auto flex flex-col gap-3">
                  <button
                    onClick={() => handleRegisterNow(formation)}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    S'inscrire
                  </button>
                  <Link
                    to={`/product/${formation._id}`}
                    className="w-full text-center px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition"
                  >
                    En savoir plus
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {error && <p className="text-red-600 text-center mt-8">{error}</p>}
    </section>
  );
}

export default Product;
