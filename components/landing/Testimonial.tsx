// "use client";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { Star } from "lucide-react";
// // import TopWave from "./topWave";
// // import BottomWave from "./bottomWave";

// interface ReviewProps {
//   image: string;
//   name: string;
//   userName: string;
//   comment: string;
//   rating: number;
// }

// const reviewList: ReviewProps[] = [
//   {
//     image: "/testimonial/Aïssatou Diallo.jpg",
//     name: "Aïssatou Diallo",
//     userName: "Community Manager ",
//     comment:
//       "This job board made my job search so much easier. I found a position that matches my skills in less than a week! ",
//     rating: 5.0,
//   },
//   {
//     image: "/testimonial/Koffi Mensah.jpg",
//     name: "Koffi Mensah",
//     userName: "Renewable Energy Engineer ",
//     comment:
//       "Clean interface, relevant job offers, and easy application process. Love it! ",
//     rating: 4.8,
//   },

//   {
//     image: "/testimonial/Fatoumata Keïta.jpg",
//     name: "Fatoumata Keïta",
//     userName: "Registered Nurse",
//     comment:
//       "Thanks to this platform, I finally landed my dream job. Forever grateful!",
//     rating: 4.9,
//   },
//   {
//     image: "/testimonial/Thierno Ba.jpg",
//     name: "Thierno Ba ",
//     userName: "Full Stack Developer",
//     comment:
//       "Great platform for job seekers and companies alike. The filtering options are very helpful.",
//     rating: 5.0,
//   },
//   {
//     image: "/testimonial/Chantal Biyela.jpg",
//     name: "Chantal Biyela",
//     userName: "Human Resources Manager",
//     comment:
//       "I appreciate how the site is available in multiple languages. It really makes job hunting easier for international users.",
//     rating: 5.0,
//   },
//   {
//     image: "/testimonial/Idriss N’Doye.jpg",
//     name: "Idriss N’Doye",
//     userName: "Logistics Project Manager",
//     comment:
//       "As an employer, I was impressed by how quickly we received quality applications. Highly recommended!",
//     rating: 4.0,
//   },
// ];

// export const TestimonialSection = () => {
//   return (
//     <section id="testimonials" className="container relative py-24 sm:py-32 ">
//       {/* <TopWave /> */}
//       <div className="text-center mb-8">
//         <h2 className="mt-2 text-3xl md:text-4xl text-primary text-center mb-2 tracking-wider ">
//           TESTIMONIALS
//         </h2>

//         <h2 className="text-xl md:text-2xl text-center font-bold">
//           Read what our 1,000+ customers are saying.
//         </h2>
//       </div>

//       <Carousel
//         opts={{
//           align: "start",
//         }}
//         className="relative w-[80%] sm:w-[90%] lg:max-w-screen-xl mx-auto"
//       >
//         <CarouselContent>
//           {reviewList.map((review) => (
//             <CarouselItem
//               key={review.name}
//               className="md:basis-1/2 lg:basis-1/3"
//             >
//               <Card className="bg-muted/50 dark:bg-card">
//                 <CardContent className="pt-6 pb-0">
//                   <div className="flex gap-1 pb-6">
//                     <Star className="size-4 fill-primary text-primary" />
//                     <Star className="size-4 fill-primary text-primary" />
//                     <Star className="size-4 fill-primary text-primary" />
//                     <Star className="size-4 fill-primary text-primary" />
//                     <Star className="size-4 fill-primary text-primary" />
//                   </div>
//                   {`"${review.comment}"`}
//                 </CardContent>

//                 <CardHeader>
//                   <div className="flex flex-row items-center gap-4">
//                     <Avatar>
//                       <AvatarImage src={review.image} alt="radix" />
//                       <AvatarFallback>SV</AvatarFallback> {review.image}
//                     </Avatar>

//                     <div className="flex flex-col">
//                       <CardTitle className="text-lg">{review.name}</CardTitle>
//                       <CardDescription>{review.userName}</CardDescription>
//                     </div>
//                   </div>
//                 </CardHeader>
//               </Card>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <CarouselPrevious />
//         <CarouselNext />
//       </Carousel>
//       {/* <BottomWave /> */}
//     </section>
//   );
// };

// BEGIN 27/04/2025 compatible next-intl

"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";

interface ReviewProps {
  image: string;
  name: string;
  userName: string;
  comment: string;
  rating: number;
}

export const TestimonialSection = () => {
  const t = useTranslations("Testimonials");

  const reviewList: ReviewProps[] = [
    {
      image: "/testimonial/Aïssatou Diallo.jpg",
      name: "Aïssatou Diallo",
      userName: t("roles.communityManager"),
      comment: t("comments.aisssatou"),
      rating: 5.0,
    },
    {
      image: "/testimonial/Koffi Mensah.jpg",
      name: "Koffi Mensah",
      userName: t("roles.energyEngineer"),
      comment: t("comments.koffi"),
      rating: 4.8,
    },
    {
      image: "/testimonial/Fatoumata Keïta.jpg",
      name: "Fatoumata Keïta",
      userName: t("roles.nurse"),
      comment: t("comments.fatoumata"),
      rating: 4.9,
    },
    {
      image: "/testimonial/Thierno Ba.jpg",
      name: "Thierno Ba",
      userName: t("roles.developer"),
      comment: t("comments.thierno"),
      rating: 5.0,
    },
    {
      image: "/testimonial/Chantal Biyela.jpg",
      name: "Chantal Biyela",
      userName: t("roles.hrManager"),
      comment: t("comments.chantal"),
      rating: 5.0,
    },
    {
      image: "/testimonial/Idriss N’Doye.jpg",
      name: "Idriss N'Doye",
      userName: t("roles.projectManager"),
      comment: t("comments.idriss"),
      rating: 4.0,
    },
  ];

  return (
    <section id="testimonials" className="container relative py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="mt-2 text-3xl md:text-4xl text-primary text-center mb-2 tracking-wider">
          {t("title")}
        </h2>

        <h2 className="text-xl md:text-2xl text-center font-bold">
          {t("subtitle")}
        </h2>
      </div>

      <Carousel
        opts={{
          align: "start",
        }}
        className="relative w-[80%] sm:w-[90%] lg:max-w-screen-xl mx-auto"
      >
        <CarouselContent>
          {reviewList.map((review) => (
            <CarouselItem
              key={review.name}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Card className="bg-muted/50 dark:bg-card">
                <CardContent className="pt-6 pb-0">
                  <div className="flex gap-1 pb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`size-4 ${
                          i < Math.floor(review.rating)
                            ? "fill-primary text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  {`"${review.comment}"`}
                </CardContent>

                <CardHeader>
                  <div className="flex flex-row items-center gap-4">
                    <Avatar>
                      <AvatarImage src={review.image} alt={review.name} />
                      <AvatarFallback>
                        {review.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                      <CardDescription>{review.userName}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};
