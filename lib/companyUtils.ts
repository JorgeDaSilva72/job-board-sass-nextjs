// Constants for dropdowns

// interface Industry {
//   id: string;
//   translations: {
//     en: string;
//     fr: string;
//     // ajoutez d'autres langues au besoin
//   };
// }
export const COMPANY_SIZES = [
  "0-10",
  "11-50",
  "51-200",
  "201-500",
  "501-1000",
  "1000+",
];

export const INDUSTRIES = [
  "Agriculture",
  "Aerospace",
  "Automotive",
  "Biotech",
  "Construction",
  "Consulting",
  "E-commerce",
  "Education",
  "Energy",
  "Entertainment",
  "Finance",
  "Food & Beverage",
  "Government",
  "Healthcare",
  "Hospitality",
  "IT Services",
  "Insurance",
  "Legal",
  "Logistics",
  "Manufacturing",
  "Marketing",
  "Media",
  "Non-profit",
  "Pharmaceuticals",
  "Real Estate",
  "Retail",
  "Technology",
  "Telecommunications",
  "Transportation",
  "Other",
];

// export const INDUSTRIES: Industry[] = [
//   {
//     id: "agriculture",
//     translations: {
//       en: "Agriculture",
//       fr: "Agriculture",
//     },
//   },
//   {
//     id: "aerospace",
//     translations: {
//       en: "Aerospace",
//       fr: "Aérospatiale",
//     },
//   },
//   {
//     id: "automotive",
//     translations: {
//       en: "Automotive",
//       fr: "Automobile",
//     },
//   },
//   {
//     id: "biotech",
//     translations: {
//       en: "Biotech",
//       fr: "Biotechnologie",
//     },
//   },
//   {
//     id: "construction",
//     translations: {
//       en: "Construction",
//       fr: "Construction",
//     },
//   },
//   {
//     id: "consulting",
//     translations: {
//       en: "Consulting",
//       fr: "Conseil",
//     },
//   },
//   {
//     id: "e-commerce",
//     translations: {
//       en: "E-commerce",
//       fr: "E-commerce",
//     },
//   },
//   {
//     id: "education",
//     translations: {
//       en: "Education",
//       fr: "Éducation",
//     },
//   },
//   {
//     id: "energy",
//     translations: {
//       en: "Energy",
//       fr: "Énergie",
//     },
//   },
//   {
//     id: "entertainment",
//     translations: {
//       en: "Entertainment",
//       fr: "Divertissement",
//     },
//   },
//   {
//     id: "finance",
//     translations: {
//       en: "Finance",
//       fr: "Finance",
//     },
//   },
//   {
//     id: "food-beverage",
//     translations: {
//       en: "Food & Beverage",
//       fr: "Alimentation & Boissons",
//     },
//   },
//   {
//     id: "government",
//     translations: {
//       en: "Government",
//       fr: "Gouvernement",
//     },
//   },
//   {
//     id: "healthcare",
//     translations: {
//       en: "Healthcare",
//       fr: "Santé",
//     },
//   },
//   {
//     id: "hospitality",
//     translations: {
//       en: "Hospitality",
//       fr: "Hôtellerie",
//     },
//   },
//   {
//     id: "it-services",
//     translations: {
//       en: "IT Services",
//       fr: "Services informatiques",
//     },
//   },
//   {
//     id: "insurance",
//     translations: {
//       en: "Insurance",
//       fr: "Assurance",
//     },
//   },
//   {
//     id: "legal",
//     translations: {
//       en: "Legal",
//       fr: "Juridique",
//     },
//   },
//   {
//     id: "logistics",
//     translations: {
//       en: "Logistics",
//       fr: "Logistique",
//     },
//   },
//   {
//     id: "manufacturing",
//     translations: {
//       en: "Manufacturing",
//       fr: "Fabrication",
//     },
//   },
//   {
//     id: "marketing",
//     translations: {
//       en: "Marketing",
//       fr: "Marketing",
//     },
//   },
//   {
//     id: "media",
//     translations: {
//       en: "Media",
//       fr: "Médias",
//     },
//   },
//   {
//     id: "non-profit",
//     translations: {
//       en: "Non-profit",
//       fr: "Association à but non lucratif",
//     },
//   },
//   {
//     id: "pharmaceuticals",
//     translations: {
//       en: "Pharmaceuticals",
//       fr: "Pharmaceutique",
//     },
//   },
//   {
//     id: "real-estate",
//     translations: {
//       en: "Real Estate",
//       fr: "Immobilier",
//     },
//   },
//   {
//     id: "retail",
//     translations: {
//       en: "Retail",
//       fr: "Vente au détail",
//     },
//   },
//   {
//     id: "technology",
//     translations: {
//       en: "Technology",
//       fr: "Technologie",
//     },
//   },
//   {
//     id: "telecommunications",
//     translations: {
//       en: "Telecommunications",
//       fr: "Télécommunications",
//     },
//   },
//   {
//     id: "transportation",
//     translations: {
//       en: "Transportation",
//       fr: "Transport",
//     },
//   },
//   {
//     id: "other",
//     translations: {
//       en: "Other",
//       fr: "Autre",
//     },
//   },
// ];

// export function getIndustries(locale: string) {
//   return INDUSTRIES.map((industry) => ({
//     id: industry.id,
//     label:
//       industry.translations[locale as keyof typeof industry.translations] ||
//       industry.translations.en,
//   }));
// }
