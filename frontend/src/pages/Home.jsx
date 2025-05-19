import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-blue-800 text-white py-28 px-6 text-center">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Donnez un nouvel élan à votre carrière avec CESI Algérie
          </h1>
          <p className="text-2xl mb-12">
            Des formations professionnelles certifiantes au cœur de l’innovation
            et du management
          </p>
          <Link to="/products">
            <button className="bg-yellow-400 text-blue-900 text-xl px-10 py-5 rounded-lg hover:bg-yellow-500 transition">
              Explorer nos Formations
            </button>
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-blue-800">
          Nos Domaines d'Excellence
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Management & Leadership */}
          <div className="bg-gray-50 shadow-xl rounded-3xl overflow-hidden hover:scale-105 transition">
            <img
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&h=600&w=800"
              alt="Management & Leadership"
              className="w-full h-64 object-cover"
            />
            <div className="p-8">
              <h3 className="text-2xl font-semibold text-blue-900 mb-6">
                Management & Leadership
              </h3>
              <p className="text-lg text-gray-700">
                Des programmes sur mesure pour devenir un leader capable de
                piloter les équipes et les projets stratégiques.
              </p>
              <Link to="/products">
                <button className="mt-8 inline-block bg-blue-800 text-white px-8 py-4 rounded-lg hover:bg-blue-900">
                  Voir les Formations
                </button>
              </Link>
            </div>
          </div>

          {/* Informatique & Développement */}
          <div className="bg-gray-50 shadow-xl rounded-3xl overflow-hidden hover:scale-105 transition">
            <img
              src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&h=600&w=800"
              alt="Informatique & Développement"
              className="w-full h-64 object-cover"
            />
            <div className="p-8">
              <h3 className="text-2xl font-semibold text-blue-900 mb-6">
                Informatique & Développement
              </h3>
              <p className="text-lg text-gray-700">
                Des parcours pour maîtriser les technologies du web, du mobile
                et de l’intelligence artificielle.
              </p>
              <Link to="/products">
                <button className="mt-8 inline-block bg-blue-800 text-white px-8 py-4 rounded-lg hover:bg-blue-900">
                  Voir les Formations
                </button>
              </Link>
            </div>
          </div>

          {/* Soft Skills & Communication */}
          <div className="bg-gray-50 shadow-xl rounded-3xl overflow-hidden hover:scale-105 transition">
            <img
              src="https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&h=600&w=800"
              alt="Soft Skills & Communication"
              className="w-full h-64 object-cover"
            />
            <div className="p-8">
              <h3 className="text-2xl font-semibold text-blue-900 mb-6">
                Soft Skills & Communication
              </h3>
              <p className="text-lg text-gray-700">
                Améliorez vos compétences relationnelles, votre communication et
                votre intelligence émotionnelle.
              </p>
              <Link to="/products">
                <button className="mt-8 inline-block bg-blue-800 text-white px-8 py-4 rounded-lg hover:bg-blue-900">
                  Voir les Formations
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-blue-800">
            Pourquoi choisir CESI Algérie ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <img
                src="https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&h=600&w=600"
                alt="Expertise"
                className="mx-auto mb-8"
              />
              <h4 className="text-2xl font-semibold mb-4">
                Expertise reconnue
              </h4>
              <p className="text-lg">
                Plus de 20 ans d’expérience et un réseau d’experts pédagogiques
                certifiés.
              </p>
            </div>
            <div className="text-center">
              <img
                src="https://images.pexels.com/photos/668298/pexels-photo-668298.jpeg?auto=compress&cs=tinysrgb&h=600&w=600"
                alt="Certifications"
                className="mx-auto mb-8"
              />
              <h4 className="text-2xl font-semibold mb-4">
                Formations certifiantes
              </h4>
              <p className="text-lg">
                Des parcours professionnalisants débouchant sur des
                certifications officielles.
              </p>
            </div>
            <div className="text-center">
              <img
                src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&h=600&w=600"
                alt="Réseau"
                className="mx-auto mb-8"
              />
              <h4 className="text-2xl font-semibold mb-4">Réseau solide</h4>
              <p className="text-lg">
                Un réseau de 300 entreprises partenaires pour votre
                développement professionnel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-yellow-400 py-24 text-center text-blue-900">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">
          Prêt à transformer votre avenir?
        </h2>
        <p className="text-2xl mb-12">
          Rejoignez une formation CESI dès aujourd'hui ou demandez un devis
          entreprise sur mesure.
        </p>
        <Link to="/contact">
          <button className="bg-blue-800 text-white text-xl px-12 py-6 rounded-lg hover:bg-blue-900 transition">
            Contactez-nous
          </button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
