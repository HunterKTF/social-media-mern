import React, { useEffect, useState } from 'react';
import {
  Paper, List, ListItem, ListItemAvatar, ListItemSecondaryAction,
  ListItemText, Avatar, IconButton, Typography, Divider
} from '@mui/material';
import { Edit, Person } from '@mui/icons-material';
import DeleteUser from './DeleteUser';
import auth from './../auth/auth-helper';
import { read } from './api-user';
import { Navigate, Link } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState({});
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const jwt = auth.isAuthenticated();

  // console.log(jwt);
  let match = jwt.user;
  console.log(match._id);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read({ userId: match._id }, { t: jwt.token }, signal).then((data) => {
      if (data && data.error) {
        setRedirectToSignin(true);
      } else {
        setUser(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    }
  }, [match._id])

  if (redirectToSignin) {
    return ( <Navigate to='/signin' /> );
  }

  return (
    <Paper elevation={4}>
      <Typography variant='h6'>Profile</Typography>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Person />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={user.name} secondary={user.email} />
          {
            auth.isAuthenticated().user && auth.isAuthenticated().user._id == user._id && (
              <ListItemSecondaryAction>
                <Link to={"/user/edit/" + user._id}>
                  <IconButton aria-label='Edit' color='primary'>
                    <Edit />
                  </IconButton>
                </Link>
                <DeleteUser userId={user._id} />
              </ListItemSecondaryAction>
            )
          }
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary={"Joined: " + (new Date(user.created)).toDateString()} />
        </ListItem>
      </List>
    </Paper>
  );
}

export default Profile;
