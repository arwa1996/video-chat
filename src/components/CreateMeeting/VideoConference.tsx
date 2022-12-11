import React, { useState } from 'react';
import CreateMeetingButtons from '../../components/FormComponents/CreateMeetingButtons';
import MeetingDateField from '../../components/FormComponents/MeetingDateField';
import MeetingNameField from '../../components/FormComponents/MeetingNameFIeld';
import MeetingUserField from '../../components/FormComponents/MeetingUserField';

import moment from 'moment';
import { UserType } from '../../utils/types';
import useFetchUsers from '../../hooks/useFetchUsers';
import { useNavigate } from 'react-router-dom';
import { addDoc } from 'firebase/firestore';
import { useAppSelector } from '../../store/hooks';
import { meetingsRef } from '../../utils/firebaseConfig';
import styles from './CreateMeetings.module.scss';
import { useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import { Card, IconButton, Snackbar } from '@material-ui/core';
import { Stack } from '@mui/material';

const VideoConference = () => {
  const navigate = useNavigate();
  const uid = useAppSelector((state) => state.authentication.userInfo?.uid);
  const { handleSubmit } = useForm<UserType>();

  const [users] = useFetchUsers();
  const [meetingName, setMeetingName] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserType[]>([]);
  const [startDate, setStartDate] = useState(moment());
  const [toast, setToast] = useState<boolean>(false);

  const onUserChange = (value: UserType[] | UserType) => {
    setSelectedUser(value as UserType[]);
  };

  const createMeeting = async () => {
    const meetingId = uuid();
    if (selectedUser.length <= 3) {
      await addDoc(meetingsRef, {
        createdBy: uid,
        meetingId,
        meetingName,
        meetingType: 'video-conference',
        invitedUsers: selectedUser.map((user: UserType) => user.uid),
        meetingDate: startDate.format('L'),
        maxUsers: 4,
        status: true,
      });
    } else {
      alert('Please select up to 3 ppl only');
    }
    navigate('/');
  };

  const submit = () => {
    createMeeting();
  };

  const handleClose = () => {
    setToast(false);
  };

  const action = (
    <>
      <IconButton
        size='small'
        aria-label='close'
        color='inherit'
        onClick={handleClose}
      >
        close
      </IconButton>
    </>
  );

  return (
    <>
      <div className={styles.meetingContainer}>
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
          <form onSubmit={handleSubmit(submit)} className={styles.cForm}>
            <Stack spacing={2}>
              <MeetingNameField
                label='Meeting name'
                placeholder='Meeting name'
                value={meetingName}
                setMeetingName={setMeetingName}
              />

              <MeetingUserField
                label='User'
                options={users}
                onChange={onUserChange}
                selectedOptions={selectedUser}
                multiple={true}
                isClearable={false}
                placeholder='Select a User'
              />
              <MeetingDateField
                selected={startDate}
                setStartDate={setStartDate}
              />
              <CreateMeetingButtons createMeeting={() => setToast(true)} />
            </Stack>
          </form>
          <Snackbar
            open={toast}
            autoHideDuration={6000}
            onClose={handleClose}
            message='Meeting has been created successfully'
            action={action}
          />
        </Card>
      </div>
    </>
  );
};

export default VideoConference;
