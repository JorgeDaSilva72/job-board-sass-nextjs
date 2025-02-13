// import Link from "next/link";

// import { Button, buttonVariants } from "../ui/button";
// import Image from "next/image";
// import Logo from "@/public/logo.png";

// import { Menu } from "lucide-react";
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { auth } from "@/app/utils/auth";
// import { ThemeToggle } from "./ThemeToggle";
// import { UserDropdown } from "./UserDropdown";

// export async function Navbar() {
//   const session = await auth();

//   return (
//     <nav className="flex justify-between items-center py-5">
//       <Link href="/" className="flex items-center gap-2">
//         <Image src={Logo} alt="Afrique Avenir Logo" width={40} height={40} />
//         <h1 className="text-2xl font-bold">
//           Afrique Avenir<span className="text-primary"> Emploi</span>
//         </h1>
//       </Link>

//       {/* Desktop Navigation */}
//       <div className="hidden md:flex items-center gap-5">
//         <ThemeToggle />
//         <Link href="/post-job" className={buttonVariants({ size: "lg" })}>
//           Post Job
//         </Link>
//         {session?.user ? (
//           <UserDropdown
//             email={session.user.email as string}
//             name={session.user.name as string}
//             image={session.user.image as string}
//           />
//         ) : (
//           <Link
//             href="/login"
//             className={buttonVariants({ variant: "outline", size: "lg" })}
//           >
//             Login
//           </Link>
//         )}
//       </div>

//       {/* Mobile Navigation */}
//       <div className="md:hidden flex items-center gap-4">
//         <ThemeToggle />
//         {session?.user ? (
//           <UserDropdown
//             email={session.user.email as string}
//             name={session.user.name as string}
//             image={session.user.image as string}
//           />
//         ) : (
//           <Sheet>
//             <SheetTrigger asChild>
//               <Button variant="outline" size="icon">
//                 <Menu className="h-6 w-6" />
//               </Button>
//             </SheetTrigger>
//             <SheetContent>
//               <SheetHeader className="text-left">
//                 <SheetTitle>
//                   Afrique Avenir<span className="text-primary">Emploi</span>
//                 </SheetTitle>
//                 <SheetDescription>
//                   Find or post your next job opportunity
//                 </SheetDescription>
//               </SheetHeader>

//               <div className="flex flex-col gap-4 mt-6">
//                 <Link
//                   href="/"
//                   className="text-lg px-4 py-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors duration-200"
//                 >
//                   Find New Job
//                 </Link>
//                 <Link
//                   href="/post-job"
//                   className="text-lg px-4 py-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors duration-200"
//                 >
//                   Post a Job
//                 </Link>
//                 <Link
//                   href="/login"
//                   className="text-lg px-4 py-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors duration-200"
//                 >
//                   Login
//                 </Link>
//               </div>
//             </SheetContent>
//           </Sheet>
//         )}
//       </div>
//     </nav>
//   );
// }

import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import Image from "next/image";
import Logo from "@/public/logo.png";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { auth } from "@/app/utils/auth";
import { ThemeToggle } from "./ThemeToggle";
import { UserDropdown } from "./UserDropdown";
import { cn } from "@/lib/utils";

const NavigationLinks = ({ className }: { className?: string }) => (
  <div className={cn("flex flex-col gap-2", className)}>
    <Link
      href="/find-job"
      className="text-lg font-medium hover:text-primary transition-colors"
    >
      Find Jobs
    </Link>
    <Link
      href="/post-job"
      className="text-lg font-medium hover:text-primary transition-colors"
    >
      Post a Job
    </Link>
  </div>
);

export async function Navbar() {
  const session = await auth();

  return (
    <header className="border-b mb-4">
      <nav className="container mx-auto flex justify-between items-center h-16 px-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src={Logo}
            alt="Afrique Avenir Logo"
            width={32}
            height={32}
            className="object-contain"
          />
          <h1 className="text-xl font-bold whitespace-nowrap">
            Afrique Avenir <span className="text-primary">Jobs</span>
          </h1>
        </Link>

        {/* Navigation Links - Desktop only */}
        <div className="hidden md:flex items-center gap-8 mx-8">
          <NavigationLinks className="flex-row gap-8" />
        </div>

        {/* Right side menu (Theme + Auth) */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {session?.user ? (
            <UserDropdown
              email={session.user.email as string}
              name={session.user.name as string}
              image={session.user.image as string}
            />
          ) : (
            <>
              {/* Desktop Auth Buttons */}
              <div className="hidden md:flex gap-2">
                <Link
                  href="/login"
                  className={buttonVariants({ variant: "outline", size: "sm" })}
                >
                  Login
                </Link>
                <Link
                  href="/post-job"
                  className={buttonVariants({ size: "sm" })}
                >
                  Post Job
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-secondary"
                    >
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader className="text-left">
                      <SheetTitle>
                        <span className="flex items-center gap-2">
                          <Image
                            src={Logo}
                            alt="Logo"
                            width={24}
                            height={24}
                            className="object-contain"
                          />
                          Afrique Avenir{" "}
                          <span className="text-primary">Jobs</span>
                        </span>
                      </SheetTitle>
                      <SheetDescription>
                        Discover or post your next opportunity
                      </SheetDescription>
                    </SheetHeader>

                    <div className="flex flex-col gap-6 mt-8">
                      <NavigationLinks />
                      <div className="flex flex-col gap-2">
                        <SheetClose asChild>
                          <Link
                            href="/login"
                            className={buttonVariants({
                              variant: "outline",
                              size: "lg",
                              className: "w-full",
                            })}
                          >
                            Login
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link
                            href="/post-job"
                            className={buttonVariants({
                              size: "lg",
                              className: "w-full",
                            })}
                          >
                            Post a job
                          </Link>
                        </SheetClose>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
