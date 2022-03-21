import { createTheme } from '@mui/material'

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1308,
      xl: 1500,
    },
  },
})

export const oneLine = () => ({
  width: '100%',
  maxWidth: '500px',
  [theme.breakpoints.up('lg')]: {
    maxWidth: '1020px'
  }
})