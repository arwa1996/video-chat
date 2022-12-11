import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../store/Auth/AuthSlice';
import { firebaseAuth } from '../utils/firebaseConfig';

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) navigate('/login');
      else {
        dispatch(
          setUser({
            uid: currentUser.uid,
            email: currentUser.email!,
            name: currentUser.displayName!,
          })
        );
      }
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useAuth;
