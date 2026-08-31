import { BrowserRouter,Routes,Route } from 'react-router-dom'
import SignIn from "./pages/SignIn.tsx"
import SignUp from './pages/SignUp.tsx'
import Dashboard from './pages/Dashboard.tsx'
import Products from './components/Products.tsx'
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route  path='/' element={<SignIn/>}/>
      <Route path='/sign-up' element={<SignUp/>}/>
      <Route path='/products' element={<Products/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App