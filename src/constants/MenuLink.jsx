import {
  HiOutlineViewGrid,
  HiOutlineShoppingCart,
  HiOutlineCube,
  HiOutlineUserGroup,
  HiOutlineServer,
  HiOutlineReceiptTax,
  HiOutlineCog
} from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_TOP_LINKS = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    path: '/manager',
    icon: <HiOutlineViewGrid />
  },
  {
    key: 'products',
    label: 'Products',
    path: '/manager/products',
    icon: <HiOutlineCube />
  },
  {
    key: 'orders',
    label: 'Orders',
    path: '/manager/orders',
    icon: <HiOutlineShoppingCart />
  },
  {
    key: 'customers',
    label: 'Customers',
    path: '/manager/customers',
    icon: <HiOutlineUserGroup />
  },

  {
    key: 'category',
    label: 'Category',
    path: '/manager/category',
    icon: <HiOutlineServer />
  },
  {
    key: 'brand',
    label: 'Brand',
    path: '/manager/brand',
    icon: <HiOutlineServer />
  },
  {
    key: 'coupons',
    label: 'Coupons',
    path: '/manager/coupons',
    icon: <HiOutlineReceiptTax />
  }
]

export const DASHBOARD_SIDEBAR_TOP_LINKS_SHIPPER = [
  {
    key: 'orders',
    label: 'Orders',
    path: '/manager/shipper',
    icon: <HiOutlineShoppingCart />
  },
  {
    key: 'ordership',
    label: 'Order received ',
    path: '/manager/shipper/receive',
    icon: <HiOutlineShoppingCart />
  }
]
export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: 'settings',
    label: 'Settings',
    path: '/manager/settings',
    icon: <HiOutlineCog />
  }
  // {
  //   key: 'logout',
  //   label: 'Logout',
  //   path: '/admin/logout',
  //   icon: <HiOutlineLogin />
  // },
]
