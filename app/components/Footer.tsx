import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook,faInstagram, faTiktok, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useTranslations } from "next-intl";

const Footer = () => {
        const t = useTranslations("Footer"); 
  return (
    <footer className="bg-gray-900 text-white">
    <div className=" grid grid-cols-1  md:grid-cols-3 lg:grid-cols-3 gap-5  p-5 ">
    <div className="flex flex-col items-center text-center ">
    <h1 className="text-3xl text-orange-500 italic">KABOOSS <span className="text-red">GYM</span></h1>
    <p className="p-4  md:w-full w-96 mt-3 leading-relaxed">{t("description")}</p>
        </div>
        <div className="grid grid-cols-2 justify-center items-center">
        <ul className="flex flex-col justify-center items-center  gap-6 ">
        <li><Link href="/contact" className="hover:text-sky-600">{t("categories.body")}</Link></li>
            <li><Link href="/contact" className="hover:text-sky-600">{t("categories.boxing")}</Link></li>
            <li><Link href="/contact" className="hover:text-sky-600">{t("categories.cardio")}</Link></li>
        </ul>
        <ul className="flex flex-col justify-center items-center   gap-6">
            <li><Link href="/contact" className="hover:text-sky-600">{t("categories.kungfu")}</Link></li>
            <li><Link href="/contact" className="hover:text-sky-600">{t("categories.yoga")}</Link></li>            
            <li><Link href="/contact" className="hover:text-sky-600">{t("categories.running")}</Link></li>
        </ul>
        </div>
        <div className="flex flex-col mr-5" dir='rtl'>
                <Link href="#" className="mb-5 ">
                                <FontAwesomeIcon
                 icon={faLocationDot} fill="currentColor" className="icons w-8 h-8 mb-2  transform transition duration-300 hover:scale-125" />
                  <p>{t("branches.first")}</p>
                </Link>
                {/* <Link href="#" className="mb-5 ">
                <FontAwesomeIcon
                 icon={faLocationDot} fill="currentColor" className="icons w-8 h-8 mb-2  transform transition duration-300 hover:scale-125 " />
                   <p>{t("branches.second")}</p>
                </Link> */}
          </div>
          </div>

          <div className="flex justify-center gap-10 mt-5">
              <Link href="https://www.facebook.com/Dreamclub.Officiall" target="_blank" aria-label="Visit our Facebook page">
              <FontAwesomeIcon
              icon={faFacebook} className="icons w-8 h-8 mb-8 transform transition duration-300 hover:scale-125" />
              </Link>
            <Link href="https://wa.me/201064245335"  target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon 
            icon={faWhatsapp} fill="currentColor" className="icons w-8 h-8  transform transition duration-300 hover:scale-125" />
            </Link>
              <Link href="https://www.instagram.com/dream_club.official?igsh=aWx5ejB6dHV3dnVw" target="_blank">
              <FontAwesomeIcon
              icon={faInstagram}  fill="currentColor"  className="icons w-8 h-8  transform transition duration-300 hover:scale-125"/>
              </Link>
              <Link href="http://tiktok.com">
              <FontAwesomeIcon
               icon={faTiktok} fill="currentColor" className="icons w-8 h-8  transform transition duration-300 hover:scale-125" />
              </Link>
          </div>
          <p className="text-center text-xl p-5">{t("rights")}</p>
    </footer>
  );
};

export default Footer;
