import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import ProtectedRoute from './components/Routes/ProtectedRoute';
import PublicRote from './components/Routes/PublicRote';

function App() {
  return (
    < >
      <ToastContainer />
      <Routes>
        <Route path='/' element={
          <ProtectedRoute >
            <HomePage />
          </ProtectedRoute>
        }
        />
        <Route path='/login' element={
          <PublicRote>
            <Login />
          </PublicRote>
        }
        />
        <Route path='/register' element={
          <PublicRote>
            <Register />
          </PublicRote>
        }
        />
      </Routes>
    </>
  );
}
export default App;