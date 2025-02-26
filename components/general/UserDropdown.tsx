// import { signOut } from "@/app/utils/auth";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// import { ChevronDown, Heart, Layers2, LogOut } from "lucide-react";
// import Link from "next/link";

// interface iAppProps {
//   email: string;
//   name: string;
//   image: string;
// }

// export function UserDropdown({ email, name, image }: iAppProps) {
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
//           <Avatar>
//             <AvatarImage src={image} alt="Profile image" />
//             <AvatarFallback>{name.charAt(0)}</AvatarFallback>
//           </Avatar>
//           <ChevronDown
//             size={16}
//             strokeWidth={2}
//             className="ms-2 opacity-60"
//             aria-hidden="true"
//           />
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-48" align="end">
//         <DropdownMenuLabel className="flex min-w-0 flex-col">
//           <span className="truncate text-sm font-medium text-foreground">
//             {name}
//           </span>
//           <span className="truncate text-xs font-normal text-muted-foreground">
//             {email}
//           </span>
//         </DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         <DropdownMenuGroup>
//           <DropdownMenuItem asChild>
//             <Link href="/favorites">
//               <Heart
//                 size={16}
//                 strokeWidth={2}
//                 className="opacity-60"
//                 aria-hidden="true"
//               />
//               <span>Saved Jobs</span>
//             </Link>
//           </DropdownMenuItem>
//           <DropdownMenuItem asChild>
//             <Link href="/my-jobs">
//               <Layers2
//                 size={16}
//                 strokeWidth={2}
//                 className="opacity-60"
//                 aria-hidden="true"
//               />
//               <span>My Job Listings</span>
//             </Link>
//           </DropdownMenuItem>
//         </DropdownMenuGroup>

//         <DropdownMenuSeparator />
//         <DropdownMenuItem asChild>
//           <form
//             action={async () => {
//               "use server";
//               await signOut({ redirectTo: "/" });
//             }}
//           >
//             <button type="submit" className="w-full flex items-center gap-2">
//               <LogOut
//                 size={16}
//                 strokeWidth={2}
//                 className="opacity-60"
//                 aria-hidden="true"
//               />
//               <span>Logout</span>
//             </button>
//           </form>
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

// J'ai modifié le composant UserDropdown pour qu'il s'adapte au type d'utilisateur

import { signOut } from "@/app/utils/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Briefcase,
  ChevronDown,
  Heart,
  Layers2,
  LogOut,
  PlusCircle,
  User,
  Building,
  FileText,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

interface UserDropdownProps {
  email: string;
  name: string;
  image: string;
  userType: "COMPANY" | "JOB_SEEKER" | null;
}

export function UserDropdown({
  email,
  name,
  image,
  userType,
}: UserDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-auto p-1 px-2 hover:bg-secondary flex items-center gap-2"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={image} alt={`${name}'s profile`} />
            <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <ChevronDown
            size={14}
            className="text-muted-foreground"
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="flex flex-col gap-1 py-2">
          <span className="truncate font-medium">{name}</span>
          <span className="truncate text-xs text-muted-foreground font-normal">
            {email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Primary Actions - Different based on user type */}
        <DropdownMenuGroup>
          {userType === "COMPANY" && (
            <DropdownMenuItem asChild className="flex items-center gap-2 py-2">
              <Link href="/post-job">
                <PlusCircle
                  size={16}
                  className="text-primary"
                  aria-hidden="true"
                />
                <span>Post a Job</span>
              </Link>
            </DropdownMenuItem>
          )}

          {userType === "JOB_SEEKER" && (
            <DropdownMenuItem asChild className="flex items-center gap-2 py-2">
              <Link href="/find-job">
                <Briefcase
                  size={16}
                  className="text-primary"
                  aria-hidden="true"
                />
                <span>Search Jobs</span>
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
        </DropdownMenuGroup>

        {/* Company-specific elements */}
        {userType === "COMPANY" && (
          <DropdownMenuGroup>
            <DropdownMenuItem asChild className="flex items-center gap-2 py-2">
              <Link href="/my-jobs">
                <Layers2
                  size={16}
                  className="text-muted-foreground"
                  aria-hidden="true"
                />
                <span>My Job Listings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="flex items-center gap-2 py-2">
              <Link href="/applications">
                <FileText
                  size={16}
                  className="text-muted-foreground"
                  aria-hidden="true"
                />
                <span>Applications Received</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="flex items-center gap-2 py-2">
              <Link href="/company-profile">
                <Building
                  size={16}
                  className="text-muted-foreground"
                  aria-hidden="true"
                />
                <span>Company Profile</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}

        {/* Job seeker specific elements */}
        {userType === "JOB_SEEKER" && (
          <DropdownMenuGroup>
            <DropdownMenuItem asChild className="flex items-center gap-2 py-2">
              <Link href="/my-applications">
                <FileText
                  size={16}
                  className="text-muted-foreground"
                  aria-hidden="true"
                />
                <span>My Applications</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="flex items-center gap-2 py-2">
              <Link href="/favorites">
                <Heart
                  size={16}
                  className="text-muted-foreground"
                  aria-hidden="true"
                />
                <span>Saved Jobs</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="flex items-center gap-2 py-2">
              <Link href="/messages">
                <MessageSquare
                  size={16}
                  className="text-muted-foreground"
                  aria-hidden="true"
                />
                <span>Messages</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="flex items-center gap-2 py-2">
              <Link href="/profile">
                <User
                  size={16}
                  className="text-muted-foreground"
                  aria-hidden="true"
                />
                <span>My Profile</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}

        <DropdownMenuSeparator />

        {/* If user type is not defined, offer to complete profile */}
        {userType === null && (
          <DropdownMenuGroup>
            <DropdownMenuItem asChild className="flex items-center gap-2 py-2">
              <Link href="/complete-profile">
                <User size={16} className="text-primary" aria-hidden="true" />
                <span>Complete Your Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuGroup>
        )}

        {/* Logout - Common to all user types */}
        <DropdownMenuItem
          asChild
          className="text-destructive focus:text-destructive"
        >
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center gap-2 py-2"
            >
              <LogOut size={16} aria-hidden="true" />
              <span>Logout</span>
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
