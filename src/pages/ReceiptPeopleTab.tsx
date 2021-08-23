import React, { FunctionComponent, useRef } from 'react';
import { receiptsRef, useGetReceipt } from '../functions/firebase';
import { useParams } from 'react-router';
import { ReceiptInfoPathProps } from '../core/BaseRouter';
import { Avatar, Box, Button, Divider, IconButton, List, ListItem, ListItemAvatar, Paper, TextField, Typography } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DeleteIcon from '@material-ui/icons/Delete';
import { nameToInitials } from '../functions/utils';
import EditableField from '../components/EditableField';

type AddPersonFormProps = { name: string };

const ReceiptPeopleTab: FunctionComponent = () => {
  const { receiptId } = useParams<ReceiptInfoPathProps>();

  const { receipt, people } = useGetReceipt(receiptId);

  const { control, handleSubmit, reset } = useForm<AddPersonFormProps>({
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required(),
      }),
    ),
  });

  const nameFieldRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = (form: AddPersonFormProps) => {
    if (!receipt) return;
    receiptsRef.child(receipt.id).child('people').push(form);
    reset({ name: '' });
  };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      handleSubmit(onSubmit)(event);
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setTimeout(() => {
      event.target.setSelectionRange(0, event.target.value.length);
    }, 100);
  };

  const removePerson = async (personId: string) => {
    if (!confirm("Are you sure you'd like to remove this person?")) return;
    if (!receipt || !personId) return;
    await receiptsRef.child(receipt.id).child('people').child(personId).remove();
  };

  return (
    <>
      <Typography variant={'h3'} sx={{ mb: 2 }}>
        People
      </Typography>
      <Paper>
        <List>
          {people.map((person) => (
            <ListItem key={person.id}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 2 }}>
                <ListItemAvatar>
                  <Avatar>{nameToInitials(person.name)}</Avatar>
                </ListItemAvatar>
                <EditableField value={person.name} width={'100%'} textAlign={'left'} />
                <IconButton size={'small'} edge="end" onClick={() => removePerson(person.id)}>
                  <DeleteIcon color={'error'} />
                </IconButton>
              </Box>
            </ListItem>
          ))}
          {people?.length > 0 && <Divider sx={{ mt: 2, mb: 2 }} />}
          <form onSubmit={handleSubmit(onSubmit)}>
            <ListItem>
              <Box sx={{ width: '100%', display: 'flex', gap: '16px' }}>
                <Controller
                  control={control}
                  name={'name'}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      inputRef={(ref) => {
                        nameFieldRef.current = ref;
                        field.ref(ref);
                      }}
                      variant={'standard'}
                      label="Person Name"
                      fullWidth
                      onKeyDown={handleOnKeyDown}
                      onFocus={handleFocus}
                      sx={{ flex: 1 }}
                    />
                  )}
                />
                <Button type={'submit'}>Add</Button>
              </Box>
            </ListItem>
          </form>
        </List>
      </Paper>
    </>
  );
};

export default ReceiptPeopleTab;
