import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { icons } from "lucide-react";
import { Icon } from "../general/Icon";

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

const featureList: FeaturesProps[] = [
  {
    icon: "Search",
    title: "Smart Search",
    description:
      "Find relevant job opportunities quickly with our advanced search engine that understands your skills and needs.",
  },
  {
    icon: "Building2",
    title: "African Companies",
    description:
      "Connect with the best African companies actively looking for talents like you.",
  },
  {
    icon: "Briefcase",
    title: "Exclusive Jobs",
    description:
      "Access unique and exclusive job opportunities across Africa, carefully selected for you.",
  },
  {
    icon: "Rocket",
    title: "Career Growth",
    description:
      "Develop your career with opportunities tailored to your profile and professional ambitions in Africa.",
  },
  {
    icon: "GraduationCap",
    title: "All Levels",
    description:
      "Whether you're a beginner or expert, find jobs matching your experience level and qualifications.",
  },
  {
    icon: "Globe",
    title: "Pan-African",
    description:
      "Explore opportunities in different African countries and contribute to the continent's development.",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="container py-24 sm:py-32">
      <h2 className="mt-2 text-3xl md:text-4xl text-primary text-center mb-2 tracking-wider ">
        OUR BENEFITS
      </h2>

      <h2 className="text-xl md:text-2xl text-center font-bold">
        Why Choose Afrique Avenir Jobs ?
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        Discover how our platform makes your job search easier and connects you
        with the best professional opportunities in Africa.
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featureList.map(({ icon, title, description }) => (
          <div key={title}>
            <Card className="h-full bg-background border-0 shadow-none">
              <CardHeader className="flex justify-center items-center">
                <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={24}
                    color="hsl(var(--primary))"
                    className="text-primary"
                  />
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground text-center">
                {description}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
