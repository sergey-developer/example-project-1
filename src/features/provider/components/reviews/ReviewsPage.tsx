import React from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as EllipsisCircleIcon } from 'assets/icons/EllipsisCircleIcon.svg';
import { Button } from 'components/Buttons';
import { EmptyState } from 'components/EmptyState';
import { PageWrapper } from 'components/PageWrapper';
import { PopoverMenu } from 'components/Popover';
import { Toolbar as ReviewsToolbar } from 'components/Reviews';
import {
  ReviewList,
  ReviewListItem,
  ReviewReplyListItem
} from 'components/Reviews/ReviewList';
import { SelectOptionType } from 'components/Select';
import { Spinner } from 'components/Spinner';
import { Typography } from 'components/Typography';
import { LanguageEnum } from 'config/i18n';
import { useVisible } from 'shared/hooks';
import { Nullable } from 'shared/types';
import {
  CreateReplyRequestDto,
  ReviewDataResponseDto,
  ReviewsSortOrderUnion
} from 'shared/types/generate';
import { getDate } from 'shared/utils';
import { ProviderReviewsState } from 'state/ducks/providerReviews';

import { GetAllProviderReviewsFilter } from '../../services/ProviderReviewsApi';
import { FormValues as CreateReplyFormValues } from './CreateReplyForm/CreateReplyForm';
import { ReplyButton } from './ReviewsPage.styled';

const CreateReplyModal = React.lazy(
  () => import('./CreateReplyModal/CreateReplyModal')
);

const TextFieldModal = React.lazy(
  () => import('components/Modals/TextFieldModal/TextFieldModal')
);

const BaseAcceptModal = React.lazy(
  () => import('components/Modals/BaseAcceptModal')
);

type ReviewsPageProps = {
  reviews: ProviderReviewsState['data'];
  loading: ProviderReviewsState['loading'];
  error: ProviderReviewsState['error'];
  filter: GetAllProviderReviewsFilter;
  onCreateReply: (reviewId: string, reply: CreateReplyRequestDto) => void;
  onEditReply: (reviewId: string, comment: string) => void;
  onDeleteReply: () => void;
  onSearch: (value: string) => void;
  onSort: (value: ReviewsSortOrderUnion) => void;
};

const ReviewsPage: React.FC<ReviewsPageProps> = ({
  reviews,
  loading,
  error,
  filter,
  onCreateReply,
  onEditReply,
  onDeleteReply,
  onSearch,
  onSort
}) => {
  const { t, i18n } = useTranslation('provider-reviews');

  const [review, setReview] = React.useState<Nullable<ReviewListItem>>(null);

  const [reply, setReply] = React.useState<
    Nullable<ReviewReplyListItem & { reviewId: string }>
  >(null);

  const [
    createReplyModalOpened,
    openCreateReplyModal,
    closeCreateReplyModal
  ] = useVisible();

  const [
    editReplyModalOpened,
    openEditReplyModal,
    closeEditReplyModal
  ] = useVisible();

  const [
    deleteReplyModalOpened,
    openDeleteReplyModal,
    closeDeleteReplyModal
  ] = useVisible();

  const [
    contactUserModalOpened,
    openContactUserModal,
    closeContactUserModal
  ] = useVisible();

  const [
    contactModeratorModalOpened,
    openContactModeratorModal,
    closeContactModeratorModal
  ] = useVisible();

  const [
    messageSentModalOpened,
    openMessageSentModal,
    closeMessageSentModal
  ] = useVisible();

  const hasReviews = !!reviews?.length;

  const isLoading = loading !== 'finished';
  const isError = !!error;

  const renderShowAllMessage = React.useCallback(
    (hasInitialHeight: boolean): string => {
      return hasInitialHeight ? t('reply.showAll') : t('reply.hideAll');
    },
    [t]
  );

  const renderRatingMessage = React.useCallback(
    (rating: number): Nullable<string> => {
      return rating < 3 ? t('review.negative') : null;
    },
    [t]
  );

  const handleSort = (option: Nullable<SelectOptionType>) => {
    if (!option) return;

    onSort(option.value);
  };

  const handleOpenCreateReplyModal = (review: ReviewListItem) => {
    setReview(review);
    openCreateReplyModal();
  };

  const handleCloseCreateReplyModal = () => {
    setReview(null);
    closeCreateReplyModal();
  };

  const handleOpenEditReplyModal = (
    reviewId: string,
    reply: ReviewReplyListItem
  ) => {
    setReply({ reviewId, ...reply });
    openEditReplyModal();
  };

  const handleCloseEditReplyModal = () => {
    setReply(null);
    closeEditReplyModal();
  };

  const handleOpenDeleteReplyModal = () => {
    // setReply(null)
    openDeleteReplyModal();
  };

  const handleCloseDeleteReplyModal = () => {
    // setReply(reply);
    closeDeleteReplyModal();
  };

  const handleOpenContactUserModal = (review: ReviewListItem) => {
    setReview(review);
    openContactUserModal();
  };

  const handleCloseContactUserModal = () => {
    setReview(null);
    closeContactUserModal();
  };

  const handleOpenContactModeratorModal = () => {
    openContactModeratorModal();
  };

  const handleCloseContactModeratorModal = () => {
    closeContactModeratorModal();
  };

  const handleCreateReply = (reviewId: string, values: CreateReplyFormValues) => {
    onCreateReply(reviewId, { replier: values.fullName, comment: values.comment });
    handleCloseCreateReplyModal();
  };

  const handleEditReply = (comment: string) => {
    if (!reply?.reviewId) return;

    onEditReply(reply.reviewId, comment.trim());
    handleCloseEditReplyModal();
  };

  const handleDeleteReply = () => {
    onDeleteReply();
    handleCloseDeleteReplyModal();
  };

  const handleContactUser = () => {
    handleCloseContactUserModal();
    openMessageSentModal();
  };

  const handleContactModerator = () => {
    handleCloseContactModeratorModal();
    openMessageSentModal();
  };

  const getReviewPopover = (review: ReviewListItem): React.ReactElement => (
    <PopoverMenu menuComponent={<EllipsisCircleIcon />}>
      <Typography
        variant='default'
        color='glacier'
        onClick={() => handleOpenContactUserModal(review)}
      >
        {t('review.actions.contactUser')}
      </Typography>

      <Typography
        variant='default'
        color='glacier'
        onClick={handleOpenContactModeratorModal}
      >
        {t('review.actions.contactModerator')}
      </Typography>
    </PopoverMenu>
  );

  const getReplyPopover = (
    reviewId: string,
    reply: ReviewReplyListItem
  ): React.ReactElement => (
    <PopoverMenu menuComponent={<EllipsisCircleIcon />}>
      <Typography
        variant='default'
        color='glacier'
        onClick={() => handleOpenEditReplyModal(reviewId, reply)}
      >
        {t('reply.actions.edit')}
      </Typography>

      <Typography
        variant='default'
        color='warn'
        onClick={handleOpenDeleteReplyModal}
      >
        {t('reply.actions.delete')}
      </Typography>
    </PopoverMenu>
  );

  const getReviewActions = (
    review: ReviewDataResponseDto,
    reviewListItem: ReviewListItem
  ): React.ReactElement[] => {
    const rating = review.score;
    const reviewHasNegativeRating = !!rating && rating < 3;
    const reviewHasReply = !!review.reply;
    const actions: React.ReactElement[] = [];

    if (!reviewHasReply) {
      actions.push(
        <ReplyButton onClick={() => handleOpenCreateReplyModal(reviewListItem)}>
          {t('review.actions.replyBtn')}
        </ReplyButton>
      );
    }

    if (reviewHasNegativeRating) {
      actions.push(getReviewPopover(reviewListItem));
    }

    return actions;
  };

  const mapReviewListItem = (review: ReviewDataResponseDto): ReviewListItem => {
    const reviewReplyListItem: ReviewReplyListItem = {
      name: t('reply.title'),
      comment: review.reply?.comment || '',
      date: review.reply?.date
        ? getDate(review.reply.date, i18n.language as LanguageEnum)
        : undefined
    };

    const reviewListItem: ReviewListItem = {
      id: review.id || '',
      name: review.reviewer || '',
      avatarSrc: undefined,
      comment: review.comment || '',
      date: review.date
        ? getDate(review.date, i18n.language as LanguageEnum)
        : undefined,
      rating: review.score,
      replies: review.reply
        ? [
            {
              ...reviewReplyListItem,
              actions: review.id
                ? [getReplyPopover(review.id, reviewReplyListItem)]
                : []
            }
          ]
        : []
    };

    reviewListItem.actions = getReviewActions(review, reviewListItem);

    return reviewListItem;
  };

  const reviewList: ReviewListItem[] = React.useMemo(() => {
    return hasReviews ? reviews!.map(mapReviewListItem) : [];
  }, [hasReviews, t, i18n.language, reviews]);

  if (!isLoading) {
    if (isError) {
      return <div>Error: {error}</div>;
    } else {
      if (!hasReviews) {
        return <EmptyState message={t('noReviews')} />;
      }
    }
  }

  return (
    <PageWrapper title={t('pageTitle')}>
      {createReplyModalOpened && review ? (
        <React.Suspense fallback={<Spinner size='md' overScreen />}>
          <CreateReplyModal
            title={t('modals.createReply.title')}
            review={review}
            onSubmit={handleCreateReply}
            showAllMessage={renderShowAllMessage}
            onClose={handleCloseCreateReplyModal}
          />
        </React.Suspense>
      ) : null}

      {editReplyModalOpened && reply ? (
        <React.Suspense fallback={<Spinner size='md' overScreen />}>
          <TextFieldModal
            title={t('modals.editReply.title')}
            subTitle={reply.name}
            text={reply.comment}
            onSave={handleEditReply}
            onCancel={handleCloseEditReplyModal}
            onClose={handleCloseEditReplyModal}
            cancelBtnLabel={t('modals.cancelBtn')}
            saveBtnLabel={t('modals.editReply.saveBtn')}
          />
        </React.Suspense>
      ) : null}

      {deleteReplyModalOpened && (
        <React.Suspense fallback={<Spinner size='md' overScreen />}>
          <BaseAcceptModal
            maxWidth={60}
            title={t('modals.deleteReply.title')}
            subTitle={t('modals.deleteReply.subTitle')}
            onClose={handleCloseDeleteReplyModal}
            action={
              <>
                <Button variant='warn' spaceRight={1.5} onClick={handleDeleteReply}>
                  {t('modals.deleteReply.deleteBtn')}
                </Button>
                <Button variant='additional' onClick={handleCloseDeleteReplyModal}>
                  {t('modals.cancelBtn')}
                </Button>
              </>
            }
          />
        </React.Suspense>
      )}

      {contactUserModalOpened && review ? (
        <React.Suspense fallback={<Spinner size='md' overScreen />}>
          <TextFieldModal
            title={t('modals.contactUser.title')}
            subTitle={review.name}
            text=''
            onSave={handleContactUser}
            onCancel={handleCloseContactUserModal}
            onClose={handleCloseContactUserModal}
            cancelBtnLabel={t('modals.cancelBtn')}
            saveBtnLabel={t('modals.sendBtn')}
          />
        </React.Suspense>
      ) : null}

      {contactModeratorModalOpened ? (
        <React.Suspense fallback={<Spinner size='md' overScreen />}>
          <TextFieldModal
            title={t('modals.contactModerator.title')}
            text=''
            onSave={handleContactModerator}
            onCancel={handleCloseContactModeratorModal}
            onClose={handleCloseContactModeratorModal}
            cancelBtnLabel={t('modals.cancelBtn')}
            saveBtnLabel={t('modals.sendBtn')}
          />
        </React.Suspense>
      ) : null}

      {messageSentModalOpened && (
        <React.Suspense fallback={<Spinner size='md' overScreen />}>
          <BaseAcceptModal
            maxWidth={60}
            title={t('modals.messageSent.title')}
            onClose={closeMessageSentModal}
            action={
              <Button variant='primary' onClick={closeMessageSentModal}>
                {t('modals.messageSent.gotItBtn')}
              </Button>
            }
          />
        </React.Suspense>
      )}

      <ReviewsToolbar
        searchPlaceholder={t('toolbar.searchField')}
        onSearch={onSearch}
        onSort={handleSort}
        sortValue={filter.Order}
        isLoading={isLoading}
      />

      {isLoading ? (
        <Spinner size='lg' fullwidth />
      ) : (
        <ReviewList
          reviews={reviewList}
          showAllMessage={renderShowAllMessage}
          ratingMessage={renderRatingMessage}
        />
      )}
    </PageWrapper>
  );
};

export default ReviewsPage;
