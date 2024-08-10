import PropTypes from "prop-types";

const CardSizeItem = ({ size, isSelected, onClick }) => {

  return (
    <div className={`border border-opacity-70 w-[50px] mb-5 rounded-lg cursor-pointer hover:border-none border-borderGray ${isSelected ? 'bg-primary text-white hover:bg-none' : 'hover:bg-primary hover:text-white'}`}>
      <div
        className="font-serif p-3 text-center"
        onClick={() => onClick(size)}
      >
        <p className="uppercase text-[16px] lg:text-[17px] sm:text-lg text-inherit 3xl:text-[20px]">
          {size}
        </p>
      </div>
    </div>
  )
}

CardSizeItem.propTypes = {
  size: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CardSizeItem
