import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
//import { menu } from '../apis/mock-data'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getAllProductsCustomerRequest } from '../redux/actions/actions'
import CardProductItem from '../components/Products/CardProductItem'

const Home = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false
  }

  const dispatch = useDispatch()
  const productsCustomer = useSelector(
    (state) => state.productsCustomer.productsCustomer.data
  )
  const [display, setDisplay] = useState(5)

  useEffect(() => {
    dispatch(getAllProductsCustomerRequest())
  }, [dispatch])

  return (
    <>
      <div className="grid grid-cols-2 gap-3 w-full h-full items-center pt-[100px] px-[50px]">
        <div className="flex flex-col gap-2 w-full h-full">
          <Slider {...settings} className="h-full">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/watch-shop-3a14f.appspot.com/o/images%2Fbanner%2Fbanner1.jpg?alt=media&token=a8a080d1-4d53-4299-aa5d-28806e253d3a"
              alt="img-01"
              className="w-full h-full object-contain"
            />
            <img
              src="https://firebasestorage.googleapis.com/v0/b/watch-shop-3a14f.appspot.com/o/images%2Fbanner%2Fbanner2.jpg?alt=media&token=6871c4dd-488a-416f-a26f-78d59785d6a3"
              alt="img-02"
              className="w-full h-full object-contain"
            />
          </Slider>
        </div>

        <div className="grid grid-cols-2 grid-rows-2 gap-2 w-full h-full">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/watch-shop-3a14f.appspot.com/o/images%2Fbanner%2Fbanner1.jpg?alt=media&token=a8a080d1-4d53-4299-aa5d-28806e253d3a"
            alt="banner"
            className="w-full h-full object-cover"
          />
          <img
            src="https://firebasestorage.googleapis.com/v0/b/watch-shop-3a14f.appspot.com/o/images%2Fbanner%2Fbanner2.jpg?alt=media&token=6871c4dd-488a-416f-a26f-78d59785d6a3"
            alt="banner"
            className="w-full h-full object-cover"
          />
          <img
            src="https://firebasestorage.googleapis.com/v0/b/watch-shop-3a14f.appspot.com/o/images%2Fbanner%2Fbanner3.jpg?alt=media&token=2d240fbc-4f16-44e1-bbf1-8468a3d8f109"
            alt="banner"
            className="w-full h-full object-cover"
          />
          <img
            src="https://firebasestorage.googleapis.com/v0/b/watch-shop-3a14f.appspot.com/o/images%2Fbanner%2Fbanner4.jpg?alt=media&token=9ffe6296-9f5a-49bb-8c39-f654b2394df1"
            alt="banner"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* <div className="bg-white flex justify-around p-6 my-6">
        {menu.map((item) => (
          <div className="flex flex-col items-center" key={item.id}>
            <div className="w-14 h-14 flex justify-center items-center shadow-md rounded-md border border-neutral-100">
              <a href={`${item.path}`}>
                <img
                  src={item.image || ''}
                  alt="image"
                  className="w-10 h-10 object-contain cursor-pointer"
                />
              </a>
            </div>
            <p className="mt-2">{item.title}</p>
          </div>
        ))}
      </div> */}
      <h1 className="font-RobotoSemibold text-center uppercase text-[24px] text-main mt-20 mb-10">
        Gợi Ý Hôm Nay
      </h1>
      <div className="p-10 w-full lg:w-12/12 md:gap-6 flex flex-wrap justify-center m-auto">
        {productsCustomer &&
          productsCustomer
            .slice(0, display)
            .map((product) => (
              <CardProductItem key={product.product_id} product={product} />
            ))}
      </div>

      {display < productsCustomer?.length && (
        <div className="flex justify-center items-center">
          <button
            onClick={() => setDisplay((prev) => prev + 5)}
            className="mb-10 w-[15%] font-RobotoMedium bg-primary text-white p-3 rounded-md shadow-md hover:bg-white hover:text-primary border-[1px] border-primary transition duration-300 ease-in-out mx-auto"
          >
            Xem Thêm
          </button>
        </div>
      )}
    </>
  )
}

export default Home
