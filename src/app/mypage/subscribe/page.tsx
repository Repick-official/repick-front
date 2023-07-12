'use client';
import React from 'react';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';
import SelectPlan from '@/components/mypage/SelectPlan';
import { selectedSubscribePlan } from '@/atom/states';
import { useRecoilState } from 'recoil';

function page() {
  const router = useRouter();
  const [selectPlan, setSelectPlan] = useRecoilState(selectedSubscribePlan);

  return (
    <Container>
      <Title>{'리픽 멤버십 구독 플랜'}</Title>
      <SemiTitle>
        {'리픽 멤버십 구독을 통해 온라인 제품을 홈피팅 후 옷을 구매해보세요!'}
      </SemiTitle>
      <Wrapper>
        <Choice>
          <SelectPlan
            check={'Basic'}
            plan={'Basic Plan'}
            price={'15,900원'}
            percent={'40%'}
            discounted={'월 9,540원'}
          />
        </Choice>
        <Choice>
          <SelectPlan
            check={'Pro'}
            plan={'Pro Plan'}
            price={'25,900원'}
            percent={'60%'}
            discounted={'월 15,540원'}
          />
        </Choice>
      </Wrapper>
      <div
        className="button"
        onClick={() => router.push('/mypage/subscribe/request')}
      >
        <Button content="구독하기" />
      </div>
    </Container>
  );
}

export default page;

const Container = styled.div`
  .button {
    display: flex;
    justify-content: center;
    margin-top: 60px;
    margin-bottom: 148px;
  }
`;
const Title = styled.div`
  font-size: 36px;
  font-weight: 600;
  margin-top: 120px;
  text-align: center;
`;
const SemiTitle = styled.div`
  font-size: 20px;
  font-weight: 400;
  text-align: center;
`;
const Choice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 40px;
  margin-right: 40px;
`;
const Off = styled.img`
  margin-bottom: 24px;
`;
const On = styled.img`
  margin-bottom: 24px;
`;
const Wrapper = styled.div`
  display: flex;
  // justify-content: space-between;
  margin-top: 60px;
`;
const Check = styled.div``;
