import { getDocs, query, where, doc, deleteDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../../store/hooks';
import { meetingsRef, firebaseDB } from '../../utils/firebaseConfig';
import { MeetingType } from '../../utils/types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {
  Card,
  Table,
  TableContainer,
  TableRow,
  TableBody,
  TableHead,
  Paper,
  Chip,
  IconButton,
} from '@material-ui/core';
import TableCell from '@mui/material/TableCell';
import styles from './MyMeetings.module.scss';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { config } from '../../utils/config';

const MyMeetings = () => {
  const [meetings, setMeetings] = useState<Array<MeetingType>>([]);
  const uid = useAppSelector((state) => state.authentication.userInfo?.uid);
  const getMyMeetings = async () => {
    //get meeting by whoever created using uid
    if (uid) {
      const firestoreQuery = query(meetingsRef, where('createdBy', '==', uid));
      const fetchedMeetings = await getDocs(firestoreQuery);
      if (fetchedMeetings.docs.length) {
        const myMeetings: Array<MeetingType> = [];
        fetchedMeetings.forEach((meeting) => {
          myMeetings.push({
            docId: meeting.id,
            ...(meeting.data() as MeetingType),
          });
        });
        setMeetings(myMeetings);
      } else setMeetings([]);
    }
  };

  useEffect(() => {
    getMyMeetings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);

  const copyMeeting = (meetingId: string) => {
    return (
      <CopyToClipboard
        text={`${window.location.origin}/join/${meetingId}`}
        onCopy={() => (
          <IconButton
            color='inherit'
            aria-label='open drawer'
            size='medium'
            edge='start'
          >
            <ContentCopyIcon />
          </IconButton>
        )}
      >
        <IconButton
          color='inherit'
          aria-label='open drawer'
          size='medium'
          edge='start'
        >
          <ContentCopyIcon />
        </IconButton>
      </CopyToClipboard>
    );
  };

  const deleteMeeting = (meeting: string | undefined) => {
    return (
      <IconButton
        color='inherit'
        aria-label='open drawer'
        size='medium'
        edge='start'
        onClick={async () => {
          meeting && (await deleteDoc(doc(firebaseDB, 'meetings', meeting)));
          getMyMeetings();
        }}
      >
        <DeleteOutlineIcon />
      </IconButton>
    );
  };

  const meetingStatus = (meeting: MeetingType) => {
    if (meeting.status) {
      if (meeting.meetingDate === moment().format('L')) {
        return (
          <Link
            to={`/join/${meeting.meetingId}`}
            style={{
              color: 'black',
              textDecoration: 'none',
            }}
          >
            <Chip
              label='Join Now'
              color='primary'
              style={{
                cursor: 'pointer',
                backgroundColor: 'green',
                fontWeight: 'bold',
              }}
            />
          </Link>
        );
      } else if (moment(meeting.meetingDate).isBefore(moment().format('L'))) {
        return (
          <Chip
            label='Ended'
            color='default'
            style={{
              color: 'white',
              backgroundColor: 'darkgray',
              fontWeight: 'bold',
            }}
          />
        );
      } else if (moment(meeting.meetingDate).isAfter()) {
        return (
          <Chip
            label='Upcomming'
            color='primary'
            style={{
              fontWeight: 'bold',
            }}
          />
        );
      }
    } else
      return (
        <Chip
          label='Canceled'
          color='secondary'
          style={{
            fontWeight: 'bold',
          }}
        />
      );
  };

  return (
    <>
      <div className={styles.container}>
        <Card
          style={{
            display: 'flex',
            padding: '2%',
            justifyContent: 'center',
            alignItems: 'center',
            width: '90%',
            flexDirection: 'column',
            boxShadow: ' 0 4px 8px 0 rgba(255, 255, 255, 0.218)',
          }}
        >
          <TableContainer component={Paper}>
            <Table aria-label='customized table'>
              <TableHead>
                <TableRow style={{ backgroundColor: '#003B54' }}>
                  <TableCell style={{ color: '#fff' }}>Meeting Name</TableCell>
                  <TableCell style={{ color: '#fff' }} align='center'>
                    Meeting Type
                  </TableCell>
                  <TableCell align='right' style={{ color: '#fff' }}>
                    Meeting Date
                  </TableCell>
                  <TableCell align='center' style={{ color: '#fff' }}>
                    Status
                  </TableCell>
                  <TableCell align='center' style={{ color: '#fff' }}>
                    Copy
                  </TableCell>
                  <TableCell align='center' style={{ color: '#fff' }}>
                    Delete
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {meetings.map((meeting) => (
                  <TableRow key={meeting.meetingId}>
                    <TableCell component='th' scope='row'>
                      {meeting.meetingName}
                    </TableCell>
                    <TableCell align='center'>{meeting.meetingType}</TableCell>
                    <TableCell align='right'>{meeting.meetingDate}</TableCell>
                    <TableCell align='center'>
                      {meetingStatus(meeting)}
                    </TableCell>
                    <TableCell align='center'>
                      {copyMeeting(meeting.meetingId)}
                    </TableCell>
                    <TableCell align='center'>
                      {deleteMeeting(meeting?.docId)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </div>
    </>
  );
};

export default MyMeetings;
