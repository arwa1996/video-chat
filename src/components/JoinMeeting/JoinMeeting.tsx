import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { onAuthStateChanged } from 'firebase/auth';
import { getDocs, query, where } from 'firebase/firestore';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { firebaseAuth, meetingsRef } from '../../utils/firebaseConfig';
import { v4 as uuid } from 'uuid';
import { UserType } from '../../utils/types';
import { config } from '../../utils/config';

const JoinMeeting = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [isAllowed, setIsAllowed] = useState(false);
  const [user, setUser] = useState<UserType>();
  const [userLoaded, setUserLoaded] = useState(false);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser as unknown as UserType);
    }
    setUserLoaded(true);
  });
  useEffect(() => {
    const getMeetingData = async () => {
      if (params.id && userLoaded) {
        const firestoreQuery = query(
          meetingsRef,
          where('meetingId', '==', params.id)
        );
        const fetchedMeetings = await getDocs(firestoreQuery);

        if (fetchedMeetings.docs.length) {
          const meeting = fetchedMeetings.docs[0].data();
          const isCreator = meeting.createdBy === user?.uid;
          if (meeting.meetingType === '1-on-1') {
            if (meeting.invitedUsers[0] === user?.uid || isCreator) {
              if (meeting.meetingDate === moment().format('L')) {
                setIsAllowed(true);
              } else if (
                moment(meeting.meetingDate).isBefore(moment().format('L'))
              ) {
                navigate(user ? '/' : '/login');
              } else if (moment(meeting.meetingDate).isAfter()) {
                navigate(user ? '/' : '/login');
              }
            } else navigate(user ? '/' : '/login');
          } else if (meeting.meetingType === 'video-conference') {
            const index = meeting.invitedUsers.findIndex(
              (invitedUser: string) => invitedUser === user?.uid
            );
            if (index !== -1 || isCreator) {
              if (meeting.meetingDate === moment().format('L')) {
                setIsAllowed(true);
              } else if (
                moment(meeting.meetingDate).isBefore(moment().format('L'))
              ) {
                navigate(user ? '/' : '/login');
              }
            } else {
              navigate(user ? '/' : '/login');
            }
          } else {
            setIsAllowed(true);
          }
        }
      }
    };
    getMeetingData();
  }, [params.id, user, userLoaded, navigate]);

  //zegocloud

  const myMeeting = async (element: any) => {
    // generate token
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      parseInt(config.zegoCloudAppId!),
      config.zegoCloudServerSecret as string,
      params.id as string,
      user?.uid ? user.uid : uuid(),
      user?.name ? user?.name : (user?.displayName as string)
    );
    // create instance object from token
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp?.joinRoom({
      container: element,
      maxUsers: 4,
      sharedLinks: [
        {
          name: 'Personal link',
          url: window.location.origin + window.location.pathname,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    });
    console.log(zp, user);
  };

  return isAllowed ? (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        flexDirection: 'column',
      }}
    >
      <div
        className='myCallContainer'
        ref={myMeeting}
        style={{ width: '100%', height: '100vh' }}
      ></div>
    </div>
  ) : (
    <></>
  );
};

export default JoinMeeting;
