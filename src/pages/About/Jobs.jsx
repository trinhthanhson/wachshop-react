const Jobs = () => {
  return (
    <section>
      <div className="relative">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/watch-shop-3a14f.appspot.com/o/images%2Fbackground.jpg?alt=media&token=edae71b6-7155-4d79-b78c-636c0a929ce6"
          alt="banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r-white from-transparent to-white"></div>
      </div>
      <div className="w-[90%] lg:w-[80%] left-[15%] mx-auto bg-white mt-[10px]">
        <div className="flex">
          <div className="w-[50%] text-primary p-[60px] text-[14px]">
            <h1 className="uppercase font-RobotoSemibold text-5xl mb-3">
              Nghề Nghiệp
            </h1>
            <p className="font-RobotoMedium text-primary">
              CƠ HỘI NÀY LÀ CỦA CHÚNG MÌNH
            </p>
            <br />
            <p className=" text-primary font-normal">
              S-WATCH không chỉ là nơi cung cấp các sản phẩm và dịch vụ chất
              lượng cao mà còn là môi trường làm việc lý tưởng cho những ai đam
              mê và có kiến thức về đồng hồ. Chúng tôi luôn tìm kiếm những cá
              nhân tài năng và nhiệt huyết để gia nhập đội ngũ của mình.
            </p>
            <br />
            <p className="font-normal text-primary">
              1. Vị Trí Kinh Doanh và Tư Vấn Khách Hàng Chúng tôi tìm kiếm những
              nhân viên kinh doanh có khả năng tư vấn và hỗ trợ khách hàng một
              cách chuyên nghiệp. Bạn sẽ làm việc trực tiếp với khách hàng, giúp
              họ chọn lựa và mua sắm những mẫu đồng hồ phù hợp nhất.
            </p>
            <br />
            <p className="font-normal text-primary">
              2. Vị Trí Marketing và Truyền Thông Chúng tôi cũng đang tìm kiếm
              những chuyên viên marketing và truyền thông sáng tạo, có khả năng
              xây dựng và triển khai các chiến dịch quảng cáo hiệu quả. Bạn sẽ
              đóng vai trò quan trọng trong việc phát triển thương hiệu và tăng
              cường sự hiện diện của S-WATCH trên thị trường.
            </p>
            <br />
            <p className="font-normal text-primary">
              3. Vị Trí Kỹ Thuật Viên Sửa Chữa Đồng Hồ Nếu bạn có kỹ năng và
              kinh nghiệm trong việc sửa chữa và bảo dưỡng đồng hồ, S-WATCH là
              nơi lý tưởng để bạn phát triển sự nghiệp. Bạn sẽ làm việc với các
              chuyên gia hàng đầu và tiếp cận những công nghệ mới nhất trong
              lĩnh vực này.
            </p>
            <br />
          </div>
          <div className="w-[50%] bg-white p-[60px]">
            <div className="flex">
              <div className="w-full">
                <ul className="font-RobotoMedium">
                  <li className="mb-5">
                    <a href="/origin" className="flex items-end justify-center">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/watch-shop-3a14f.appspot.com/o/images%2Fservice-work%2Fservice.png?alt=media&token=1eeca575-d3e0-4fe5-87c7-c8a04fefeae3"
                        alt="img-origin"
                        className="relative"
                      />
                      <p className="uppercase absolute text-white text-[34px] font-RobotoSemibold mb-5">
                        Nguồn Gốc
                      </p>
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="/services"
                      className="flex justify-center items-end"
                    >
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/watch-shop-3a14f.appspot.com/o/images%2Fservice-work%2Fwork.png?alt=media&token=ad3977d0-d750-4141-99fc-a5422dce3d09"
                        alt="img-services"
                        className="relative"
                      />
                      <p className="uppercase absolute text-white text-[34px] font-RobotoSemibold mb-5">
                        Dịch Vụ
                      </p>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Jobs
