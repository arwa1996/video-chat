import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function MeetingDateField({
  selected,
  setStartDate,
}: {
  selected: moment.Moment;
  setStartDate: React.Dispatch<React.SetStateAction<moment.Moment>>;
}) {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs} variant='standard'>
        <DatePicker
          disablePast
          label='Date'
          openTo='day'
          views={['year', 'month', 'day']}
          value={selected}
          onChange={(date) => setStartDate(date!)}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </>
  );
}

export default MeetingDateField;
