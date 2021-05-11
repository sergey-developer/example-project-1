import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from 'components/Buttons';
import { EmptyState } from 'components/EmptyState';
import { BaseAcceptModal } from 'components/Modals';
import { PageWrapper } from 'components/PageWrapper';

import ReferralsItem from './components/ReferralsItem';
import {
  AddReferralsForm,
  ReferralsEmpty,
  ReferralsList,
  ReferralsListItem,
  ReferralsPagination
} from './ReferralsPage.styled';

interface ReferralsPageProps {}

const testItem = {
  userName: 'Margaret Dabbs',
  email: 'PleinPh@gmail.com'
};

const ReferralsPage: React.FC<ReferralsPageProps> = ({}) => {
  const [translation] = useTranslation(['provider-pages', 'modals']);
  const t = (key: string) => translation(`referralsPage.${key}`);

  const items = new Array(8).fill(testItem) as typeof testItem[];

  return (
    <PageWrapper title={t('title')} maxWidth={94}>
      <BaseAcceptModal
        open={false}
        title={translation('modals:inviteReferralsModal.title', {
          email: 'test@mail.com'
        })}
        action={
          <>
            <Button $size='small' spaceRight={1.2} variant='primary'>
              {translation('modals:inviteReferralsModal.okBtnLabel')}
            </Button>
            <Button $size='small' variant='additional'>
              {translation('modals:inviteReferralsModal.cancelBthLabel')}
            </Button>
          </>
        }
      />
      <AddReferralsForm />
      {items.map((item, index) => (
        <ReferralsList key={index}>
          <ReferralsListItem>
            <ReferralsItem />
          </ReferralsListItem>
        </ReferralsList>
      ))}
      {/* <ReferralsEmpty message={t('emptyMessage')} /> */}

      <ReferralsPagination />
    </PageWrapper>
  );
};

export default ReferralsPage;
