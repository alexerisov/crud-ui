import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import './App.css';
import DataTable from './DataTable';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
      primary: {
          main: '#90caf9',
      },
      secondary: {
          main: '#90caf9',
      },
  },

});




const App = () => {

    return (
      <ThemeProvider theme={darkTheme}>
          <CssBaseline />
        <DataTable />
      </ThemeProvider>
    )
}

export default App;
