import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import './App.css';
import DataTable from './DataTable';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const App = () => {
    return (
      <ThemeProvider theme={darkTheme}>
        <DataTable />
      </ThemeProvider>
    )
}

export default App;
