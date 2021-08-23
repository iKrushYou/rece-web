import React, { FunctionComponent, useRef } from 'react';
import { useParams } from 'react-router';
import { ReceiptInfoPathProps } from '../core/BaseRouter';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Grid,
  IconButton,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core';
import {
  getItemQuantityForPerson,
  getPersonCountForItem,
  ReceiptEntity,
  receiptsRef,
  updateChargeValue,
  updateChargeValueByPct,
  updateReceiptItemValue,
  useGetReceipt,
} from '../functions/firebase';
import { Controller, FieldPath, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import currency from 'currency.js';
import * as yup from 'yup';
import DeleteIcon from '@material-ui/icons/Delete';
import { nameToInitials } from '../functions/utils';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import EditableField from '../components/EditableField';
import { amber } from '@material-ui/core/colors';

const StyledTable = styled(Table)(() => ({
  backgroundColor: 'white',
  position: 'relative',
  '& th': {
    position: 'sticky',
    top: 0,
  },
  '& tr>th:first-child, tr>td:first-child': {
    position: 'sticky',
    backgroundColor: 'white',
    zIndex: 1,
    left: 0,
  },
  '& td': {
    whiteSpace: 'nowrap',
    paddingTop: '8px',
    paddingBottom: '8px',
  },
}));

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

const warningBgColor = amber[100];

const ReceiptItemsTab: FunctionComponent = () => {
  const { receiptId } = useParams<ReceiptInfoPathProps>();

  const { receipt, items, subTotal, total, people, setPersonItemQuantity, personSubTotalMap, getChargeForPerson, getTotalForPerson } =
    useGetReceipt(receiptId);

  const removeItem = async (itemId: string) => {
    if (!confirm("Are you sure you'd like to remove this item?")) return;
    if (!receipt || !itemId) return;
    await receiptsRef.child(receipt.id).child('items').child(itemId).remove();
  };

  return (
    <>
      {receipt && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <AddItemForm receipt={receipt} />
          </Grid>
          <Grid item xs={12}>
            {items && (
              <TableContainer component={Paper}>
                <StyledTable>
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell sx={{ width: '1%' }} align="right">
                        Quantity
                      </TableCell>
                      <TableCell align="right" sx={{ width: '1%' }}>
                        Cost
                      </TableCell>
                      {people.map((person) => (
                        <TableCell key={person.id} sx={{ width: '1%' }}>
                          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Tooltip title={person.name}>
                              <Avatar style={{ height: 24, width: 24, fontSize: 12 }}>{nameToInitials(person.name)}</Avatar>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      ))}
                      <TableCell sx={{ width: '1%' }} />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {items.length === 0 ? (
                      <TableRow>
                        <TableCell align={'center'} colSpan={4 + people.length}>
                          There are no items yet.
                        </TableCell>
                      </TableRow>
                    ) : (
                      items.map((item) => {
                        const isItemFull = getPersonCountForItem(receipt, item.id) >= item.quantity;

                        return (
                          <TableRow key={item.id}>
                            <TableCell>
                              <EditableField
                                value={item.name}
                                onChange={(value) => updateReceiptItemValue(receiptId, item.id, 'name', value)}
                                textAlign={'left'}
                              />
                            </TableCell>
                            <TableCell align={'right'}>
                              <EditableField
                                value={String(item.quantity)}
                                onChange={(value) => updateReceiptItemValue(receiptId, item.id, 'quantity', Math.max(1, parseInt(value)))}
                              />
                            </TableCell>
                            <TableCell align={'right'}>
                              <EditableField
                                value={currency(item.cost).format()}
                                onChange={(value) => updateReceiptItemValue(receiptId, item.id, 'cost', currency(value).value)}
                              />
                            </TableCell>
                            {people.map((person) => {
                              const personItemQuantity = getItemQuantityForPerson(receipt, person.id, item.id);

                              return (
                                <TableCell
                                  key={person.id}
                                  sx={{
                                    width: '1%',
                                    backgroundColor: !isItemFull ? warningBgColor : undefined,
                                  }}
                                  align={'center'}
                                >
                                  {item.quantity > 1 ? (
                                    <Box sx={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}>
                                      <IconButton
                                        size={'small'}
                                        onClick={() => setPersonItemQuantity(person.id, item.id, personItemQuantity - 1)}
                                        disabled={personItemQuantity <= 0}
                                        style={{
                                          opacity: personItemQuantity <= 0 ? 0.5 : undefined,
                                        }}
                                      >
                                        <RemoveIcon />
                                      </IconButton>
                                      <Typography>{JSON.stringify(personItemQuantity)}</Typography>
                                      <IconButton
                                        size={'small'}
                                        onClick={() => setPersonItemQuantity(person.id, item.id, personItemQuantity + 1)}
                                        disabled={isItemFull}
                                        style={{
                                          opacity: isItemFull ? 0.5 : undefined,
                                        }}
                                      >
                                        <AddIcon />
                                      </IconButton>
                                    </Box>
                                  ) : (
                                    <Box>
                                      <Checkbox
                                        checked={personItemQuantity > 0}
                                        onChange={(event) => setPersonItemQuantity(person.id, item.id, event.target.checked ? 1 : 0)}
                                        sx={{ my: '-8px' }}
                                      />
                                    </Box>
                                  )}
                                </TableCell>
                              );
                            })}
                            <TableCell align="right">
                              <IconButton size={'small'} edge="end" onClick={() => removeItem(item.id)}>
                                <DeleteIcon color={'error'} />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                    <TableRow sx={{ height: 30, backgroundColor: 'background.default' }} />
                    <TableRow>
                      <TableCell>Sub Total</TableCell>
                      <TableCell />
                      <TableCell align={'right'}>
                        <EditableField value={currency(subTotal).format()} disabled />
                      </TableCell>
                      {people.map((person) => (
                        <TableCell key={person.id}>
                          <EditableField value={currency(personSubTotalMap[person.id]).format()} disabled />
                        </TableCell>
                      ))}
                      <TableCell />
                    </TableRow>
                    <TableRow>
                      <TableCell>Tax</TableCell>
                      <TableCell align={'right'}>
                        <EditableField
                          value={String(
                            ((currency(receipt.taxCost).value / currency(subTotal > 0 ? subTotal : 1).value) * 100.0).toFixed(3),
                          )}
                          formatValue={(val) => `${val}%`}
                          onChange={(percent) => updateChargeValueByPct(receiptId, 'taxCost', percent, subTotal)}
                        />
                      </TableCell>
                      <TableCell align={'right'}>
                        <EditableField
                          value={currency(receipt.taxCost).format()}
                          onChange={(value) => updateChargeValue(receiptId, 'taxCost', value)}
                        />
                      </TableCell>
                      {people.map((person) => (
                        <TableCell key={person.id}>
                          <EditableField value={currency(getChargeForPerson('taxCost', person.id)).format()} disabled />
                        </TableCell>
                      ))}
                      <TableCell />
                    </TableRow>
                    <TableRow>
                      <TableCell>Tip</TableCell>
                      <TableCell align={'right'}>
                        <EditableField
                          value={String(
                            ((currency(receipt.tipCost).value / currency(subTotal > 0 ? subTotal : 1).value) * 100.0).toFixed(3),
                          )}
                          formatValue={(val) => `${val}%`}
                          onChange={(percent) => updateChargeValueByPct(receiptId, 'tipCost', percent, subTotal)}
                        />
                      </TableCell>
                      <TableCell align={'right'}>
                        <EditableField
                          value={currency(receipt.tipCost).format()}
                          onChange={(value) => updateChargeValue(receiptId, 'tipCost', value)}
                        />
                      </TableCell>
                      {people.map((person) => (
                        <TableCell key={person.id}>
                          <EditableField value={currency(getChargeForPerson('tipCost', person.id)).format()} disabled />
                        </TableCell>
                      ))}
                      <TableCell />
                    </TableRow>
                    <TableRow>
                      <TableCell />
                      <TableCell />
                      <TableCell />
                      {people.map((person) => (
                        <TableCell key={person.id}>
                          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Tooltip title={person.name}>
                              <Avatar style={{ height: 24, width: 24, fontSize: 12 }}>{nameToInitials(person.name)}</Avatar>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      ))}
                      <TableCell />
                    </TableRow>
                    <TableRow>
                      <TableCell>Total</TableCell>
                      <TableCell />
                      <TableCell align={'right'}>
                        <EditableField value={currency(total).format()} disabled />
                      </TableCell>
                      {people.map((person) => (
                        <TableCell
                          key={person.id}
                          onClick={() => {
                            window.location.href = getVenmoPaymentLink({ amount: getTotalForPerson(person.id) });
                          }}
                        >
                          <EditableField value={currency(getTotalForPerson(person.id)).format()} disabled />
                        </TableCell>
                      ))}
                      <TableCell />
                    </TableRow>
                  </TableBody>
                </StyledTable>
              </TableContainer>
            )}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ReceiptItemsTab;

type AddItemFormProps = {
  name: string;
  cost: number;
  quantity: number;
};

const addItemFormDefaults: Partial<AddItemFormProps> = {
  name: '',
  cost: 0,
  quantity: 1,
};

const addItemFormValidation = yup.object().shape({
  name: yup.string().required(),
  cost: yup.number().positive().required(),
  quantity: yup.number().integer().positive().required(),
});

const AddItemForm: FunctionComponent<{ receipt: ReceiptEntity }> = ({ receipt }) => {
  const { control, handleSubmit, reset } = useForm<AddItemFormProps>({
    defaultValues: addItemFormDefaults,
    resolver: yupResolver(addItemFormValidation),
  });

  const nameFieldRef = useRef<HTMLInputElement | null>(null);
  const costFieldRef = useRef<HTMLInputElement | null>(null);
  const quantityFieldRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = async (form: AddItemFormProps) => {
    receiptsRef.child(receipt.id).child('items').push(form);
    reset(addItemFormDefaults);
    nameFieldRef.current?.focus();
  };

  const handleOnKeyDown = (name: FieldPath<AddItemFormProps>) => (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      if (name === 'name' && !!costFieldRef.current?.value) {
        costFieldRef.current?.focus();
      } else if (name === 'cost' || name === 'quantity') {
        handleSubmit(onSubmit)(event);
      }
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setTimeout(() => {
      event.target.setSelectionRange(0, event.target.value.length);
    }, 100);
  };

  return (
    <Paper sx={{ p: 1 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                  variant={'standard'}
                  label="Item Name"
                  fullWidth
                  onKeyDown={handleOnKeyDown('name')}
                  onFocus={handleFocus}
                />
              )}
            />
          </Grid>
          <Grid item xs={6} sm={8} md={2}>
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
                  variant={'standard'}
                  label="Cost"
                  fullWidth
                  onKeyDown={handleOnKeyDown('cost')}
                  onFocus={handleFocus}
                  type={'number'}
                  inputProps={{ step: 'any', min: 0 }}
                />
              )}
              rules={{ required: true }}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Controller
              control={control}
              name={'quantity'}
              render={({ field }) => (
                <TextField
                  {...field}
                  inputRef={(ref) => {
                    quantityFieldRef.current = ref;
                    field.ref(ref);
                  }}
                  variant={'standard'}
                  label="Quantity"
                  fullWidth
                  onKeyDown={handleOnKeyDown('quantity')}
                  onFocus={handleFocus}
                  type={'number'}
                  inputProps={{ min: 0 }}
                />
              )}
              rules={{ required: true }}
            />
          </Grid>
          <Grid item xs={12} md={2} sx={{ overflow: 'hidden' }}>
            <Button variant={'contained'} color={'primary'} fullWidth type={'submit'}>
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};
