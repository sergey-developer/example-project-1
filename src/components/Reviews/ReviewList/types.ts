import { ReactElement } from 'react';

export type ReviewListItemStatusUnion =
  | 'published'
  | 'moderation'
  | 'declined'
  | 'removed';

export type ReviewReplyListItem = Pick<
  ReviewListItem,
  'name' | 'comment' | 'date' | 'avatarSrc' | 'actions'
>;

export type ReviewListItem = {
  id: string;
  name: string;
  comment: string;
  replies: ReviewReplyListItem[];
  avatarSrc?: string;
  date?: string;
  rating?: number;
  status?: ReviewListItemStatusUnion;
  statusText?: string;
  actions?: ReactElement[];
};
