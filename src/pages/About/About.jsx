import { Link } from 'react-router-dom'

const About = () => {
  return (
    <>
      <section className="relative flex flex-col-reverse md:flex-row items-center bg-white">
        <div className="relative md:w-[35%]">
          <div className="py-[40px] px-7 lg:px-14 md:py-14 w-full">
            <div className="relative">
              <div className="w-1/2 border-b-[0px] sm:border-b-[1px] sm:border border-primary"></div>
              <div className="absolute top-[-1px] w-[15%] border-b-[0px] sm:border-b-[2px] sm:border-main"></div>
            </div>
            <h1 className="uppercase text-center sm:text-left font-RobotoMedium text-primary hover:text-lightYellow text-3xl md:text-3xl xl:text-[3rem] mb-5 mt-0 sm:mt-5 md:leading-tight cursor-pointer">
              CHÚNG TÔI YÊU ĐỒNG HỒ!
            </h1>
            <p className="font-normal text-center sm:text-left text-black text-[16px] lg:text-[18px] lg:w-[100%]">
              S-WATCH là một trang web uy tín chuyên cung cấp các sản phẩm đồng
              hồ đeo tay chất lượng cao. Với mục tiêu mang đến cho khách hàng
              những trải nghiệm mua sắm tuyệt vời, S-WATCH tập trung vào việc
              tuyển chọn và phân phối các mẫu đồng hồ từ nhiều thương hiệu nổi
              tiếng trên thế giới.
            </p>
            <Link to="/origin">
              <button className="uppercase rounded-md shadow-md text-main border-[1px] border-main py-3 px-10 mt-5 hover:bg-main hover:text-white hover:shadow-lg ease-out duration-300">
                Xem Chi Tiết
              </button>
            </Link>
          </div>
        </div>
        <div className="relative md:w-[65%]">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/watch-shop-3a14f.appspot.com/o/images%2Fabout%2Fabout.jpg?alt=media&token=aa90b0b9-b10b-482d-9d2f-9412d589da53"
            alt="banner"
            className="w-full object-cover object-bottom h-full lg:h-[500px]"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white"></div>
        </div>
      </section>
    </>
  )
}

export default About
