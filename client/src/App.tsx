import { BrowserRouter,Routes,Route } from 'react-router-dom'
import SignIn from "./pages/SignIn.tsx"
import SignUp from './pages/SignUp.tsx'
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route  path='/' element={<SignIn/>}/>
      <Route path='/sign-up' element={<SignUp/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App