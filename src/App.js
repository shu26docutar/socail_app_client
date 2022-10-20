import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import components
import { Navbar } from './components/Navbar'

// import page
import { home as Home } from './pages/home'
import { login as Login } from './pages/login'
import { signup as Signup } from './pages/signup'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
          <div className='container'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
