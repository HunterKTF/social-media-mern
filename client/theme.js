import { createTheme } from '@mui/material/styles';
// import { pink } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      light: '#5c67a3',
      main: '#3f4771',
      dark: '#2e355b',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#ff79b0',
      main: '#ff4081',
      dark: '#c60055',
      contrastText: '#000000'
    }
  }
});

export default theme;
