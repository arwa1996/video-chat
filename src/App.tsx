import { Dashboard } from './components';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import VideoPlayer from './components/MyMeetings/MyMeetings';
import CreateMeeting from './components/CreateMeeting/CreateMeeting';
import CreateOneToOneMeeting from './components/CreateMeeting/CreateOneToOneMeeting';
import VideoConference from './components/CreateMeeting/VideoConference';
import MyMeetings from './components/MyMeetings/MyMeetings';
import JoinMeeting from './components/JoinMeeting/JoinMeeting';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/meeting' element={<VideoPlayer />} />
        <Route path='/create' element={<CreateMeeting />} />
        <Route path='/create1to1' element={<CreateOneToOneMeeting />} />
        <Route path='/videoconference' element={<VideoConference />} />
        <Route path='/mymeetings' element={<MyMeetings />} />
        <Route path='/join/:id' element={<JoinMeeting />} />
      </Routes>
    </>
  );
}

export default App;
