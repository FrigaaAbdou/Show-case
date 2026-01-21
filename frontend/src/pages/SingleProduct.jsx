import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AlertDialog from "../components/AlertDialog";

const API_URL = import.meta.env.VITE_API_URL;

function SingleProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formation, setFormation] = useState(null);
  const [error, setError] = useState("");
  const [alertData, setAlertData] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/item/${id}`)
      .then((res) => res.json())
      .then((data) => setFormation(data))
      .catch(() => setError("Erreur lors du chargement de la formation."));
  }, [id]);

  const handleRegisterNow = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      navigate("/login");
      return;
    }

    if (!formation) {
      setAlertData({
        message: "Les données de la formation sont manquantes",
        onConfirm: () => setAlertData(null),
      });
      return;
    }

    // Quantité fixe à 1
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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
          subMessage:
            "Merci de votre inscription ! Nous vous contacterons sous peu pour la suite.",
          onConfirm: () => setAlertData(null),
        });
      }
    } catch {
      setAlertData({
        message: "Erreur lors de l'inscription",
        onConfirm: () => setAlertData(null),
      });
    }
  };

  if (error)
    return <div className="text-center text-red-500 py-8">{error}</div>;
  if (!formation)
    return <div className="text-center py-8 text-blue-700">Chargement...</div>;

  // Formatage de la date en français
  const formationDate = new Date(formation.formationDate).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      {alertData && (
        <AlertDialog
          message={alertData.message}
          subMessage={alertData.subMessage}
          onConfirm={alertData.onConfirm}
          onClose={() => setAlertData(null)}
        />
      )}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105">
        <div className="grid md:grid-cols-2">
          {/* Image Section */}
          <div className="relative">
            <img
              src={formation.imgLink || formation.image}
              alt={formation.name}
              className="w-full h-full object-cover md:h-full"
            />
            <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Formation
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold text-blue-800 mb-2">
                {formation.name}
              </h1>
              {/* Badge de date avec icône de calendrier */}
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10m-9 4h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formationDate}
                </span>
              </div>
              <p className="text-blue-600 text-lg mb-6">
                {formation.description}
              </p>
              {formation.price && (
                <p className="text-3xl font-semibold text-blue-700 mb-6">
                  DA{formation.price}
                </p>
              )}
              <div className="text-blue-700 text-base leading-relaxed mb-6">
                <p>
                  {formation.fullDescription ||
                    "Aucune description détaillée fournie."}
                </p>
              </div>
            </div>

            <button
              onClick={handleRegisterNow}
              className="w-full py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
            >
              S'inscrire
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SingleProduct;