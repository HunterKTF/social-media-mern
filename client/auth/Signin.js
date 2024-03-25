import * as React from 'react';
import { Card, CardActions, CardContent, Button, TextField, Typography, Icon } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import auth from './../auth/auth-helper';
import { Redirect } from 'react-router-dom';
import { signin } from './api-auth';

const theme = createTheme();

const MyCard = styled(Card)({
  maxWidth: 600,
  margin: 'auto',
  textAlign: 'center',
  marginTop: theme.spacing(5),
  paddingBottom: theme.spacing(2)
});

const Title = styled(Typography)({
  marginTop: theme.spacing(2),
  color: theme.palette.primary
});

const MyTextField = styled(TextField)({
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  width: 300
});

const MyError = styled(Icon)({
  verticalAlign: 'middle'
});

const Submit = styled(Button)({
  margin: 'auto',
  marginBottom: theme.spacing(2)
});

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
        setValues({ ...values, error: data.error});
      } else {
        auth.authenticate(data, () => {
          setValues({ ...values, error: '', redirectToReferrer: true });
        });
      }
    })
  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  }

  const {from} = props.location.state || {
    from: {
      pathname: '/'
    }
  }

  const {redirectToReferrer} = values;
  if (redirectToReferrer) {
    return (<Redirect to={from}/>);
  }

  return (
    <MyCard>
      <CardContent>
        <Title variant='h6'>Sign In</Title>
        <MyTextField id='email' type='email' label="Email" value={values.email} onChange={handleChange('email')} margin="normal"/><br/>
        <MyTextField id='password' type='password' label="Password" value={values.password} onChange={handleChange('password')} margin="normal"/>
        <br/>{
          values.error && (
            <Typography component="p" color="error">
              <MyError color='error'>Error</MyError>
            </Typography>
          )
        }
      </CardContent>
      <CardActions>
        <Submit color='primary' variant='contained' onClick={clickSubmit}>Submit</Submit>
      </CardActions>
    </MyCard>
  )
}

export default Signin;
