import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@material-ui/core';
import { UserType } from '../../utils/types';

function MeetingUserField({
  label,
  options,
  onChange,
  selectedOptions,
  multiple = false,
  placeholder,
}: {
  label: string;
  options: UserType[];
  onChange: (value: UserType | UserType[]) => void;
  selectedOptions: UserType | UserType[] | undefined;
  multiple?: boolean;
  isClearable: boolean;
  placeholder: string;
}) {
  return (
    <FormControl fullWidth>
      <InputLabel variant='standard' style={{ paddingLeft: '8%' }}>
        {label}
      </InputLabel>
      <Select
        id='standard-required'
        variant='standard'
        labelId='demo-simple-select-standard-label'
        placeholder={placeholder}
        label={label}
        multiple={multiple}
        required
        value={selectedOptions}
        onChange={(e) => onChange(e.target.value as UserType | UserType[])}
        input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
        renderValue={(selected: any) => {
          if (selected instanceof Array) {
            return (
              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {selected?.map((value: UserType) => (
                  <Chip key={value.uid} label={value.name} />
                ))}
              </Box>
            );
          } else {
            return (
              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <Chip key={selected.uid} label={selected.name} />
              </Box>
            );
          }
        }}
      >
        {options.map((user: any) => (
          <MenuItem key={user.uid} value={user}>
            {user.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default MeetingUserField;
