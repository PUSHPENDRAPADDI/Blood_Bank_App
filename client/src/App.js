import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    < >
      <ToastContainer />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  );
}
export default App;