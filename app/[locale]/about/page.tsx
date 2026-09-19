"use client";
import Image from "next/image";
import img2 from "../../../public/Image/img2.jpg";
import img3 from "../../../public/Image/img3.jpg";
import img6 from "../../../public/Image/img6.jpg";
import img8 from "../../../public/Image/img8.jpg";
import img9 from "../../../public/Image/img9.jpg";
import img10 from "../../../public/Image/img10.jpg";
import img11 from "../../../public/Image/img11.jpg";
import img14 from "../../../public/Image/img14.jpg";
import img15 from "../../../public/Image/img15.jpg";
import { useTranslations } from "next-intl";


const Page = () => {
      const t = useTranslations("About"); 
  const images = [img2, img3, img6, img8, img9, img10, img11, img14, img15];
  return (
    <>
      <div className="flex flex-col justify-center items-center mt-10 mb-10 p-2">
        <h1 className="text-3xl text-red-800 italic">{t("title")}</h1>
        <p className="w-full p-4 md:w-5/12 lg:w-5/12 mt-2 text-gray-400">{t("description")}</p>
        <ul className="list-disc text-gray-400 w-full p-5 md:w-5/12 lg:w-5/12 leading-relaxed">
        <li>{t("equipment")}</li>
        <li>{t("professional_team")}</li>
        <li>{t("variety")}</li>
        <li>{t("comfortable_space")} </li>
        <li>{t("community")}</li>
        <li>{t("join")}</li>
        </ul>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 p-4 justify-items-center place-items-center gap-9 mt-14 mb-10">
        {images.map((img, id) => (
          <Image
            key={id}
            src={img}
            alt={`Image`}
            className="w-80 h-96 mt-3 rounded-3xl transform transition duration-300 hover:scale-110"
          />
        ))};
      </div>
    </>
  );
};

export default Page;