import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import jwtDecode from 'jwt-decode'
// import utillity
import styleTheme from './utillity/theme'
import AuthRoute from './utillity/AuthRoute'
// import components
import { Navbar } from './components/Navbar'
// import page
import { Home } from './pages/home'
import { Login }  from './pages/login'
import { Signup } from './pages/signup'

const theme = createTheme(styleTheme)

const token = localStorage.FBIdToken

let authenticated
if(token) {
  const decodeToken = jwtDecode(token)
  console.log(decodeToken)
  
  if(decodeToken.exp * 1000 < Date.now()) {
    window.location.href = '/login'
    authenticated = false
  } else {
    authenticated = true
  }
}

function App() {
  return (
    // テーマをアプリ全体に適応
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
          <div className='container'>
            <Routes>

            <Route path="/" element={<AuthRoute authenticated={authenticated} />} >
              <Route path="/" element={<Home />} />
            </Route>

              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              
            </Routes>
          </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
