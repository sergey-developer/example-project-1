import styled, { css } from 'styled-components/macro';

import { Button } from 'components/Buttons';
import { BasketIcon, DropIcon, PenIcon } from 'components/Icons';
import { ImageDropDown } from 'components/ImageDd';

export const Container = styled.div``;

export const List = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const Item = styled.li<{ $open: boolean; $noImage?: boolean }>`
  ${({ theme, $open, $noImage }) => css`
    border: 0.1rem solid ${theme.colors.whiteLilac};
    transition: all 0.3s;
    border-radius: 0.5rem;
    position: relative;
    min-height: 6.6rem;

    padding: 0.8rem 9.2rem 1.35rem 7.8rem;
    margin-bottom: 1rem;
    &:last-child {
      margin-bottom: 0;
    }
    ${$open &&
    css`
      min-height: 15.4rem;
      padding: 1.2rem 9.2rem 1.2rem 15.8rem;
      box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.08), 0px 2px 24px rgba(0, 0, 0, 0.08);
    `}
    ${$noImage &&
    css`
      padding-left: 2rem;
    `}
  `}
`;

export const ImageDd = styled(ImageDropDown)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 1.2rem;
`;

export const InfoWrapper = styled.div`
  width: 100%;
  min-height: 4.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  &.open {
    justify-content: space-between;
  }
`;

export const ActionWrapper = styled.div<{ $open: boolean }>`
  ${({ $open }) => css`
    width: 9.2rem;
    padding: 1.2rem 1.2rem 1.2rem 1.6rem;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${$open &&
    css`
      align-items: flex-start;
    `}
  `}
`;

const bthStyle = css`
  cursor: pointer;
`;

export const EditBtn = styled(PenIcon)`
  ${bthStyle}
`;

export const DropBth = styled(DropIcon)`
  ${bthStyle}
`;

export const DeleteBtn = styled(BasketIcon)`
  ${bthStyle}
`;

export const AddNewItem = styled(Button).attrs({
  fullWidth: true,
  variant: 'light'
})`
  margin-top: 1rem;
`;
