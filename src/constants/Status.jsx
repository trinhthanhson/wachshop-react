export function getOrderStatus(status) {
  switch (status) {
    case '0':
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-white bg-primary">
          Chờ Xác Nhận
        </span>
      )
    case '1':
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-sky-600 bg-sky-100">
          Đã Xác Nhận
        </span>
      )
    case '2':
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-teal-600 bg-teal-100">
          Đang Vận Chuyển
        </span>
      )
    case '3':
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-white bg-green">
          Chờ thanh toán
        </span>
      )
    case '4':
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-white bg-green">
          Đã thanh toán
        </span>
      )
    case '5':
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-white bg-green">
          Đã giao
        </span>
      )
    default:
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-gray-600 bg-gray-100">
          Đã Hủy
        </span>
      )
  }
}

export function getStatus(status) {
  if (typeof status === 'string') {
    switch (status) {
      case 'Inactive':
        return (
          <span className="capitalize py-1 px-2 rounded-md text-xs text-white bg-main">
            {status.split('_').join(' ').toLowerCase()}
          </span>
        )
      default:
        return (
          <span className="capitalize py-1 px-2 rounded-md text-xs text-white bg-green">
            {status.split('_').join(' ').toLowerCase()}
          </span>
        )
    }
  } else {
    return null
  }
}
