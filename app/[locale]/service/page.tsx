import Image from 'next/image';
import imge2 from"../../../public/Captins/Image2.jpg";
import imge3 from"../../../public/Captins/Image3.jpg";
import imge4 from"../../../public/Captins/Image4.jpg";
import imge5 from"../../../public/Captins/Image5.jpg";
import imge6 from"../../../public/Captins/Image6.png";
import { useTranslations } from 'next-intl';
import { Link } from '../../../i18n/routing';

const Page = () => {
  const t = useTranslations("Service");

  const Coatch = [

    {
      name: t("coatch1.name"),
      study: t("coatch1.study"),
      description: t("coatch1.description"),
        img: imge2,
        link: "/coatch1",
    },

    {
      name: t("coatch2.name"),
      study: t("coatch2.study"),
      description: t("coatch2.description"),
      img: imge3,
      link: "/coatch2",
    },

    {
      name: t("coatch3.name"),
      study: t("coatch3.study"),
      description: t("coatch3.description"),
      img: imge4,
      link: "/coatch3",
    },

    {
      name: t("coatch4.name"),
      study: t("coatch4.study"),
      description: t("coatch4.description"),
      img: imge5,
      link: "/coatch4",
    },

    {
      name: t("coatch5.name"),
      study: t("coatch5.study"),
      description: t("coatch5.description"),
      img: imge6,
      link: "/coatch5",
    },

    {
      name: t("coatch6.name"),
      study: t("coatch6.study"),
      description: t("coatch6.description"),
      img: imge6,
      link: "/coatch6",
    },

];

  return (
      <div className='container mx-auto px-4 mt-10'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mb-32'>
      {
        Coatch.map((item, id) => (
          <div className=' flex flex-col justify-center items-center  p-5 rounded-xl mt-10 shadow-lg' key={id}>
          <Image src={item.img} alt="" className='w-80 h-96 rounded-2xl transform transition duration-300 hover:scale-105 animate-bounceLight cursor-pointer' />
          <h2 className='text-3xl mt-8'>{item.name}</h2>
          <p className='w-96  text-lg text-center mt-2'>{item.study}</p>
          <p className='w-80 md:w-96 lg:w-96 text-base mt-8'>{item.description}</p>
          <Link href={item.link}>
                <button className='border-solid border-2 border-red-800 rounded-full w-36 p-2 mt-5 hover:bg-orange-500 transition'>
                  {t("button")}
                </button>
              </Link>
          </div>
        ))
      }
      </div>
    </div>
  );
};

export default Page;