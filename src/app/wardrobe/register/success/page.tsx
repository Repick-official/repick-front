'use client';
import { styled } from 'styled-components';
import Success from '@/components/common/Success';

function page() {
  return (
    <Container>
      <Success
        mainText="옷장 정리 신청이 완료되었어요!"
        subText1="신청 당일내로 수거백을 드리도록 하겠습니다."
        subText2="옷을 넣어주시면 빠른 시일 내로 리픽이 정리하러 갈게요!"
        ishome={false}
        icon="wardrobe"
      />
    </Container>
  );
}

export default page;

const Container = styled.div``;
