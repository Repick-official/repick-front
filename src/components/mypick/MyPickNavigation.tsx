'use client';
import styled from 'styled-components';
import getAccessToken from '@/util/getAccessToken';
import { selectedMypickPage } from '@/atom/states';
import { useRecoilState } from 'recoil';
import { useCookies } from 'react-cookie';
import { getIsSubscribe } from '@/api/requests';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function MyPickNavigation() {
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useRecoilState(selectedMypickPage);

  useEffect(() => {
    let location = window.location.pathname;
    let split = location.split('/');
    switch (split[3]) {
      case '':
        setSelectedPage('마이픽 현황');
        break;
      case 'homefitting':
        setSelectedPage('홈피팅');
        break;
      case 'purchase':
        setSelectedPage('구매하기');
        break;
    }
  }, []);

  const [cookies, setCookie, removeCookie] = useCookies();

  const checkUserHomeFitting = async () => {
    let accessToken = await getAccessToken(cookies, setCookie);
    const response = await getIsSubscribe(accessToken);
    if (response == 'NONE') {
      alert('구독이 필요한 서비스입니다.');
    } else {
      setSelectedPage('홈피팅');
      router.push('/myPick/home/homefitting');
    }
  };

  const checkUserPurchaseHistory = async () => {
    let accessToken = await getAccessToken(cookies, setCookie);
    const response = await getIsSubscribe(accessToken);
    if (response == 'NONE') {
      alert('구독이 필요한 서비스입니다.');
    } else {
      alert('현재 이용 불가능한 서비스입니다.');
    }
  };

  return (
    <Container>
      <Semicontainer>
        <Menu>
          <Section>
            <Option
              onClick={() => {
                setSelectedPage('마이픽 현황');
                router.push('/myPick/home');
              }}
              $selected={selectedPage === '마이픽 현황' ? true : false}
            >
              마이픽 현황
              {selectedPage === '마이픽 현황' ? <SelectedPage /> : <></>}
            </Option>
          </Section>

          <Section>
            <Option
              onClick={() => checkUserHomeFitting()}
              $selected={selectedPage === '홈피팅' ? true : false}
            >
              홈피팅
              {selectedPage === '홈피팅' ? <SelectedPage /> : <></>}
            </Option>
          </Section>

          <Section>
            <Option
              onClick={() => router.push('/myPick/shopping/purchase')}
              $selected={selectedPage === '구매하기' ? true : false}
            >
              구매하기
              {selectedPage === '구매하기' ? <SelectedPage /> : <></>}
            </Option>
          </Section>

          <Section>
            <Option
              onClick={() => checkUserPurchaseHistory()}
              $selected={selectedPage === '구매내역' ? true : false}
            >
              구매내역
              {selectedPage === '구매내역' ? <SelectedPage /> : <></>}
            </Option>
          </Section>
        </Menu>
        <GrayBar />
      </Semicontainer>
    </Container>
  );
}

export default MyPickNavigation;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 125px;
  padding-right: 117px;
  position: relative;
`;
const Section = styled.div``;
const Option = styled.div<{ $selected: boolean }>`
  font-size: 16px;
  font-weight: ${(props) => (props.$selected ? '600' : '400')};
  color: ${(props) =>
    props.$selected ? 'var(--1, #111);' : 'var(--2, #5F5F5F);'};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 133.5px;
  cursor: pointer;
`;
const SelectedPage = styled.div`
  width: 133.5px;
  height: 3px;
  background-color: var(--1, #111);
  margin-top: 38px;
  position: absolute;
  z-index: 1;
`;

const Semicontainer = styled.div`
  width: 1216px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const GrayBar = styled.div`
  width: 1216px;
  height: 3px;
  background-color: var(--4, #e8e8e8);
  position: relative;
  margin-top: 22px;
`;
