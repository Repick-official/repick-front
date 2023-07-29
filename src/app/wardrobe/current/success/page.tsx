'use client';
import React from 'react';
import { styled } from 'styled-components';
import Success from '@/components/common/Success';

function page() {
  return (
    <Container>
      <Success
        mainText="정산 신청이 완료되었어요!"
        subText1="빠른 시일 내에 정산하고 알림 드리도록 하겠습니다."
        subText2="리픽을 이용해주셔서 감사합니다."
        ishome={false}
        icon="check"
      />
    </Container>
  );
}

export default page;

const Container = styled.div``;
