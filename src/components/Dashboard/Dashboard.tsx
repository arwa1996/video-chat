import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import dashboard1 from '../../assets/images/dashboard1.png';
import dashboard2 from '../../assets/images/dashboard2.png';
import styles from './Dashboard.module.scss';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Card
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              boxShadow: ' 0 4px 8px 0 rgba(0, 0, 0, 0.2)',
              padding: '4%',
            }}
          >
            <img src={dashboard1} alt='meeting' width={200} height={200} />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                Create Meeting
              </Typography>
              <Typography variant='body2'>
                Create a new meeting and invite people.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size='medium'
                onClick={() => navigate('/create')}
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
              padding: '4%',
            }}
          >
            <img src={dashboard2} alt='meeting' width={200} height={200} />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                My Meetings
              </Typography>
              <Typography variant='body2'>
                View your created meetings and connect.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size='medium'
                onClick={() => navigate('/mymeetings')}
                color='primary'
                variant='contained'
              >
                View meetings
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
