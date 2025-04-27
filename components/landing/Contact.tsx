// "use client";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
// } from "@/components/ui/card";
// import { Building2, Clock, Mail, Phone } from "lucide-react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";

// const formSchema = z.object({
//   firstName: z.string().min(2).max(255),
//   lastName: z.string().min(2).max(255),
//   email: z.string().email(),
//   subject: z.string().min(2).max(255),
//   message: z.string(),
// });

// export const ContactSection = () => {
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       subject: "Job Application",
//       message: "",
//     },
//   });

//   function onSubmit(values: z.infer<typeof formSchema>) {
//     const { firstName, lastName, email, subject, message } = values;
//     console.log(values);

//     const mailToLink = `mailto:jorge.dasilva200172@gmail.com?subject=${subject}&body=Hello I am ${firstName} ${lastName}, my Email is ${email}. %0D%0A${message}`;

//     window.location.href = mailToLink;
//   }

//   return (
//     <section id="contact" className="container py-24 sm:py-32">
//       {/* <h2 className="mt-2 text-3xl md:text-4xl text-primary text-center mb-2 tracking-wider ">
//         CONTACT
//       </h2>

//       <h2 className="text-xl md:text-2xl text-center font-bold">
//         Connect With Us
//       </h2>

//       <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
//         We are here to answer your questions about job offers, partnerships or
//         any other request.
//       </h3> */}
//       <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div>
//           <div className="mb-4">
//             <h2 className="mt-2 text-3xl md:text-4xl text-primary text-center mb-2 tracking-wider ">
//               CONTACT
//             </h2>

//             <h2 className="text-xl md:text-2xl text-center font-bold">
//               Connect With Us
//             </h2>
//           </div>
//           <p className="mb-8 text-muted-foreground lg:w-5/6">
//             We are here to answer your questions about job offers, partnerships
//             or any other request.
//           </p>

//           <div className="flex flex-col gap-4">
//             <div>
//               <div className="flex gap-2 mb-1">
//                 <Building2 />
//                 <div className="font-bold">Find us</div>
//               </div>

//               <div>Paris</div>
//             </div>

//             <div>
//               <div className="flex gap-2 mb-1">
//                 <Phone />
//                 <div className="font-bold">Call us</div>
//               </div>

//               <a href="tel:+0033662300932" className="hover:underline">
//                 +00 33 662300932
//               </a>
//             </div>

//             <div>
//               <div className="flex gap-2 mb-1">
//                 <Mail />
//                 <div className="font-bold">Mail US</div>
//               </div>

//               <a
//                 href="mailto:afriqueavenirinfo@gmail.com"
//                 className="hover:underline"
//               >
//                 afriqueavenirinfo@gmail.com
//               </a>
//             </div>

//             <div>
//               <div className="flex gap-2">
//                 <Clock />
//                 <div className="font-bold">Visit us</div>
//               </div>

//               <div>
//                 <div>Monday - Friday</div>
//                 <div>8AM - 4PM</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <Card className="bg-muted/60 dark:bg-card">
//           <CardHeader className="text-primary text-2xl"> </CardHeader>
//           <CardContent>
//             <Form {...form}>
//               <form
//                 onSubmit={form.handleSubmit(onSubmit)}
//                 className="grid w-full gap-4"
//               >
//                 <div className="flex flex-col md:!flex-row gap-8">
//                   <FormField
//                     control={form.control}
//                     name="firstName"
//                     render={({ field }) => (
//                       <FormItem className="w-full">
//                         <FormLabel>First Name</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Your first name" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="lastName"
//                     render={({ field }) => (
//                       <FormItem className="w-full">
//                         <FormLabel>Last Name</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Your last name" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>

//                 <div className="flex flex-col gap-1.5">
//                   <FormField
//                     control={form.control}
//                     name="email"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Email</FormLabel>
//                         <FormControl>
//                           <Input
//                             type="email"
//                             placeholder="your.email@gmail.com"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>

//                 <div className="flex flex-col gap-1.5">
//                   <FormField
//                     control={form.control}
//                     name="subject"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Subject</FormLabel>
//                         <Select
//                           onValueChange={field.onChange}
//                           defaultValue={field.value}
//                         >
//                           <FormControl>
//                             <SelectTrigger>
//                               <SelectValue placeholder="Select a subject" />
//                             </SelectTrigger>
//                           </FormControl>
//                           <SelectContent>
//                             <SelectItem value="Job Application">
//                               Job Application
//                             </SelectItem>
//                             <SelectItem value="Employer Partnership">
//                               Employer Partnership
//                             </SelectItem>
//                             <SelectItem value="Technical Support">
//                               Technical Support
//                             </SelectItem>
//                             <SelectItem value="Account Issues">
//                               Account Issues
//                             </SelectItem>
//                             <SelectItem value="Feedback or Suggestions">
//                               Feedback or Suggestions
//                             </SelectItem>
//                             <SelectItem value="Advertising Opportunities">
//                               Advertising Opportunities
//                             </SelectItem>
//                             <SelectItem value="General Inquiry">
//                               General Inquiry
//                             </SelectItem>
//                           </SelectContent>
//                         </Select>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>

//                 <div className="flex flex-col gap-1.5">
//                   <FormField
//                     control={form.control}
//                     name="message"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Message</FormLabel>
//                         <FormControl>
//                           <Textarea
//                             rows={5}
//                             placeholder="Your message..."
//                             className="resize-none"
//                             {...field}
//                           />
//                         </FormControl>

//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>

//                 <Button className="mt-4">Send message</Button>
//               </form>
//             </Form>
//           </CardContent>

//           <CardFooter></CardFooter>
//         </Card>
//       </section>
//     </section>
//   );
// };

//  BEGIN 27/04/2025 compatible next-intl

"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Building2, Clock, Mail, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";

type FormSubjects = {
  jobApplication: string;
  employerPartnership: string;
  technicalSupport: string;
  accountIssues: string;
  feedback: string;
  advertising: string;
  generalInquiry: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formSchema = (t: any) =>
  z.object({
    firstName: z
      .string()
      .min(2, { message: t("formErrors.minLength", { min: 2 }) })
      .max(255),
    lastName: z
      .string()
      .min(2, { message: t("formErrors.minLength", { min: 2 }) })
      .max(255),
    email: z.string().email(t("formErrors.invalidEmail")),
    subject: z.string().min(2).max(255),
    message: z.string().min(1, t("formErrors.required")),
  });

export const ContactSection = () => {
  const t = useTranslations("Contact");
  const form = useForm<z.infer<ReturnType<typeof formSchema>>>({
    resolver: zodResolver(formSchema(t)),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: t("formSubjects.jobApplication"),
      message: "",
    },
  });

  const subjects = t.raw("formSubjects") as FormSubjects;

  function onSubmit(values: z.infer<ReturnType<typeof formSchema>>) {
    const { firstName, lastName, email, subject, message } = values;
    const mailToLink = `mailto:${t("contactEmail")}?subject=${subject}&body=${t(
      "emailBody",
      {
        firstName,
        lastName,
        email,
        message,
      }
    )}`;
    window.location.href = mailToLink;
  }

  return (
    <section id="contact" className="container py-24 sm:py-32">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="mb-4">
            <h2 className="mt-2 text-3xl md:text-4xl text-primary text-center mb-2 tracking-wider">
              {t("title")}
            </h2>
            <h2 className="text-xl md:text-2xl text-center font-bold">
              {t("subtitle")}
            </h2>
          </div>
          <p className="mb-8 text-muted-foreground lg:w-5/6">
            {t("description")}
          </p>

          <div className="flex flex-col gap-4">
            <div>
              <div className="flex gap-2 mb-1">
                <Building2 />
                <div className="font-bold">{t("contactMethods.findUs")}</div>
              </div>
              <div>{t("contactInfo.location")}</div>
            </div>

            <div>
              <div className="flex gap-2 mb-1">
                <Phone />
                <div className="font-bold">{t("contactMethods.callUs")}</div>
              </div>
              <a
                href={`tel:${t("contactInfo.phone")}`}
                className="hover:underline"
              >
                {t("contactInfo.phone")}
              </a>
            </div>

            <div>
              <div className="flex gap-2 mb-1">
                <Mail />
                <div className="font-bold">{t("contactMethods.mailUs")}</div>
              </div>
              <a
                href={`mailto:${t("contactEmail")}`}
                className="hover:underline"
              >
                {t("contactEmail")}
              </a>
            </div>

            <div>
              <div className="flex gap-2">
                <Clock />
                <div className="font-bold">{t("contactMethods.visitUs")}</div>
              </div>
              <div>
                <div>{t("contactInfo.workingDays")}</div>
                <div>{t("contactInfo.workingHours")}</div>
              </div>
            </div>
          </div>
        </div>

        <Card className="bg-muted/60 dark:bg-card">
          <CardHeader className="text-primary text-2xl"></CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid w-full gap-4"
              >
                <div className="flex flex-col md:!flex-row gap-8">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>{t("formLabels.firstName")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("formPlaceholders.firstName")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>{t("formLabels.lastName")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("formPlaceholders.lastName")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("formLabels.email")}</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder={t("formPlaceholders.email")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("formLabels.subject")}</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={t(
                                  "formPlaceholders.selectSubject"
                                )}
                              />
                            </SelectTrigger>
                          </FormControl>
                          {/* <SelectContent>
                            {Object.entries(t.raw("formSubjects")).map(
                              ([key, value]) => (
                                <SelectItem key={key} value={value}>
                                  {value}
                                </SelectItem>
                              )
                            )}
                            
                          </SelectContent> */}
                          <SelectContent>
                            {Object.entries(subjects).map(([key, value]) => (
                              <SelectItem key={key} value={value}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("formLabels.message")}</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={5}
                            placeholder={t("formPlaceholders.message")}
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button className="mt-4">{t("submitButton")}</Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </section>
    </section>
  );
};
