import React from 'react';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import registerCheck from '@/assets/images/check/register_check.svg';

function Success({
  mainText,
  subText1,
  subText2,
}: {
  mainText: string;
  subText1: string;
  subText2: string;
}) {
  return (
    <Component>
      <SuccessWrapper>
        <WelcomeWrapper>
          <IconWrapper>
            <CheckIcon src={registerCheck.src} />
          </IconWrapper>
          <WelcomeMessageWrapper>
            <WelcomeMainText>{mainText}</WelcomeMainText>
            <WelcomeSubText>
              {subText1}
              <br />
              {subText2}
            </WelcomeSubText>
          </WelcomeMessageWrapper>
        </WelcomeWrapper>
        <ButtonWrapper>
          <Button content="마이픽 현황 보기" />
          <Button content="다른 제품 보러가기" />
        </ButtonWrapper>
      </SuccessWrapper>
    </Component>
  );
}

export default Success;

const Component = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
`;
const SuccessWrapper = styled.div`
  margin-bottom: 158px;
`;
const WelcomeWrapper = styled.div`
  margin-bottom: 70px;
`;

const IconWrapper = styled.div`
  text-align: center;
  margin-bottom: 24px;
  margin-top: 120px;
`;
const CheckIcon = styled.img`
  width: 60px;
`;
const WelcomeMessageWrapper = styled.div``;

const WelcomeMainText = styled.div`
  color: #111;
  text-align: center;
  font-size: 36px;
  font-weight: 600;
  line-height: 140%;
  margin-bottom: 20px;
`;

const WelcomeSubText = styled.div`
  color: #111;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  line-height: 140%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 25px;
`;
