import React from 'react';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import registerCheck from '@/assets/images/check/register_check.svg';
import { selectedMypickPage } from '@/atom/states';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import { selectedNavPage } from '@/atom/states';
import none from '@/assets/images/search/none.svg';
import purchase from '@/assets/images/mypick/purchase.png';
import wardrobe from '@/assets/images/wardrobe/wardrobe.svg';

function Success({
  mainText,
  subText1,
  subText2,
  ishome,
  icon,
}: {
  mainText: string;
  subText1: string;
  subText2: string;
  ishome: boolean;
  icon: string;
}) {
  const [selectedPage, setSelectedPage] = useRecoilState(selectedMypickPage);
  const [selectedNavigationPage, setSelectedNavigationPage] =
    useRecoilState(selectedNavPage);

  const router = useRouter();
  return (
    <Component>
      <SuccessWrapper>
        <WelcomeWrapper>
          <IconWrapper>
            {icon === 'check' ? (
              <CheckIcon src={registerCheck.src} />
            ) : icon === 'none' ? (
              <NoneIcon src={none.src} />
            ) : icon === 'wardrobe' ? (
              <WardrobeIcon src={wardrobe.src} />
            ) : (
              <PurchaseIcon src={purchase.src} />
            )}
          </IconWrapper>
          <WelcomeMessageWrapper>
            <WelcomeMainText>{mainText}</WelcomeMainText>
            <WelcomeSubText>
              {subText1}
              <br />
              {subText2}
            </WelcomeSubText>
          </WelcomeMessageWrapper>
        </WelcomeWrapper>
        <ButtonWrapper>
          <div
            onClick={() => {
              setSelectedPage('마이픽 현황');
              setSelectedNavigationPage('마이픽');
              router.push('/myPick/home');
            }}
          >
            <Button content="마이픽 현황 보기" num="4" />
          </div>
          {ishome ? (
            <div
              onClick={() => {
                router.push('/myPick/home/homefitting');
              }}
            >
              <Button content="홈피팅 현황보기" num="4" />
            </div>
          ) : (
            <div
              onClick={() => {
                setSelectedNavigationPage('제품 보기');
                router.push('/product');
              }}
            >
              <Button content="다른 제품 보러가기" num="4" />
            </div>
          )}
        </ButtonWrapper>
      </SuccessWrapper>
    </Component>
  );
}

export default Success;

const Component = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
`;
const SuccessWrapper = styled.div`
  margin-bottom: 158px;
`;
const WelcomeWrapper = styled.div`
  margin-bottom: 70px;
`;

const IconWrapper = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;
const CheckIcon = styled.img`
  width: 108px;
  height: 108px;
  margin-top: 120px;
`;
const NoneIcon = styled.img`
  width: 124.256px;
  height: 172px;
  margin-top: 58px;
`;
const WardrobeIcon = styled.img`
  width: 118.65px;
  height: 172px;
  margin-top: 60px;
`;
const PurchaseIcon = styled.img`
  width: 348px;
  height: 258px;
  margin-top: 32px;
`;
const WelcomeMessageWrapper = styled.div``;

const WelcomeMainText = styled.div`
  color: #111;
  text-align: center;
  font-size: 36px;
  font-weight: 600;
  line-height: 140%;
  margin-bottom: 20px;
`;

const WelcomeSubText = styled.div`
  color: #111;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  line-height: 140%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 25px;
`;
