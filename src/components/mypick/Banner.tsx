'use client';
import styled from 'styled-components';
import sub from '@/assets/images/banner/subscription.png';
import { useRouter } from 'next/navigation';
import { selectedNavPage } from '@/atom/states';
import { useRecoilState } from 'recoil';

function Banner() {
  const [selectedPage, setSelectedPage] = useRecoilState(selectedNavPage);

  const router = useRouter();
  const handleBannerClick = () => {
    setSelectedPage('');
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
  cursor: pointer;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
