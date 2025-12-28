// import { icons } from "lucide-react";

// export const Icon = ({
//   name,
//   color,
//   size,
//   className,
// }: {
//   name: keyof typeof icons;
//   color: string;
//   size: number;
//   className?: string;
// }) => {
//   const LucideIcon = icons[name as keyof typeof icons];

//   return <LucideIcon color={color} size={size} className={className} />;
// };

// 1. On importe TOUT le contenu de lucide-react dans un objet "icons"
import * as icons from "lucide-react";
import { LucideProps } from "lucide-react";

export const Icon = ({
  name,
  color,
  size,
  className,
}: {
  // On accepte une string pour être plus souple, ou on garde le typage strict
  name: string;
  color?: string;
  size?: number;
  className?: string;
}) => {
  // 2. On récupère l'icône dynamiquement
  // (icons as any) est nécessaire car TypeScript ne sait pas quelle clé on va appeler
  const LucideIcon = (icons as any)[name];

  // 3. Sécurité : Si l'icône n'existe pas (faute de frappe), on ne fait rien
  // Cela empêche la page blanche (White Screen of Death)
  if (!LucideIcon) {
    console.warn(`L'icône "${name}" n'a pas été trouvée dans lucide-react`);
    return null;
  }

  return <LucideIcon color={color} size={size} className={className} />;
};
