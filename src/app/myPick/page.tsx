'use client';
import React from 'react';
import sub from '@/assets/images/subscription.png';
import styled from 'styled-components';

function page() {
  return (
    <>
      <Banner src={sub.src} />
    </>
  );
}

export default page;

const Banner = styled.img`
  width: 1216px;
  height: 134px;
`;
