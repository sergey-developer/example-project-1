import React from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as DoneIcon } from 'assets/icons/steps/DoneIcon.svg';
import { ReactComponent as InfoCircleIcon } from 'assets/icons/steps/InfoCircle.svg';
import { ReactComponent as ListCheck } from 'assets/icons/steps/ListCheck.svg';
import { ReactComponent as MapPin } from 'assets/icons/steps/MapPin.svg';
import { ReactComponent as NameTag } from 'assets/icons/steps/NameTag.svg';
import { CreateProviderSteps } from 'state/ducks/createProvider';

import {
  Container,
  Delimiter,
  IconContainer,
  StepCount,
  StepInfoW,
  StepItem,
  StepLabel,
  StepsList
} from './Steps.styled';

const stepsIconList = [<MapPin />, <ListCheck />, <NameTag />, <InfoCircleIcon />];

interface StepsProps {
  className?: string;
  step: CreateProviderSteps;
}

const Steps: React.FC<StepsProps> = ({ className, step }) => {
  const [translation] = useTranslation('provider-pages');
  const t = (key: string, option?: any) =>
    translation(`createProviderPage.${key}`, option);

  const stepsList = (t('createSteps', {
    returnObjects: true
  }) as unknown) as string[];

  return (
    <Container className={className}>
      <StepsList>
        {stepsList.map((item, index) => {
          const activeStep = index <= step;
          const doneStep = index < step;

          return (
            <React.Fragment key={item}>
              <StepItem>
                <IconContainer active={activeStep} done={doneStep}>
                  {doneStep ? <DoneIcon /> : stepsIconList[index]}
                </IconContainer>
                <StepInfoW>
                  <StepCount>{t('stepLabel', { count: index + 1 })}</StepCount>
                  <StepLabel>{item}</StepLabel>
                </StepInfoW>
              </StepItem>
              {index + 1 !== stepsList?.length && (
                <Delimiter active={activeStep} done={doneStep} />
              )}
            </React.Fragment>
          );
        })}
      </StepsList>
    </Container>
  );
};

export default Steps;
