import React from 'react';
import logo from '@/assets/images/loco.svg';
import styled from 'styled-components';
import SearchModal from './SearchModal';

function Navigation() {
  return (
    <Container>
      <MainWrapper>
        <LogoWrapper>
          <Logo src={logo.src} />
          <SearchModal />
        </LogoWrapper>
        <PageWrapper>
          <My>{'마이페이지'}</My>
          <Login>{'로그인'}</Login>
        </PageWrapper>
      </MainWrapper>
      <SemiWrapper>
        <Option>{'서비스 가이드'}</Option>
        <Option>{'제품 보기'}</Option>
        <Option>{'마이픽'}</Option>
        <Option>{'옷장 수거'}</Option>
      </SemiWrapper>
    </Container>
  );
}

export default Navigation;

const Logo = styled.img`
  width: 195px;
  height: 64px;
`;
const Container = styled.div`
  box-shadow: 0px 2px 8px 0px rgba(166, 166, 166, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 196px;
`;
const LogoWrapper = styled.div`
  margin-top: 55.65px;
  display: flex;
`;
const PageWrapper = styled.div`
  margin-top: 30px;
  display: flex;
`;
const My = styled.div`
  width: 70px;
  font-size: 16px;
  margin-right: 39px;
`;
const Login = styled.div`
  font-size: 16px;
  width: 42px;
`;
const MainWrapper = styled.div`
  display: flex;
`;
const SemiWrapper = styled.div`
  margin-top: 48px;
  display: flex;
`;
const Option = styled.div`
  font-size: 20px;
  margin-right: 144px;
`;
