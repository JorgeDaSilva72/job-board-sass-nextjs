const testimonials = [
  {
    name: "Amina K.",
    text: "J’ai trouvé un job en une semaine grâce à cette plateforme !",
    role: "Développeuse",
  },
  {
    name: "Marc D.",
    text: "Très pratique pour publier et gérer les annonces d’emploi.",
    role: "Recruteur",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 px-6 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold mb-8">
        Ce que disent nos utilisateurs
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {testimonials.map((t, index) => (
          <div key={index} className="p-6 bg-white shadow-md rounded-lg">
            <p className="text-gray-600 italic">"{t.text}"</p>
            <h4 className="mt-4 font-semibold">{t.name}</h4>
            <span className="text-sm text-gray-500">{t.role}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
