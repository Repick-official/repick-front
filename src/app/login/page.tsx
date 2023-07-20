'use client';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import logo from '@/assets/images/loco.svg';
import kakao from '@/assets/images/kakao.png';
import Button from '@/components/common/Button';
import check_off from '@/assets/images/check/off.svg';
import check_on from '@/assets/images/check/on.svg';

function page() {
  const router = useRouter();
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_API_KEY}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}/login/kakaoLogin&response_type=code`;

  const loginHandler = () => {
    window.location.href = link;
  };

  const [imageSrc, setImageSrc] = useState<string>(check_off.src);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (isClicked) {
      setImageSrc(check_off.src);
      setIsClicked(false);
    } else {
      setImageSrc(check_on.src);
      setIsClicked(true);
    }
  };

  return (
    <Container>
      <ContentWrapper>
        <LogoWrapper>
          <Logo src={logo.src} />
        </LogoWrapper>
        <InputWrapper>
          <Content placeholder="아이디" />
          <Content placeholder="비밀번호" />
        </InputWrapper>
        <IdSaveWrapper>
          <Check onClick={() => handleClick()}>
            <Off src={imageSrc} />
          </Check>
          <IdSaveText>아이디 저장</IdSaveText>
        </IdSaveWrapper>
        <LoginWrapper>
          <div
            className="button"
            onClick={() => alert('SNS 로그인을 이용해주세요.')}
          >
            <Button content="로그인" num="4" />
          </div>
        </LoginWrapper>
        <MenuWrapper>
          <Menu onClick={() => alert('사용 불가능한 서비스입니다.')}>
            아이디 찾기
          </Menu>
          <MenuBar className="left">|</MenuBar>
          <Menu onClick={() => alert('사용 불가능한 서비스입니다.')}>
            비밀번호 찾기
          </Menu>
          <MenuBar className="right">|</MenuBar>
          <Menu onClick={() => alert('사용 불가능한 서비스입니다.')}>
            회원가입
          </Menu>
        </MenuWrapper>
        <SnsWrapper>
          <SnsLoginText>SNS 계정으로 로그인</SnsLoginText>

          <SnsIconWrapper>
            <KaKao src={kakao.src} onClick={loginHandler} />
            <Icon />
            <Icon />
          </SnsIconWrapper>
        </SnsWrapper>
      </ContentWrapper>
    </Container>
  );
}

export default page;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;

  .button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const ContentWrapper = styled.div`
  ::placeholder {
    color: var(--3, #b4b4b4);
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 24px;
`;
const Content = styled.input`
  width: 438px;
  height: 60px;
  background-color: rgba(232, 232, 232, 1);
  border-radius: 15px;
  border: none;
  font-size: 16px;
  font-weight: 400;
  color: rgba(180, 180, 180, 1);
  padding: 0px 0px 0px 24px;
  outline: none;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
  margin-top: 167px;
`;

const Logo = styled.img`
  width: 206px;
  height: 67px;
`;

const IdSaveWrapper = styled.div`
  display: flex;
  margin-bottom: 24px;
  align-items: center;
`;

const Off = styled.img``;
const Check = styled.div`
  margin-right: 14px;
  cursor: pointer;
`;

const IdSaveText = styled.p`
  font-size: 16px;
  font-weight: 400;
`;

const LoginWrapper = styled.div`
  margin-bottom: 39px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Menu = styled.p`
  width: 87px;
  font-size: 16px;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`;
const MenuBar = styled.p`
  &.left {
    margin-left: 27px;
    margin-right: 60px;
  }
  &.right {
    margin-left: 60px;
    margin-right: 27px;
  }
`;
const SnsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const SnsLoginText = styled.p`
  color: var(--3, #b4b4b4);
  font-size: 16px;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  margin-top: 43px;
`;

const SnsIconWrapper = styled.div`
  display: flex;
  width: 228px;
  justify-content: space-between;
  margin-bottom: 148px;
`;

const Icon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 15px;
  background: var(--4, #e8e8e8);
`;

const KaKao = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 15px;
  cursor: pointer;
`;
