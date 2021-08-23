import React, { FunctionComponent, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { ReceiptInfoPathProps, ReceiptInfoTabs, Routes } from '../core/BaseRouter';
import ReceiptItemsTab from './ReceiptItemsTab';
import ReceiptPeopleTab from './ReceiptPeopleTab';
import { Box, CircularProgress, Container, Grid, Tab, Tabs, Typography } from '@material-ui/core';
import { useParams } from 'react-router';
import { updateReceiptValue, useGetReceipt } from '../functions/firebase';
import EditableField from '../components/EditableField';

const ReceiptInfoPage: FunctionComponent = () => {
  const { receiptId, tab } = useParams<ReceiptInfoPathProps>();
  const history = useHistory();

  const { receipt, people, isLoading } = useGetReceipt(receiptId);

  useEffect(() => {
    if (!isLoading && people?.length === 0) {
      history.push(Routes.receiptInfo.route({ receiptId, tab: 'people' }));
    }
  }, [people, isLoading]);

  if (isLoading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <>
      <Container maxWidth={'md'} sx={{ paddingTop: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Tabs
              value={ReceiptInfoTabs.indexOf(tab ?? 'items')}
              onChange={(event, value) => history.push(Routes.receiptInfo.route({ receiptId, tab: ReceiptInfoTabs[value] }))}
              indicatorColor="primary"
              textColor="primary"
              centered
              style={{ marginBottom: 20 }}
            >
              {ReceiptInfoTabs.map((tab) => (
                <Tab key={tab} label={tab} />
              ))}
            </Tabs>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <EditableField
                value={receipt?.title ?? ''}
                onChange={(value) => updateReceiptValue(receiptId, 'title', value)}
                width={'100%'}
                textAlign={'left'}
              />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Switch>
              <Route path={Routes.receiptInfo.tabPath({ tab: 'items' })} exact component={ReceiptItemsTab} />
              <Route path={Routes.receiptInfo.tabPath({ tab: 'people' })} exact component={ReceiptPeopleTab} />
              <Redirect to={Routes.receiptInfo.tabPath({ tab: 'items' })} from={Routes.receiptInfo.path} />
            </Switch>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ReceiptInfoPage;
