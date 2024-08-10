import { useEffect, useState } from "react";
import CardItemNews from "../../components/News/CardItemNews";
import { sortByDate } from "../../utils/sort";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from '../../redux/actions/actions';

const News = () => {
  const dispatch = useDispatch();
  const news = useSelector(state => state.news.news);
  const sortedNews = sortByDate(news, 'date');
  const [displayedNews, setDisplayedNews] = useState(3);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const handleMoreDisplay = () => {
    setDisplayedNews(displayedNews + 3);
  };


  return (
    <>
      <section className="relative bg-gradient-to-b from-white to-whiteYellow pt-[50px] lg:pt-48 pb-[50px] md:pb-[100px] px-4 md:px-8 lg:-mt-44">
        <div className="text-center mb-8 pb-6">
          <h3 className="font-RobotoSemibold text-5xl mt-[110px] uppercase text-primary">Tin Tức</h3>
        </div>
        <div className="w-full lg:w-[85%] mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedNews.slice(0, displayedNews).map((item, index) => (
              <CardItemNews key={index} {...item} />
            ))}
          </div>
        </div>
        {displayedNews < news.length ? (
          <div className="mt-5 md:mt-14">
            <div className="mx-auto text-center">
              <button
                onClick={handleMoreDisplay}
                className="text-primary uppercase rounded-[10px] p-3 flex mx-auto border-b-[1px] border-black font-RobotoMedium text-[14px] sm:text-[18px] py-[13px] hover:bg-red hover:text-white"
              >
                Load More
                <span className="ml-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        ) : null}
      </section>
    </>
  )
}

export default News
