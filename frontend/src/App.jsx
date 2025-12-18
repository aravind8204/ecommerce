import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import AuthPages from './pages/AuthPages';
import UserProfile from './pages/UserProfile';
import OTPVerify from './pages/OTPVerify';
import UpdatePassword from './pages/UpdatePassword';


function App() {
  return (
      <div>
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="/signin" element={ <AuthPages/> } />
          <Route path="/profile" element={ <UserProfile/> } />
          <Route path="/verify" element={ <OTPVerify/> } />
          <Route path="/updatepassword" element={ <UpdatePassword /> } />
        </Routes>
      </div>
  );
}

export default App;