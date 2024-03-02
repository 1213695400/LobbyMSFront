import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import backgroundImage from './assets/background.jpg';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  overrides: {
    CssBaseline: {
      '@global': {
        body: {
          //border: '2px solid blue',
          backgroundImage: `url(${backgroundImage})`,
        },
      },
    },
  },
});

export default theme;
