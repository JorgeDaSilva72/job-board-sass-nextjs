"use client";

import { locales } from "@/config/i18n";
import { useLocale } from "next-intl";
// import { usePathname, useRouter } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { usePathname, useRouter } from "next/navigation";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  // Map des noms de langues
  const languageNames: Record<string, string> = {
    en: "English",
    fr: "Français",
  };

  const switchLanguage = (newLocale: string) => {
    // router.replace(pathname, { locale: newLocale });

    // Construction manuelle du nouveau chemin
    const currentPath = pathname;
    const pathWithoutLocale = currentPath.replace(`/${locale}`, "");
    const newPath = `/${newLocale}${pathWithoutLocale || ""}`;
    // Navigation vers le nouveau chemin
    router.push(newPath);
  };

  return (
    <Select value={locale} onValueChange={switchLanguage}>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        {locales.map((loc) => (
          <SelectItem key={loc} value={loc}>
            {languageNames[loc]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
