import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import auth from './../auth/auth-helper';
import { Link } from "react-router-dom";

function Menu() {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' color='inherit'>
          MERN Skeleton
        </Typography>
        <Link to='/'>
          <IconButton aria-label='Home' color='secondary'>
            <HomeIcon />
          </IconButton>
        </Link>
        <Link to='/users'>
          <Button variant='text' color='secondary'>Users</Button>
        </Link>
        {
          !auth.isAuthenticated() && (<span>
            <Link to='/signup'>
              <Button color='secondary'>Sign up</Button>
            </Link>
            <Link to='/signin'>
              <Button color='secondary'>Sign in</Button>
            </Link>
          </span>)
        }
        {
          auth.isAuthenticated() && (<span>
            <Link to={"/user/" + auth.isAuthenticated().user._id}>
              <Button color='secondary'>My Profile</Button>
            </Link>
            <Button color='inherit' onClick={() => {
              auth.clearJWT(() => history.push('/'))
            }}>Sign out</Button>
          </span>)
        }
      </Toolbar>
    </AppBar>
  );
}

export default Menu;
