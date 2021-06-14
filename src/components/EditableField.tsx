import React, { ReactElement, useLayoutEffect, useRef, useState } from 'react';
import { ButtonBase, TextField, Typography, useTheme } from '@material-ui/core';

const EditableField = <T extends string | number>({
  value,
  onChange,
  formatValue = (value) => `${value}`,
  type,
}: {
  value: T;
  onChange: (value: string) => void;
  formatValue?: (value: T) => string;
  type?: React.InputHTMLAttributes<unknown>['type'];
}): ReactElement => {
  const [isEditMode, setIsEditMode] = useState(false);
  const textFieldRef = useRef<HTMLInputElement>();
  const theme = useTheme();

  useLayoutEffect(() => {
    if (isEditMode) textFieldRef.current?.focus();
  }, [isEditMode]);

  return isEditMode ? (
    <TextField
      placeholder={formatValue(value)}
      onChange={(event) => onChange(event.target.value as string)}
      type={type}
      onBlur={() => setIsEditMode(false)}
      onKeyDown={(event) => {
        if (['Enter', 'Escape'].includes(event.code)) setIsEditMode(false);
      }}
      inputRef={textFieldRef}
      style={{ width: 80 }}
    />
  ) : (
    <ButtonBase
      onClick={() => setIsEditMode(true)}
      style={{ paddingTop: 4, paddingBottom: 4, display: 'flex', flexDirection: 'column' }}
    >
      <Typography>{formatValue(value)}</Typography>
      <div style={{ height: 1, width: '100%', backgroundColor: theme.palette.text.disabled }} />
    </ButtonBase>
  );
};

export default EditableField;
