'use client';
import React from 'react';
import sub from '@/assets/images/subscription.png';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';

function page() {
  const menu = [
    { name: '마이픽 현황', isActive: true, route: '/myPick', key: 1 },
    { name: '홈피팅', isActive: false, route: '/myPick/homefitting', key: 2 },
    { name: '구매하기', isActive: false, route: '/myPick/purchase', key: 3 },
    { name: '구매내역', isActive: false, route: '', key: 4 },
  ];
  const router = useRouter();

  return (
    <Container>
      <Banner src={sub.src} />
      <SemiContainer>
        <Menu>
          {menu.map((page) => (
            <Section key={page.key}>
              <Option key={page.key} onClick={() => router.push(page.route)}>
                {page.name}
                {page.isActive && <SelectedPage />}
              </Option>
            </Section>
          ))}
        </Menu>
        <Pick>
          <Title>내가 픽한제품</Title>
          <Filter>
            <OnlyProduct>홈피팅 신청 중 제품만</OnlyProduct>
            <Clear>전체 선택 해제</Clear>
          </Filter>
        </Pick>

        <Content>
          <ButtonWrapper>
            <div onClick={() => router.push('/myPick/success')}>
              <Button content="홈피팅 신청하기" />
            </div>
            <Button content="구매하기" />
            {/* 디자인 나중에 바꾸기 */}
          </ButtonWrapper>
        </Content>
      </SemiContainer>
    </Container>
  );
}

export default page;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SemiContainer = styled.div`
  width: 1216px;
`;

const Banner = styled.img`
  width: 1644px;
  height: 134px;
  border-radius: 15px;
  margin-top: 62px;
  margin-bottom: 25px;
`;
const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 125px;
  padding-right: 117px;
`;
const Section = styled.div``;
const Option = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: rgba(95, 95, 95, 1);
`;
const SelectedPage = styled.div``;
const Pick = styled.div`
  width: 1216px;
  margin-top: 81px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 60px;
`;
const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
`;
const Filter = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: var(--2, #5f5f5f);
  display: flex;
`;
const OnlyProduct = styled.div``;
const Clear = styled.div`
  margin-left: 54px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ButtonWrapper = styled.div`
  display: flex;
  width: 744px;
  justify-content: space-between;
`;
