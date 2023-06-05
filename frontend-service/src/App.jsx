import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import NewProduct from './pages/new-product'
import Sales from './pages/sales'

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<Dashboard />} path='/' />
        <Route element={<NewProduct />} path='/new/product' />
        <Route element={<Sales />} path='/sales' />
      </Routes>
    </>
  )
}
export default App