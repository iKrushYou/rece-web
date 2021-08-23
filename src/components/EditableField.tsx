/* eslint-disable @typescript-eslint/no-empty-function */
import React, { ReactElement, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Box, ButtonBase, TextField, Typography, useTheme } from '@material-ui/core';

const EditableField = ({
  value,
  onChange = () => {},
  formatValue = (value) => `${value}`,
  type,
  disabled = false,
  width = 80,
  textAlign = 'right',
}: {
  value: string;
  onChange?: (value: string) => void;
  formatValue?: (value: string) => string;
  type?: React.InputHTMLAttributes<unknown>['type'];
  disabled?: boolean;
  width?: number | string;
  textAlign?: 'left' | 'center' | 'right';
}): ReactElement => {
  const [isEditMode, setIsEditMode] = useState(false);
  const textFieldRef = useRef<HTMLInputElement>();
  const theme = useTheme();

  const [tempValue, setTempValue] = useState(value);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  useLayoutEffect(() => {
    if (isEditMode) textFieldRef.current?.focus();
  }, [isEditMode]);

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setTempValue(value);
    setTimeout(() => {
      event.target.setSelectionRange(0, event.target.value.length);
    }, 100);
  };

  const handleOnBlur = () => {
    onChange(tempValue);
    setIsEditMode(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const containerProps: any = {
    paddingTop: '4px',
    paddingBottom: '1px',
    display: 'inline-flex',
    flexDirection: 'column',
    width,
  };

  const DisplayTextField = (
    <Typography align={textAlign} sx={{ width: '100%' }}>
      {formatValue(value)}
    </Typography>
  );

  const Underline = (
    <Box
      sx={{
        marginTop: '2px',
        height: '1px',
        width: '100%',
        backgroundColor: theme.palette.text.disabled,
        opacity: disabled ? 0 : 1,
      }}
    />
  );

  return isEditMode ? (
    <TextField
      value={tempValue}
      onChange={(event) => setTempValue(event.target.value)}
      type={type}
      onBlur={handleOnBlur}
      onFocus={handleFocus}
      onKeyDown={(event) => {
        if (['Enter'].includes(event.code)) {
          setIsEditMode(false);
          onChange(tempValue);
        }
        if (['Escape'].includes(event.code)) {
          setIsEditMode(false);
        }
      }}
      inputRef={textFieldRef}
      sx={{ width }}
      variant={'standard'}
      inputProps={{ style: { textAlign } }}
    />
  ) : disabled ? (
    <Box sx={containerProps}>
      {DisplayTextField}
      {Underline}
    </Box>
  ) : (
    <ButtonBase onClick={() => setIsEditMode(true)} sx={containerProps}>
      {DisplayTextField}
      {Underline}
    </ButtonBase>
  );
};

export default EditableField;
