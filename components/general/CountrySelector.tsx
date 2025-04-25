import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";

// Liste des pays d'Afrique avec leurs codes et URLs d'images de drapeaux
const africanCountries = [
  { value: "DZ", label: "Algérie", flagUrl: "https://flagcdn.com/w40/dz.png" },
  { value: "AO", label: "Angola", flagUrl: "https://flagcdn.com/w40/ao.png" },
  { value: "BJ", label: "Bénin", flagUrl: "https://flagcdn.com/w40/bj.png" },
  { value: "BW", label: "Botswana", flagUrl: "https://flagcdn.com/w40/bw.png" },
  {
    value: "BF",
    label: "Burkina Faso",
    flagUrl: "https://flagcdn.com/w40/bf.png",
  },
  { value: "BI", label: "Burundi", flagUrl: "https://flagcdn.com/w40/bi.png" },
  { value: "CM", label: "Cameroun", flagUrl: "https://flagcdn.com/w40/cm.png" },
  { value: "CV", label: "Cap-Vert", flagUrl: "https://flagcdn.com/w40/cv.png" },
  {
    value: "CF",
    label: "République centrafricaine",
    flagUrl: "https://flagcdn.com/w40/cf.png",
  },
  { value: "TD", label: "Tchad", flagUrl: "https://flagcdn.com/w40/td.png" },
  { value: "KM", label: "Comores", flagUrl: "https://flagcdn.com/w40/km.png" },
  {
    value: "CD",
    label: "République démocratique du Congo",
    flagUrl: "https://flagcdn.com/w40/cd.png",
  },
  {
    value: "CG",
    label: "République du Congo",
    flagUrl: "https://flagcdn.com/w40/cg.png",
  },
  {
    value: "CI",
    label: "Côte d'Ivoire",
    flagUrl: "https://flagcdn.com/w40/ci.png",
  },
  { value: "DJ", label: "Djibouti", flagUrl: "https://flagcdn.com/w40/dj.png" },
  { value: "EG", label: "Égypte", flagUrl: "https://flagcdn.com/w40/eg.png" },
  {
    value: "GQ",
    label: "Guinée équatoriale",
    flagUrl: "https://flagcdn.com/w40/gq.png",
  },
  { value: "ER", label: "Érythrée", flagUrl: "https://flagcdn.com/w40/er.png" },
  { value: "ET", label: "Éthiopie", flagUrl: "https://flagcdn.com/w40/et.png" },
  { value: "GA", label: "Gabon", flagUrl: "https://flagcdn.com/w40/ga.png" },
  { value: "GM", label: "Gambie", flagUrl: "https://flagcdn.com/w40/gm.png" },
  { value: "GH", label: "Ghana", flagUrl: "https://flagcdn.com/w40/gh.png" },
  { value: "GN", label: "Guinée", flagUrl: "https://flagcdn.com/w40/gn.png" },
  {
    value: "GW",
    label: "Guinée-Bissau",
    flagUrl: "https://flagcdn.com/w40/gw.png",
  },
  { value: "KE", label: "Kenya", flagUrl: "https://flagcdn.com/w40/ke.png" },
  { value: "LS", label: "Lesotho", flagUrl: "https://flagcdn.com/w40/ls.png" },
  { value: "LR", label: "Libéria", flagUrl: "https://flagcdn.com/w40/lr.png" },
  { value: "LY", label: "Libye", flagUrl: "https://flagcdn.com/w40/ly.png" },
  {
    value: "MG",
    label: "Madagascar",
    flagUrl: "https://flagcdn.com/w40/mg.png",
  },
  { value: "MW", label: "Malawi", flagUrl: "https://flagcdn.com/w40/mw.png" },
  { value: "ML", label: "Mali", flagUrl: "https://flagcdn.com/w40/ml.png" },
  {
    value: "MR",
    label: "Mauritanie",
    flagUrl: "https://flagcdn.com/w40/mr.png",
  },
  { value: "MU", label: "Maurice", flagUrl: "https://flagcdn.com/w40/mu.png" },
  { value: "MA", label: "Maroc", flagUrl: "https://flagcdn.com/w40/ma.png" },
  {
    value: "MZ",
    label: "Mozambique",
    flagUrl: "https://flagcdn.com/w40/mz.png",
  },
  { value: "NA", label: "Namibie", flagUrl: "https://flagcdn.com/w40/na.png" },
  { value: "NE", label: "Niger", flagUrl: "https://flagcdn.com/w40/ne.png" },
  { value: "NG", label: "Nigeria", flagUrl: "https://flagcdn.com/w40/ng.png" },
  { value: "RW", label: "Rwanda", flagUrl: "https://flagcdn.com/w40/rw.png" },
  {
    value: "ST",
    label: "São Tomé-et-Príncipe",
    flagUrl: "https://flagcdn.com/w40/st.png",
  },
  { value: "SN", label: "Sénégal", flagUrl: "https://flagcdn.com/w40/sn.png" },
  {
    value: "SC",
    label: "Seychelles",
    flagUrl: "https://flagcdn.com/w40/sc.png",
  },
  {
    value: "SL",
    label: "Sierra Leone",
    flagUrl: "https://flagcdn.com/w40/sl.png",
  },
  { value: "SO", label: "Somalie", flagUrl: "https://flagcdn.com/w40/so.png" },
  {
    value: "ZA",
    label: "Afrique du Sud",
    flagUrl: "https://flagcdn.com/w40/za.png",
  },
  {
    value: "SS",
    label: "Soudan du Sud",
    flagUrl: "https://flagcdn.com/w40/ss.png",
  },
  { value: "SD", label: "Soudan", flagUrl: "https://flagcdn.com/w40/sd.png" },
  { value: "SZ", label: "Eswatini", flagUrl: "https://flagcdn.com/w40/sz.png" },
  { value: "TZ", label: "Tanzanie", flagUrl: "https://flagcdn.com/w40/tz.png" },
  { value: "TG", label: "Togo", flagUrl: "https://flagcdn.com/w40/tg.png" },
  { value: "TN", label: "Tunisie", flagUrl: "https://flagcdn.com/w40/tn.png" },
  { value: "UG", label: "Ouganda", flagUrl: "https://flagcdn.com/w40/ug.png" },
  { value: "ZM", label: "Zambie", flagUrl: "https://flagcdn.com/w40/zm.png" },
  { value: "ZW", label: "Zimbabwe", flagUrl: "https://flagcdn.com/w40/zw.png" },
];

// Définition de l'interface pour les props du composant
interface CountrySelectorProps {
  form: UseFormReturn<any>;
}

export function CountrySelector({ form }: CountrySelectorProps) {
  const [open, setOpen] = React.useState(false);

  // Utilisation des images de placeholder au lieu des URLs externes
  const getFlagPlaceholder = (countryCode: string) => {
    return `/api/placeholder/20/15?text=${countryCode}`;
  };

  return (
    // <FormField
    //   control={form.control}
    //   name="countryCode"
    //   render={({ field }) => (
    //     <FormItem className="flex flex-col">
    //       <FormLabel>Pays</FormLabel>
    //       <Popover open={open} onOpenChange={setOpen}>
    //         <PopoverTrigger asChild>
    //           <FormControl>
    //             <Button
    //               variant="outline"
    //               role="combobox"
    //               className={cn(
    //                 "w-full justify-between",
    //                 !field.value && "text-muted-foreground"
    //               )}
    //             >
    //               {field.value ? (
    //                 <>
    //                   <img
    //                     src={getFlagPlaceholder(field.value)}
    //                     alt={`Drapeau ${
    //                       africanCountries.find(
    //                         (country) => country.value === field.value
    //                       )?.label
    //                     }`}
    //                     className="mr-2 h-4 w-6 object-cover"
    //                   />
    //                   {
    //                     africanCountries.find(
    //                       (country) => country.value === field.value
    //                     )?.label
    //                   }
    //                 </>
    //               ) : (
    //                 "Sélectionner un pays"
    //               )}
    //               <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    //             </Button>
    //           </FormControl>
    //         </PopoverTrigger>
    //         <PopoverContent className="w-full p-0">
    //           <Command>
    //             <CommandInput placeholder="Rechercher un pays..." />
    //             <CommandEmpty>Aucun pays trouvé.</CommandEmpty>
    //             <CommandGroup className="max-h-64 overflow-y-auto">
    //               {africanCountries.map((country) => (
    //                 <CommandItem
    //                   key={country.value}
    //                   value={country.label} // Utiliser le label (nom du pays) pour la recherche
    //                   onSelect={() => {
    //                     // Trouver le pays correspondant au label sélectionné et utiliser sa valeur
    //                     form.setValue("countryCode", country.value);
    //                     setOpen(false);
    //                   }}
    //                 >
    //                   <Check
    //                     className={cn(
    //                       "mr-2 h-4 w-4",
    //                       field.value === country.value
    //                         ? "opacity-100"
    //                         : "opacity-0"
    //                     )}
    //                   />
    //                   <img
    //                     src={getFlagPlaceholder(country.value)}
    //                     alt={`Drapeau ${country.label}`}
    //                     className="mr-2 h-4 w-6 object-cover"
    //                   />
    //                   {country.label}
    //                 </CommandItem>
    //               ))}
    //             </CommandGroup>
    //           </Command>
    //         </PopoverContent>
    //       </Popover>
    //       <FormMessage />
    //     </FormItem>
    //   )}
    // />

    <FormField
      control={form.control}
      name="countryCode"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Country</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    <>
                      <img
                        src={
                          africanCountries.find(
                            (country) => country.value === field.value
                          )?.flagUrl
                        }
                        alt={`Drapeau ${
                          africanCountries.find(
                            (country) => country.value === field.value
                          )?.label
                        }`}
                        className="mr-2 h-4 w-6 object-cover"
                      />
                      {
                        africanCountries.find(
                          (country) => country.value === field.value
                        )?.label
                      }
                    </>
                  ) : (
                    "Select a country"
                  )}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search for a country..." />
                <CommandEmpty>No countries found.</CommandEmpty>
                <CommandGroup className="max-h-64 overflow-y-auto">
                  {africanCountries.map((country) => (
                    <CommandItem
                      key={country.value}
                      value={country.label}
                      onSelect={() => {
                        form.setValue("countryCode", country.value);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          field.value === country.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      <img
                        src={country.flagUrl}
                        alt={`flag ${country.label}`}
                        className="mr-2 h-4 w-6 object-cover"
                      />
                      {country.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// Interface pour le type de formulaire
interface FormValues {
  countryCode: string;
  // Autres champs de formulaire...
}

// Interface pour le type de formulaire
// interface FormValues {
//   countryCode: string;
// Autres champs de formulaire...
// }
