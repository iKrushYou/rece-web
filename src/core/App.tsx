import { FunctionComponent } from 'react';
import { BaseRouter } from './BaseRouter';
import Layout from './Layout';
import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { HashRouter as Router } from 'react-router-dom';
import { grey } from '@material-ui/core/colors';

const theme = createTheme({
  palette: {
    background: {
      default: grey[100],
    },
  },
});

const App: FunctionComponent = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Layout>
          <CssBaseline />
          <BaseRouter />
        </Layout>
      </ThemeProvider>
    </Router>
  );
};

export default App;
