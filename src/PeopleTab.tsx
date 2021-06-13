import React, { FunctionComponent, KeyboardEvent, useState } from 'react';
import {
  Avatar,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Typography,
} from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import DeleteIcon from '@material-ui/icons/Delete';
import { nameToInitials } from './functions/utils';
import useAppData from './hooks/useAppData';

const PeopleTab: FunctionComponent = () => {
  const {
    appData: { people },
    addPerson,
    removePerson,
  } = useAppData();

  const [personNameInput, setPersonNameInput] = useState('');

  const handleAddPerson = (name: string) => {
    if (!name) return;
    addPerson({ id: uuidv4(), name: name.trim() });
    setPersonNameInput('');
  };

  const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      handleAddPerson(personNameInput);
    }
  };

  return (
    <>
      <Typography>Enter People</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Grid container spacing={2} alignItems={'flex-end'}>
            <Grid item xs={12} md={11}>
              <TextField
                value={personNameInput}
                onChange={(event) => setPersonNameInput(event.target.value)}
                label="Person Name"
                fullWidth
                onKeyDown={handleOnKeyDown}
              />
            </Grid>
            <Grid item xs={12} md={1}>
              <Button
                variant={'contained'}
                color={'primary'}
                onClick={() => handleAddPerson(personNameInput)}
                fullWidth
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <List>
            {people.map((person) => (
              <ListItem key={person.id}>
                <ListItemAvatar>
                  <Avatar>{nameToInitials(person.name)}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={person.name} />
                <ListItemSecondaryAction>
                  {/*<IconButton edge="end">*/}
                  {/*  <EditIcon />*/}
                  {/*</IconButton>*/}
                  <IconButton edge="end" onClick={() => removePerson(person.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </>
  );
};

export default PeopleTab;
