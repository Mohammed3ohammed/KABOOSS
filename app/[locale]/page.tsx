import Image from 'next/image';
import img1 from '../../Image/img.jpeg';
import logo1 from '../../Image/logo1.jpg';
import logo2 from '../../Image/logo2.jpg';
import logo3 from '../../Image/logo3.jpg';
import fit1 from '../../Image/fit1.jpg';
import fit2 from '../../Image/fit2.jpg';
import fit3 from '../../Image/fit3.jpg';
// 
import imge1 from "../Image/imag1.jpg";
import imge2 from "../Image/imag2.jpg";
import imge3 from "../Image/imag3.jpg";
import imge4 from "../Image/imag4.jpg";
import imge5 from "../Image/imag5.jpg";
import imge6 from "../Image/imag6.jpg";
import imge7 from "../Image/imag7.jpg";
import imge8 from "../Image/imag8.jpg";
import imge9 from "../Image/imag9.jpg";
import imge10 from "../Image/imag10.jpg";
import imge11 from "../Image/imag11.jpg";
import imge12 from "../Image/imag12.jpg";
import imge13 from "../Image/imag13.jpg";
import imge14 from "../Image/imag14.jpg";
import imge15 from "../Image/imag15.jpg";
import imge16 from "../Image/imge16.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faDumbbell, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";
import { Link } from '../../i18n/routing';


const  Home = () => {
    const t = useTranslations("HomePage"); 
  const products = [ 
    { img: imge1,  name: t("products.product1"), price: '3000 EGP' },
    { img: imge2,  name: t("products.product2"), price: '4000 EGP' },
    { img: imge3,  name: t("products.product3"), price: '1900 EGP' },
    { img: imge4,  name: t("products.product4"), price: '1000 EGP' },
    { img: imge5,  name: t("products.product5"), price: '1200 EGP' },
    { img: imge6,  name: t("products.product6"), price: '250 EGP' },
    { img: imge7,  name: t("products.product7"), price: '400 EGP' },
    { img: imge8,  name: t("products.product8"), price: '400 EGP' },
    { img: imge9,  name: t("products.product9"), price: '150 EGP' },
    { img: imge10, name: t("products.product10"), price: '150 EGP' },
    { img: imge11, name: t("products.product11"), price: '200 EGP' },
    { img: imge12, name: t("products.product12"), price: '400 EGP' },
    { img: imge13, name: t("products.product13"), price: '400 EGP' },
    { img: imge14, name: t("products.product14"), price: '300 EGP' },
    { img: imge15, name: t("products.product15"), price: '300 EGP' },
    { img: imge16, name: t("products.product16"), price: '10 EGP' },
  ];

  const cardsData = [
    { id: 1,img:logo1   , title: "titleCard", desc: "card" },
    { id: 2,img:logo2   , title: "titleCard2", desc: "card2" },
    { id: 3,img:logo2   , title: "titleCard3", desc: "card3" },
    { id: 4,img:logo3   , title: "titleCard4", desc: "card4" }
  ];

  const imagesData = [
    { id: 1, src: fit1, alt: "fit1", justify: "lg:justify-end" },
    { id: 2, src: fit2, alt: "fit2", justify: "justify-center" },
    { id: 3, src: fit3, alt: "fit3", justify: "lg:justify-start" },
  ];

  return (
          <section>
          <div>
            <Image className="w-full h-[400px] md:h-[500px] lg:h-[600px] 2xl:h-[600px]  object-cover" src={img1} alt="img1" />
        <div className='grid justify-center items-center  grid-cols-1 md:grid-cols-2 lg:grid-cols-4  h-auto md:h-[800px] lg:h-[600px] '>
  {cardsData.map((card) => (
    <div key={card.id} className="flex  justify-center items-center">
      <div className="bg-white w-full h-[350px] md:h-[360px] lg:h-[360px] md:w-80 lg:w-80 rounded-2xl p-3  hover:transition hover:border-4 hover:border-solid hover:border-orange-500">
        <div className="text-black flex justify-between items-center flex-col">
          <Image src={card.img} alt={`logo`} className="w-16 h-16" />
          <h1 className="border-b-2 border-solid border-orange-500 p-3">{t(card.title)}</h1>
          <p className="p-6">{t(card.desc)}</p>
          <Link href="/workout">
            <button className="flex border-2 border-solid p-2 rounded-full border-orange-500 text-orange-500 w-32 m-auto transition hover:bg-orange-500 hover:text-white">
              {t("button")} <FontAwesomeIcon icon={faArrowRight} className="size-6 ml-4 w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
      ))}
</div>
        </div>


            <div className='p-10 '>
              <h1 className='text-center text-orange-500 italic pt-8 text-2xl'>FITNESS <span className='text-white'>EXPERT</span></h1>
              <p className='text-center mt-4'>{t("description")}</p>
              <div className='grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14 '>
                {imagesData.map((image) => (
                  <div key={image.id} className={`flex justify-center ${image.justify}`}>
                    <div className="bg-white w-auto h-auto sm:w-80 lg:w-80 flex justify-center flex-col rounded-2xl p-3 hover:transition hover:border-3 hover:border-solid hover:border-orange-500">
                      <Link href="/service">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          className="w-96 h-96 rounded-xl transform transition duration-300 hover:scale-105 animate-bounceLight"
                        />
                        <div className="flex justify-center p-5 gap-5">
                          <FontAwesomeIcon icon={faUser} className="w-6 h-6 text-orange-500" />
                          <FontAwesomeIcon icon={faDumbbell} className="w-6 h-6 text-orange-500" />
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}

            </div>  
                </div> 
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 p-5 mt-10  bg-white  ">
          {
          products.map((item, index) => (
            <div key={index} className="flex justify-center items-center flex-col p-5 ">
              <Image src={item.img} alt={item.name} className="w-24 h-24 rounded-xl transform transition duration-300 hover:scale-110 cursor-pointer" />
              <p className="text-black mt-3">{item.name}</p>
              <span className="text-black">{item.price}</span>
            </div>
          ))}
              </div>
              </section>    
  )
};

export default Home;
