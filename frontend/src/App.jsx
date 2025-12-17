import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import AuthPages from './pages/AuthPages';


function App() {
  return (
      <div>
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="/signin" element={ <AuthPages/> } />
        </Routes>
      </div>
  );
}

export default App;