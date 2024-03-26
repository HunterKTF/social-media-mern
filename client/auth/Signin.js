import * as React from 'react';
import { Card, CardActions, CardContent, Button, TextField, Typography, Icon } from '@mui/material';
import auth from './../auth/auth-helper';
import { Navigate } from 'react-router-dom';
import { signin } from './api-auth.js'

function Signin(props) {

  const [values, setValues] = React.useState({
    email: '',
    password: '',
    error: '',
    redirectToReferrer: false
  });

  const clickSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined
    }

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        auth.authenticate(data, () => {
          setValues({ ...values, error: '', redirectToReferrer: true })
        })
      }
    })
  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  }

  const { redirectToReferrer } = values
  if (redirectToReferrer) {
    return (<Navigate to={"/"}/>);
  }

  return (
    <Card>
      <CardContent>
        <Typography variant='h6'>Sign In</Typography>
        <TextField id='email' type='email' label="Email" value={values.email} onChange={handleChange('email')} margin="normal" /><br />
        <TextField id='password' type='password' label="Password" value={values.password} onChange={handleChange('password')} margin="normal" />
        <br />
        {
          values.error && (
            <Typography component="p" color="error">
              <Icon color='error'>Error</Icon>
            </Typography>
          )
        }
      </CardContent>
      <CardActions>
        <Button color='primary' variant='contained' onClick={clickSubmit}>Submit</Button>
      </CardActions>
    </Card>
  )
}

export default Signin;
