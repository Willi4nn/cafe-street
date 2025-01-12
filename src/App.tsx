import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CartProvider } from './context/CartProvider'
import DefaultLayout from './layout/DefaultLayout'
import Home from './pages/Home'
import OrderCompleted from './pages/OrderCompleted'
import ShoppingCart from './pages/ShoppingCart'

export function App() {

  return (
    <Router>
      <CartProvider>
        <ToastContainer autoClose={2000} theme="colored" />
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shopping-cart" element={<ShoppingCart />} />
            <Route path="/order-completed" element={<OrderCompleted />} />
          </Route>
        </Routes>
      </CartProvider>
    </Router>
  )
}


export default App
