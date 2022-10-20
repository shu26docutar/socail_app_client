import React from 'react';
import { Link } from 'react-router-dom';

// import Material
import { AppBar, Toolbar, Button } from '@mui/material';

export const Navbar = () => {
  return (
    <div>
      <AppBar>
        <Toolbar className="nav-container">
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/signup">Signup</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

