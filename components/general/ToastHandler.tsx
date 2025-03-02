"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ToastHandler() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const hasDisplayedToast = useRef(false); // ⚡ Empêcher l'affichage en double

  useEffect(() => {
    const toastMessage = searchParams.get("toast");

    console.log("useEffect triggered, toastMessage:", toastMessage);

    if (toastMessage && !hasDisplayedToast.current) {
      hasDisplayedToast.current = true; // ✅ Marque comme déjà affiché

      if (toastMessage === "already_applied") {
        toast.error("You have already applied for this offer !");
      }

      // Supprime le paramètre de l'URL après affichage du toast
      router.replace(pathname, { scroll: false });
    }
  }, [searchParams, pathname, router]);

  return null;
}
