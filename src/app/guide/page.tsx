'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import logo_guide from '@/assets/images/guide/logo_guide.png';
import { styled } from 'styled-components';
import small_logo from '@/assets/images/guide/small_logo.svg';
import ContentBodyInfo from '@/components/guide/ContentBodyInfo';
import { useRouter } from 'next/navigation';

import info_1 from '@/assets/images/guide/info_1.png';
import character_1 from '@/assets/images/guide/character_1.png';
import { getMainPageProducts } from '@/api/requests';
import graph_1 from '@/assets/images/guide/graph_1.png';

import identity_1 from '@/assets/images/guide/identity_1.png';
import identity_2 from '@/assets/images/guide/identity_2.png';
import identity_3 from '@/assets/images/guide/identity_3.png';

import slogan_1 from '@/assets/images/guide/slogan_1.png';
function page() {
  const router = useRouter();

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const get = async () => {
      const response = await getMainPageProducts();

      const clothes = response.map((item: any) => {
        return item;
      });
      setProducts(clothes);
    };

    get();
  }, []);

  return (
    <Content>
      <BannerWrapper>
        <Image
          src={logo_guide}
          alt="Picture of me"
          style={{ width: '100vw', height: 'auto' }}
          placeholder="blur" 
        />
      </BannerWrapper>
      <Section1>
        <ContentWrapper>
          <ContentTitle>
            <Image
              src = {small_logo}
              alt="Small Logo"
              style = {{width:'auto',height:'auto'}}
              // placeholder ="blur"
            />
            <ContentTitleText>
              Problem
            </ContentTitleText>
          </ContentTitle>
          <ContentSubTitle>
            현재 의류소비와 거래는 어떤 문제가 있을까요?
          </ContentSubTitle>
          <RectWrapper>
            <LeftRect>
              <Info1_P1>
              한해 버려지는<br></br>
              의류 폐기물의 양은?
              </Info1_P1>
              <Info1_P2>
                →무려 9천 2백만 톤!
              </Info1_P2>
              <TempRect/>
              <Image
                src = {info_1}
                alt="info_1"
                style = {{position : 'absolute',right: '0'}}
              />
              <Image
                src = {character_1}
                alt="character_1"
                style = {{
                  position : 'absolute',
                  bottom: '-16%',
                  transform: 'rotate(-5deg)',
                  left: '-17%'}}
              />
            </LeftRect>
            <RightRect>
              <GraphTitleWrapper>
                <GraphTitle>
                  C2C 직거래 사기 피해액 현황
                </GraphTitle>
                <GraphTitleUnit>
                  (단위:원)
                </GraphTitleUnit>
              </GraphTitleWrapper>
              <Image
                src = {graph_1}
                alt="graph_1"
              />
            </RightRect>
          </RectWrapper>
        </ContentWrapper>
      </Section1>
      <Section2>
        <ContentWrapper>
          <ContentTitle>
            <Image
              src = {small_logo}
              alt="Small Logo"
              style = {{width:'auto',height:'auto'}}
              // placeholder ="blur"
            />
            <ContentTitleText>
              Brand Identity
            </ContentTitleText>
          </ContentTitle>
          <div>
            <ContentSubTitle>
              그래서 <HighlightText>리픽서비스</HighlightText>는요,
            </ContentSubTitle>
          </div>
          <ContentDescribe>
          브랜드 리픽은 사용 가치가 남은 중고 의류를 수거하여 자체 검수와 위탁 관리를 통해<br></br>
          다양하고 합리적인 의류 소비를 추구하는 다른 사용자들에게 제공합니다.
          </ContentDescribe>
          <IdentityWrapper>
            <Image
              src = {identity_1}
              alt = "Identity_1"
            />
            <Image
              src = {identity_2}
              alt = "Identity_2"
            />
            <Image
              src = {identity_3}
              alt = "Identity_3"
            />
          </IdentityWrapper>
        </ContentWrapper>
      </Section2>
      <BannerWrapper>
        <Image
          src={slogan_1}
          alt="Slogan_1"
          style={{ width: '100vw', height: 'auto' }}
          placeholder="blur" 
        />
        <PointTriangle/>
          
      </BannerWrapper>
      <ContentWrapper>
        <ContentWaiting>
          <ContentWaitingInfoWrapper>
            <ContentWaitingInfoHeader>
              {'리픽에 다양한 제품들이 기다리고 있어요!'}
            </ContentWaitingInfoHeader>
            <ContentWaitingInfoItemWrapper>
              {products.map((item) => (
                <div
                  onClick={() =>
                    router.push(`/product/detail/${item.productId}`)
                  }
                  key={item.productId}
                >
                  <ContentBodyInfo
                    key={item.productId}
                    src={item.mainImageFile.imagePath}
                    tagName={item.brand}
                    size={item.size}
                    name={item.name}
                    price={item.price}
                    
                  />
                </div>
              ))}
            </ContentWaitingInfoItemWrapper>
          </ContentWaitingInfoWrapper>
        </ContentWaiting>
      </ContentWrapper>
    </Content>
  );
}

export default page;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
const BannerWrapper = styled.div`
  width: 100%;
  margin-top: 60px;
  font-size : 0;
  position : relative;
`;

const ContentWrapper = styled.div`
  width: 1216px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ContentWaiting = styled.div`
  margin-top: 60px;
  margin-bottom: 148px;
`;

const ContentWaitingInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const ContentWaitingInfoHeader = styled.div`
  color: #111;
  font-family: Pretendard;
  font-size: 36px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
`;

const ContentWaitingInfoItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
`;

const Section1 = styled.div`
  height : 846px;
  display:flex;
  align-items : center;
  justify-content: center;
`

const ContentTitle = styled.div`
  display:flex;
  gap : 8px;
  margin-bottom : 16px;
`;
const ContentTitleText = styled.p`
  color: var(--serve-color, #FF8A00);
  font-feature-settings: 'clig' off, 'liga' off;
  /* Header3 24pt sb */
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 36px */
`;

const ContentSubTitle = styled.p`
  color: var(--1, #111);
  font-family: Pretendard;
  font-size: 48px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  text-align: center;
  font-feature-settings: 'clig' off, 'liga' off;

  margin-bottom :66px;
`

const LeftRect = styled.div`
  width: 534px;
  height: 364px;
  border-radius: 21px;
  background: linear-gradient(0deg, #000 0%, #000 100%), linear-gradient(306deg, rgba(255, 255, 255, 0.40) 0%, rgba(255, 255, 255, 0.00) 100%);
  flex-shrink: 0;
  position:relative;
`

const RightRect = styled.div`
  width: 555px;
  height: 364px;
  border-radius: 21px;
  box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.16);
  background: #FFF;
  flex-shrink: 0;
  display:flex;
  flex-direction : column;
  align-items : center;
  justify-content : center;
  gap : 24px;
`

const RectWrapper = styled.div`
  display:flex;
  gap : 45px;
`

const TempRect = styled.div`
  width: 364px;
  height: 292px;
  transform: rotate(-90deg);
  border-radius: 21px;
  background: linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.00) 100%);
  flex-shrink: 0;
  position : absolute;
  top: 10%;
  z-index: 998;
  left: 18%;
`
const Info1_P1 = styled.p`
  position: absolute;
  z-index:999;
  text-align: left;
  top: 10%;
  left: 10%;
  color: var(--5, #FFF);
  font-family: Pretendard;
  font-size: 36px;
  font-style: normal;
  font-weight: 600;
  line-height: 130%;
  font-feature-settings: 'clig' off, 'liga' off;
`

const Info1_P2 = styled.p`
  position:absolute;
  z-index: 999;
  top: 44%;
  left : 10%;
  color: var(--serve-color, #FF8A00);
  font-family: Pretendard;
  font-size: 36px;
  font-style: normal;
  font-weight: 600;
  line-height: 130%;
  font-feature-settings: 'clig' off, 'liga' off;
`
const GraphTitleWrapper = styled.div`
  display:flex;
  gap : 8px;
  align-items : center;
`
const GraphTitle = styled.p`
  color: var(--1, #111);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  font-feature-settings: 'clig' off, 'liga' off;
`

const GraphTitleUnit = styled.p`
  color: var(--unnamed, #8C8C8C);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  font-feature-settings: 'clig' off, 'liga' off;
`
const Section2 = styled.div`
  height : 860px;
  display:flex;
  align-items : center;
  justify-content: center;
`
const HighlightText = styled.span`
  box-shadow: inset 0 -29px 0 #bfffa1;
`;

const ContentDescribe = styled.p`
  color: #1D1C1B;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  text-align: center;
  font-feature-settings: 'clig' off, 'liga' off;
  margin-top : -48px;
  margin-bottom : 63px;
`

const IdentityWrapper = styled.div`
  display:flex;
  gap : 27px;
`

const PointTriangle = styled.div`
  width: 0;
  height: 0;
  border-bottom: 100px solid transparent;
  border-top: 100px solid transparent;
  border-left: 80px solid white;
  border-right: 80px solid transparent;
  transform : rotate(90deg);
  position:absolute;
  top : -22px;
  left: 0;
  margin: 0 auto;
  right: 0;

`
