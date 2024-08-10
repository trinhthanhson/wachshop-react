import { Outlet } from "react-router-dom/dist"
import Sidebar from "./Sidebar"
import Header from "./Header"

const Layout = () => {
  return (

    <div className="flex flex-row h-screen w-screen bg-bgPrimary">
      <Sidebar />
      <div className="flex-1 w-[80%] overflow-x-hidden">
        <Header />
        <div className="p-4">

          <Outlet />
        </div>
      </div>
    </div>

  )
}

export default Layout
