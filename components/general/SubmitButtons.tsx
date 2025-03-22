"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Heart, Loader2 } from "lucide-react";

// export function GeneralSubmitButton({
//   text,
//   icon,
//   variant,
//   width = "w-full",
// }: {
//   text: string;
//   icon?: React.ReactNode;
//   variant?:
//     | "default"
//     | "destructive"
//     | "outline"
//     | "secondary"
//     | "ghost"
//     | "link";
//   width?: string;
// }) {
//   const { pending } = useFormStatus();

//   return (
//     <Button
//       type="submit"
//       variant={variant}
//       disabled={pending}
//       className={width}
//     >
//       {pending ? (
//         <>
//           <Loader2 className="w-4 h-4 animate-spin " />
//           <span>Submitting...</span>
//         </>
//       ) : (
//         <>
//           {icon && <div className="">{icon}</div>}
//           <span>{text}</span>
//         </>
//       )}
//     </Button>
//   );
// }

export function GeneralSubmitButton({
  text,
  icon,
  variant,
  width = "w-full",
  onClick,
  isLoading = false,
  disabled = false,
}: {
  text: string;
  icon?: React.ReactNode;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  width?: string;
  onClick?: () => Promise<void> | void;
  isLoading?: boolean;
  disabled?: boolean;
}) {
  return (
    <Button
      type={onClick ? "button" : "submit"}
      variant={variant}
      disabled={isLoading || disabled}
      className={width}
      onClick={onClick}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          <span>Submitting...</span>
        </>
      ) : (
        <>
          {icon && <div className="mr-2">{icon}</div>}
          <span>{text}</span>
        </>
      )}
    </Button>
  );
}

export function SaveJobButton({ savedJob }: { savedJob: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button
      variant="outline"
      disabled={pending}
      type="submit"
      className="flex items-center gap-2"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Saving...</span>
        </>
      ) : (
        <>
          <Heart
            className={`size-4 transition-colors ${
              savedJob ? "fill-current text-red-500" : ""
            }`}
          />
          {savedJob ? "Saved" : "Save Job"}
        </>
      )}
    </Button>
  );
}
