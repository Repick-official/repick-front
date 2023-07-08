'use client';
import React from 'react';
import { styled } from 'styled-components';
import Success from '@/components/common/Success';

function page() {
  const userName = '리픽';
  return (
    <Container>
      <Success
        mainText="반가워요,"
        subText1="리픽 회원가입이 완료되었습니다."
        subText2="리픽과 지속 가능한 패션 소비를 해보세요."
      />
    </Container>
  );
}

export default page;

const Container = styled.div``;
