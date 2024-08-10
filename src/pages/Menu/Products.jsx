import { useEffect, useState } from 'react'
import CardProductItem from '../../components/Products/CardProductItem'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllProductsCustomerRequest,
  getAllCategoriesRequest,
  getAllBrandRequest
} from '../../redux/actions/actions'
import axios from 'axios'

const ProductByCategory = () => {
  const [categoryFilter, setCategoryFilter] = useState('')
  const [brandFilter, setBrandFilter] = useState('')
  const [priceRangeFilter, setPriceRangeFilter] = useState('')
  const [sortOrder, setSortOrder] = useState('desc')
  const dispatch = useDispatch()
  const categories = useSelector((state) => state.categories.categories.data)
  const loadingCategories = useSelector((state) => state.categories.loading)
  const errorCategories = useSelector((state) => state.categories.error)

  const [searchKeyword, setSearchKeyword] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const brands = useSelector((state) => state.brands.brands.data)
  const loadingBrands = useSelector((state) => state.brands.loading)
  const errorBrands = useSelector((state) => state.brands.error)
  const productsCustomer = useSelector(
    (state) => state.productsCustomer.productsCustomer.data
  )
  useEffect(() => {
    dispatch(getAllCategoriesRequest())
    dispatch(getAllProductsCustomerRequest())
    dispatch(getAllBrandRequest())
  }, [dispatch])
  useEffect(() => {
    if (searchKeyword) {
      const fetchSearchResults = async () => {
        try {
          const response = await axios.get(
            'http://localhost:9999/api/user/product/find',
            {
              params: { keyword: searchKeyword }
            }
          )
          setSearchResults(response.data?.data)
        } catch (error) {
          console.error('Error searching products:', error)
        }
      }

      fetchSearchResults()
    } else {
      setSearchResults([])
    }
  }, [searchKeyword])
  const filterProducts = (productsCustomer) => {
    if (
      categoryFilter &&
      productsCustomer?.category?.category_id !== parseInt(categoryFilter)
    ) {
      return false
    }
    if (
      brandFilter &&
      productsCustomer?.brand?.brand_id !== parseInt(brandFilter)
    ) {
      return false
    }
    if (priceRangeFilter) {
      const [min, max] = priceRangeFilter.split('-')
      const productPrice = parseInt(
        productsCustomer?.priceUpdateDetails[0]?.price_new
      )
      if (
        (min && productPrice < parseInt(min)) ||
        (max && productPrice > parseInt(max))
      ) {
        return false
      }
    }
    return true
  }
  const handleSearch = (e) => {
    setSearchKeyword(e.target.value)
  }
  const sortProducts = (productsCustomer) => {
    return productsCustomer.sort((a, b) => {
      const priceA = parseInt(a.priceUpdateDetails[0]?.price_new)
      const priceB = parseInt(b.priceUpdateDetails[0]?.price_new)
      return sortOrder === 'asc' ? priceA - priceB : priceB - priceA
    })
  }

  const filteredAndSortedProducts = sortProducts(
    productsCustomer?.filter(filterProducts) || []
  )

  const handleReset = () => {
    setCategoryFilter('')
    setPriceRangeFilter('')
    setBrandFilter('')
  }

  return (
    <>
      <section className="relative bg-gradient-to-b from-white to-grayWhite h-[310px] md:h-[350px]">
        <div className="flex flex-column items-start sm:items-center lg:items-start justify-center absolute top-0 right-0 left-0 bottom-0 w-full max-w-none xl:max-w-screen-2xl sm:max-w-7xl mx-auto">
          <div className="mt-[100px] lg:mt-[180px]">
            <div className="lg:max-w-7xl md:px-8 px-4 sm:mt-0 text-center">
              <h1 className="leading-tight text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-[3rem] text-black max-w-xl lg:max-w-4xl font-RobotoMedium drop-shadow-lg shadow-black">
                Find Products <br className="sm:hidden" />
                Here
              </h1>
            </div>
          </div>
        </div>
        <div className="absolute z-10 left-0 right-0 bg-white top-[70%] md:top-[85%] md:bottom-[-7%] w-[90%] xl:w-[75%] mx-auto shadow-lg flex items-center flex-col lg:flex-row h-fit lg:h-[75px]">
          <div className="text-base px-2 w-full lg:w-[35%] relative border-b border-r border-solid border-borderGray flex items-center h-[50px] lg:h-full">
            <div className="relative w-full">
              <select
                className="outline-none pl-[20px] relative w-full text-left font-RobotoMedium lg:text-[17px] 2xl:text-xl"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">Tất cả loại</option>
                {loadingCategories ? (
                  <option>Đang tải...</option>
                ) : errorCategories ? (
                  <option>Lỗi tải danh mục</option>
                ) : (
                  (Array.isArray(categories) ? categories : []).map(
                    (category) => (
                      <option
                        key={category.category_id}
                        value={category.category_id}
                      >
                        {category.category_name}
                      </option>
                    )
                  )
                )}
              </select>
            </div>
          </div>
          <div className="text-base px-2 w-full lg:w-[35%] relative border-b border-r border-solid border-borderGray flex items-center h-[50px] lg:h-full">
            <div className="relative w-full">
              <select
                className="outline-none pl-[20px] relative w-full text-left font-RobotoMedium lg:text-[17px] 2xl:text-xl"
                value={brandFilter}
                onChange={(e) => setBrandFilter(e.target.value)}
              >
                <option value="">Tất cả hãng</option>
                {loadingBrands ? (
                  <option>Đang tải...</option>
                ) : errorBrands ? (
                  <option>Lỗi tải danh mục</option>
                ) : (
                  (Array.isArray(brands) ? brands : []).map((brand) => (
                    <option key={brand.brand_id} value={brand.brand_id}>
                      {brand.brand_name}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>
          <div className="text-base px-2 w-full lg:w-[35%] relative flex items-center h-[50px] border-r lg:h-full">
            <div className="relative w-full">
              <select
                className="outline-none pl-[20px] relative w-full text-left font-RobotoMedium lg:text-[17px] 2xl:text-xl"
                value={priceRangeFilter}
                onChange={(e) => setPriceRangeFilter(e.target.value)}
              >
                <option value="">All Price</option>
                <option value="0-1000000">0 - 1tr</option>
                <option value="1000000-5000000">3tr - 5tr</option>
                <option value="5100000">Hơn 5tr</option>
              </select>
            </div>
          </div>
          <div className="text-base px-2 w-full lg:w-[35%] relative flex items-center h-[50px] lg:h-full">
            <input
              type="text"
              placeholder="Search products..."
              value={searchKeyword}
              onChange={handleSearch}
              className="outline-none pl-[20px] relative w-full text-left font-RobotoMedium lg:text-[17px] 2xl:text-xl"
            />
          </div>
          <button
            onClick={handleReset}
            className="hover:bg-gray-200 bg-white text-black flex justify-center items-center w-full lg:w-[30%] py-2 lg:py-2.5 h-[50px] lg:h-full"
          >
            <span className="capitalize text-base lg:text-[17px] font-RobotoMedium">
              Reset
            </span>
            <img
              className="w-[15px] h-[15px]"
              src="https://www.gamudaland.com.my/images/icons/reset.svg"
              alt="reset-icon"
            />
          </button>
        </div>
      </section>

      <section className="mt-[200px] mb-[20px] md:mt-[100px] md:mb-[100px] px-4">
        <div className="flex py-5 flex-col sm:flex-row justify-start sm:justify-between items-center lg:w-10/12 mx-auto">
          <div className="font-TitilliumRegular text-[17px] flex w-full justify-center sm:justify-start mb-5 sm:mb-0">
            <div className="w-[30px] h-[30px] mr-3">
              <img
                src="https://www.gamudaland.com.my/_next/image?url=%2Fimages%2Ficons%2Fsearch.png&w=64&q=75"
                alt="search-icon"
              />
            </div>
            <div className="font-RobotoSemibold text-main">
              {searchKeyword
                ? searchResults.length
                : filteredAndSortedProducts.length}{' '}
              <span className="text-black font-RobotoMedium">
                {searchKeyword ? 'projects found' : 'Products Found'}
              </span>
            </div>
          </div>
          <div className="relative inline-block w-full sm:w-64">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="font-RobotoMedium block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="desc">Price high to low</option>
              <option value="asc">Price low to high</option>
            </select>
          </div>
        </div>

        <div className="w-full lg:w-10/12 md:gap-6 flex flex-wrap justify-center m-auto">
          {(searchKeyword ? searchResults : filteredAndSortedProducts).map(
            (product) => (
              <CardProductItem key={product.product_id} product={product} />
            )
          )}
        </div>
      </section>
    </>
  )
}

export default ProductByCategory
