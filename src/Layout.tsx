import React, { FunctionComponent } from 'react';
import { AppBar, Box, Button, makeStyles, Toolbar, Typography } from '@material-ui/core';
import useAppData from './hooks/useAppData';

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
}));

const Layout: FunctionComponent = ({ children }) => {
  const classes = useStyles();

  const { reset } = useAppData();

  const handleReset = () => {
    if (confirm("Are you sure you'd like to reset?")) reset();
  };

  return (
    <Box style={{ paddingBottom: 500 }}>
      <AppBar position="fixed">
        <Toolbar>
          {/*<IconButton edge="start" color="inherit" aria-label="menu">*/}
          {/*  <MenuIcon />*/}
          {/*</IconButton>*/}
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Rece
          </Typography>
          <Button onClick={handleReset} style={{ color: 'inherit' }}>
            Reset
          </Button>
        </Toolbar>
      </AppBar>
      <Box className={classes.offset} />
      {children}
    </Box>
  );
};

export default Layout;
