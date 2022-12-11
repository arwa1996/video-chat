import { useNavigate } from 'react-router-dom';
import meeting1 from '../../assets/images/meeting1.png';
import meeting2 from '../../assets/images/meeting2.png';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';
import styles from './CreateMeetings.module.scss';

const CreateMeeting = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Card
            style={{
              display: 'flex',
              padding: '5%',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              boxShadow: ' 0 4px 8px 0 rgba(255, 255, 255, 0.218)',
            }}
          >
            <img src={meeting1} alt='meeting' width={140} height={140} />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                Create 1 on 1 Meeting
              </Typography>
              <Typography variant='body2'>
                Create a personal single person meeting.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size='medium'
                onClick={() => navigate('/create1to1')}
                color='primary'
                variant='contained'
              >
                Create meeting
              </Button>
            </CardActions>
          </Card>
          <Card
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              boxShadow: ' 0 4px 8px 0 rgba(0, 0, 0, 0.2)',
              padding: '5%',
            }}
          >
            <img src={meeting2} alt='meeting' width={140} height={140} />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                Create Video Conference
              </Typography>
              <Typography variant='body2'>
                Invite multiple persons to the meeting.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size='medium'
                onClick={() => navigate('/videoconference')}
                color='primary'
                variant='contained'
              >
                Create meeting
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CreateMeeting;
