'use client';
import React from 'react';
import sub from '@/assets/images/subscription.png';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';

function page() {
  const router = useRouter();

  return (
    <Container>
      <SemiContainer>
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
