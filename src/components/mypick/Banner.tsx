'use client';
import React from 'react';
import styled from 'styled-components';
import sub from '@/assets/images/subscription.png';
import {useRouter} from 'next/navigation';
function Banner() {
  const router = useRouter();
  const handleBannerClick = () => {
    router.push('/mypage/subscribe');
  };
  return (
    <Container>
      <BannerWrapper src={sub.src} onClick={handleBannerClick} />
    </Container>
  );
}

export default Banner;
const BannerWrapper = styled.img`
  width: 100%;
  height: auto;
  border-radius: 15px;
  margin-top: 62px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
