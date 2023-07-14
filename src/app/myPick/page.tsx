'use client';
import React, { useState } from 'react';
import sub from '@/assets/images/subscription.png';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';
import { selectedMypickPage } from '@/atom/states';
import { useRecoilState } from 'recoil';
import ContentBodyInfo from '@/components/guide/ContentBodyInfo';
import cloth_1 from '@/assets/images/mypick/cloth_1.png';
import cloth_2 from '@/assets/images/mypick/cloth_2.png';
import cloth_3 from '@/assets/images/mypick/cloth_3.png';
import cloth_4 from '@/assets/images/mypick/cloth_4.png';
import check_off from '@/assets/images/check/off.svg';
import check_on from '@/assets/images/check/on.svg';

function page() {
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useRecoilState(selectedMypickPage);

  const [select, setSelect] = useState(false);
  console.log("TEST");
  return (
    <Container>
      <SemiContainer>
        <Content>
          <Pick>
            <Title>내가 픽한제품</Title>
            <Filter>
              <OnlyProduct>홈피팅 신청 중 제품만</OnlyProduct>
              <Clear>전체 선택 해제</Clear>
            </Filter>
          </Pick>
          <Products>
            <Product>
              <Check onClick={() => setSelect(!select)}>
                {select ? (
                  <On src={check_on.src} />
                ) : (
                  <Off src={check_off.src} />
                )}
              </Check>
              <ContentBodyInfo
                src={cloth_1.src}
                tagName={'MM6'}
                itemInfo={'3, 55 / 코튼 점퍼 자켓'}
                price={355000}
              />
            </Product>
            <Product>
              <Check onClick={() => setSelect(!select)}>
                {select ? (
                  <On src={check_on.src} />
                ) : (
                  <Off src={check_off.src} />
                )}
              </Check>
              <ContentBodyInfo
                src={cloth_2.src}
                tagName={'마뗑킴'}
                itemInfo={'Free / 볼레로 숏패딩 점퍼'}
                price={85000}
              />
            </Product>
            <Product>
              <Check onClick={() => setSelect(!select)}>
                {select ? (
                  <On src={check_on.src} />
                ) : (
                  <Off src={check_off.src} />
                )}
              </Check>
              <ContentBodyInfo
                src={cloth_3.src}
                tagName={'스파오'}
                itemInfo={'Fress / 부클 집업 가디건'}
                price={15000}
              />
            </Product>
            <Product>
              <Check onClick={() => setSelect(!select)}>
                {select ? (
                  <On src={check_on.src} />
                ) : (
                  <Off src={check_off.src} />
                )}
              </Check>
              <ContentBodyInfo
                src={cloth_4.src}
                tagName={'NO BRAND'}
                itemInfo={'S / 핀턱 플리츠 미니 스커트'}
                price={10000}
              />
            </Product>
          </Products>
          <ButtonWrapper>
            <div
              onClick={() => {
                setSelectedPage('홈피팅');
                router.push('/myPick/homefitting/success');
              }}
            >
              <Button
                content="홈피팅 신청하기"
                back="gray"
                color="orange"
                width="360"
                height="60"
              />
            </div>
            <div
              onClick={() => {
                setSelectedPage('구매하기');
                router.push('/myPick/purchase');
              }}
            >
              <Button
                content="구매하기"
                back="gray"
                color="black"
                width="360"
                height="60"
              />
            </div>
            {/* 디자인 나중에 바꾸기 */}
          </ButtonWrapper>
        </Content>
      </SemiContainer>
    </Container>
  );
}

export default page;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SemiContainer = styled.div`
  width: 1216px;
`;

const Pick = styled.div`
  width: 1216px;
  margin-top: 81px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 60px;
`;
const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
`;
const Filter = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: var(--2, #5f5f5f);
  display: flex;
`;
const OnlyProduct = styled.div``;
const Clear = styled.div`
  margin-left: 54px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ButtonWrapper = styled.div`
  display: flex;
  width: 744px;
  justify-content: space-between;
  margin-bottom: 148px;
`;
const Product = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Check = styled.div`
  margin-bottom: 20px;
`;
const On = styled.img``;
const Off = styled.img``;
const Products = styled.div`
  width: 1216px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 70px;
`;
