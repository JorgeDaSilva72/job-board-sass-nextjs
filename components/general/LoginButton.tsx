"use client";

import { useSession } from "next-auth/react";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "../ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { useTranslations } from "next-intl";

export function LoginButton() {
  const { data: session } = useSession();
  const t = useTranslations("Navbar");

  if (session?.user) {
    // Si connecté → on pourrait aussi afficher autre chose (Dashboard par exemple)
    return (
      <SheetClose asChild>
        <Link
          href="/dashboard"
          className={buttonVariants({ size: "lg", className: "w-full" })}
        >
          {t("buttons.dashboard")}
        </Link>
      </SheetClose>
    );
  }

  // Si pas connecté → bouton Login
  return (
    <SheetClose asChild>
      <Link
        href="/login"
        className={buttonVariants({ size: "lg", className: "w-full" })}
      >
        {t("buttons.login")}
      </Link>
    </SheetClose>
  );
}
