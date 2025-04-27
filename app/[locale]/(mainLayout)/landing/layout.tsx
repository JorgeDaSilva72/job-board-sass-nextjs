const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      {/* <header className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">🚀 Mon Site d'Emploi</h1>
        </div>
      </header> */}

      {/* Contenu principal */}
      <main className="flex-1 container mx-auto px-4 py-6">{children}</main>

      {/* Footer */}
      {/* <footer className="bg-gray-100 py-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Mon Site d'Emploi - Tous droits réservés
        </p>
      </footer> */}
    </div>
  );
};

export default LandingLayout;
