import React, { FunctionComponent } from 'react';
import { AppBar, Box, Button, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
}));

const Layout: FunctionComponent = ({ children }) => {
  const classes = useStyles();

  return (
    <Box style={{ paddingBottom: 500 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Rece</Typography>
        </Toolbar>
      </AppBar>
      <Box className={classes.offset} />
      {children}
    </Box>
  );
};

export default Layout;
