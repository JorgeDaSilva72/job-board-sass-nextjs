// pages/index.tsx
import { FC, ReactElement } from "react";
import Head from "next/head";
import { Search, Briefcase, Users, MapPin } from "lucide-react";

interface JobCategory {
  title: string;
  count: number;
  icon: ReactElement;
}

const Home: FC = () => {
  const categories: JobCategory[] = [
    {
      title: "Technologies",
      count: 234,
      icon: <Search className="w-8 h-8 text-blue-500" />,
    },
    {
      title: "Finance",
      count: 156,
      icon: <Briefcase className="w-8 h-8 text-green-500" />,
    },
    {
      title: "Marketing",
      count: 89,
      icon: <Users className="w-8 h-8 text-purple-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>AfricaJobs - Trouvez votre prochain emploi en Afrique</title>
        <meta
          name="description"
          content="Plateforme de recherche d'emploi leader en Afrique"
        />
      </Head>

      {/* Hero Section */}
      <header className="bg-gradient-to-r from-orange-600 to-orange-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">
              Trouvez votre prochain emploi en Afrique
            </h1>
            <p className="text-xl mb-8">
              Des milliers d&apos;opportunités professionnelles à travers le
              continent
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-lg p-2 flex items-center shadow-lg">
              <input
                type="text"
                placeholder="Poste, compétence ou entreprise"
                className="flex-1 px-4 py-2 text-gray-800 focus:outline-none"
              />
              <div className="border-l border-gray-300 mx-2 h-8"></div>
              <input
                type="text"
                placeholder="Pays ou ville"
                className="flex-1 px-4 py-2 text-gray-800 focus:outline-none"
              />
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
                Rechercher
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Explorez par catégorie
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition cursor-pointer"
              >
                <div className="flex items-center mb-4">
                  {category.icon}
                  <h3 className="text-xl font-semibold ml-4">
                    {category.title}
                  </h3>
                </div>
                <p className="text-gray-600">
                  {category.count} offres disponibles
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Présence Panafricaine
              </h3>
              <p className="text-gray-600">
                Des opportunités dans plus de 54 pays africains
              </p>
            </div>
            <div className="text-center">
              <Briefcase className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Emplois Vérifiés</h3>
              <p className="text-gray-600">
                Toutes les offres sont vérifiées par notre équipe
              </p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Entreprises de Premier Plan
              </h3>
              <p className="text-gray-600">
                Partenariats avec les meilleures entreprises
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Prêt à démarrer votre nouvelle carrière ?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Rejoignez des milliers de professionnels qui ont trouvé leur emploi
            idéal
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition">
              Parcourir les offres
            </button>
            <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-md hover:bg-blue-50 transition">
              Publier une offre
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">À propos</h4>
              <ul className="space-y-2">
                <li>Notre mission</li>
                <li>L&apos;équipe</li>
                <li>Nous contacter</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Employeurs</h4>
              <ul className="space-y-2">
                <li>Publier une offre</li>
                <li>Solutions de recrutement</li>
                <li>Tarifs</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Candidats</h4>
              <ul className="space-y-2">
                <li>Parcourir les offres</li>
                <li>Conseils carrière</li>
                <li>CV thèque</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Suivez-nous</h4>
              <ul className="space-y-2">
                <li>LinkedIn</li>
                <li>Twitter</li>
                <li>Facebook</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
