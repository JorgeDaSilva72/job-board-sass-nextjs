const features = [
  {
    title: "Filtrage intelligent",
    description: "Trouvez des offres adaptées à votre profil",
  },
  {
    title: "Alertes emploi",
    description: "Recevez des notifications sur les nouvelles offres",
  },
  {
    title: "CV en ligne",
    description: "Créez un profil et postulez en 1 clic",
  },
];

const Features = () => {
  return (
    <section className="py-16 px-6 text-center">
      <h2 className="text-3xl font-bold mb-8">
        Pourquoi choisir notre plateforme ?
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="p-6 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-gray-600 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
