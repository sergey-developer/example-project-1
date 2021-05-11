import styled, { css } from 'styled-components/macro';

type AvatarSize = 'small';

interface AvatarImageProps {
  className?: string;
  src?: string;
  size?: AvatarSize;
}

export const AvatarImage = styled.div<AvatarImageProps>`
  ${({ theme, src, size = 'small' }) => css`
    background: ${theme.colors.grey} url('${src ?? ''}') no-repeat center;
    background-size: cover;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  `}
`;
