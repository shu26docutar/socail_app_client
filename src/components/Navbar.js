import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button,  } from '@mui/material';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../utillity/MyButton';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useSelector } from "react-redux";
import PostScream from './PostScream';

export const Navbar = () => {
  const authenticated = useSelector((state) => state.user.authenticated)

  return (
    <AppBar>
      <Toolbar className="nav-container">
          {authenticated ? (
            <Fragment>

              <PostScream />

              <Link to='/'>
                <MyButton tip='Home'>
                  <HomeIcon />
                </MyButton>
              </Link>

              <MyButton tip='Nortifications'>
                <NotificationsNoneIcon />
              </MyButton>

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

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar)