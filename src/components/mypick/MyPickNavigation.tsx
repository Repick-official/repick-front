'use client';
import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import sub from '@/assets/images/subscription.png';
import { selectedMypickPage } from '@/atom/states';
import { useRecoilState } from 'recoil';

function MyPickNavigation() {
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useRecoilState(selectedMypickPage);

  useEffect(() => {
    let location = window.location.pathname;
    let split = location.split('/');
    switch (split[2]) {
      case '':
        setSelectedPage('마이픽 현황');
        break;
      case 'homefitting':
        setSelectedPage('홈피팅');
        break;
      case 'purchase':
        setSelectedPage('구매하기');
        break;
      case 'wardrobe':
        setSelectedPage('옷장 수거');
        break;
    }
  }, []);

  return (
    <Container>
      <Semicontainer>
        <Menu>
          <Section>
            <Option
              onClick={() => {
                setSelectedPage('마이픽 현황');
                router.push('/myPick');
              }}
              selected={selectedPage === '마이픽 현황' ? true : false}
            >
              마이픽 현황
              {selectedPage === '마이픽 현황' ? <SelectedPage /> : <></>}
            </Option>
          </Section>

          <Section>
            <Option
              onClick={() => {
                setSelectedPage('홈피팅');
                router.push('/myPick/homefitting');
              }}
              selected={selectedPage === '홈피팅' ? true : false}
            >
              홈피팅
              {selectedPage === '홈피팅' ? <SelectedPage /> : <></>}
            </Option>
          </Section>

          <Section>
            <Option
              onClick={() => {
                setSelectedPage('구매하기');
                router.push('/myPick/purchase');
              }}
              selected={selectedPage === '구매하기' ? true : false}
            >
              구매하기
              {selectedPage === '구매하기' ? <SelectedPage /> : <></>}
            </Option>
          </Section>

          <Section>
            <Option
              onClick={() => {
                setSelectedPage('구매내역');
                router.push('');
                //여기 url 못 찾음
              }}
              selected={selectedPage === '구매내역' ? true : false}
            >
              구매내역
              {selectedPage === '구매내역' ? <SelectedPage /> : <></>}
            </Option>
          </Section>
        </Menu>
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
`;
const Section = styled.div``;
const Option = styled.div<{ selected: boolean }>`
  font-size: 16px;
  font-weight: ${(props) => (props.selected ? '600' : '400')};
  color: ${(props) =>
    props.selected ? 'var(--1, #111);' : 'var(--2, #5F5F5F);'};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 133.5px;
`;
const SelectedPage = styled.div`
  width: 133.5px;
  height: 3px;
  background-color: var(--1, #111);
  margin-top: 22px;
`;

const Semicontainer = styled.div`
  width: 1216px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
