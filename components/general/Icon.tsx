// 1. On importe TOUT le contenu de lucide-react dans un objet "icons"
import * as icons from "lucide-react";
import { LucideProps } from "lucide-react";

interface IconProps extends Omit<LucideProps, "ref"> {
  name: string;
}

export const Icon = ({ name, color, size, className, ...props }: IconProps) => {
  // 1. On récupère l'icône
  const iconName = name as keyof typeof icons;
  const IconComponent = icons[iconName];

  // 2. Sécurité
  if (!IconComponent) {
    return null;
  }

  // 3. LA CORRECTION EST ICI :
  // TypeScript a besoin de savoir que 'IconComponent' est bien un type de composant valide.
  // Lucide exporte ses icônes sous forme de "LucideIcon" (le type, pas la variable).
  // Mais souvent, le plus simple est de laisser React.createElement faire le travail
  // ou de caster en 'React.ElementType'.

  const FinalIcon = IconComponent as React.ElementType;

  return (
    <FinalIcon color={color} size={size} className={className} {...props} />
  );
};
