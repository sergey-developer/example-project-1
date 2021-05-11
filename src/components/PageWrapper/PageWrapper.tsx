import React from 'react';

import { Typography } from '../Typography';
import { Container, Header } from './PageWrapper.styled';

type PageWrapperProps = {
  title: React.ReactNode;
  subTitle?: React.ReactNode;
  titleIcon?: React.ReactNode;
  button?: React.ReactNode;
  className?: string;
  maxWidth?: number;
};

const PageWrapper: React.FC<PageWrapperProps> = ({
  title,
  button,
  className,
  titleIcon,
  children,
  subTitle,
  maxWidth
}) => {
  return (
    <Container className={className} maxWidth={maxWidth}>
      <Header>
        <Typography variant='h2' tag='h1' leftIcon={titleIcon}>
          {title}
        </Typography>

        {button}
      </Header>

      {subTitle && (
        <Typography spacingBottom={2} variant='label' color='greyThree'>
          {subTitle}
        </Typography>
      )}

      {children}
    </Container>
  );
};

export default PageWrapper;
