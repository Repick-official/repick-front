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

  const menu = [
    { name: '서비스 가이드', isActive: true, route: '/guide', key: 1 },
    { name: '제품 보기', isActive: false, route: '/product', key: 2 },
    { name: '마이픽', isActive: false, route: '/myPick', key: 3 },
    { name: '옷장 수거', isActive: false, route: '/wardrobe', key: 4 },
  ];

  const [menuPages, setMenuPages] = useState<any[]>(menu);

  const movePage = (page: any) => {
    if (selectedPage === page.name) {
      router.push(page.route);
      console.log(page.isActive);
      console.log(menuPages);
    } else {
      setSelectedPage(page.name);
      setMenuPages((prevState) =>
        prevState.map((selected) =>
          selected.name === page.name
            ? { ...selected, isActive: true }
            : { ...selected, isActive: false }
        )
      );
      router.push(page.route);
      console.log(menuPages);
    }
  };

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
            {menu.map((page) => (
              <Section key={page.key}>
                <Option key={page.key} onClick={() => movePage(page)}>
                  {page.name}
                  {page.isActive && <SelectedPage />}
                </Option>
              </Section>
            ))}
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
const Option = styled.div`
  font-size: 20px;
  margin-right: 144px;
  text-align: center;
`;
