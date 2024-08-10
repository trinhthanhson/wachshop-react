import { Link } from 'react-router-dom'

const Menu = () => {
  return (
    <>
      <section
        className="relative flex flex-col-reverse md:flex-row items-center "
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
      >
        <div className="relative md:w-[50%]">
          <div
            className="py-[40px] px-7 lg:px-14 md:py-14 w-full"
            style={{ marginTop: '150px' }}
          >
            <div className="relative">
              <div className="w-1/2 border-b-[0px] sm:border-b-[1px] sm:border border-primary"></div>
              <div className="absolute top-[-1px] w-[15%] border-b-[0px] sm:border-b-[2px] sm:border-main"></div>
            </div>
            <h1 className="uppercase text-center text-darkYellow sm:text-left font-RobotoMedium hover:text-main text-3xl md:text-3xl xl:text-[3rem] mb-5 mt-0 sm:mt-5 md:leading-tight cursor-pointer">
              Đồng hồ Analog-Digital
            </h1>
            <p className="font-normal text-center text-darkYellow sm:text-left text-[16px] lg:text-[18px] lg:w-[100%]">
              Đồng hồ Analog-Digital là sự kết hợp hoàn hảo giữa hai thế giới:
              truyền thống và hiện đại. Loại đồng hồ này có cả mặt số kim và màn
              hình số điện tử, cung cấp thông tin thời gian một cách rõ ràng và
              tiện lợi. Được trang bị nhiều tính năng hữu ích như báo thức, bấm
              giờ, đèn nền và đôi khi là khả năng chống nước, đồng hồ
              Analog-Digital phù hợp cho cả các hoạt động hàng ngày lẫn các sự
              kiện thể thao. Thiết kế đa dạng và phong cách mạnh mẽ giúp đồng hồ
              Analog-Digital trở thành lựa chọn lý tưởng cho những ai muốn sở
              hữu một chiếc đồng hồ đa chức năng và phong cách.
            </p>
            <Link to="/products">
              <button className="bg-red  uppercase rounded-md shadow-md text-whiteYellow text-darkYellow border-[1px] border-whiteYellow py-3 px-10 mt-5 hover:bg-main hover:text-white hover:shadow-lg ease-out duration-300">
                Khám Phá Thêm
              </button>
            </Link>
          </div>
        </div>
        <div className="relative md:w-[50%]">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/watch-shop-3a14f.appspot.com/o/images%2Fproducts%2FAnalog-Digital%2Fmens-le-locle-leather-silver-dia-removebg-preview.png?alt=media&token=dbe794f7-302a-46c3-a1ca-d50e6ddedc30"
            alt="coffee-img"
            className="w-full object-cover object-bottom h-full mt-[50px]"
            style={{
              height: '400px',
              width: '400px',
              marginLeft: '300px'
            }}
          />
        </div>
      </section>

      <section className="relative flex flex-col-reverse md:flex-row bg-white items-centerfrom-transparent to-white h-[400px]">
        <div className="relative md:w-[50%]">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/watch-shop-3a14f.appspot.com/o/images%2Fproducts%2FDive-Watches%2Fmens-mako-ii-stainless-steel-bla-removebg-preview.png?alt=media&token=9fdc0db1-1f0f-4384-83d6-2ce3b59a8225"
            alt="freeze-img"
            className="w-full object-cover object-bottom h-full"
            style={{
              height: '400px',
              width: '400px',
              marginLeft: '300px'
            }}
          />
        </div>
        <div className="relative md:w-[50%]">
          <div className="py-[40px] px-7 lg:px-14 md:py-14 w-full">
            <div className="relative">
              <div className="w-1/2 border-b-[0px] sm:border-b-[1px] sm:border border-primary"></div>
              <div className="absolute top-[-1px] w-[15%] border-b-[0px] sm:border-b-[2px] sm:border-main"></div>
            </div>
            <h1 className="uppercase text-center text-darkYellow sm:text-left font-RobotoMedium hover:text-main text-3xl md:text-3xl xl:text-[3rem] mb-5 mt-0 sm:mt-5 md:leading-tight cursor-pointer">
              Đồng hồ lặn (Dive Watches)
            </h1>
            <p className="font-normal text-center text-darkYellow sm:text-left text-[16px] lg:text-[18px] lg:w-[100%]">
              Đồng hồ lặn, hay còn gọi là Dive Watches, là loại đồng hồ được
              thiết kế chuyên biệt cho các thợ lặn và những ai yêu thích các
              hoạt động dưới nước. Với khả năng chống nước cao, thường từ 200
              mét trở lên, đồng hồ lặn có thể chịu được áp suất lớn khi lặn sâu.
              Chúng được trang bị các tính năng như vòng bezel xoay đơn hướng để
              theo dõi thời gian lặn, mặt số dễ đọc dưới nước và dây đeo chắc
              chắn. Đồng hồ lặn không chỉ là công cụ hữu ích cho các thợ lặn
              chuyên nghiệp mà còn là món phụ kiện phong cách cho những ai yêu
              thích thể thao và phiêu lưu.
            </p>
            <Link to="/products">
              <button className="bg-red uppercase text-darkYellow rounded-md shadow-md text-whiteYellow border-[1px] border-whiteYellow py-3 px-10 mt-5 hover:bg-main hover:text-white hover:shadow-lg ease-out duration-300">
                Khám Phá Thêm
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative flex flex-col-reverse md:flex-row items-center bg-white from-transparent to-white h-[400px]">
        <div className="relative md:w-[50%]">
          <div className="py-[40px] px-7 lg:px-14 md:py-14 w-full">
            <div className="relative">
              <div className="w-1/2 border-b-[0px] sm:border-b-[1px] sm:border border-primary"></div>
              <div className="absolute top-[-1px] w-[15%] border-b-[0px] sm:border-b-[2px] sm:border-main"></div>
            </div>
            <h1 className="uppercase text-darkYellow text-center sm:text-left font-RobotoMedium hover:text-main text-3xl md:text-3xl xl:text-[3rem] mb-5 mt-0 sm:mt-5 md:leading-tight cursor-pointer">
              Đồng hồ sang trọng (Luxury Watches)
            </h1>
            <p className="font-normal text-darkYellow text-center sm:text-left text-[16px] lg:text-[18px] lg:w-[100%]">
              Đồng hồ sang trọng là biểu tượng của đẳng cấp và sự xa hoa. Những
              chiếc đồng hồ này được chế tác từ các chất liệu cao cấp như vàng,
              bạch kim và kim cương, với sự tỉ mỉ đến từng chi tiết. Đồng hồ
              sang trọng thường được sản xuất bởi các thương hiệu danh tiếng,
              với số lượng giới hạn và các tính năng phức tạp như tourbillon,
              lịch vạn niên và khả năng trữ năng lượng lâu dài. Sở hữu một chiếc
              đồng hồ sang trọng không chỉ là sở hữu một thiết bị đo thời gian
              chính xác mà còn là biểu hiện của gu thẩm mỹ và địa vị xã hội.
            </p>
            <Link to="/products">
              <button className="bg-red  uppercase rounded-md shadow-md text-white border-[1px] border-white py-3 px-10 mt-5 hover:bg-main hover:text-white hover:shadow-lg ease-out duration-300">
                Khám Phá Thêm
              </button>
            </Link>
          </div>
        </div>
        <div className="relative md:w-[50%]">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/watch-shop-3a14f.appspot.com/o/images%2Fproducts%2FLuxury-Watches%2Fmens-superocean-removebg-preview.png?alt=media&token=6c023761-6f02-45d1-929c-51d86bfeaf0b"
            alt="tea-img"
            className="w-full object-cover object-bottom h-full mt-[50px]"
            style={{
              marginTop: '-1px',
              height: '400px',
              width: '400px',
              marginLeft: '300px'
            }}
          />
        </div>
      </section>
      <section className="relative flex flex-col-reverse md:flex-row items-center bg-white from-transparent to-white h-[400px]">
        <div className="relative md:w-[50%]">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/watch-shop-3a14f.appspot.com/o/images%2Fproducts%2FFashion-Watches%2Fmens-potenza-stainless-steel-sil-removebg-preview.png?alt=media&token=348de9c9-660c-41eb-9c43-2aa3c71a15d7"
            alt="freeze-img"
            className="w-full object-cover object-bottom h-full"
            style={{
              height: '400px',
              width: '400px',
              marginLeft: '300px'
            }}
          />
        </div>
        <div className="relative md:w-[50%]">
          <div className="py-[40px] px-7 lg:px-14 md:py-14 w-full">
            <div className="relative">
              <div className="w-1/2 border-b-[0px] sm:border-b-[1px] sm:border border-primary"></div>
              <div className="absolute top-[-1px] w-[15%] border-b-[0px] sm:border-b-[2px] sm:border-main"></div>
            </div>
            <h1 className="uppercase text-darkYellow text-center sm:text-left font-RobotoMedium hover:text-main text-3xl md:text-3xl xl:text-[3rem] mb-5 mt-0 sm:mt-5 md:leading-tight cursor-pointer">
              Đồng hồ thời trang (Fashion Watches)
            </h1>
            <p className="font-normal text-darkYellow text-center sm:text-left text-[16px] lg:text-[18px] lg:w-[100%]">
              Đồng hồ thời trang là món phụ kiện hoàn hảo để hoàn thiện phong
              cách cá nhân. Với thiết kế đa dạng, từ hiện đại, tối giản đến sặc
              sỡ, bắt mắt, đồng hồ thời trang dễ dàng kết hợp với nhiều loại
              trang phục và hoàn cảnh khác nhau. Chúng thường được làm từ các
              chất liệu như thép không gỉ, da, silicon và đôi khi là các vật
              liệu sáng tạo khác. Đồng hồ thời trang không chỉ là công cụ để xem
              giờ mà còn là cách để thể hiện cá tính và phong cách riêng của mỗi
              người.
            </p>
            <Link to="/products">
              <button className="bg-red uppercase rounded-md shadow-md text-whiteYellow border-[1px] border-whiteYellow py-3 px-10 mt-5 hover:bg-main hover:text-white hover:shadow-lg ease-out duration-300">
                Khám Phá Thêm
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Menu
