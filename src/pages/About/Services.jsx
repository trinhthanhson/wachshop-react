const Services = () => {
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
              Dịch Vụ Của S-WATCH
            </h1>
            <p className="font-bold text-primary">
              DỊCH VỤ NÀY LÀ CỦA CHÚNG MÌNH
            </p>
            <br />
            <p className="font-bold text-primary">
              Tại S-WATCH, chúng tôi cam kết cung cấp dịch vụ tốt nhất để đáp
              ứng nhu cầu đa dạng của khách hàng. Chúng tôi hiểu rằng mỗi chiếc
              đồng hồ không chỉ là một công cụ xem giờ mà còn là một biểu tượng
              của phong cách và cá tính. Để mang lại trải nghiệm tốt nhất cho
              khách hàng, S-WATCH cung cấp các dịch vụ sau:
            </p>
            <br />
            <p className="font-bold text-primary">
              1. Bán Hàng Đồng Hồ Chính Hãng Chúng tôi cung cấp một loạt các mẫu
              đồng hồ chính hãng từ các thương hiệu nổi tiếng trên thế giới. Mỗi
              chiếc đồng hồ được chọn lọc kỹ càng để đảm bảo chất lượng và độ
              bền cao.
            </p>
            <br />
            <p className="font-bold text-primary">
              2. Tư Vấn Chọn Mua Đồng Hồ Đội ngũ nhân viên tư vấn chuyên nghiệp
              của chúng tôi sẵn sàng hỗ trợ bạn trong việc chọn lựa đồng hồ phù
              hợp với phong cách và nhu cầu của bạn. Dù bạn đang tìm kiếm một
              chiếc đồng hồ cho sự kiện đặc biệt hay đơn giản là muốn tìm một
              phụ kiện thời trang hàng ngày, chúng tôi luôn có những gợi ý tốt
              nhất dành cho bạn.
            </p>
            <br />
            <p className="font-bold text-primary">
              3. Dịch Vụ Bảo Hành và Sửa Chữa Chúng tôi hiểu rằng đồng hồ là một
              tài sản quý giá và xứng đáng được bảo vệ và chăm sóc tốt nhất.
              S-WATCH cung cấp dịch vụ bảo hành và sửa chữa chuyên nghiệp, đảm
              bảo đồng hồ của bạn luôn hoạt động tốt và giữ được vẻ đẹp như mới.
            </p>
            <br />
            <p className="font-bold text-primary">
              4. Mua Bán Đồng Hồ Cũ Ngoài việc bán các mẫu đồng hồ mới, S-WATCH
              còn cung cấp dịch vụ mua bán đồng hồ cũ. Chúng tôi giúp khách hàng
              bán lại những chiếc đồng hồ không còn sử dụng hoặc tìm kiếm những
              mẫu đồng hồ cổ điển, hiếm có.
            </p>
            <br />
            <p className="font-normal text-primary">
              Facebook:{' '}
              <a
                href="https://www.facebook.com/profile.php?id=100016757595548"
                className="text-main"
              >
                https://www.facebook.com/profile.php?id=100016757595548
              </a>
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
                    <a href="/jobs" className="flex justify-center items-end">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/watch-shop-3a14f.appspot.com/o/images%2Fservice-work%2Fwork.png?alt=media&token=ad3977d0-d750-4141-99fc-a5422dce3d09"
                        alt="img-jobs"
                        className="relative"
                      />
                      <p className="uppercase absolute text-white text-[34px] font-RobotoSemibold mb-5">
                        Nghề Nghiệp
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

export default Services
