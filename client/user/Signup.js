import * as React from 'react';
import {
  Card, CardActions, CardContent, Button, TextField, Typography, Icon,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import { create } from './api-user';
import { Link } from 'react-router-dom';

function Signup() {
  const [values, setValues] = React.useState({
    name: '',
    password: '',
    email: '',
    open: false,
    error: ''
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  }

  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined
    }
    create(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: '', open: true });
      }
    });
  }

  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant='h6'>Sign up</Typography>
          <TextField id="name" label="Name" value={values.name} onChange={handleChange('name')} margin='normal' /><br />
          <TextField id="email" label="Email" type='email' value={values.email} onChange={handleChange('email')} margin='normal' /><br />
          <TextField id="password" label="Password" type='password' value={values.password} onChange={handleChange('password')} margin='normal' /><br />
          {
            values.error && (
              <Typography component='p' color='error'>
                <Icon color='error'>Error</Icon>
              </Typography>
            )
          }
        </CardContent>
        <CardActions>
          <Button color='primary' variant="contained" onClick={clickSubmit}>Submit</Button>
        </CardActions>
      </Card>
      <Dialog open={values.open} disableEscapeKeyDown={true}>
        <DialogTitle>New Account Created</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to={'/signin'}>
            <Button color='primary' autoFocus='autoFocus' variant='contained'>Sign in</Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Signup;
