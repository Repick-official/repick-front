'use client';
import React from 'react';
import { styled } from 'styled-components';
import Success from '@/components/common/Success';

function page() {
  return (
    <Container>
      <Success
        mainText="구매가 완료되었어요!"
        subText1="반품 예정 상품들은 리픽 백에 다시 넣어주세요."
        subText2="3일 이내로 수거하도록 하겠습니다."
        ishome = {false}
      />
    </Container>
  );
}

export default page;

const Container = styled.div``;
