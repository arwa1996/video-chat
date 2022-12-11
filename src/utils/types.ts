export type MeetingJoinType = 'video-conference' | '1-on-1';

export interface MeetingType {
  docId?: string;
  createdBy: string;
  invitedUsers: Array<string>;
  maxUsers: number;
  meetingDate: string;
  meetingId: string;
  meetingName: string;
  meetingType: MeetingJoinType;
  status: boolean;
}

export interface UserType {
  email: string;
  name: string;
  uid: string;
  displayName?: string;
}
