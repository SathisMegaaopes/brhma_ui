// src/theme.js
import { createTheme } from '@mui/material/styles';

// const theme = createTheme({
//   typography: {
//     fontFamily: 'Noto Sans, Arial, sans-serif',
//     h1: {
//       fontFamily: 'Kalnia Glaze, serif',
//     },
//     // You can define other typography variants here
//   },
// });


const theme = createTheme({
    typography: {
      fontFamily: 'Poppins, Arial, sans-serif',
      fontWeightLight: 300,
      fontWeightRegular: 500,
      fontWeightMedium: 600,
      fontWeightBold: 700,
    },
  });


export default theme;
