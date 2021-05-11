import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import AuthProvider from 'features/auth/context/AuthProvider';
import { browserHistory } from 'state/configureAppStore';
import store from 'state/store';
import GlobalStyles from 'styles/global';
import theme from 'styles/theme';

const AppProvider: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      <StoreProvider store={store}>
        <ConnectedRouter history={browserHistory}>
          <AuthProvider>{children}</AuthProvider>
        </ConnectedRouter>
      </StoreProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
