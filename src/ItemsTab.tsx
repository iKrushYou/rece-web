import React, { FunctionComponent, KeyboardEvent, useLayoutEffect, useRef, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme,
} from '@material-ui/core';
import { Controller, FieldPath, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import currency from 'currency.js';
import { calcPercent, nameToInitials } from './functions/utils';
import useAppData from './hooks/useAppData';
import DeleteIcon from '@material-ui/icons/Delete';
import CallSplitIcon from '@material-ui/icons/CallSplit';

interface ItemEntryForm {
  name: string;
  cost: number;
}

const itemEntryFormDefaults: Partial<ItemEntryForm> = {
  name: '',
  cost: undefined,
};

const getVenmoPaymentLink = ({
  txn = 'charge',
  user = '',
  amount,
  note = 'Split by Rece',
}: {
  txn?: 'pay' | 'charge';
  user?: string;
  amount: number;
  note?: string;
}) => `venmo://paycharge?txn=${txn}&recipients=${user}&amount=${amount}&note=${note}`;

const ItemsTab: FunctionComponent = () => {
  const {
    setAppData,
    items,
    people,
    personToItemsMap,
    itemToPeopleMap,
    addItem,
    removeItem,
    splitItem,
    updateItem,
    handleSetItemPerson,
    subTotal,
    subTotalForPerson,
    tax,
    tip,
    total,
    taxForPerson,
    tipForPerson,
    totalForPerson,
  } = useAppData();

  const { control, handleSubmit, reset } = useForm<ItemEntryForm>({ defaultValues: itemEntryFormDefaults });

  const nameFieldRef = useRef<HTMLInputElement | null>(null);
  const costFieldRef = useRef<HTMLInputElement | null>(null);

  const handleOnSubmit = ({ name, cost }: ItemEntryForm) => {
    const newItem = {
      id: uuidv4(),
      name,
      cost,
    };
    addItem(newItem);
    reset(itemEntryFormDefaults);
    nameFieldRef.current?.focus();
  };

  const handleOnKeyDown = (name: FieldPath<ItemEntryForm>) => (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      if (name === 'name') {
        costFieldRef.current?.focus();
      } else if (name === 'cost') {
        handleSubmit(handleOnSubmit)(event);
      }
    }
  };

  const theme = useTheme();

  return (
    <>
      <Typography>Enter Receipt Items</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <Grid container spacing={2} alignItems={'flex-end'}>
              <Grid item xs={12} md={6}>
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
                      label="Item Name"
                      fullWidth
                      onKeyDown={handleOnKeyDown('name')}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <Controller
                  control={control}
                  name={'cost'}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      inputRef={(ref) => {
                        costFieldRef.current = ref;
                        field.ref(ref);
                      }}
                      label="Cost"
                      fullWidth
                      onKeyDown={handleOnKeyDown('cost')}
                      type={'number'}
                    />
                  )}
                  rules={{ required: true, min: 0 }}
                />
              </Grid>
              <Grid item xs={12} md={1}>
                <Button variant={'contained'} color={'primary'} fullWidth>
                  Add
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={12}>
          <Box style={{ overflow: 'auto', position: 'relative' }}>
            <Table>
              <TableHead>
                <TableRow style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 101 }}>
                  <TableCell
                    style={{ position: 'sticky', left: 0, backgroundColor: 'white', zIndex: 100, minWidth: 100 }}
                  >
                    Name
                  </TableCell>
                  <TableCell style={{ minWidth: 200 }}>Cost</TableCell>
                  <TableCell />
                  {people.map((person) => (
                    <TableCell key={person.id} style={{ width: 1 }}>
                      <Avatar style={{ height: 24, width: 24, fontSize: 12 }}>{nameToInitials(person.name)}</Avatar>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell
                      style={{
                        position: 'sticky',
                        left: 0,
                        // backgroundColor: 'white',
                        zIndex: 100,
                        whiteSpace: 'nowrap',
                        backgroundColor:
                          (itemToPeopleMap[item.id]?.length || 0) === 0 ? theme.palette.warning.light : 'white',
                      }}
                    >
                      {item.name}
                    </TableCell>
                    <TableCell style={{ paddingTop: 0, paddingBottom: 0 }}>
                      <EditableNumberField
                        value={item.cost}
                        onChange={(value) => updateItem({ ...item, cost: value })}
                        formatValue={(value) => currency(value).format()}
                      />
                    </TableCell>
                    <TableCell style={{ paddingTop: 0, paddingBottom: 0 }}>
                      <Box style={{ display: 'flex' }}>
                        <IconButton edge="end" onClick={() => splitItem(item.id)}>
                          <CallSplitIcon color={'primary'} />
                        </IconButton>
                        <IconButton
                          edge="end"
                          onClick={() => {
                            if (confirm("Are you sure you'd like to remove this item?")) removeItem(item.id);
                          }}
                        >
                          <DeleteIcon color={'error'} />
                        </IconButton>
                      </Box>
                    </TableCell>
                    {people.map((person) => (
                      <TableCell key={person.id} style={{ paddingTop: 0, paddingBottom: 0 }}>
                        <Checkbox
                          checked={personToItemsMap[person.id]?.includes(item.id) || false}
                          onChange={(event) => handleSetItemPerson(item.id, person.id, event.target.checked)}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
                {/* SubTotal Row */}
                <TableRow>
                  <TableCell
                    style={{
                      position: 'sticky',
                      left: 0,
                      backgroundColor: 'white',
                      zIndex: 100,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Subtotal
                  </TableCell>
                  <TableCell style={{ paddingTop: 0, paddingBottom: 0 }}>
                    <Button>{currency(subTotal).format()}</Button>
                  </TableCell>
                  <TableCell />
                  {people.map((person) => (
                    <TableCell key={person.id}>{currency(subTotalForPerson(person.id)).format()}</TableCell>
                  ))}
                </TableRow>
                {/* Tax Row */}
                <TableRow>
                  <TableCell
                    style={{
                      position: 'sticky',
                      left: 0,
                      backgroundColor: 'white',
                      zIndex: 100,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Tax ({calcPercent(tax, subTotal)}%)
                  </TableCell>
                  <TableCell style={{ paddingTop: 0, paddingBottom: 0 }}>
                    <EditableNumberField
                      value={tax}
                      onChange={(tax) => setAppData((prev) => ({ ...prev, tax }))}
                      formatValue={(value) => currency(value).format()}
                    />
                  </TableCell>
                  <TableCell />
                  {people.map((person) => (
                    <TableCell key={person.id}>{currency(taxForPerson(person.id)).format()}</TableCell>
                  ))}
                </TableRow>
                {/* Tip Row */}
                <TableRow>
                  <TableCell
                    style={{
                      position: 'sticky',
                      left: 0,
                      backgroundColor: 'white',
                      zIndex: 100,
                      whiteSpace: 'nowrap',
                      paddingTop: 0,
                      paddingBottom: 0,
                    }}
                  >
                    <Box
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Typography style={{ marginRight: 10 }}>Tip</Typography>
                      <EditableNumberField
                        value={tip / subTotal}
                        onChange={(tipPct) => setAppData((prev) => ({ ...prev, tip: subTotal * (tipPct / 100.0) }))}
                        formatValue={(value) => `${(value * 100).toFixed(2)}%`}
                      />
                    </Box>
                  </TableCell>
                  <TableCell style={{ paddingTop: 0, paddingBottom: 0 }}>
                    <EditableNumberField
                      value={tip}
                      onChange={(tip) => setAppData((prev) => ({ ...prev, tip }))}
                      formatValue={(value) => currency(value).format()}
                    />
                  </TableCell>
                  <TableCell />
                  {people.map((person) => (
                    <TableCell key={person.id}>{currency(tipForPerson(person.id)).format()}</TableCell>
                  ))}
                </TableRow>
              </TableBody>
              <TableFooter>
                {/* Total Row */}
                <TableRow>
                  <TableCell
                    style={{
                      position: 'sticky',
                      left: 0,
                      backgroundColor: 'white',
                      zIndex: 100,
                      whiteSpace: 'nowrap',
                      paddingTop: 0,
                      paddingBottom: 0,
                    }}
                  >
                    Total
                  </TableCell>
                  <TableCell style={{ paddingTop: 0, paddingBottom: 0 }}>{currency(total).format()}</TableCell>
                  <TableCell />
                  {people.map((person) => (
                    <TableCell key={person.id}>
                      <Button
                        onClick={() => {
                          window.location.href = getVenmoPaymentLink({ amount: totalForPerson(person.id) });
                        }}
                      >
                        {currency(totalForPerson(person.id)).format()}
                      </Button>
                    </TableCell>
                  ))}
                </TableRow>
              </TableFooter>
            </Table>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ItemsTab;

const EditableNumberField: FunctionComponent<{
  value: number;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
}> = ({ value, onChange, formatValue = (value) => `${value}` }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const textFieldRef = useRef<HTMLInputElement>();

  useLayoutEffect(() => {
    if (isEditMode) textFieldRef.current?.focus();
  }, [isEditMode]);

  return isEditMode ? (
    <TextField
      placeholder={formatValue(value)}
      onChange={(event) => onChange(parseFloat(event.target.value))}
      type={'number'}
      onBlur={() => setIsEditMode(false)}
      onKeyDown={(event) => {
        if (['Enter', 'Escape'].includes(event.code)) setIsEditMode(false);
      }}
      inputRef={textFieldRef}
      style={{ width: 80, marginLeft: 10 }}
    />
  ) : (
    <Button onClick={() => setIsEditMode(true)}>{formatValue(value)}</Button>
  );
};
