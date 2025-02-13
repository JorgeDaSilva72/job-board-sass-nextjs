import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <section className="py-16 bg-blue-600 text-white text-center">
      <h2 className="text-3xl font-bold mb-4">Prêt à trouver votre emploi ?</h2>
      <p className="text-lg mb-6">
        Inscrivez-vous gratuitement et commencez dès aujourd’hui.
      </p>
      <Button variant="secondary" size="lg">
        Rejoindre maintenant
      </Button>
    </section>
  );
};

export default CTA;
