// "use client";

// import { Marquee } from "@devnomic/marquee";
// import "@devnomic/marquee/dist/index.css";

// import Image from "next/image";
// import { Link } from "@/i18n/navigation";

// interface SponsorsProps {
//   image: string; // URL de l'image
//   name: string;
//   link: string; // Lien du sponsor
// }

// const sponsors: SponsorsProps[] = [
//   {
//     image: "/ads/lws.png", // Chemin de l'image pour LWS
//     name: "LWS",
//     link: "https://www.lws.fr",
//   },
//   {
//     image: "/ads/qonto.png", // Chemin de l'image pour QONTO
//     name: "QONTO",
//     link: "https://qonto.com/fr/r/388uto",
//   },
//   {
//     image: "/ads/pub.png", // Placeholder pour une publicité personnalisée
//     name: "Votre publicité ici",
//     link: "#",
//   },
//   {
//     image: "/ads/revolut.png", // Chemin de l'image pour REVOLUT
//     name: "REVOLUT",
//     link: "https://www.revolut.com",
//   },

//   {
//     image: "/ads/goopy_368x63.jpg", // Exemple d'une autre image
//     name: "GOOPY",
//     link: "https://www.goopy.fr",
//   },
//   {
//     image: "/ads/pub.png", // Placeholder pour une publicité personnalisée
//     name: "Votre pub ici",
//     link: "#",
//   },
// ];
// export const SponsorsSection = () => {
//   return (
//     <section
//       id="sponsors"
//       className="relative  max-w-[75%] mx-auto  py-24 sm:py-32 "
//     >
//       {/* <TopWave /> */}
//       <h2 className=" mt-2 mb-6 text-3xl md:text-4xl text-primary text-center  tracking-wider ">
//         OUR SPONSORS
//       </h2>

//       <div className="mx-auto">
//         <Marquee
//           className="gap-[1rem] [--duration:8s]"
//           fade={true}
//           direction="left"
//           reverse={false}
//           pauseOnHover={true}
//           innerClassName="gap-[3rem]"
//         >
//           {sponsors.map(({ image, name, link }) => (
//             <Link
//               href={link}
//               key={name}
//               target="_blank" // Ouvre dans un nouvel onglet
//               rel="noopener noreferrer" // Sécurise le lien
//               className="flex flex-col items-center text-xl md:text-2xl font-medium"
//             >
//               <div className="w-32 h-32 relative">
//                 <Image src={image} alt={name} fill className="object-contain" />
//               </div>
//               {/* <span className="mt-2">{name}</span> */}
//             </Link>
//           ))}
//         </Marquee>
//       </div>
//     </section>
//   );
// };

// BEGIN 27/04/2025 compatible next-intl

"use client";

import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl"; // ← Importer useLocale et useTranslations

interface SponsorsProps {
  image: string;
  name: string;
  link: string;
}

const baseSponsors: SponsorsProps[] = [
  {
    image: "/ads/lws.png",
    name: "LWS",
    link: "https://www.lws.fr",
  },
  {
    image: "/ads/qonto.png",
    name: "QONTO",
    link: "https://qonto.com/fr/r/388uto",
  },
  {
    image: "", // sera défini dynamiquement
    name: "", // sera traduit dynamiquement
    link: "#",
  },
  {
    image: "/ads/revolut.png",
    name: "REVOLUT",
    link: "https://www.revolut.com",
  },
  {
    image: "/ads/goopy_368x63.jpg",
    name: "GOOPY",
    link: "https://www.goopy.fr",
  },
  {
    image: "", // sera défini dynamiquement
    name: "", // sera traduit dynamiquement
    link: "#",
  },
];

export const SponsorsSection = () => {
  const t = useTranslations("SponsorsSection");
  const locale = useLocale();

  // Remplacer dynamiquement image + nom pour les "publicités ici"
  const sponsors = baseSponsors.map((sponsor) => {
    if (sponsor.image === "") {
      return {
        ...sponsor,
        image: locale === "fr" ? "/ads/pub.png" : "/ads/ad.png",
        name: t("yourAdHere"), // ← Traduction du texte
      };
    }
    return sponsor;
  });

  return (
    <section
      id="sponsors"
      className="relative max-w-[75%] mx-auto py-24 sm:py-32"
    >
      <h2 className="mt-2 mb-6 text-3xl md:text-4xl text-primary text-center tracking-wider">
        {t("title")}
      </h2>

      <div className="mx-auto">
        <Marquee
          className="gap-[1rem] [--duration:8s]"
          fade={true}
          direction="left"
          reverse={false}
          pauseOnHover={true}
          innerClassName="gap-[3rem]"
        >
          {sponsors.map(({ image, name, link }, index) => (
            <Link
              href={link}
              // On combine le nom et l'index pour garantir une clé unique
              key={`${name}-${index}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-xl md:text-2xl font-medium"
            >
              <div className="w-32 h-32 relative">
                <Image src={image} alt={name} fill className="object-contain" />
              </div>
              {/* <span className="mt-2">{name}</span> */}
            </Link>
          ))}
        </Marquee>
      </div>
    </section>
  );
};
