import React from 'react';
import { useTranslation } from 'react-i18next';
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';

import { ArrowIcon } from 'components/Icons';

import { Container, PageChangeBtn } from './Pagination.styled';

interface PaginationProps {
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({ className }) => {
  const [translation] = useTranslation('common');
  const t = (key: string) => translation(`pagination.${key}`);
  return (
    <Container className={className}>
      <ReactPaginate
        previousLabel={
          <PageChangeBtn icon={<ArrowIcon direction='left' />}>
            {t('previousBtnLabel')}
          </PageChangeBtn>
        }
        nextLabel={
          <PageChangeBtn endIcon={<ArrowIcon direction='right' />}>
            {t('nextPageBtnLabel')}
          </PageChangeBtn>
        }
        breakLabel={'...'}
        pageClassName='pages'
        breakClassName={'break'}
        pageCount={30}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={console.log}
        containerClassName={'page-paginate'}
        activeClassName={'active'}
      />
    </Container>
  );
};

export default Pagination;
