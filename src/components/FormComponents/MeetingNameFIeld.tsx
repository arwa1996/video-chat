import { TextField } from '@material-ui/core';
import React from 'react';

function MeetingNameField({
  label,
  placeholder,
  value,
  setMeetingName,
}: {
  label: string;
  placeholder: string;
  value: string;
  setMeetingName: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <>
      <TextField
        style={{ width: '100%' }}
        required
        id='standard-required'
        label={label}
        defaultValue={placeholder}
        value={value}
        onChange={(e) => setMeetingName(e.target.value)}
        variant='outlined'
      />
    </>
  );
}

export default MeetingNameField;
