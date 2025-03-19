import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AlertDialog from "../components/AlertDialog";

const API_URL = import.meta.env.VITE_API_URL;

function Orders() {
  const [inscriptions, setInscriptions] = useState([]);
  const [selectedInscription, setSelectedInscription] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Récupération des inscriptions
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      navigate("/login");
      return;
    }
    fetch(`${API_URL}/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setInscriptions(data))
      .catch((err) => {
        console.error("Erreur lors de la récupération des inscriptions:", err);
        setError("Échec de la récupération des inscriptions");
      });
  }, [navigate]);

  // Suppression d'une inscription
  const handleDelete = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/orders/${selectedInscription._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Échec de la suppression de l'inscription");
      } else {
        setInscriptions((prev) =>
          prev.filter((inscription) => inscription._id !== selectedInscription._id)
        );
      }
    } catch (err) {
      console.error("Erreur lors de la suppression:", err);
      setError("Erreur lors de la suppression de l'inscription");
    }
    setSelectedInscription(null);
  };

  // Navigation vers le détail d'une inscription
  const handleSeeMore = (inscription) => {
    navigate(`/order/${inscription._id}`);
  };

  return (
    <section className="min-h-screen flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-lg p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-800 text-center mb-8">
          Vos Inscriptions
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {inscriptions.length === 0 ? (
          <h3 className="text-center text-blue-700 font-medium">
            Aucune inscription pour le moment.
          </h3>
        ) : (
          <div className="space-y-6">
            {inscriptions.map((inscription) => (
              <div
                key={inscription._id}
                className="flex flex-row items-center justify-between p-6 bg-blue-50 rounded-xl shadow-sm hover:shadow-xl transition duration-300"
              >
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-blue-800">
                    {inscription.products &&
                    inscription.products.length > 0 &&
                    inscription.products[0].product?.name
                      ? inscription.products[0].product.name
                      : "Inscription"}
                  </h2>
                  <p className="text-sm text-blue-600">
                    Statut :{" "}
                    <span className="font-medium">{inscription.status}</span>
                  </p>
                  <p className="text-sm text-blue-600">
                    Total :{" "}
                    <span className="font-medium">${inscription.totalPrice}</span>
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setSelectedInscription(inscription)}
                    className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition"
                    aria-label="Supprimer l'inscription"
                  >
                    <Trash2 className="w-6 h-6 text-red-600" />
                  </button>
                  {/* Si besoin, vous pouvez ajouter ici un bouton "Voir plus" */}
                  {/* <button onClick={() => handleSeeMore(inscription)} className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                    Voir plus
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedInscription && (
        <AlertDialog
          message="Êtes-vous sûr(e) ?"
          subMessage={`Cela supprimera "${
            selectedInscription.products &&
            selectedInscription.products.length > 0
              ? selectedInscription.products[0].product?.name
              : "cette inscription"
          }" de vos inscriptions.`}
          onConfirm={handleDelete}
          onClose={() => setSelectedInscription(null)}
          deleteMode
        />
      )}
    </section>
  );
}

export default Orders;