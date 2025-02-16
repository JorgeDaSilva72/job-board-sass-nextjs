import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Upload, Mail, Building2, Phone } from "lucide-react";

const JobApplicationPage = (
  {
    //   jobData: {
    //     jobTitle,
    //     company: { name: companyName },
    //   },
  }
) => {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {/* Apply for {jobTitle} */}
            Apply for jobTitle
          </h1>
          {/* <p className="text-muted-foreground">at {companyName}</p> */}
          <p className="text-muted-foreground">at companyName</p>
        </div>

        <Card className="p-6">
          <form className="space-y-8">
            {/* Personal Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Personal Information</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Enter your first name" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Enter your last name" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      className="pl-10"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      className="pl-10"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentCompany">
                  Current Company (Optional)
                </Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="currentCompany"
                    className="pl-10"
                    placeholder="Where do you currently work?"
                  />
                </div>
              </div>
            </div>

            {/* Resume Upload */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Resume/CV</h2>

              <div className="border-2 border-dashed rounded-lg p-6 text-center space-y-4">
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <div className="space-y-1">
                    <p className="font-medium">Upload your resume</p>
                    <p className="text-sm text-muted-foreground">
                      PDF, DOC, DOCX up to 5MB
                    </p>
                  </div>
                </div>

                <Button variant="outline" className="mt-4">
                  Select File
                </Button>
              </div>
            </div>

            {/* Cover Letter */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Cover Letter</h2>
              <Textarea
                placeholder="Tell us why you're interested in this position and what makes you a great candidate..."
                className="min-h-[200px]"
              />
            </div>

            {/* Additional Questions */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Additional Questions</h2>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>
                    {/* Are you legally authorized to work in {jobData.location}?*/}
                    Are you legally authorized to work in jobData.location?
                  </Label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="workAuth" value="yes" />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="workAuth" value="no" />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>When can you start?</Label>
                  <Input type="date" />
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1 md:flex-none">
                Submit Application
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1 md:flex-none"
              >
                Save Draft
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default JobApplicationPage;
