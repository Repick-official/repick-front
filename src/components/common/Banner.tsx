'use client';
import React from 'react';
import styled from 'styled-components';
import sub from '@/assets/images/Banner1216.png';

function Banner() {
  return (
    <Container>
      <BannerWrapper src={sub.src} />
    </Container>
  );
}

export default Banner;
const BannerWrapper = styled.img`
  width: 100%;
  height: 182px;
  border-radius: 15px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
