import { useParams } from "react-router-dom";
import { news } from '../../apis/mock-data'
import CardItemNews from "../../components/News/CardItemNews";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { format } from 'date-fns';

const NewDetail = () => {
  const { id } = useParams();
  const selectedNews = news.find((item) => item.id === parseInt(id));
  const formattedDate = format(new Date(selectedNews?.date), "dd/MM/yyyy, HH:mm");

  const relatedNews = news
    .filter((item) => item.id !== parseInt(selectedNews.id))
    .slice(0, 3);

  return (
    <>
      <section className="relative bg-gradient-to-b from-grayWhite to-whiteYellow flex flex-col items-center justify-center pb-[50px] md:pb-[100px] px-4 md:px-8">
        <div className="w-full sm:w-3/4 xl:w-2/4 mx-auto sm:mt-0 text-center relative z-10">
          <h1 className="text-left sm:text-center leading-tight text-3xl md:text-4xl lg:text-5xl xl:text-[3rem] text-primary font-RobotoMedium pt-[120px]">
            {selectedNews?.title}
          </h1>
          <div className="flex justify-start sm:justify-center my-5 sm:my-10">
            <p className="text-[14px] sm:text-base font-RobotoMedium mr-3 text-primary">
              {formattedDate}
            </p>
          </div>
        </div>
        <div className="w-full xl:w-2/3 mx-auto sm:mt-0 text-center relative z-10">
          <div className="flex items-center justify-start sm:justify-end pb-8">
            <p className="text-black font-medium text-[14px] lg:text-[18px] mr-2 share-p">
              Share
            </p>
            <a className="mr-2" href="">
              <FaFacebook className="w-[28px] h-[28px]" />
            </a>
            <a className="mr-1" href="">
              <FaInstagram className="w-[28px] h-[28px]" />
            </a>
            <a className="mr-1 ml-1" href="">
              <FaYoutube className="w-[28px] h-[28px]" />
            </a>
          </div>

          <img
            className="w-full h-full sm:max-h-[600px] object-contain"
            src={selectedNews?.image}
            alt="new-banner"
          />
        </div>
      </section>

      <section className="bg-white pt-[50px] lg:pt-32 pb-[50px] md:pb-[100px] px-4 md:px-8 lg:-mt-44 relative">
        <div className="w-full xl:w-2/3 mx-auto">
          <div className="font-medium sm:text-[16px] md:text-[18px] text-justify">{selectedNews?.description}</div>
          <div className="flex items-center mt-10">
            <p className="text-black font-medium text-[14px] lg:text-[18px] mr-2 share-p">
              Share
            </p>
            <a className="mr-2" href="">
              <FaFacebook className="w-[28px] h-[28px]" />
            </a>
            <a className="mr-1" href="">
              <FaInstagram className="w-[28px] h-[28px]" />
            </a>
            <a className="mr-1 ml-1" href="">
              <FaYoutube className="w-[28px] h-[28px]" />
            </a>
          </div>
        </div>
      </section>
      <hr />
      <section className="bg-white py-[50px] md:py-[100px] px-4 md:px-8 relative">
        <div className="w-full">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-[3rem] text-primary text-center font-RobotoMedium w-full mx-auto title relative pb-5">
            Tin Tức Gần Đây
          </h1>
        </div>
        <div className="w-full xl:w-4/5 mx-auto pt-8 mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedNews.map((item, index) => (
              <div key={index} onClick={() => window.document.querySelector('body').scrollIntoView({ behavior: 'smooth' })}>
                <CardItemNews  {...item} />
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <div className="flex items-center justify-center">
              <a
                href="/news"
                className="uppercase text-main font-RobotoMedium text-base sm:text-lg py-3 px-10 border border-main hover:bg-red-600 hover:bg-main hover:text-white flex justify-center items-center rounded-lg shadow-lg ease-in-out transition-transform duration-500"
              >
                View All
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="arrow-right"
                  className="svg-inline--fa fa-arrow-right w-[15px] h-[15px] ml-3"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default NewDetail
