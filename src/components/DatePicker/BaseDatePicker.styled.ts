import styled, { css } from 'styled-components/macro';

export const DatePickerWrapper = styled.div<{
  hasValue: boolean;
  isReadonly: boolean;
  hasBorder: boolean;
}>`
  ${({ theme, hasValue, isReadonly, hasBorder }) => css`
    & .react-date-picker {
      width: 100%;
      height: 4.6rem;
      border: 1px solid ${hasBorder ? theme.colors.grayChateau : 'transparent'};
      border-radius: ${theme.common.inputBorderRadius};

      &:hover {
        border: 1px solid ${theme.colors.grayChateau};
      }

      &:focus-within {
        border: 1px solid ${theme.colors.lightGreen};
      }

      &--disabled {
        background-color: unset;

        ${isReadonly
          ? css`
              color: black;
            `
          : css`
              background-color: #f4f4f4;
              border: 1px solid transparent;
            `}
      }

      &__wrapper {
        padding: 0 1.5rem;
        border: none;
      }

      &__inputGroup {
        padding: 0;

        ${theme.fonts.subTitleTwo}

        &__input {
          outline: none;

          &:invalid {
            background: none;
          }

          &:disabled {
            ${isReadonly &&
            css`
              color: black;
            `}
          }
        }

        &__day {
          &::placeholder {
            color: ${theme.colors.grayChateau};
          }
        }

        ${!hasValue &&
        css`
          &__divider,
          &__month,
          &__year {
            display: none;
          }
        `}
      }

      &__calendar {
        width: 30rem;
        top: 102% !important;
        left: -1px !important;
      }

      & .react-calendar {
        border: none;
        border-radius: 5px 5px 0 0;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);

        &__tile {
          height: 4rem;
          ${theme.fonts.caption}
          color: black;

          &:enabled:hover,
          &:enabled:focus {
            background-color: #f4f4f4;
          }

          &--now {
            background-color: unset;
          }

          &--active {
            color: white;
            background-color: ${theme.colors.glacier};

            &:enabled:hover {
              background-color: ${theme.colors.glacier};
            }

            &:hover,
            &:focus {
              background-color: ${theme.colors.glacier} !important;
            }
          }
        }

        &__month-view {
          &__days__day {
            &--weekend {
              color: ${theme.colors.warn};
            }

            &--neighboringMonth {
              color: ${theme.colors.grayChateau};
            }
          }

          &__weekdays__weekday {
            ${theme.fonts.caption}

            color: #5d6267;

            abbr[title] {
              text-decoration: underline;
            }
          }
        }

        &__navigation {
          &__arrow {
            font-size: 2.3rem;
            color: ${theme.colors.glacier};
          }

          & button:enabled:hover,
          button:enabled:focus {
            background-color: unset;
          }

          &__label__labelText {
            ${theme.fonts.subTitleTwo}
          }
        }
      }
    }
  `}
`;
