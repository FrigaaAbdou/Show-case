import React from "react";

const About = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-blue-800 text-white py-28 px-6 text-center">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">À propos de CESI Algérie</h1>
          <p className="text-2xl mb-12">Pionnier de la formation professionnelle en Algérie</p>
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-bold text-blue-800 mb-6">Notre Histoire</h2>
            <p className="text-lg text-gray-700 mb-6">
              Fondé en 2003, CESI Algérie s'est imposé comme un leader dans le domaine de la formation professionnelle.
              Grâce à un partenariat étroit avec le groupe français CESI, nous avons formé des milliers de professionnels 
              et aidé de nombreuses entreprises à se transformer.
            </p>
            <p className="text-lg text-gray-700">
              Notre mission est de fournir des programmes certifiants, adaptés aux besoins du marché, 
              en mettant l'accent sur l'excellence pédagogique et l'innovation. Nous croyons en l'importance 
              de l'expérience et de l'expertise pour préparer les leaders de demain.
            </p>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80" 
              alt="CESI Algérie" 
              className="w-full rounded-lg shadow-xl" 
            />
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="bg-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-blue-800">Nos Valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80" 
                alt="Innovation" 
                className="mx-auto mb-8 rounded-lg shadow" 
              />
              <h4 className="text-2xl font-semibold mb-4">Innovation</h4>
              <p className="text-lg text-gray-700">
                Nous adoptons les dernières technologies et méthodes pédagogiques pour une formation moderne.
              </p>
            </div>
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80" 
                alt="Excellence" 
                className="mx-auto mb-8 rounded-lg shadow" 
              />
              <h4 className="text-2xl font-semibold mb-4">Excellence</h4>
              <p className="text-lg text-gray-700">
                Un engagement constant pour la qualité et la réussite de nos apprenants.
              </p>
            </div>
            <div className="text-center">
              {/* Nouvelle image Engagement */}
              <img 
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80" 
                alt="Engagement" 
                className="mx-auto mb-8 rounded-lg shadow" 
              />
              <h4 className="text-2xl font-semibold mb-4">Engagement</h4>
              <p className="text-lg text-gray-700">
                Nous travaillons main dans la main avec nos partenaires pour un développement durable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-yellow-400 py-24 text-center text-blue-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Rejoignez l'aventure CESI Algérie</h2>
          <p className="text-2xl mb-12">
            Découvrez nos programmes et façonnez votre avenir dès aujourd'hui.
          </p>
          <button className="bg-blue-800 text-white text-xl px-12 py-6 rounded-lg hover:bg-blue-900 transition">
            Nos Formations
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;