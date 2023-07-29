'use client';
import React from 'react';
import { styled } from 'styled-components';
import Success from '@/components/common/Success';

function page() {
  return (
    <Container>
      <Success
        mainText="홈피팅 신청이 완료되었습니다"
        subText1="빠른 시일 내에 주문하신 제품을 배송해드릴게요!"
        subText2="리픽을 이용해주셔서 감사합니다."
        ishome={true}
        icon="check"
      />
    </Container>
  );
}

export default page;

const Container = styled.div``;
