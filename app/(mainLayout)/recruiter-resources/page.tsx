"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Download,
  Video,
  FileText,
  CheckSquare,
  BookOpen,
  Phone,
  Star,
  PenTool,
} from "lucide-react";

export default function RecruiterResources() {
  const [searchQuery, setSearchQuery] = useState("");

  const resourceCategories = [
    { id: "all", label: "All Resources" },
    { id: "templates", label: "Templates" },
    { id: "guides", label: "Guides" },
    { id: "tools", label: "Tools" },
    { id: "training", label: "Training" },
  ];

  const resources = [
    {
      id: 1,
      title: "Job Offer Templates",
      category: "templates",
      description:
        "Customizable templates for different positions and industries",
      items: [
        "Developer",
        "Sales Representative",
        "HR Specialist",
        "Marketing",
        "Finance",
      ],
      icon: <FileText className="h-8 w-8 text-blue-500" />,
      link: "#templates",
      linkText: "Download Templates",
      downloads: "3.2k",
      isNew: false,
      isPopular: true,
    },
    {
      id: 2,
      title: "Tips for Writing Effective Job Ads",
      category: "guides",
      description:
        "Learn how to write job postings that attract the best talent",
      icon: <BookOpen className="h-8 w-8 text-green-500" />,
      link: "/recruiter-resources/tips",
      linkText: "Read Full Article",
      downloads: "1.8k",
      isNew: true,
      isPopular: false,
    },
    {
      id: 3,
      title: "Job Interview Guide",
      category: "guides",
      description:
        "Interview questions, soft skills assessment, common pitfalls...",
      icon: <CheckSquare className="h-8 w-8 text-purple-500" />,
      link: "#interview-guide",
      linkText: "Download PDF Guide",
      downloads: "4.5k",
      isNew: false,
      isPopular: true,
    },
    {
      id: 4,
      title: "Recommended Tools",
      category: "tools",
      description: "The complete toolkit for modern recruiters",
      items: [
        "Free ATS platforms",
        "Video conferencing tools",
        "Online technical tests",
        "Sourcing tools",
      ],
      icon: <PenTool className="h-8 w-8 text-orange-500" />,
      link: "#tools",
      linkText: "View Full List",
      downloads: "2.1k",
      isNew: false,
      isPopular: false,
    },
    {
      id: 5,
      title: "Recruitment Checklist",
      category: "templates",
      description:
        "A step-by-step checklist for an effective recruitment process",
      icon: <CheckSquare className="h-8 w-8 text-red-500" />,
      link: "#checklist",
      linkText: "Download Checklist",
      downloads: "3.7k",
      isNew: false,
      isPopular: true,
    },
    {
      id: 6,
      title: "Trainings & Webinars",
      category: "training",
      description: "Training sessions to perfect your recruitment skills",
      items: [
        "Bias-free Recruitment",
        "Successful Onboarding",
        "LinkedIn Sourcing",
        "Remote Interviews",
      ],
      icon: <Video className="h-8 w-8 text-blue-500" />,
      link: "#trainings",
      linkText: "View Trainings",
      downloads: "1.5k",
      isNew: true,
      isPopular: false,
    },
  ];

  // Filter resources based on search query and selected category
  const filterResources = (category: string, query: string) => {
    return resources.filter((resource) => {
      const matchesCategory =
        category === "all" || resource.category === category;
      const matchesQuery =
        query === "" ||
        resource.title.toLowerCase().includes(query.toLowerCase()) ||
        (resource.description &&
          resource.description.toLowerCase().includes(query.toLowerCase())) ||
        (resource.items &&
          resource.items.some((item) =>
            item.toLowerCase().includes(query.toLowerCase())
          ));

      return matchesCategory && matchesQuery;
    });
  };

  // Testimonials
  const testimonials = [
    {
      quote:
        "These resources helped me reduce our recruitment time by 30% and improve the quality of our hires.",
      author: "Mary D., HR Manager",
    },
    {
      quote:
        "The job offer templates are incredibly useful and easy to customize for our specific needs.",
      author: "Thomas L., Tech Recruiter",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10">
      {/* Header */}
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Resources for Recruiters</h1>
        <p className="text-lg max-w-3xl mx-auto">
          A comprehensive collection of tools, templates, and guides to help you
          optimize your recruitment process and attract the best talent.
        </p>
      </header>

      {/* Search and Filter */}
      <div className="p-6 rounded-lg shadow-sm">
        <div className="max-w-7xl mx-auto">
          <Input
            type="text"
            placeholder="Search for resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4"
          />

          <Tabs defaultValue="all">
            <TabsList className="w-full grid grid-cols-2 md:grid-cols-5">
              {resourceCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {resourceCategories.map((category) => (
              <TabsContent
                key={category.id}
                value={category.id}
                className="pt-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filterResources(category.id, searchQuery).map((resource) => (
                    <Card
                      key={resource.id}
                      className="flex flex-col justify-between h-full overflow-hidden transition-all duration-300 hover:shadow-md"
                    >
                      <CardContent className="p-6 space-y-4">
                        <div className="flex justify-between items-start">
                          <div>{resource.icon}</div>
                          <div className="flex space-x-2">
                            {resource.isNew && (
                              <Badge className="bg-blue-500">New</Badge>
                            )}
                            {resource.isPopular && (
                              <Badge className="bg-amber-500">Popular</Badge>
                            )}
                          </div>
                        </div>

                        <h2 className="text-2xl font-semibold">
                          {resource.title}
                        </h2>

                        <p className="text-sm">{resource.description}</p>

                        {resource.items && (
                          <ul className="list-disc list-inside text-sm space-y-1">
                            {resource.items.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        )}
                      </CardContent>

                      <CardFooter className="p-4 flex justify-between items-center">
                        <span className="hidden sm:flex text-xs items-center text-gray-500">
                          <Download className="h-3 w-3 mr-1" />
                          {resource.downloads} downloads
                        </span>

                        <Button asChild>
                          <Link
                            href={resource.link}
                            aria-label={`${resource.linkText} for ${resource.title}`}
                          >
                            {resource.linkText}
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                {filterResources(category.id, searchQuery).length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-lg">
                      No resources found. Try another search.
                    </p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      {/* Testimonials */}
      <section className="rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-8">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="p-6 rounded-lg shadow-sm">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <p className="italic mb-4">"{testimonial.quote}"</p>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <p className="font-semibold text-sm">{testimonial.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-lg">
              How can I customize the templates?
            </h3>
            <p className=" mt-2">
              All our templates are available in editable .docx and .pdf
              formats. Simply download them and adjust the sections according to
              your needs.
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-lg">Are these resources free?</h3>
            <p className=" mt-2">
              Yes, all resources available on this page are completely free for
              our users.
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-lg">
              Can I suggest new resources?
            </h3>
            <p className=" mt-2">
              Absolutely! Use the contact form at the bottom of the page to send
              us your suggestions.
            </p>
          </div>
        </div>
      </section>

      {/* Contact/Support */}
      <div className="p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">
          Need Help or Custom Resources?
        </h2>
        <p className=" mb-6 max-w-2xl mx-auto">
          Our team can help you create custom job listings or guide you through
          using our platform.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild>
            <Link href="#contact" className="flex items-center">
              <Phone className="h-4 w-4 mr-2" aria-hidden="true" />
              Contact Our Team
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="#suggest">Suggest a Resource</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
