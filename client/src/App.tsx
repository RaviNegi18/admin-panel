import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from "./pages/SignIn.tsx"
import SignUp from './pages/SignUp.tsx'
import Dashboard from './pages/Dashboard.tsx'
import Products from './components/Products.tsx'
import ProductDetails from "./components/ProductDetails.tsx"
import Cart from './components/CartPage.tsx'
import Payment, { PaymentCancelled, PaymentSuccess } from './components/Payment.tsx'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/details/:id' element={<ProductDetails />} />
        <Route path='/products' element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/payment/cancel" element={<PaymentCancelled />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App