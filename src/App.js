import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, makeStyles } from '@mui/material/styles';

// import components
import { Navbar } from './components/Navbar'

// import page
import { Home } from './pages/home'
import { Login } from './pages/login'
import { Signup } from './pages/signup'

const theme = createTheme({
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#00bcd4',
      dark: '#008394',
      contrastText: '#ffff'
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#d22a00',
      contrastText: '#fff'
    }
  },
  typography: {
    usNextVariants: true
  }
})

function App() {
  return (
    // テーマをアプリ全体に適応
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;
