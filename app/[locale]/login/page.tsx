// import { LoginForm } from "@/components/forms/LoginForm";
// import Image from "next/image";
// import { Link } from "@/i18n/navigation";
// import React from "react";
// import Logo from "@/public/logo.jpeg";

// const LoginPage = () => {
//   return (
//     <div className="min-h-screen w-screen flex items-center justify-center">
//       <div className="flex w-full max-w-sm flex-col gap-6">
//         <Link href="/" className="flex items-center gap-2 self-center">
//           <Image src={Logo} alt="Logo" className="size-10" />
//           <h1 className="text-2xl font-bold">
//             Afrique Avenir<span className="text-primary"> Emploi</span>
//           </h1>
//         </Link>
//         <LoginForm />
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

// END ---------------------------------------
// 09/05/2025 compatible next-intl

import { LoginForm } from "@/components/forms/LoginForm";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import React from "react";
import Logo from "@/public/logo.jpeg";
import { useTranslations } from "next-intl";

const LoginPage = () => {
  const t = useTranslations("LoginPage");

  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 self-center">
          <Image src={Logo} alt={t("logoAlt")} className="size-10" />
          <h1 className="text-2xl font-bold">
            {t("titlePart1")}
            <span className="text-primary">{t("titlePart2")}</span>
          </h1>
        </Link>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
