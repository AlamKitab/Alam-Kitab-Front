import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

import CustomerLayout from './components/layouts/CustomerLayout'
import AdminLayout from './components/layouts/AdminLayout'
import Login from './pages/Login'
import Signup from './pages/Signup'
import './App.css'
import Home from './pages/Home'
import Bookstore from './pages/Bookstore'
import AdminDashboard from './pages/AdminDashboard'
import Users from './pages/Users'
import Products from './pages/Products'
import Orders from './pages/Orders'
import Settings from './pages/Settings'
import News from './pages/Customer/News';
import PrintHistory from './pages/Customer/PrintHistory';
import CustomerOrders from './pages/Customer/CustomerOrders';

function App() {
  const { currentUser } = useSelector(state => state.user);

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={
            currentUser ? (
              <Navigate to={currentUser.role === 'Admin' ? '/admin/dashboard' : '/'} replace />
            ) : (
              <Login />
            )
          } />
          <Route path="/signup" element={
            currentUser ? (
              <Navigate to={currentUser.role === 'Admin' ? '/admin/dashboard' : '/'} replace />
            ) : (
              <Signup />
            )
          } />
          
          {/* Customer Routes */}
          <Route element={<CustomerLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/bookstore" element={<Bookstore />} />
            <Route path="/news" element={<News />} />
            <Route path="/print-history" element={<PrintHistory />} />
            <Route path="/order" element={<CustomerOrders />} />
            {/* Add other customer routes */}
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
