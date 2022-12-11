import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

function CreateMeetingButtons({
  createMeeting,
}: {
  createMeeting?: () => void;
}) {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Button variant='contained' onClick={() => navigate('/')} color='primary'>
        Cancel
      </Button>
      <Button
        variant='contained'
        type='submit'
        onClick={createMeeting}
        color='primary'
      >
        Create Meeting
      </Button>
    </div>
  );
}

export default CreateMeetingButtons;
