import { Session } from 'next-auth';

export type ExtendedSession = Session & {
  profileId?: string;
  id?: string;
  name?: string;
};
