import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
  updateProductRequest,
  getProductDetailRequest,
  getAllCategoriesRequest,
  getAllBrandRequest
} from '../../redux/actions/actions'
import { uploadImageToFirebase } from '../../firebase' // Import the function

const UpdateProduct = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const message = useSelector((state) => state.updateProduct)
  const productDetail = useSelector(
    (state) => state.productDetail.productDetail
  )
  const categories = useSelector((state) => state.categories.categories)
  const brands = useSelector((state) => state.brands.brands)
  const [loading, setLoading] = useState(false) // State to manage loading
  const [errorMessage, setErrorMessage] = useState('') // State for error messages

  const [formData, setFormData] = useState({
    data: {
      product_name: '',
      status: '',
      quantity: 0,
      price: 0,
      detail: '',
      technology: '',
      glass: '',
      func: '',
      color: '',
      machine: '',
      sex: '',
      accuracy: '',
      battery_life: '',
      water_resistance: '',
      weight: '',
      other_features: '',
      brand_name: '',
      category_name: '',
      image: ''
    }
  })
  const [imageSrc, setImageSrc] = useState(null)
  const navigate = useNavigate()
  const formDataRef = useRef(formData)
  useEffect(() => {
    try {
      dispatch(getAllBrandRequest())
      dispatch(getProductDetailRequest(id))
      dispatch(getAllCategoriesRequest())
    } catch (error) {
      console.error('Error dispatch', error)
    }
  }, [dispatch, id])

  useEffect(() => {
    formDataRef.current = formData
  }, [formData])
  useEffect(() => {
    if (productDetail) {
      setFormData({
        ...formData,
        data: {
          product_name: productDetail?.data.product_name,
          price: productDetail?.data.priceUpdateDetails[0]?.price_new,
          detail: productDetail?.data.detail,
          status: productDetail?.data.status,
          category_name: productDetail?.data.category?.category_name,
          brand_name: productDetail?.data.brand?.brand_name,
          accuracy: productDetail?.data.accuracy,
          battery_life: productDetail?.data.battery_life,
          color: productDetail?.data.color,
          func: productDetail?.data.func,
          glass: productDetail?.data.glass,
          machine: productDetail?.data.machine,
          other_features: productDetail?.data.other_features,
          quantity: productDetail?.data.quantity,
          sex: productDetail?.data.sex,
          technology: productDetail?.data.technology,
          water_resistance: productDetail?.data.water_resistance,
          weight: productDetail?.data.weight,
          image: productDetail?.data.image
        }
      })
      setImageSrc(productDetail?.data.image)
    }
  }, [productDetail])

  const handleChange = (e) => {
    if (e.target.name === 'file') {
      setFormData({
        data: {
          ...formData.data,
          file: e.target.files[0] // Update with the selected file
        }
      })
    } else if (e.target.name === 'status') {
      const newStatus = e.target.checked ? 'Active' : 'Inactive'
      setFormData({
        data: {
          ...formData.data,
          status: newStatus
        }
      })
    } else {
      setFormData({
        data: {
          ...formData.data,
          [e.target.name]: e.target.value
        }
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true) // Start loading
    setErrorMessage('') // Clear any existing error message

    if (!formData.data.file && !formData.data.image) {
      setErrorMessage('Vui lòng chọn hình ảnh.')
      setLoading(false) // Stop loading
      return
    }
    let imageUrl = formData.data.image // Giữ URL hình ảnh hiện tại nếu không có hình ảnh mới

    if (formData.data.file) {
      try {
        // Tải lên hình ảnh mới vào Firebase và lấy URL
        imageUrl = await uploadImageToFirebase(formData.data.file)
      } catch (error) {
        console.error('Error uploading image:', error)
        setErrorMessage('Đã xảy ra lỗi khi tải lên hình ảnh.')
        setLoading(false) // Stop loading
        return
      }
    }

    // Tạo đối tượng mới để gửi đến máy chủ
    const dataToSend = {
      ...formData.data,
      image: imageUrl // Cập nhật với URL hình ảnh mới
    }

    // Log dữ liệu để kiểm tra
    console.log('Data to send:', JSON.stringify(dataToSend))

    // Dispatch action để Saga xử lý
    dispatch(updateProductRequest(id, dataToSend))
  }

  useEffect(() => {
    if (message.code === 200) {
      setLoading(false) // Stop loading
      navigate('/manager/products')
    }
  }, [message, navigate])

  return (
    <>
      <div className="flex flex-col justify-center items-center ml-[18%]">
        <div className="flex mt-2 justify-center items-center">
          <h2 className="text-main font-RobotoSemibold text-[20px] uppercase">
            Update Product
          </h2>
        </div>
        <div className="w-[50%] p-2 rounded-md shadow-md bg-white text-primary mt-5">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70">
              <div className="loader"></div> {/* Add your loader CSS here */}
            </div>
          )}
          {errorMessage && (
            <div className="text-red-500 text-center mt-4">{errorMessage}</div>
          )}
          <form
            className="flex flex-col p-5 text-primary gap-5"
            onSubmit={handleSubmit}
          >
            <div className="relative">
              <input
                type="file"
                name="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleChange}
              />
              <div className="bg-gray-200 rounded-md py-2 px-4 flex items-center justify-center gap-2 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                {formData.data.file ? (
                  <span className="text-primary font-RobotoMedium">
                    {formData.data.file.name}
                  </span>
                ) : (
                  <span className="text-primary font-RobotoMedium">
                    Choose File
                  </span>
                )}
              </div>
            </div>
            {formData.data.file && (
              <img
                src={URL.createObjectURL(formData.data.file)}
                alt="Preview"
                className="w-full h-[280px] object-contain"
              />
            )}
            {imageSrc && !formData.data.file && (
              <img
                src={imageSrc}
                alt="Current file"
                className="w-full h-[280px] object-contain"
              />
            )}
            <div className="flex justify-between">
              <div className="flex-1">
                <label className="text-[14px] block font-bold">
                  Product Name:
                </label>
                <input
                  className="border-b-2"
                  name="product_name"
                  onChange={handleChange}
                  value={formData.data.product_name}
                  style={{ marginTop: '20px' }}
                />
              </div>
              <div className="flex-1">
                <label className="text-[14px] block font-bold">Price:</label>
                <input
                  className="border-b-2"
                  name="price"
                  type="number"
                  onChange={handleChange}
                  value={formData.data.price}
                  style={{ marginTop: '20px' }}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex-1">
                <label className="text-[14px] block font-bold">Accuracy:</label>
                <textarea
                  className="border-b-2"
                  name="accuracy"
                  onChange={handleChange}
                  value={formData.data.accuracy}
                  style={{ marginTop: '20px' }}
                />
              </div>
              <div className="flex-1">
                <label className="text-[14px] block font-bold">
                  Battery Life:
                </label>
                <textarea
                  className="border-b-2"
                  name="battery_life"
                  onChange={handleChange}
                  value={formData.data.battery_life}
                  style={{ marginTop: '20px' }}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex-1">
                <label className="text-[14px] block font-bold">Color:</label>
                <textarea
                  className="border-b-2"
                  name="color"
                  onChange={handleChange}
                  value={formData.data.color}
                  style={{ marginTop: '20px' }}
                />
              </div>
              <div className="flex-1">
                <label className="text-[14px] block font-bold">Function:</label>
                <textarea
                  className="border-b-2"
                  name="func"
                  onChange={handleChange}
                  value={formData.data.func}
                  style={{ marginTop: '20px' }}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex-1">
                <label className="text-[14px] block font-bold">Glass:</label>
                <textarea
                  className="border-b-2"
                  name="glass"
                  onChange={handleChange}
                  value={formData.data.glass}
                  style={{ marginTop: '20px' }}
                />
              </div>
              <div className="flex-1">
                <label className="text-[14px] block font-bold">Machine:</label>
                <textarea
                  className="border-b-2"
                  name="machine"
                  onChange={handleChange}
                  value={formData.data.machine}
                  style={{ marginTop: '20px' }}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex-1">
                <label className="text-[14px] block font-bold">
                  Other Features:
                </label>
                <textarea
                  className="border-b-2"
                  name="other_features"
                  onChange={handleChange}
                  value={formData.data.other_features}
                  style={{ marginTop: '20px' }}
                />
              </div>
              <div className="flex-1">
                <label className="text-[14px] block font-bold">Quantity:</label>
                <textarea
                  className="border-b-2"
                  name="quantity"
                  onChange={handleChange}
                  value={formData.data.quantity}
                  style={{ marginTop: '20px' }}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex-1">
                <label className="text-[14px] block font-bold">Sex:</label>
                <textarea
                  className="border-b-2"
                  name="sex"
                  onChange={handleChange}
                  value={formData.data.sex}
                  style={{ marginTop: '20px' }}
                />
              </div>
              <div className="flex-1">
                <label className="text-[14px] block font-bold">
                  Technology:
                </label>
                <textarea
                  className="border-b-2"
                  name="technology"
                  onChange={handleChange}
                  value={formData.data.technology}
                  style={{ marginTop: '20px' }}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex-1">
                <label className="text-[14px] block font-bold">
                  Water Resistance:
                </label>
                <textarea
                  className="border-b-2"
                  name="water_resistance"
                  onChange={handleChange}
                  value={formData.data.water_resistance}
                  style={{ marginTop: '20px' }}
                />
              </div>
              <div className="flex-1">
                <label className="text-[14px] block font-bold">Weight:</label>
                <textarea
                  className="border-b-2"
                  name="weight"
                  onChange={handleChange}
                  value={formData.data.weight}
                  style={{ marginTop: '20px' }}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex-1">
                <label className="text-[14px] block mb-5 font-bold">
                  Category:
                </label>
                <select
                  className="p-2 rounded-md border-none"
                  name="category_name"
                  onChange={handleChange}
                  value={formData.data.category_name}
                >
                  {categories?.data &&
                    categories?.data.map((category) => (
                      <option
                        key={category.slug}
                        value={category.category_name}
                      >
                        {category.category_name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="text-[14px] block mb-5 font-bold">
                  Brand:
                </label>
                <select
                  className="p-2 rounded-md border-none"
                  name="category_name"
                  onChange={handleChange}
                  value={formData.data.brand_name}
                >
                  {brands?.data &&
                    brands?.data.map((brand) => (
                      <option key={brand.brand_id} value={brand.brand_name}>
                        {brand.brand_name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="flex-1">
              <label className="text-[14px] block font-bold">
                Description:
              </label>
              <textarea
                className="border-b-2"
                name="detail"
                onChange={handleChange}
                value={formData.data.detail}
                style={{ marginTop: '20px', width: '700px', height: '200px' }}
              />
            </div>

            <label className="switch">
              <input
                type="checkbox"
                name="status"
                onChange={handleChange}
                checked={formData.data.status === 'Active'}
              />
              <span className="slider round"></span>
            </label>
            <div className="flex justify-center">
              <button
                className="w-[40%] bg-primary text-white rounded-md shadow-md py-3 uppercase font-RobotoMedium"
                type="submit"
                disabled={loading} // Disable button when loading
              >
                Cập Nhật
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default UpdateProduct
