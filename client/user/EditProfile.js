import React, { useState, useEffect } from 'react';
import {
  Card, CardActions, CardContent,
  Button, TextField, Typography, Icon
} from '@mui/material';
import auth from './../auth/auth-helper';
import { read, update } from './api-user';
import { Navigate } from 'react-router-dom';

function EditProfile({ match }) {
  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
    open: false,
    error: '',
    redirectToProfile: false
  });
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read({
      userId: match.params.userId
    }, { t: jwt.token }, signal).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, name: data.name, email: data.email });
      }
    })
    return function cleanup() {
      abortController.cleanup();
    }
  }, [match.params.userId]);

  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined
    }
    update({
      userId: match.params.userId
    }, {
      t: jwt.token
    }, user).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, userId: data._id, redirectToProfile: true });
      }
    })
  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  }

  if (values.redirectToProfile) {
    return (<Navigate to={'/user/' + values.userId} />);
  }

  return (
    <Card>
      <CardContent>
        <Typography variant='h6'>Edit Profile</Typography>
        <TextField id="name" label="Name" value={values.name} onChange={handleChange('name')} margin="normal" /><br />
        <TextField id="email" type="email" label="Email" value={values.email} onChange={handleChange('email')} margin="normal" /><br />
        <TextField id="password" type="password" label="Password" value={values.password} onChange={handleChange('password')} margin="normal" /><br />
        {
          values.error && (
            <Typography component='p' color='error'>
              <Icon color='error'>Error</Icon>
              {values.error}
            </Typography>
          )
        }
      </CardContent>
      <CardActions>
        <Button color='primary' variant='contained' onClick={clickSubmit}>Submit</Button>
      </CardActions>
    </Card>
  );
}

export default EditProfile;
