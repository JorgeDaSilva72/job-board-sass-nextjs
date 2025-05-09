// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { benefits } from "@/app/utils/listOfBenefits";
// import { Badge } from "@/components/ui/badge";

// interface BenefitsSelectorProps {
//   field: any;
// }

// export default function BenefitsSelector({ field }: BenefitsSelectorProps) {
//   const toggleBenefit = (benefitId: string) => {
//     const currentBenefits = field.value || [];
//     const newBenefits = currentBenefits.includes(benefitId)
//       ? currentBenefits.filter((id: string) => id !== benefitId)
//       : [...currentBenefits, benefitId];

//     field.onChange(newBenefits);
//   };

//   return (
//     <div className="">
//       <div className="flex flex-wrap gap-3">
//         {benefits.map((benefit) => {
//           const isSelected = (field.value || []).includes(benefit.id);
//           return (
//             <Badge
//               key={benefit.id}
//               variant={isSelected ? "default" : "outline"}
//               className="cursor-pointer transition-all hover:scale-105 active:scale-95 select-none text-sm px-4 py-1.5 rounded-full"
//               onClick={() => toggleBenefit(benefit.id)}
//             >
//               <span className="flex items-center gap-2">
//                 {benefit.icon}
//                 {benefit.label}
//               </span>
//             </Badge>
//           );
//         })}
//       </div>
//       <div className="mt-4 text-sm text-muted-foreground">
//         Selected benefits:{" "}
//         <span className="text-primary">{(field.value || []).length}</span>
//       </div>
//     </div>
//   );
// }

// BEGIN 05/05/2025 compatible next-intl
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import { benefits } from "@/app/utils/listOfBenefits";

interface BenefitsSelectorProps {
  field: any; // Replace with proper type if needed
}

export default function BenefitsSelector({ field }: BenefitsSelectorProps) {
  const t = useTranslations("BenefitsSelector");

  const toggleBenefit = (benefitId: string) => {
    const currentBenefits = field.value || [];
    const newBenefits = currentBenefits.includes(benefitId)
      ? currentBenefits.filter((id: string) => id !== benefitId)
      : [...currentBenefits, benefitId];

    field.onChange(newBenefits);
  };

  return (
    <div className="">
      <div className="flex flex-wrap gap-3">
        {benefits.map((benefit) => {
          const isSelected = (field.value || []).includes(benefit.id);
          return (
            <Badge
              key={benefit.id}
              variant={isSelected ? "default" : "outline"}
              className="cursor-pointer transition-all hover:scale-105 active:scale-95 select-none text-sm px-4 py-1.5 rounded-full"
              onClick={() => toggleBenefit(benefit.id)}
            >
              <span className="flex items-center gap-2">
                {benefit.icon}
                {t(`benefits.${benefit.id}`)}
              </span>
            </Badge>
          );
        })}
      </div>
      <div className="mt-4 text-sm text-muted-foreground">
        {t("selectedCount")}:{" "}
        <span className="text-primary">{(field.value || []).length}</span>
      </div>
    </div>
  );
}
