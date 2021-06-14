import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import './App.css';
import DataTable from './DataTable';
import Box from '@material-ui/core/Box';
import {Typography} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';

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

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.up('md')]: {
            width: '60%',
            margin: 'auto'
        },
        [theme.breakpoints.up('lg')]: {
            width: '60%',
            margin: 'auto'
        },
    },
}));



const App = () => {
    const classes = useStyles();

    return (
      <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Box className={classes.root} m={4}>
              <Typography variant="h4"
                          align="center"
                          component="h1">Crud-UI</Typography>
              <DataTable />
          </Box>
      </ThemeProvider>
    )
}

export default App;
