import 'react-circular-progressbar/dist/styles.css';

import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useTheme } from 'styled-components';
import styled, { css } from 'styled-components/macro';

const CircularProgressbarStyled = styled(CircularProgressbar)`
  & .CircularProgressbar-text {
    font-weight: 600;
  }
`;

interface CircleProgressProps {
  percent: number;
  className?: string;
}

const CircleProgress: React.FC<CircleProgressProps> = ({ percent, className }) => {
  const theme = useTheme();

  return (
    <CircularProgressbarStyled
      value={percent}
      className={className}
      text={`${percent}%`}
      strokeWidth={12}
      styles={buildStyles({
        textColor: theme.colors.black,
        textSize: theme.fonts.h2.fontSize,
        pathColor: theme.colors.lightGreen,
        trailColor: theme.colors.wildSand
      })}
    />
  );
};

export default CircleProgress;
