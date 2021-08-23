import React, { FormEvent, FunctionComponent, useState } from 'react';
import { Box, Button, Container, List, ListItem, Paper, TextField, Typography } from '@material-ui/core';
import { pushReceipt, useGetReceipts } from '../functions/firebase';
import currency from 'currency.js';
import { format } from 'date-fns';
import { Routes } from '../core/BaseRouter';
import UnstyledLink from '../components/UnstyledLink';

export const ReceiptsPage: FunctionComponent = () => {
  const receipts = useGetReceipts();

  return (
    <Container maxWidth={'md'} sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography sx={{ mb: 2 }}>Receipts</Typography>
      <Paper sx={{ width: '100%' }}>
        <List>
          {receipts.map((receipt) => (
            <UnstyledLink key={receipt.id} to={Routes.receiptInfo.route({ receiptId: receipt.id })}>
              <ListItem button style={{ width: '100%' }}>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'flex' }}>
                    <Typography style={{ flex: 1 }}>{receipt.title}</Typography>
                    <Typography>{currency(receipt.total).format()}</Typography>
                  </div>
                  <Typography>{format(new Date(receipt.date), 'Pp')}</Typography>
                </div>
              </ListItem>
            </UnstyledLink>
          ))}
        </List>
      </Paper>
      <NewReceiptForm />
    </Container>
  );
};

const NewReceiptForm = () => {
  const [title, setTitle] = useState('');

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!title) return;

    pushReceipt({ title });
    setTitle('');
  };

  return (
    <form onSubmit={onSubmit}>
      <Box sx={{ display: 'flex' }}>
        <TextField
          label={'Receipt Name'}
          value={title}
          fullWidth
          variant={'standard'}
          onChange={(event) => setTitle(event.target.value)}
          sx={{ flex: 1 }}
        />
        <Button type={'submit'}>Add</Button>
      </Box>
    </form>
  );
};
