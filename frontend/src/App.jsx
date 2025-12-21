import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import AuthPages from './pages/AuthPages';
import UserProfile from './pages/UserProfile';
import OTPVerify from './pages/OTPVerify';
import UpdatePassword from './pages/UpdatePassword';
import ForgotPassword from './pages/ForgotPassword';

import ProtectedRoute from "./componenets/ProtectedRoute";
import Product from './pages/Product';
import ProductDetail from './componenets/ProductDetail';
import AdminDashboard from './pages/AdminDashboard';
import { AdminProvider } from './context/AdminContext';


function App() {
  return (
      <div>
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="/signin" element={ <AuthPages/> } />
          <Route path="/profile" element={
                                      
                                        <UserProfile />
                                      
                                          }  />
          <Route path="/products" element={<Product/>} />
          <Route path="/product/:id" element={<ProductDetail/>} />
          <Route path="/verify" element={ <OTPVerify/> } />
          <Route path="/updatepassword" element={ <UpdatePassword /> } />
          <Route path="/forgotpassword" element={ <ForgotPassword /> } />

          <Route path="/admindashboard" element={ 
                                        <AdminProvider>
                                          <AdminDashboard />
                                        </AdminProvider> } />
        </Routes>
      </div>
  );
}

export default App;