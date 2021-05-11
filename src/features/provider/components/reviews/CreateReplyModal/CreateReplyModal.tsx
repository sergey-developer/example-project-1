import React from 'react';

import { Modal, ModalProps } from 'components/Modals';
import { ReviewListItem } from 'components/Reviews/ReviewList';
import { Review } from 'components/Reviews/ReviewList/Review';
import { ReviewListProps } from 'components/Reviews/ReviewList/ReviewList/ReviewList';

import CreateReplyForm, {
  FormValues as CreateReplyFormValues
} from '../CreateReplyForm/CreateReplyForm';
import { Container } from './CreateReplyModal.styled';

type CreateReplyModalProps = Omit<ModalProps, 'actions' | 'children'> &
  Pick<ReviewListProps, 'showAllMessage'> & {
    review: ReviewListItem;
    onSubmit: (reviewId: string, values: CreateReplyFormValues) => void;
  };

const CreateReplyModal: React.FC<CreateReplyModalProps> = ({
  review,
  onSubmit,
  showAllMessage,
  ...props
}) => {
  const { actions, ...theReview } = review;

  const handleSubmit = (values: CreateReplyFormValues) => {
    onSubmit(review.id, values);
  };

  return (
    <Modal maxWidth={60} {...props}>
      <Container>
        <Review {...theReview} showAllMessage={showAllMessage} />

        <CreateReplyForm onSubmit={handleSubmit} />
      </Container>
    </Modal>
  );
};

export default CreateReplyModal;
