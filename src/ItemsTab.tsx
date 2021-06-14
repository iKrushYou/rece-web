import React, { FunctionComponent, KeyboardEvent, useRef } from 'react';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Grid,
  IconButton,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from '@material-ui/core';
import { Controller, FieldPath, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import currency from 'currency.js';
import { nameToInitials } from './functions/utils';
import useAppData from './hooks/useAppData';
import DeleteIcon from '@material-ui/icons/Delete';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import EditableField from './components/EditableField';
import { amber200 } from 'material-ui/styles/colors';
import { amber } from '@material-ui/core/colors';

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

const useStyles = makeStyles({
  table: {
    backgroundColor: 'white',
    '& td': {
      whiteSpace: 'nowrap',
    },
  },
  tableCellNoPadding: {
    paddingTop: 7,
    paddingBottom: 7,
  },
  tableCellEditPadding: {
    paddingTop: 11,
    paddingBottom: 10,
  },
});

const ItemsTab: FunctionComponent = () => {
  const {
    setAppData,
    appData: { items, people, personToItemsMap, itemToPeopleMap, tax, tip },
    putItem,
    removeItem,
    splitItem,
    handleSetItemPerson,
    subTotal,
    subTotalForPerson,
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
    putItem(newItem);
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
  const classes = useStyles();

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
                  rules={{ required: true }}
                />
              </Grid>
              <Grid item xs={12} md={1}>
                <Button variant={'contained'} color={'primary'} fullWidth type={'submit'}>
                  Add
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={12}>
          <Box style={{ overflow: 'auto', position: 'relative' }}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{ position: 'sticky', left: 0, backgroundColor: 'white', zIndex: 100, minWidth: 100 }}
                  >
                    Name
                  </TableCell>
                  <TableCell style={{ minWidth: 200 }}>Cost</TableCell>
                  <TableCell style={{ width: 1 }} />
                  {people.map((person) => (
                    <TableCell key={person.id} style={{ width: 1 }}>
                      <Tooltip title={person.name}>
                        <Avatar style={{ height: 24, width: 24, fontSize: 12 }}>{nameToInitials(person.name)}</Avatar>
                      </Tooltip>
                    </TableCell>
                  ))}
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item) => (
                  <TableRow
                    key={item.id}
                    style={{
                      backgroundColor: (itemToPeopleMap[item.id]?.length || 0) === 0 ? amber[100] : 'white',
                    }}
                  >
                    <TableCell
                      style={{
                        position: 'sticky',
                        left: 0,
                        zIndex: 100,
                        backgroundColor: (itemToPeopleMap[item.id]?.length || 0) === 0 ? amber[100] : 'white',
                      }}
                      className={classes.tableCellEditPadding}
                    >
                      <EditableField value={item.name} onChange={(name) => putItem({ ...item, name })} />
                    </TableCell>
                    <TableCell className={classes.tableCellEditPadding}>
                      <EditableField
                        type={'number'}
                        value={item.cost}
                        onChange={(value) => putItem({ ...item, cost: parseFloat(value) })}
                        formatValue={(value) => currency(value).format()}
                      />
                    </TableCell>
                    <TableCell className={classes.tableCellNoPadding}>
                      <Box style={{ display: 'flex' }}>
                        <IconButton
                          size={'small'}
                          edge="end"
                          onClick={() => splitItem(item.id)}
                          style={{ marginRight: theme.spacing(1) }}
                        >
                          <CallSplitIcon color={'primary'} />
                        </IconButton>
                        <IconButton
                          size={'small'}
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
                      <TableCell key={person.id} className={classes.tableCellNoPadding}>
                        <Checkbox
                          checked={personToItemsMap[person.id]?.includes(item.id) || false}
                          onChange={(event) => handleSetItemPerson(item.id, [person.id], event.target.checked)}
                        />
                      </TableCell>
                    ))}
                    <TableCell className={classes.tableCellNoPadding} style={{ width: 1 }}>
                      <Button
                        onClick={() =>
                          handleSetItemPerson(
                            item.id,
                            people.map((person) => person.id),
                            !personToItemsMap[people[0].id]?.includes(item.id),
                          )
                        }
                      >
                        All
                      </Button>
                    </TableCell>
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
                    <Typography>Subtotal</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{currency(subTotal).format()}</Typography>
                  </TableCell>
                  <TableCell />
                  {people.map((person) => (
                    <TableCell key={person.id}>
                      <Typography>{currency(subTotalForPerson(person.id)).format()}</Typography>
                    </TableCell>
                  ))}
                  <TableCell />
                </TableRow>
                {/* Tax Row */}
                <TableRow
                  style={{
                    backgroundColor: tax === 0 ? amber[100] : undefined,
                  }}
                >
                  <TableCell
                    style={{
                      position: 'sticky',
                      left: 0,
                      zIndex: 100,
                      whiteSpace: 'nowrap',
                      backgroundColor: tax === 0 ? amber[100] : 'white',
                    }}
                    className={classes.tableCellEditPadding}
                  >
                    <Box
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Typography style={{ marginRight: 10 }}>Tax</Typography>
                      <EditableField
                        type={'number'}
                        value={subTotal > 0 ? tax / subTotal : 0}
                        onChange={(taxPct) =>
                          setAppData((prev) => ({ ...prev, tax: subTotal * (parseFloat(taxPct) / 100.0) }))
                        }
                        formatValue={(value) => `${(value * 100).toFixed(2)}%`}
                      />
                    </Box>
                  </TableCell>
                  <TableCell className={classes.tableCellEditPadding}>
                    <EditableField
                      type={'number'}
                      value={tax}
                      onChange={(tax) => setAppData((prev) => ({ ...prev, tax: parseFloat(tax) }))}
                      formatValue={(value) => currency(value).format()}
                    />
                  </TableCell>
                  <TableCell />
                  {people.map((person) => (
                    <TableCell key={person.id}>
                      <Typography>{currency(taxForPerson(person.id)).format()}</Typography>
                    </TableCell>
                  ))}
                  <TableCell />
                </TableRow>
                {/* Tip Row */}
                <TableRow
                  style={{
                    backgroundColor: tip === 0 ? amber[100] : undefined,
                  }}
                >
                  <TableCell
                    style={{
                      position: 'sticky',
                      left: 0,
                      backgroundColor: tip === 0 ? amber[100] : 'white',
                      zIndex: 100,
                      whiteSpace: 'nowrap',
                    }}
                    className={classes.tableCellEditPadding}
                  >
                    <Box
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Typography style={{ marginRight: 10 }}>Tip</Typography>
                      <EditableField
                        type={'number'}
                        value={subTotal > 0 ? tip / subTotal : 0}
                        onChange={(tipPct) =>
                          setAppData((prev) => ({ ...prev, tip: subTotal * (parseFloat(tipPct) / 100.0) }))
                        }
                        formatValue={(value) => `${(value * 100).toFixed(2)}%`}
                      />
                    </Box>
                  </TableCell>
                  <TableCell className={classes.tableCellEditPadding}>
                    <EditableField
                      type={'number'}
                      value={tip}
                      onChange={(tip) => setAppData((prev) => ({ ...prev, tip: parseFloat(tip) }))}
                      formatValue={(value) => currency(value).format()}
                    />
                  </TableCell>
                  <TableCell />
                  {people.map((person) => (
                    <TableCell key={person.id}>
                      <Typography>{currency(tipForPerson(person.id)).format()}</Typography>
                    </TableCell>
                  ))}
                  <TableCell />
                </TableRow>
                {/* Total Row */}
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
                    <Typography>Total</Typography>
                  </TableCell>
                  <TableCell style={{ paddingTop: 0, paddingBottom: 0 }}>
                    <Typography>{currency(total).format()}</Typography>
                  </TableCell>
                  <TableCell />
                  {people.map((person) => (
                    <TableCell key={person.id} style={{ paddingTop: 0, paddingBottom: 0 }}>
                      <Typography
                        onClick={() => {
                          window.location.href = getVenmoPaymentLink({ amount: totalForPerson(person.id) });
                        }}
                      >
                        {currency(totalForPerson(person.id)).format()}
                      </Typography>
                    </TableCell>
                  ))}
                  <TableCell />
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ItemsTab;
