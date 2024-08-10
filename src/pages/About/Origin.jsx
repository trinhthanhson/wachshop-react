const Origin = () => {
  return (
    <section>
      <div className="relative">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/watch-shop-3a14f.appspot.com/o/images%2Fabout%2Fabout.jpg?alt=media&token=aa90b0b9-b10b-482d-9d2f-9412d589da53"
          alt="banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r-white from-transparent to-white"></div>
      </div>
      <div className="w-[90%] lg:w-[80%] left-[15%] mx-auto bg-white mt-[10px]">
        <div className="flex">
          <div className="w-[50%] text-primary p-[60px]">
            <h1 className="uppercase font-RobotoSemibold text-5xl mb-3">
              Nguồn Gốc của S-WATCH
            </h1>
            <p className="font-normal text-primary">
              CÂU CHUYỆN NÀY LÀ CỦA CHÚNG MÌNH
            </p>
            <br />
            <p className="font-normal text-primary">
              S-WATCH bắt nguồn từ niềm đam mê cá nhân đối với đồng hồ và mong
              muốn chia sẻ kiến thức, thông tin hữu ích về đồng hồ đến với mọi
              người. Sáng lập bởi một người yêu thích đồng hồ, S-WATCH không chỉ
              là một trang web thương mại, mà còn là một không gian để chia sẻ,
              tìm hiểu và khám phá những giá trị tinh tế của nghệ thuật chế tác
              đồng hồ.
            </p>
            <br />
            <p className="font-normal text-primary">TẦM NHÌN SỨ MỆNH</p>
            <br />
            <p className="font-normal text-primary">
              Với tầm nhìn trở thành nguồn thông tin hàng đầu về đồng hồ,
              S-WATCH cam kết mang đến cho cộng đồng những kiến thức sâu rộng về
              các loại đồng hồ, từ những mẫu thiết kế cổ điển đến những công
              nghệ hiện đại nhất. Sứ mệnh của S-WATCH là giúp mọi người hiểu rõ
              hơn về đồng hồ, từ lịch sử, các thương hiệu nổi tiếng, đến các xu
              hướng mới nhất trong ngành công nghiệp đồng hồ.
            </p>
            <br />
            <p className="font-semibold text-primary">
              S-WATCH của tôi cho bạn và vì bạn!
            </p>
          </div>
          <div className="w-[50%] bg-white p-[60px]">
            <div className="flex">
              <div className="w-full">
                <ul className="font-RobotoMedium">
                  <li className="mb-5">
                    <a
                      href="/services"
                      className="flex items-end justify-center"
                    >
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/watch-shop-3a14f.appspot.com/o/images%2Fservice-work%2Fservice.png?alt=media&token=1eeca575-d3e0-4fe5-87c7-c8a04fefeae3"
                        alt="img-services"
                        className="relative"
                      />
                      <p className="uppercase absolute text-white text-[34px] font-RobotoSemibold mb-5">
                        Dịch Vụ
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

export default Origin
