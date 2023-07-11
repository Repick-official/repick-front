'use client';
import React from 'react';
import logo from '@/assets/images/loco.svg';
import styled from 'styled-components';
import SearchModal from './SearchModal';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function Navigation() {
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useState('서비스 가이드');

  return (
    <Container>
      <Q>
        <S>
          <MainWrapper>
            <LogoWrapper>
              <Logo src={logo.src} />
              <SearchModal />
            </LogoWrapper>
            <PageWrapper>
              <My onClick={() => router.push('/mypage')}>{'마이페이지'}</My>
              <Login onClick={() => router.push('/login')}>{'로그인'}</Login>
            </PageWrapper>
          </MainWrapper>
          <SemiWrapper>
            <Section>
              <Option
                onClick={() => {
                  setSelectedPage('서비스 가이드');
                  router.push('/guide');
                }}
                selected={selectedPage === '서비스 가이드' ? true : false}
              >
                서비스 가이드
                {selectedPage === '서비스 가이드' ? <SelectedPage /> : <></>}
              </Option>
            </Section>
            <Section>
              <Option
                onClick={() => {
                  setSelectedPage('제품 보기');
                  router.push('/product');
                }}
                selected={selectedPage === '제품 보기' ? true : false}
              >
                제품 보기
                {selectedPage === '제품 보기' ? <SelectedPage /> : <></>}
              </Option>
            </Section>

            <Section>
              <Option
                onClick={() => {
                  setSelectedPage('마이픽');
                  router.push('/myPick');
                }}
                selected={selectedPage === '마이픽' ? true : false}
              >
                마이픽
                {selectedPage === '마이픽' ? <SelectedPage /> : <></>}
              </Option>
            </Section>

            <Section>
              <Option
                onClick={() => {
                  setSelectedPage('옷장 수거');
                  router.push('/wardrobe');
                }}
                selected={selectedPage === '옷장 수거' ? true : false}
              >
                옷장 수거
                {selectedPage === '옷장 수거' ? <SelectedPage /> : <></>}
              </Option>
            </Section>
          </SemiWrapper>
        </S>
      </Q>
    </Container>
  );
}

export default Navigation;

const Section = styled.div``;
const SelectedPage = styled.div`
  width: 153px;
  height: 5px;
  background-color: var(--serve-color, #ff8a00);
  margin-top: 3px;
`;
const S = styled.div``;
const Logo = styled.img`
  width: 195px;
  height: 64px;
`;
const Container = styled.div``;
const Q = styled.div`
  box-shadow: 0px 2px 8px 0px rgba(166, 166, 166, 0.25);
  height: 196px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  cursor: pointer;
`;
const MainWrapper = styled.div`
  display: flex;
`;
const SemiWrapper = styled.div`
  display: flex;
  margin: 44px 0 0 0;
`;
const Option = styled.div<{ selected: boolean }>`
  font-size: 20px;
  margin-right: 83px;
  text-align: center;
  width: 153px;
  font-weight: ${(props) => (props.selected ? '600' : '400')};
`;
