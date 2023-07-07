'use client';
import React from 'react';
import Button from '@/components/common/Button';
import { styled } from 'styled-components';
import registerCheck from '@/assets/images/check/register_check.svg';
function page() {
  const userName = "리픽";
  return (
    <Component>
      <SuccessWrapper>
        <WelcomeWrapper>
          <IconWrapper>
            <CheckIcon src={registerCheck.src}/>
          </IconWrapper>
          <WelcomeMessageWrapper>
            <WelcomeMainText>
              반가워요, {userName}님!
            </WelcomeMainText>
            <WelcomeSubText>
            리픽 회원가입이 완료되었습니다.<br/>
            리픽과 지속 가능한 패션 소비를 해보세요
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
  align-items : center;
  justify-content: center;
  flex-direction: column;
  height:100%;
`
const SuccessWrapper = styled.div`
   
`
const WelcomeWrapper = styled.div`
  margin-bottom : 70px;
`

const IconWrapper = styled.div`
  text-align: center;
  margin-bottom : 24px;
`
const CheckIcon = styled.img`
  width : 60px;
`
const WelcomeMessageWrapper = styled.div`
  
`

const WelcomeMainText = styled.div`
  color: #111;
  text-align: center;
  font-size: 36px;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  margin-bottom : 20px;
`

const WelcomeSubText = styled.div`
  color: #111;
  text-align: center;
  font-size: 16px;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`

const ButtonWrapper = styled.div`
  display:flex;
  gap : 25px;
`
