// src/theme.ts
import { createTheme } from '@mui/material/styles';
import { pl } from 'zod/v4/locales';

const theme = createTheme({
  typography: {
    fontFamily: `'Mulish', sans-serif`,
  },
});

export default theme;
