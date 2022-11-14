import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import jwtDecode from 'jwt-decode';
import styleTheme from './utillity/theme';
import AuthRoute from './utillity/AuthRoute';
import { Navbar } from './components/layout/Navbar';
import { Home } from './pages/home';
import { Login }  from './pages/login';
import { User }  from './pages/user';
import { Signup } from './pages/signup';
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actors/userActions';
import axios from 'axios';

const theme = createTheme(styleTheme)

const token = localStorage.FBIdToken

if(token) {
  const decodeToken = jwtDecode(token)
  
  if(decodeToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser())
    window.location.href = '/login'
  } else {
    store.dispatch({ type: SET_AUTHENTICATED })
    axios.defaults.headers.common[`Authorization`] = token
    store.dispatch(getUserData())
  }
}

function App() {
  return (
    // テーマをアプリ全体に適応
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>

          <Navbar />

            <div className='container'>
              <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/" element={<AuthRoute />} >
                  <Route path="/login" element={<Login  />} />
                  <Route path="/signup" element={<Signup />} />
                </Route>

              <Route path="/user/:handle" element={<User />} />
                
              </Routes>
            </div>

        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
