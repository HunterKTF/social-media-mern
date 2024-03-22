import * as React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import unicornbikeImg from './../assets/images/unicornbike.jpg';

const theme = createTheme();

class Home extends React.Component {
  render() {
    return (
      <Card sx={{
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing(5)
      }}>
        <Typography variant='h6' sx={{
          padding: '10px 20px 12px',
          color: 'theme.palette.secondary'
        }}>Home Page</Typography>
        <CardMedia sx={{ minHeight: 400 }} component="img" image={unicornbikeImg} title='Unicorn Bicycle' />
        <CardContent>
          <Typography variant='body2' component='p'>
            Welcome to the MERN Skeleton home page.
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default Home;
