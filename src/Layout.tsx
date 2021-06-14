import React, { FunctionComponent, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  Container,
  Grid,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import useAppData from './hooks/useAppData';
import currency from 'currency.js';

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
    <>
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
      <DebugView />
    </>
  );
};

export default Layout;

const DebugView: FunctionComponent = () => {
  const [showDebugView, setShowDebugView] = useState(false);

  const { appData, subTotalForPerson, taxForPerson, tipForPerson, totalForPerson, subTotal, total } = useAppData();

  return (
    <Box style={{ marginBottom: 50 }}>
      <Container>
        <Card>
          <Button onClick={() => setShowDebugView((prev) => !prev)}>Debug</Button>
          <Collapse in={showDebugView}>
            <CardContent>
              <UncontrolledCollapse buttonTitle={'appData'}>
                <pre>{JSON.stringify(appData, null, 2)}</pre>
              </UncontrolledCollapse>
              <UncontrolledCollapse buttonTitle={'Real Sums'}>
                <div>
                  <Typography>Sub Total ({currency(subTotal).format()})</Typography>
                  {appData.people.map((person) => (
                    <div key={person.id}>
                      {person.name} - {currency(subTotalForPerson(person.id)).format()}
                    </div>
                  ))}
                  <div>
                    Sum -{' '}
                    {appData.people
                      .reduce((sum, person) => sum.add(subTotalForPerson(person.id)), currency(0))
                      .format()}
                  </div>
                </div>
                <div>
                  <Typography>Tax ({currency(appData.tax).format()})</Typography>
                  {appData.people.map((person) => (
                    <div key={person.id}>
                      {person.name} - {currency(taxForPerson(person.id)).format()}
                    </div>
                  ))}
                  <div>
                    Sum -{' '}
                    {appData.people.reduce((sum, person) => sum.add(taxForPerson(person.id)), currency(0)).format()}
                  </div>
                </div>
                <div>
                  <Typography>Tip ({currency(appData.tip).format()})</Typography>
                  {appData.people.map((person) => (
                    <div key={person.id}>
                      {person.name} - {currency(tipForPerson(person.id)).format()}
                    </div>
                  ))}
                  <div>
                    Sum -{' '}
                    {appData.people.reduce((sum, person) => sum.add(tipForPerson(person.id)), currency(0)).format()}
                  </div>
                </div>
                <div>
                  <Typography>Total ({currency(total).format()})</Typography>
                  {appData.people.map((person) => (
                    <div key={person.id}>
                      {person.name} - {currency(totalForPerson(person.id)).format()}
                    </div>
                  ))}
                  <div>
                    Sum -{' '}
                    {appData.people.reduce((sum, person) => sum.add(totalForPerson(person.id)), currency(0)).format()}
                  </div>
                </div>
              </UncontrolledCollapse>
            </CardContent>
          </Collapse>
        </Card>
      </Container>
    </Box>
  );
};

const UncontrolledCollapse: FunctionComponent<{ buttonTitle: string }> = ({ children, buttonTitle }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen((prev) => !prev)}>{buttonTitle}</Button>
      <Collapse in={open}>{children}</Collapse>
    </>
  );
};
