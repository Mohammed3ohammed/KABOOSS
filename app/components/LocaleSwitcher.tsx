"use client";
import { useLocale } from "next-intl";
import { Globe } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname(); 


  const toggleLocale = () => {
    const newLocale = locale === "ar" ? "en" : "ar";
    router.push(`/${newLocale}${pathname.substring(3)}`);
  };

  return (
    <button
      onClick={toggleLocale}
      className="flex items-center gap-2  0 transition"
    >
      <Globe className="w-7 h-7 text-red-800 transform transition duration-300 hover:scale-150 animate-bounceLight " />
      <span className="w-7 h-7 text-red-800">{locale === "ar" ? "En" : "AR"}</span>
    </button>
  );
}

