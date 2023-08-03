'use client';
import { styled } from 'styled-components';
import Success from '@/components/common/Success';

function page() {
  return (
    <Container>
      <Success
        mainText="구독 결제가 완료되었어요!"
        subText1="구독 결제가 완료되었어요."
        subText2="리픽을 이용해주셔서 감사합니다."
        ishome={false}
        icon="check"
      />
    </Container>
  );
}

export default page;

const Container = styled.div``;
