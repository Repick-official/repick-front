'use client';
import styled from 'styled-components';
import sub from '@/assets/images/Banner/Banner.png';
import { flexColumn } from '@/styles/theme';

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
  ${flexColumn}
`;
