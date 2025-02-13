import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const CTASection = () => {
  return (
    <section className="container py-24 sm:py-32">
      <div className="bg-muted/50 dark:bg-card rounded-lg px-8 py-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Take the Next Step?
        </h2>
        <p className="text-xl text-muted-foreground mb-8">
          Whether you are a job seeker or an employer, we are here to help you
          achieve your goals. Join us today and unlock new opportunities!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* <Button className="gap-2 w-48 h-12" size="default">
            Get Started <ArrowRight className="w-4 h-4" />
          </Button> */}
          <Button asChild className="gap-2 w-48 h-12" size="default">
            <div className="flex">
              <Link href="/find-job">Get Started</Link>

              <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
            </div>
          </Button>
          {/* <Button variant="outline" className="gap-2" size="lg">
            Contact Us <Mail className="w-4 h-4" />
          </Button> */}
        </div>
      </div>
    </section>
  );
};
