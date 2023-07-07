'use client';
import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import logo from '@/assets/images/loco.svg';

function page() {
  const router = useRouter();
  return (
    <Container>
      <ContentWrapper>
        <LogoWrapper>
          <Logo src={logo.src} />
        </LogoWrapper>
        <InputWrapper>
          <Content
            placeholder="아이디"
          />
          <Content
            placeholder="비밀번호"
          />
        </InputWrapper>
        <IdSaveWrapper>
          <RadioButton
            type="radio"
          />
          <IdSaveText>
            아이디 저장
          </IdSaveText>
        </IdSaveWrapper>
        <LoginWrapper>
          <LoginButton>로그인</LoginButton>
        </LoginWrapper>
        <MenuWrapper>
          <Menu>
            아이디 찾기
          </Menu>
          <MenuBar className="left">|</MenuBar>
          <Menu>
            비밀번호 찾기
          </Menu>
          <MenuBar className="right">|</MenuBar>
          <Menu>
            회원가입
          </Menu>
        </MenuWrapper>
        <SnsWrapper>
          <SnsLoginText>
            SNS 계정으로 로그인
          </SnsLoginText>
          <SnsIconWrapper>
              
          </SnsIconWrapper>          
        </SnsWrapper>
        {/* <Register onClick={() => router.push('/register')}>{'회원가입'}</Register> */}
      </ContentWrapper>
    </Container>
  );
}

export default page;

const Container = styled.div`
  display : flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height : calc(100vh-560px);
`

const ContentWrapper = styled.div`
`
const Register = styled.div`
  cursor: pointer;
`;

const InputWrapper = styled.div`
  display : flex;
  flex-direction: column;
  gap : 18px;
  margin-bottom: 24px;
`
const Content = styled.input`
  width: 438px;
  height: 60px;
  background-color: rgba(232, 232, 232, 1);
  border-radius: 15px;
  border: none;
  font-size: 20px;
  font-weight: 400;
  font-family: 'Pretendard';
  color: rgba(180, 180, 180, 1);
  padding: 0px 0px 0px 24px;
  outline: none;
`;

const LogoWrapper = styled.div`
  display:flex;
  align-items: center;
  justify-content: center;
  margin-bottom : 50px;
`;

const Logo = styled.img`
  width: 206px;
  height: 67px;
`;

const IdSaveWrapper = styled.div`
  display : flex;
  margin-bottom :24px;
`


const RadioButton = styled.input`
  
`

const IdSaveText = styled.p`
  
`

const LoginWrapper = styled.div`
  margin-bottom : 39px;
  display:flex;
  align-items: center;
  justify-content: center;
`

const LoginButton = styled.button`
  display: flex;
  width: 360px;
  height: 60px;
  padding: 24px 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 15px;
  background: #111;
  color : #fff;
`

const MenuWrapper = styled.div`
  display : flex;
  align-items: center;
  justify-content: center;
`

const Menu = styled.p`
  width:87px;
  font-size: 16px;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;

`
const MenuBar = styled.p`
  &.left {
    margin-left : 27px;
    margin-right : 60px;
  }
  &.right {
    margin-left : 60px;
    margin-right : 27px;
  }
  
`
const SnsWrapper = styled.div`
  display:flex;
  align-items: center;
  justify-content: center;
  
`

const SnsLoginText = styled.p`
  color: #111;
  /* Body2 16pt rg */
  font-size: 16px;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`

const SnsIconWrapper = styled.div`
  

`