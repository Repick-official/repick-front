'use client';
import React from 'react';
import styled from 'styled-components';
import sub from '@/assets/images/subscription.png';

function Banner() {
  return (
    <Container>
      <BannerWrapper src={sub.src} />
    </Container>
  );
}

export default Banner;
const BannerWrapper = styled.img`
  width: 100vw;
  height: 134px;
  border-radius: 15px;
  margin-top: 62px;
  margin-bottom: 25px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
