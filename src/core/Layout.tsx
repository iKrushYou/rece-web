import React, { FunctionComponent } from 'react';
import { AppBar, Box, styled, Toolbar, Typography } from '@material-ui/core';
import UnstyledLink from '../components/UnstyledLink';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const Layout: FunctionComponent = ({ children }) => {
  return (
    <>
      <Box style={{ paddingBottom: 500 }}>
        <AppBar position="fixed">
          <Toolbar>
            <UnstyledLink to={'/'}>
              <Typography variant="h6" style={{ flexGrow: 1 }}>
                Rece
              </Typography>
            </UnstyledLink>
          </Toolbar>
        </AppBar>
        <Offset />
        {children}
      </Box>
    </>
  );
};

export default Layout;
