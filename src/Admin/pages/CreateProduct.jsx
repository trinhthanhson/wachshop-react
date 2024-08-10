import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  addProductRequest,
  getAllCategoriesRequest,
  getAllBrandRequest
} from '../../redux/actions/actions'
import { uploadImageToFirebase } from '../../firebase' // Import the function

const CreateProduct = () => {
  const dispatch = useDispatch()
  const message = useSelector((state) => state.addProduct)
  const categories = useSelector((state) => state.categories.categories)
  const brands = useSelector((state) => state.brands.brands)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false) // Loading state

  const [formData, setFormData] = useState({
    file: '',
    data: {
      product_name: '',
      status: 'Active',
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
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getAllCategoriesRequest())
    dispatch(getAllBrandRequest())
  }, [dispatch])

  const handleChange = (e) => {
    if (e.target.name === 'file') {
      setFormData({ ...formData, file: e.target.files[0] })
    } else {
      setFormData({
        ...formData,
        data: { ...formData.data, [e.target.name]: e.target.value }
      })
    }
  }
  const validate = () => {
    const errors = {}
    const { data, file } = formData

    if (!data.product_name) errors.product_name = 'Vui lòng nhập têm sản phẩm'
    if (!data.price || data.price <= 0) errors.price = 'Giá > 0'
    if (!file) errors.file = 'Vui lòng nhập hình ảnh'
    if (!data.category_name)
      errors.category_name = 'Vui lòng chọn loại sản phẩm'
    if (!data.brand_name) errors.brand_name = 'Vui lòng chọn hãng sản phẩm'

    // Add more validations as needed

    return errors
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setLoading(true) // Set loading to true when starting submission

    let imageUrl = '' // Giữ URL hình ảnh hiện tại nếu không có hình ảnh mới

    if (formData.file) {
      try {
        // Tải lên hình ảnh mới vào Firebase và lấy URL
        imageUrl = await uploadImageToFirebase(formData.file)
      } catch (error) {
        setLoading(false) // Set loading to false if there's an error
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

    // Gửi yêu cầu để cập nhật sản phẩm
    dispatch(addProductRequest(dataToSend))
  }

  useEffect(() => {
    if (message.code === 201) {
      setFormData({
        file: '',
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
          category_name: ''
        }
      })
      setLoading(false)
      navigate('/manager/products')
    }
  }, [message, navigate])

  return (
    <>
      <div className="flex flex-col justify-center items-center ml-[18%]">
        <div className="flex mt-2 justify-center items-center">
          <h2 className="text-main font-RobotoSemibold text-[20px] uppercase">
            Create Product
          </h2>
        </div>
        <div className="w-[50%] p-2 rounded-md shadow-md bg-white text-primary mt-5">
          <form
            className="flex flex-col p-5 text-primary gap-5"
            onSubmit={handleSubmit}
          >
            <div className="relative">
              <input
                type="file"
                name="file"
                accept=".jpg, .jpeg, .png"
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
                {formData.file ? (
                  <span className="text-primary font-RobotoMedium">
                    {formData.file.name}
                  </span>
                ) : (
                  <span className="text-primary font-RobotoMedium">
                    Choose File
                  </span>
                )}
              </div>
            </div>
            {formData.file && (
              <img
                src={URL.createObjectURL(formData.file)}
                alt="Please select an image"
                className="w-full h-[280px] object-contain"
              />
            )}
            {errors.file && <p className="text-red text-sm">{errors.file}</p>}
            <div className="flex justify-between">
              <div className="flex-1">
                <label className="text-[14px] block font-bold">
                  Product Name:
                </label>
                <input
                  className="border-b-2"
                  name="product_name"
                  onChange={handleChange}
                  style={{ marginTop: '20px' }}
                />
                {errors.product_name && (
                  <p className="text-red text-sm">{errors.product_name}</p>
                )}
              </div>
              <div className="flex-1">
                <label className="text-[14px] block font-bold">Price:</label>
                <input
                  className="border-b-2"
                  name="price"
                  type="number"
                  onChange={handleChange}
                  style={{ marginTop: '20px' }}
                />
                {errors.price && (
                  <p className="text-red text-sm">{errors.price}</p>
                )}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex-1">
                <label className="text-[14px] block font-bold">Accuracy:</label>
                <textarea
                  className="border-b-2"
                  name="accuracy"
                  onChange={handleChange}
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
                  style={{ marginTop: '20px' }}
                />
              </div>
              <div className="flex-1">
                <label className="text-[14px] block font-bold">Function:</label>
                <textarea
                  className="border-b-2"
                  name="func"
                  onChange={handleChange}
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
                  style={{ marginTop: '20px' }}
                />
              </div>
              <div className="flex-1">
                <label className="text-[14px] block font-bold">Machine:</label>
                <textarea
                  className="border-b-2"
                  name="machine"
                  onChange={handleChange}
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
                  style={{ marginTop: '20px' }}
                />
              </div>
              <div className="flex-1">
                <label className="text-[14px] block font-bold">Quantity:</label>
                <textarea
                  className="border-b-2"
                  name="quantity"
                  onChange={handleChange}
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
                  style={{ marginTop: '20px' }}
                />
              </div>
              <div className="flex-1">
                <label className="text-[14px] block font-bold">Weight:</label>
                <textarea
                  className="border-b-2"
                  name="weight"
                  onChange={handleChange}
                  style={{ marginTop: '20px' }}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex-1">
                <label className="text-[14px] block mb-5">Category:</label>
                <select
                  className="p-2 rounded-md border-none"
                  name="category_name"
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  {categories?.data &&
                    categories?.data.map((category) => (
                      <option
                        key={category.category_id}
                        value={category.category_name}
                      >
                        {category.category_name}
                      </option>
                    ))}
                </select>
                {errors.category_name && (
                  <p className="text-red text-sm">{errors.category_name}</p>
                )}
              </div>
              <div className="flex-1">
                <label className="text-[14px] block mb-5">Brand:</label>
                <select
                  className="p-2 rounded-md border-none"
                  name="brand_name"
                  onChange={handleChange}
                >
                  <option value="">Select Brand</option>
                  {brands?.data &&
                    brands?.data.map((brand) => (
                      <option key={brand.brand_id} value={brand.brand_name}>
                        {brand.brand_name}
                      </option>
                    ))}
                </select>
                {errors.brand_name && (
                  <p className="text-red text-sm">{errors.brand_name}</p>
                )}
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
                style={{ marginTop: '20px', width: '700px', height: '200px' }}
              />
            </div>

            <div className="flex justify-center">
              <button
                className="w-[40%] bg-primary text-white rounded-md shadow-md py-3 uppercase font-RobotoMedium"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Đang thêm...' : 'Thêm sản phẩm'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default CreateProduct
