import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import AuthPages from './pages/AuthPages';
import UserProfile from './pages/UserProfile';
import OTPVerify from './pages/OTPVerify';
import UpdatePassword from './pages/UpdatePassword';
import ForgotPassword from './pages/ForgotPassword';

import ProtectedRoute from "./componenets/ProtectedRoute";
import Product from './pages/Product';


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
          <Route path="/verify" element={ <OTPVerify/> } />
          <Route path="/updatepassword" element={ <UpdatePassword /> } />
          <Route path="/forgotpassword" element={ <ForgotPassword /> } />
        </Routes>
      </div>
  );
}

export default App;