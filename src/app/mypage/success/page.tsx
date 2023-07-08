'use client';
import React from 'react';
import Button from '@/components/common/Button';
import { styled } from 'styled-components';
import registerCheck from '@/assets/images/check/register_check.svg';
function page() {
  return (
    <Component>
      <SuccessWrapper>
        <WelcomeWrapper>
          <IconWrapper>
            <CheckIcon src={registerCheck.src} />
          </IconWrapper>
          <WelcomeMessageWrapper>
            <WelcomeMainText>구독 결제가 완료되었어요!</WelcomeMainText>
            <WelcomeSubText>
              구독 결제가 완료되었어요.
              <br />
              리픽을 이용해주셔서 감사합니다
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

export default page;

const Component = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
`;
const SuccessWrapper = styled.div``;
const WelcomeWrapper = styled.div`
  margin-bottom: 70px;
`;

const IconWrapper = styled.div`
  text-align: center;
  margin-bottom: 24px;
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
