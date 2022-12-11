import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { signOut } from 'firebase/auth';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { firebaseAuth } from '../../utils/firebaseConfig';
import { resetUser } from '../../store/Auth/AuthSlice';
import useAuth from '../../hooks/useAuth';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = useAppSelector((state) => state?.authentication?.userInfo);
  useAuth();

  const logout = () => {
    dispatch(resetUser());
    signOut(firebaseAuth);
    navigate('/login');
  };

  return (
    <>
      <AppBar
        component='nav'
        position='static'
        style={{
          backgroundColor: 'transparent',
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <Toolbar
          style={{
            backgroundColor: 'transparent',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={() => navigate('/')}
          >
            <Typography
              variant='h4'
              style={{ color: '#fff', fontWeight: 'bold' }}
            >
              Zoom
            </Typography>
          </IconButton>
          {userName && (
            <>
              <Typography variant='h5'>Hello, {userName.name}</Typography>
              <IconButton
                color='inherit'
                aria-label='open drawer'
                size='medium'
                edge='start'
                onClick={logout}
              >
                <Typography variant='h4' style={{ color: '#fff' }}>
                  <MeetingRoomIcon />
                </Typography>
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
