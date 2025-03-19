import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Traitement du formulaire : appel API ou autre logique ici
    console.log("Form data submitted: ", formData);
  };

  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-blue-800 text-white py-28 px-6 text-center">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">Contactez-nous</h1>
          <p className="text-2xl">
            Nous sommes là pour répondre à vos questions et vous accompagner.
          </p>
        </div>
      </section>

      {/* Formulaire de Contact */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto bg-gray-50 p-12 rounded-lg shadow-xl">
          <h2 className="text-4xl font-bold text-center text-blue-800 mb-12">
            Envoyez-nous un message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Nom
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Votre email"
                />
              </div>
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Sujet
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Objet de votre message"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Votre message..."
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-yellow-400 text-blue-900 font-semibold text-xl px-12 py-6 rounded-lg hover:bg-yellow-500 transition"
              >
                Envoyer
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;