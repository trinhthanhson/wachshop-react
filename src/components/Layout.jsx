import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import Routers from '../routers/Routers.jsx'

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Routers />
      </div>
      <Footer />
    </div>
  )
}

export default Layout
