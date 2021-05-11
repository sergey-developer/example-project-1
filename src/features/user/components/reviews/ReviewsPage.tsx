import React from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as EllipsisCircleIcon } from 'assets/icons/EllipsisCircleIcon.svg';
import { ReactComponent as TrashCanIcon } from 'assets/icons/TrashCanIcon.svg';
import { Button } from 'components/Buttons';
import { EmptyState } from 'components/EmptyState';
import { PageWrapper } from 'components/PageWrapper';
import { PopoverMenu } from 'components/Popover';
import { Toolbar as ReviewsToolbar } from 'components/Reviews';
import { ReviewList, ReviewListItem } from 'components/Reviews/ReviewList';
import { SelectOptionType } from 'components/Select';
import { Spinner } from 'components/Spinner';
import { Typography } from 'components/Typography';
import { LanguageEnum } from 'config/i18n';
import { useVisible } from 'shared/hooks';
import { Nullable } from 'shared/types';
import { ReviewDataResponseDto, ReviewsSortOrderUnion } from 'shared/types/generate';
import { getDate, getStatus } from 'shared/utils';
import { UserReviewsState } from 'state/ducks/userReviews';

import { GetAllUserReviewsFilter } from '../../services';

const TextFieldModal = React.lazy(
  () => import('components/Modals/TextFieldModal/TextFieldModal')
);

const BaseAcceptModal = React.lazy(
  () => import('components/Modals/BaseAcceptModal')
);

type ReviewsPageProps = {
  reviews: UserReviewsState['data'];
  loading: UserReviewsState['loading'];
  error: UserReviewsState['error'];
  filter: GetAllUserReviewsFilter;
  userAvatarUrl: string;
  onDelete: (reviewId: string) => void;
  onEdit: (reviewId: string, comment: string) => void;
  onSearch: (value: string) => void;
  onSort: (value: ReviewsSortOrderUnion) => void;
};

const ReviewsPage: React.FC<ReviewsPageProps> = ({
  filter,
  userAvatarUrl,
  reviews,
  loading,
  error,
  onDelete,
  onEdit,
  onSearch,
  onSort
}) => {
  const { t, i18n } = useTranslation('user-reviews');

  const [editModalOpened, openEditModal, closeEditModal] = useVisible();
  const [deleteModalOpened, openDeleteModal, closeDeleteModal] = useVisible();

  const [selectionIsActive, setSelectionActive] = React.useState(false);
  const [selectedReviewsIds, setSelectedReviewsIds] = React.useState<string[]>([]);
  const [review, setReview] = React.useState<Nullable<ReviewDataResponseDto>>(null);

  const hasReviews = !!reviews?.length;

  const isLoading = loading !== 'finished';
  const isError = !!error;

  const resetSelectedReviewsIds = () => {
    setSelectedReviewsIds([]);
  };

  const handleSelect = (review: ReviewListItem, isSelected: boolean) => {
    isSelected
      ? setSelectedReviewsIds(prev => [...prev, review.id])
      : setSelectedReviewsIds(prev => prev.filter(id => id !== review.id));
  };

  const toggleSelectionActive = () => {
    if (selectionIsActive) {
      setSelectionActive(false);
      resetSelectedReviewsIds();
    } else {
      setSelectionActive(true);
    }
  };

  const handleOpenDeleteModal = (review: ReviewDataResponseDto) => {
    setReview(review);
    openDeleteModal();
  };

  const handleCloseDeleteModal = () => {
    if (review) {
      setReview(null);
    }

    closeDeleteModal();
  };

  const handleDeleteOne = () => {
    if (!review?.id) return;

    onDelete(review.id);
    handleCloseDeleteModal();
  };

  const handleDeleteMultiple = () => {
    if (!selectedReviewsIds.length) return;

    selectedReviewsIds.forEach(reviewId => {
      onDelete(reviewId);
    });

    resetSelectedReviewsIds();
    closeDeleteModal();
  };

  const handleOpenEditModal = (review: ReviewDataResponseDto) => {
    setReview(review);
    openEditModal();
  };

  const handleCloseEditModal = () => {
    setReview(null);
    closeEditModal();
  };

  const handleEdit = (comment: string) => {
    if (!review?.id) return;

    onEdit(review.id, comment.trim());
    handleCloseEditModal();
  };

  const handleSort = (option: Nullable<SelectOptionType>) => {
    if (!option) return;

    onSort(option.value);
  };

  const renderShowAllMessage = React.useCallback(
    (hasInitialHeight: boolean): string => {
      return hasInitialHeight ? t('review.showAll') : t('review.hideAll');
    },
    [t]
  );

  const reviewList: ReviewListItem[] = React.useMemo(() => {
    return hasReviews
      ? reviews!.map(review => {
          const status =
            typeof review.status === 'number' ? getStatus(review.status) : undefined;

          const statusText =
            status === 'published'
              ? t('review.status.published')
              : status === 'moderation'
              ? t('review.status.moderation')
              : undefined;

          return {
            id: review.id || '',
            name: review.reviewer || '',
            avatarSrc: userAvatarUrl,
            comment: review.comment || '',
            date: review.date
              ? getDate(review.date, i18n.language as LanguageEnum)
              : undefined,
            rating: review.score || 0,
            status,
            statusText,
            replies: review.reply
              ? [
                  {
                    name: t('reply.title'),
                    comment: review.reply.comment || '',
                    date: review.reply.date
                      ? getDate(review.reply.date, i18n.language as LanguageEnum)
                      : undefined
                  }
                ]
              : [],
            actions: [
              <PopoverMenu menuComponent={<EllipsisCircleIcon />}>
                <Typography
                  variant='default'
                  color='glacier'
                  onClick={() => handleOpenEditModal(review)}
                >
                  {t('review.actions.edit')}
                </Typography>

                <Typography
                  variant='default'
                  color='warn'
                  onClick={() => handleOpenDeleteModal(review)}
                >
                  {t('review.actions.delete')}
                </Typography>
              </PopoverMenu>
            ]
          };
        })
      : [];
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
    <PageWrapper
      title={t('pageTitle')}
      button={
        <Button variant='primary' onClick={() => toggleSelectionActive()}>
          {selectionIsActive ? t('cancelSelectReviewsBtn') : t('selectReviewsBtn')}
        </Button>
      }
    >
      {deleteModalOpened && (
        <React.Suspense fallback={<Spinner size='md' overScreen />}>
          <BaseAcceptModal
            maxWidth={60}
            title={t('modals.delete.title', {
              review: t('modals.delete.review', {
                count: !review && selectedReviewsIds.length > 1 ? 2 : 1
              })
            })}
            subTitle={t('modals.delete.subTitle')}
            onClose={handleCloseDeleteModal}
            action={
              <>
                <Button
                  variant='warn'
                  spaceRight={1.5}
                  onClick={review ? handleDeleteOne : handleDeleteMultiple}
                >
                  {t('modals.delete.deleteBtn')}
                </Button>
                <Button variant='additional' onClick={handleCloseDeleteModal}>
                  {t('modals.delete.cancelBtn')}
                </Button>
              </>
            }
          />
        </React.Suspense>
      )}

      {editModalOpened && (
        <React.Suspense fallback={<Spinner size='md' overScreen />}>
          <TextFieldModal
            title={t('modals.edit.title')}
            subTitle={review?.reviewer || ''}
            text={review?.comment || ''}
            onSave={handleEdit}
            onClose={handleCloseEditModal}
            onCancel={handleCloseEditModal}
            saveBtnLabel={t('modals.edit.saveBtn')}
            cancelBtnLabel={t('modals.edit.cancelBtn')}
          />
        </React.Suspense>
      )}

      <ReviewsToolbar
        // searchPlaceholder={t('toolbar.searchField')}
        // onSearch={onSearch}
        onSort={handleSort}
        sortValue={filter.Order}
        isLoading={isLoading}
        extraLeft={
          selectionIsActive ? (
            <Typography
              variant='subTitleTwo'
              leftIcon={<TrashCanIcon />}
              cursor='pointer'
              onClick={!!selectedReviewsIds.length ? openDeleteModal : undefined}
            >
              {t('toolbar.deleteBtn')}
            </Typography>
          ) : undefined
        }
      />

      {isLoading ? (
        <Spinner size='lg' fullwidth />
      ) : (
        <ReviewList
          reviews={reviewList}
          isSelectable={selectionIsActive}
          onSelect={handleSelect}
          showAllMessage={renderShowAllMessage}
        />
      )}
    </PageWrapper>
  );
};

export default ReviewsPage;
