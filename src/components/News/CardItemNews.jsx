import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { format } from 'date-fns';

const CardItemNews = ({ title, image, date, id }) => {
  const formattedDate = format(new Date(date), "dd/MM/yyyy, HH:mm");

  return (
    <div className="mb-[30px] sm:mb-0">
      <div>
        <div className="relative overlay-container mb-0 sm:mb-0 hover:scale-105 transition duration-500 ease-in-out">
          <Link to={`/news/${id}`}>
            <img
              className="w-full h-[250px] lg:h-[35vh] object-cover object-center rounded-[10px] shadow-xl"
              src={image}
              alt={title}
            />
          </Link>
        </div>
        <a href={`/news/${id}`}>
          <h3 className="font-RobotoMedium text-[14px] xl:text-[16px] 3xl:text-[24px] my-3 sm:my-5 hover:text-[#b22830]">
            {title}
          </h3>
        </a>
        <div className="flex">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/wed-invitation-790a1.appspot.com/o/calendar.png?alt=media&token=1094466b-cfd2-4402-8a30-113a763bc106"
            alt="icon-calendar"
            className="w-4 h-4 mr-[5px]"
          />
          <p className="text-zinc-500 text-[12px] 4xl:text-base font-medium">
            {formattedDate}
          </p>
        </div>
      </div>
    </div>
  );
};

CardItemNews.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default CardItemNews;
