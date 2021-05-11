import styled from 'styled-components/macro';

export const Container = styled.label`
  position: relative;

  width: 20px;
  height: 20px;

  display: block;

  cursor: pointer;
`;

export const Checkmark = styled.span`
  position: absolute;
  top: 0;
  left: 0;

  height: inherit;
  width: inherit;

  border: 2px solid #f83f20;
  border-radius: 30%;

  &:after {
    content: '';
    display: none;
    position: absolute;

    left: 5.2px;
    top: 1.7px;

    width: 6px;
    height: 10px;

    border: solid #f83f20;
    border-width: 0 2.5px 2.5px 0;
    border-radius: 20%;

    transform: rotate(45deg);
  }
`;

export const Input = styled.input`
  position: absolute;

  opacity: 0;
  cursor: pointer;

  height: 0;
  width: 0;

  &:checked {
    & ~ ${Checkmark} {
      &:after {
        display: block;
      }
    }
  }
`;
