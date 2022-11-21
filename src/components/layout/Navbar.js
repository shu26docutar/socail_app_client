import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button,  } from '@mui/material';
import { connect } from 'react-redux';
import MyButton from '../../utillity/MyButton';
import HomeIcon from '@mui/icons-material/Home';
import { useSelector } from "react-redux";
import PostScream from '../screams/PostScream';
import Nortifications from './Nortifications'


export const Navbar = () => {
  const authenticated = useSelector((state) => state.user.authenticated)

  return (
    <AppBar>
      <Toolbar className="nav-container">
          {　authenticated ? (
            <Fragment>

              <PostScream />

              <Link to='/'>
                <MyButton tip='Home'>
                  <HomeIcon />
                </MyButton>
              </Link>

              {/* <Nortifications /> */}

            </Fragment>
          ) : (
            <Fragment>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/">Home</Button>
              <Button color="inherit" component={Link} to="/signup">Signup</Button>
            </Fragment>
          )} 
      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar)