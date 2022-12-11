import { getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../store/hooks';
import { userRef } from '../utils/firebaseConfig';

import { UserType } from '../utils/types';

function useFetchUsers() {
  const [users, setUsers] = useState<Array<UserType>>([]);
  const uid = useAppSelector((state) => state.authentication.userInfo?.uid);

  useEffect(() => {
    if (uid) {
      const getUser = async () => {
        const firestoreQuery = query(userRef, where('uid', '!=', uid));
        const data = await getDocs(firestoreQuery);
        const firebaseUsers: Array<UserType> = [];

        data.forEach((user) => {
          const userData: UserType = user.data() as UserType;
          firebaseUsers.push({
            ...userData,
            uid: userData.uid,
          });
        });
        setUsers(firebaseUsers);
      };
      getUser();
    }
  }, [uid]);
  return [users];
}

export default useFetchUsers;
