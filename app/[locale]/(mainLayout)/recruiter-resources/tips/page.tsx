"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "@/i18n/navigation";
import {
  ArrowLeft,
  Download,
  Check,
  AlertCircle,
  Lightbulb,
  List,
  CheckCircle,
  Bookmark,
  Eye,
  MessageSquare,
  Target,
  Users,
  Clock,
  BookOpen,
} from "lucide-react";

type CheckedItemsState = {
  [key: string]: boolean;
};

export default function EffectiveJobAds() {
  const [checkedItems, setCheckedItems] = useState<CheckedItemsState>({});
  const toggleChecked = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const sections = [
    { id: "basics", label: "The Basics" },
    { id: "structure", label: "Structure" },
    { id: "language", label: "Language" },
    { id: "examples", label: "Examples" },
  ];

  const jobTitles = [
    { bad: "Coding Ninja", good: "Senior Frontend Developer" },
    { bad: "Sales Guru", good: "Sales Representative" },
    { bad: "Marketing Rockstar", good: "Digital Marketing Specialist" },
    { bad: "Administrative Superstar", good: "Office Administrator" },
  ];

  const beforeAfter = [
    {
      id: "example1",
      title: "Generic vs. Specific",
      before:
        "We're looking for a hardworking team player who is passionate about marketing.",
      after:
        "We're seeking a Digital Marketing Specialist with 3+ years of experience in social media campaign management and analytics.",
    },
    {
      id: "example2",
      title: "Vague vs. Clear Requirements",
      before:
        "Candidates should have relevant experience and technical skills.",
      after:
        "Candidates should have 2+ years of Python development experience and familiarity with Django framework.",
    },
    {
      id: "example3",
      title: "Company-Focused vs. Candidate-Focused",
      before:
        "Our company needs someone to handle customer inquiries and resolve complaints.",
      after:
        "You'll help our customers solve their problems, using your excellent communication skills to ensure they feel valued and heard.",
    },
  ];

  const checklist = [
    { id: "c1", text: "Use a clear, specific job title" },
    { id: "c2", text: "Include salary range or compensation information" },
    {
      id: "c3",
      text: "List essential qualifications separately from preferred ones",
    },
    { id: "c4", text: "Describe day-to-day responsibilities" },
    { id: "c5", text: "Highlight company culture and values" },
    { id: "c6", text: "Mention growth and development opportunities" },
    { id: "c7", text: "Include benefits and perks" },
    { id: "c8", text: "Specify location and remote work options" },
    { id: "c9", text: "Add a compelling call-to-action" },
    { id: "c10", text: "Proofread for errors and bias" },
  ];

  const languageTips = [
    {
      icon: <Target className="h-6 w-6 text-blue-500" />,
      title: "Be Specific",
      description:
        "Avoid vague terms like 'good communicator' or 'team player.' Instead, describe what these mean in your workplace context.",
    },
    {
      icon: <Users className="h-6 w-6 text-blue-500" />,
      title: "Use Inclusive Language",
      description:
        "Avoid gender-coded language and terms that might exclude certain groups. Use tools like a gender decoder to check your job ads.",
    },
    {
      icon: <Clock className="h-6 w-6 text-blue-500" />,
      title: "Focus on Results",
      description:
        "Describe what the person will achieve rather than just listing tasks. E.g., 'You'll lead projects that increase conversion rates' vs 'Manage projects'.",
    },
    {
      icon: <BookOpen className="h-6 w-6 text-blue-500" />,
      title: "Be Concise",
      description:
        "Keep your job ad to 300-800 words. Organize information with clear headings to make it scannable.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header with back button */}
      <div className="flex justify-between items-center">
        <Link
          href="/recruiter-resources"
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Resources
        </Link>
        <Button variant="outline" className="flex items-center">
          <Download className="h-4 w-4 mr-2" />
          Download as PDF
        </Button>
      </div>

      {/* Hero section */}
      <div className="text-center space-y-4 py-6">
        <h1 className="text-4xl font-bold">
          Tips for Writing Effective Job Ads
        </h1>
        <p className="text-lg max-w-3xl mx-auto">
          Learn how to craft compelling job advertisements that attract
          qualified candidates and reduce time-to-hire.
        </p>
      </div>

      {/* Key stats section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
        <Card className="text-center p-4">
          <CardContent className="pt-6">
            <p className="text-4xl font-bold text-blue-600">72%</p>
            <p className=" mt-2">
              of job seekers say the job description is extremely influential in
              their decision to apply
            </p>
          </CardContent>
        </Card>
        <Card className="text-center p-4">
          <CardContent className="pt-6">
            <p className="text-4xl font-bold text-blue-600">30%</p>
            <p className=" mt-2">
              increase in qualified applicants when salary information is
              included
            </p>
          </CardContent>
        </Card>
        <Card className="text-center p-4">
          <CardContent className="pt-6">
            <p className="text-4xl font-bold text-blue-600">20%</p>
            <p className=" mt-2">
              fewer applications from women when job ads use masculine-coded
              language
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main content tabs */}
      <Tabs defaultValue="basics" className="space-y-8">
        <TabsList className="w-full grid grid-cols-2 md:grid-cols-4">
          {sections.map((section) => (
            <TabsTrigger key={section.id} value={section.id}>
              {section.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* The Basics Tab */}
        <TabsContent value="basics" className="space-y-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">
              The Foundation of an Effective Job Ad
            </h2>

            <div className="p-6 rounded-lg">
              <h3 className="text-xl font-semibold flex items-center mb-4">
                <Lightbulb className="h-5 w-5 text-blue-500 mr-2" />
                Why Job Ads Matter
              </h3>
              <p className="mb-4">
                Your job advertisement is often the first impression candidates
                have of your company. A well-crafted job ad not only attracts
                more qualified candidates but also:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>
                    Reduces time-to-hire by attracting relevant applicants
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Improves candidate experience and employer brand</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>
                    Sets accurate expectations, leading to better retention
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>
                    Promotes diversity and inclusion in your hiring process
                  </span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                Essential Elements of Every Job Ad
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h4 className="font-medium text-lg flex items-center">
                    <Target className="h-5 w-5 text-blue-500 mr-2" />
                    Clear Job Title
                  </h4>
                  <p className=" mt-2">
                    Use industry-standard job titles that candidates are likely
                    to search for. Avoid internal titles or creative names that
                    might confuse candidates.
                  </p>
                </div>

                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h4 className="font-medium text-lg flex items-center">
                    <List className="h-5 w-5 text-blue-500 mr-2" />
                    Essential Requirements
                  </h4>
                  <p className=" mt-2">
                    Clearly distinguish between must-have qualifications and
                    nice-to-have ones. Focus on skills and competencies rather
                    than years of experience.
                  </p>
                </div>

                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h4 className="font-medium text-lg flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
                    Compensation & Benefits
                  </h4>
                  <p className=" mt-2">
                    Include salary range and highlight key benefits.
                    Transparency here increases applications and saves time for
                    both candidates and recruiters.
                  </p>
                </div>

                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h4 className="font-medium text-lg flex items-center">
                    <Bookmark className="h-5 w-5 text-blue-500 mr-2" />
                    Company Culture
                  </h4>
                  <p className=" mt-2">
                    Give candidates a glimpse of your workplace culture, values,
                    and what makes your company unique. This helps candidates
                    self-select for cultural fit.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-lg">
              <h3 className="text-xl font-semibold flex items-center mb-4">
                <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                Common Mistakes to Avoid
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                  <span>
                    Listing too many requirements, which can discourage
                    qualified candidates
                  </span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                  <span>Using gender-coded or exclusionary language</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                  <span>
                    Being vague about responsibilities or expectations
                  </span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                  <span>
                    Omitting salary information, which reduces applications
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>

        {/* Structure Tab */}
        <TabsContent value="structure" className="space-y-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">How to Structure Your Job Ad</h2>

            <p>
              A well-structured job ad is easier to scan and comprehend. Follow
              this framework to create clear, candidate-friendly job
              advertisements.
            </p>

            <div className="space-y-8 mt-6">
              <div className="border-l-4 border-blue-500 pl-6 pb-2">
                <h3 className="text-xl font-semibold mb-3">
                  1. Engaging Introduction
                </h3>
                <p className=" mb-4">
                  Start with a compelling hook that gives candidates a reason to
                  be excited about this opportunity.
                </p>
                <div className=" p-4 rounded">
                  <p className="text-sm italic">
                    Join our innovative team and help shape the future of
                    healthcare technology. As a UX Designer at HealthTech,
                    you&apos;ll create intuitive interfaces that doctors and
                    patients rely on every day.
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-blue-500 pl-6 pb-2">
                <h3 className="text-xl font-semibold mb-3">
                  2. Company Overview
                </h3>
                <p className=" mb-4">
                  Provide a brief but compelling description of your company,
                  mission, and culture.
                </p>
                <div className="p-4 rounded">
                  <p className="text-sm italic">
                    HealthTech is a fast-growing startup with 50 employees
                    dedicated to improving patient outcomes through technology.
                    Our collaborative team values innovation, empathy, and
                    work-life balance.
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-blue-500 pl-6 pb-2">
                <h3 className="text-xl font-semibold mb-3">
                  3. Role Description
                </h3>

                <p className=" mb-4">
                  Describe what the person will actually do on a day-to-day
                  basis. Use present tense and &apos;you&apos; language.
                </p>
                <div className=" p-4 rounded">
                  <p className="text-sm italic">
                    In this role, you&apos;ll work closely with our product and
                    development teams to: • Create wireframes and interactive
                    prototypes • Conduct user testing and incorporate feedback •
                    Collaborate on design systems and accessibility standards
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-blue-500 pl-6 pb-2">
                <h3 className="text-xl font-semibold mb-3">
                  4. Requirements & Qualifications
                </h3>
                <p className=" mb-4">
                  Clearly separate must-haves from nice-to-haves. Focus on
                  skills and competencies, not just credentials.
                </p>
                <div className=" p-4 rounded">
                  <p className="text-sm italic">
                    Must-Have Qualifications: • 2+ years of UX design experience
                    • Proficiency with Figma or similar design tools • Portfolio
                    demonstrating user-centered design process Nice-to-Have
                    Qualifications: • Experience in healthcare or medical
                    software • Knowledge of accessibility standards (WCAG) •
                    Basic understanding of HTML/CSS
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-blue-500 pl-6 pb-2">
                <h3 className="text-xl font-semibold mb-3">
                  5. Benefits & Compensation
                </h3>
                <p className=" mb-4">
                  Be transparent about salary range and highlight the most
                  attractive benefits and perks.
                </p>
                <div className=" p-4 rounded">
                  <p className="text-sm italic">
                    Compensation & Benefits: • Salary range: $85,000 - $105,000
                    based on experience • Comprehensive health insurance
                    (medical, dental, vision) • Flexible working hours and
                    remote options • Professional development budget of $2,000
                    annually • Company equity package
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-blue-500 pl-6 pb-2">
                <h3 className="text-xl font-semibold mb-3">
                  6. Application Process
                </h3>
                <p className=" mb-4">
                  Provide clear instructions on how to apply and what to expect.
                  Include a timeline if possible.
                </p>
                <div className=" p-4 rounded">
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  <p className="text-sm italic">
                    To Apply: Please submit your resume and portfolio link to
                    careers@healthtech.com with &apos;UX Designer&apos; in the
                    subject line. Application deadline: June 15, 2025. Our
                    interview process includes a portfolio review, design
                    exercise, and team interviews.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-lg mt-8">
              <h3 className="text-xl font-semibold mb-4">Job Ad Checklist</h3>
              <p className="mb-4">
                Use this checklist to ensure your job ad is complete:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {checklist.map((item) => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={item.id}
                      checked={!!checkedItems[item.id]}
                      onCheckedChange={() => toggleChecked(item.id)}
                    />
                    <label
                      htmlFor={item.id}
                      className={`text-sm ${
                        checkedItems[item.id]
                          ? "line-through text-gray-400"
                          : ""
                      }`}
                    >
                      {item.text}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Language Tab */}
        <TabsContent value="language" className="space-y-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Using the Right Language</h2>

            <p>
              The words you choose can significantly impact who applies to your
              job. Using inclusive, clear language helps attract a diverse pool
              of qualified candidates.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {languageTips.map((tip, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-medium text-lg flex items-center">
                    {tip.icon}
                    <span className="ml-2">{tip.title}</span>
                  </h3>
                  <p className=" mt-2">{tip.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">
                Job Titles: What Works and What Doesn&apos;t
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="">
                      <th className="py-2 px-4 border-b text-left">Avoid</th>
                      <th className="py-2 px-4 border-b text-left">
                        Use Instead
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobTitles.map((title, index) => (
                      <tr key={index} className={index % 2 === 0 ? "" : ""}>
                        <td className="py-3 px-4 border-b">
                          <div className="flex items-center">
                            <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                            <span>{title.bad}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 border-b">
                          <div className="flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                            <span>{title.good}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className=" p-6 rounded-lg mt-6">
              <h3 className="text-xl font-semibold flex items-center mb-4">
                <Eye className="h-5 w-5 text-amber-500 mr-2" />
                Gendered Language & Bias
              </h3>
              <p className="mb-4">
                Research shows that gendered language in job ads can discourage
                qualified candidates from applying. Be aware of these common
                gendered terms:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Masculine-coded words:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Competitive</li>
                    <li>• Dominant</li>
                    <li>• Aggressive</li>
                    <li>• Confident</li>
                    <li>• Independent</li>
                    <li>• Ambitious</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Feminine-coded words:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Supportive</li>
                    <li>• Collaborative</li>
                    <li>• Committed</li>
                    <li>• Dependable</li>
                    <li>• Responsible</li>
                    <li>• Interpersonal</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm">
                  Use a mix of terms or find neutral alternatives. Consider
                  using a gender decoder tool to check your job ads.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">
                <MessageSquare className="h-5 w-5 text-blue-500 inline mr-2" />
                Speaking Directly to Candidates
              </h3>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <p className="mb-4">
                Using &apos;you&apos; and &apos;your&apos; language creates a
                more personal connection with candidates. Compare these
                approaches:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded p-4">
                  <h4 className="font-medium mb-2">Company-focused:</h4>
                  <p className="text-sm italic">
                    The successful candidate will manage client accounts and be
                    responsible for meeting sales targets.
                  </p>
                </div>
                <div className="border rounded p-4 ">
                  <h4 className="font-medium mb-2">Candidate-focused:</h4>
                  <p className="text-sm italic">
                    You&apos;ll build strong relationships with clients and use
                    your sales expertise to exceed targets.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Examples Tab */}
        <TabsContent value="examples" className="space-y-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Before & After Examples</h2>

            <p>
              See how these job ad snippets transform from generic to compelling
              with a few key changes.
            </p>

            <div className="space-y-8 mt-6">
              {beforeAfter.map((example) => (
                <div key={example.id} className="space-y-4">
                  <h3 className="text-xl font-semibold">{example.title}</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2 flex items-center">
                        <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                        Before
                      </h4>

                      <p className="text-sm italic">"{example.before}"</p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2 flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        After
                      </h4>

                      <p className="text-sm italic">"{example.after}"</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className=" p-6 rounded-lg mt-8">
              <h3 className="text-xl font-semibold mb-4">
                Full Job Ad Example: Marketing Manager
              </h3>
              <div className=" p-4 rounded border">
                <h4 className="text-lg font-bold mb-3">Marketing Manager</h4>
                <div className="text-sm space-y-4">
                  <p className="font-medium">About Us:</p>
                  <p>
                    GreenTech is a growing renewable energy company dedicated to
                    making sustainable technology accessible to all. With 75
                    employees across three offices, we&apos;ve been helping
                    households reduce their carbon footprint since 2018. Our
                    inclusive team values innovation, sustainability, and
                    work-life balance.
                  </p>

                  <p className="font-medium">The Role:</p>
                  <p>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    As our new Marketing Manager, you&apos;ll lead our marketing
                    strategy to connect sustainable energy solutions with the
                    homeowners who need them. Working with our passionate team,
                    you&apos;ll develop campaigns that drive awareness and
                    adoption of renewable energy products.
                  </p>

                  <p className="font-medium">What You&apos;ll Do:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      Develop and implement comprehensive marketing strategies
                      across digital and traditional channels
                    </li>
                    <li>
                      Manage a team of 3 marketing specialists, providing
                      guidance and mentorship
                    </li>
                    <li>
                      Analyze campaign performance and market trends to optimize
                      marketing ROI
                    </li>
                    <li>
                      Collaborate with product teams to craft compelling
                      messaging about our solutions
                    </li>
                    <li>Oversee a quarterly marketing budget of $250,000</li>
                  </ul>

                  <p className="font-medium">Required Qualifications:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>3+ years of marketing management experience</li>
                    <li>
                      Proven track record developing successful marketing
                      campaigns
                    </li>
                    <li>
                      Experience managing direct reports and cross-functional
                      teams
                    </li>
                    <li>
                      Strong analytical skills and data-driven decision making
                    </li>
                  </ul>

                  <p className="font-medium">Nice-to-Have Qualifications:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      Experience in renewable energy or sustainability sectors
                    </li>
                    <li>
                      Familiarity with marketing automation tools (HubSpot,
                      Marketo)
                    </li>
                    <li>B2C marketing background</li>
                  </ul>

                  <p className="font-medium">Benefits & Compensation:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      Salary range: $90,000 - $110,000 based on experience
                    </li>
                    <li>Comprehensive health, dental, and vision insurance</li>
                    <li>Remote work options with quarterly team retreats</li>
                    <li>Professional development budget of $3,000 annually</li>
                    <li>Generous paid time off policy and volunteer days</li>
                    <li>
                      Employee discount on our sustainable energy products
                    </li>
                  </ul>

                  <p className="font-medium">Our Commitment to Inclusion:</p>
                  <p>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    GreenTech is committed to building a diverse team. We
                    welcome applicants of all backgrounds, identities, and
                    experiences to apply. We&apos;re especially keen to hear
                    from candidates from underrepresented groups in the
                    renewable energy sector.
                  </p>

                  <p className="font-medium">To Apply:</p>
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  <p>
                    Please submit your resume and a brief cover letter
                    explaining why you&apos;re excited about renewable energy
                    and this role to careers@greentech.com. Applications will be
                    reviewed on a rolling basis, with interviews beginning May
                    15, 2025.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Additional resources section */}
      {/* <div className="border-t pt-8 mt-8">
        <h2 className="text-2xl font-bold mb-6">Additional Resources</h2>
        <div className="grid grid-cols-1 md:gri */}
    </div>
  );
}
