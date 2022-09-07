import { createTheme } from '@material-ui/core'

export const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#0F0E38'
    }
  },
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    fontSize: 12,
  },
})
