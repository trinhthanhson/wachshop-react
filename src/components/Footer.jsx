import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="bg-primary text-black p-8"
      style={{ backgroundColor: 'rgb(0 0 0 / 35%)' }}
    >
      <hr></hr>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
        <div className="lg:mr-4">
          <a href="/home" className="flex items-center ">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/watch-shop-3a14f.appspot.com/o/images%2Flogo.png?alt=media&token=6780a5ae-e38c-4b0d-b290-67324a79513bhttps://firebasestorage.googleapis.com/v0/b/watch-shop-3a14f.appspot.com/o/images%2Flogo.png?alt=media&token=ff560732-bd5c-43d0-9271-7bcd3d9204ea"
              alt="logo"
              className="w-36 ml-10 mb-4"
            />
          </a>

          <div className="flex px-8">
            <a
              href="https://www.facebook.com/profile.php?id=100016757595548"
              className="rounded-full border mx-4 mb-8 p-1 hover:bg-red ease-out duration-300 text-black"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/son.l.i/"
              className="rounded-full border mr-4 mb-8 p-1 hover:bg-red ease-out duration-300 text-black"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.youtube.com/@thanhson5973"
              className="rounded-full border mr-4 mb-8 p-1 hover:bg-red ease-out duration-300 text-black"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        <div className="lg:mr-4">
          <p className="text-[15px] text-black font-semibold">S-WATCH</p>
          <p className="text-xs text-black">
            <br />
            11/7A Đường Nam Cao
            <br />
            Phường Tân Phú,
            <br />
            Thành Phố Thủ Đức,
            <br />
            Thành Phố Hồ Chí Minh,
            <br />
            Việt Nam.
          </p>
        </div>

        <div className="lg:mr-4">
          <a href="/about">
            <p className="uppercase text-xs text-black mb-2 font-bold hover:text-red ease-out duration-300">
              Về Chúng Tôi
            </p>
          </a>

          <a href="/menu">
            <p className="uppercase text-xs text-black mb-2 font-bold hover:text-red ease-out duration-300">
              Sản phẩm
            </p>
          </a>

          <a href="/news">
            <p className="uppercase text-xs text-black mb-2 font-bold hover:text-red ease-out duration-300">
              Tin Tức
            </p>
          </a>

          <a href="/card">
            <p className="uppercase text-xs text-black mb-2 font-bold hover:text-red ease-out duration-300">
              Thẻ
            </p>
          </a>
        </div>

        <div>
          <p className="uppercase text-xs text-black font-bold">Liên Hệ</p>

          <a
            className="text-black hover:text-red ease-out duration-300 text-[14px] mb-3 font-semibold"
            href="mailto:sontrinh2507@gmail.com"
          >
            sontrinh2507@gmail.com
          </a>
          <br />

          <p className="text-black uppercase tracking-normal text-[12px] font-semibold mt-3">
            Every day
          </p>
        </div>
      </div>

      <hr className="my-4" />

      <div className="flex flex-col-reverse md:flex-row justify-between items-center text-black">
        <p className="text-xs mb-2 md:mb-0">
          © {currentYear} S-WATCH. All rights reserved
        </p>

        <div className="text-center md:text-right">
          <a
            className="text-black hover:text-red focus:text-red ease-out duration-300 mr-3 text-xs"
            href="/disclaimer"
          >
            Disclaimer
          </a>

          <a
            className="border-l border-white pl-3 text-black hover:text-red focus:text-red ease-out duration-300 text-xs"
            href="/privacy-notice"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
