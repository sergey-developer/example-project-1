import React from 'react';

import { CheckBox } from 'components/CheckBox';
import { hoursAndMinuteToSec, secToTimeForInput } from 'shared/utils';

import { Container, TimeInput } from './DayWithTime.styled';

interface DayWithTimeProps {
  className?: string;
  label: string;
  checked?: boolean;
  from: number;
  to: number;
  onFromChange?: (ms: number) => void;
  onToChange?: (ms: number) => void;
  onCheckBoxClick?: (value: boolean) => void;
}

const DayWithTime: React.FC<DayWithTimeProps> = ({
  className,
  label,
  checked,
  from,
  to,
  onFromChange = () => {},
  onToChange = () => {},
  onCheckBoxClick = () => {}
}) => {
  return (
    <Container className={className}>
      <CheckBox
        label={label}
        defaultChecked={checked}
        onClick={() => onCheckBoxClick(!checked)}
      />
      <TimeInput
        value={secToTimeForInput(from)}
        className='form-input'
        disabled={!checked}
        onChange={e => onFromChange(hoursAndMinuteToSec(String(e)))}
      />
      <TimeInput
        value={secToTimeForInput(to)}
        disabled={!checked}
        onChange={e => onToChange(hoursAndMinuteToSec(String(e)))}
      />
    </Container>
  );
};

export default DayWithTime;
