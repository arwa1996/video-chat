import logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import animation from '../../assets/images/animation.gif';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth';
import { firebaseAuth, userRef } from '../../utils/firebaseConfig';
import { addDoc, getDocs, query, where } from 'firebase/firestore';
import { setUser } from '../../store/Auth/AuthSlice';
import { Button, Typography } from '@material-ui/core';
import styles from './Login.module.scss';
import { useEffect, useState } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loggedIn, setLoggedIn] = useState<boolean>();

  onAuthStateChanged(firebaseAuth, (user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  useEffect(() => {
    if (loggedIn) {
      navigate('/');
    }
  }, [loggedIn, navigate]);

  const Login = async () => {
    // log in with google account
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName, email, uid },
    } = await signInWithPopup(firebaseAuth, provider);
    if (email) {
      //create user in data collection and check if it exests in that collection
      const firestoreQuery = query(userRef, where('uid', '==', uid));
      const fetchUsers = await getDocs(firestoreQuery);
      if (fetchUsers.docs.length === 0) {
        await addDoc(userRef, { uid, name: displayName, email });
      }
      dispatch(setUser({ uid, email: email!, name: displayName! }));
      navigate('/');
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <img src={animation} alt='logo' />
        <div className={styles.rightContainer}>
          <img src={logo} alt='logo' className={styles.logo} />
          <Typography variant='h3' gutterBottom>
            <Typography variant='h5' color='primary'>
              One Platform to connect
            </Typography>
          </Typography>
          <Button variant='contained' onClick={Login} color='primary'>
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
