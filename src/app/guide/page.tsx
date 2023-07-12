'use client';
import React from 'react';
import Image from 'next/image';
import logo_guide from '@/assets/images/guide/logo_guide.png';
import { styled } from 'styled-components';
import ContentBodyImage from '@/components/guide/ContentBodyImage';
import ImageDivision from '@/components/guide/ImageDivision';
import ContentBodyInfo from '@/components/guide/ContentBodyInfo';

import guide_first from '@/assets/images/guide/guide_first.png';
import guide_second from '@/assets/images/guide/guide_second.png';
import guide_third from '@/assets/images/guide/guide_third.png';
import guide_fourth from '@/assets/images/guide/guide_fourth.png';
import guide_fifth from '@/assets/images/guide/guide_fifth.png';

import info_1 from '@/assets/images/guide/info_1.png';
import info_2 from '@/assets/images/guide/info_2.png';
import info_3 from '@/assets/images/guide/info_3.png';
import info_4 from '@/assets/images/guide/info_4.png';
function page() {
  return (
    <Content>
      <BannerWrapper>
        <Image
          src={logo_guide}
          alt="Picture of me"
          style={{ width: '100vw', height: '657px' }}
          placeholder="blur" // Optional blur-up while loading
        />
      </BannerWrapper>
      <ContentWrapper>
        <ContentHeader>{'리픽은 어떻게 운영될까요?'}</ContentHeader>
        <ContentBody>
          <ContentBodyP>{'<판매자>'}</ContentBodyP>
          <ContentBodyImageWrapper>
            <ContentBodyImage
              src={guide_first.src}
              content={'중고의류 수거 신청을 합니다.'}
            />
            <ImageDivision />
            <ContentBodyImage
              src={guide_second.src}
              content={'리픽은 의류를 수거하여 위탁 판매합니다.'}
            />
          </ContentBodyImageWrapper>
        </ContentBody>
        <ContentBody>
          <ContentBodyP>{'<구매자>'}</ContentBodyP>
          <ContentBodyImageWrapper>
            <ContentBodyImage
              src={guide_third.src}
              content={'마음에 드는 옷을 합리적인 가격으로 선택합니다.'}
            />
            <ImageDivision />
            <ContentBodyImage
              src={guide_fourth.src}
              content={
                '마이픽을 통해 선택 현황을 보고 구매를 확정하면 옷을 받아 볼 수 있습니다'
              }
            />
            <ImageDivision />
            <ContentBodyImage
              src={guide_fifth.src}
              content={
                '홈피팅 후 구매할 옷은 입금을 통해 구매하고 구매하지 않을 옷은 반품 신청을 합니다'
              }
            />
          </ContentBodyImageWrapper>
        </ContentBody>
        <ContentWaiting>
          <ContentWaitingInfoWrapper>
            <ContentWaitingInfoHeader>
              {'리픽에 다양한 제품들이 기다리고 있어요!'}
            </ContentWaitingInfoHeader>
            <ContentWaitingInfoItemWrapper>
              <ContentBodyInfo
                src={info_1.src}
                tagName={'나이키 에센셜'}
                itemInfo={'M, 55 / 워싱 반바지'}
                price={25000}
              />
              <ContentBodyInfo
                src={info_2.src}
                tagName={'NO BRAND'}
                itemInfo={'Free / 데님 롱 스커트'}
                price={13000}
              />
              <ContentBodyInfo
                src={info_3.src}
                tagName={'꼼데가르송'}
                itemInfo={'M, 55 / 반팔티셔츠'}
                price={55000}
              />
              <ContentBodyInfo
                src={info_4.src}
                tagName={'미쏘'}
                itemInfo={'Free / 스퀘어넥 플라워 미니 원피스'}
                price={25000}
              />
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
  gap: 80px;

  text-align: center;
`;
const BannerWrapper = styled.div`
  width: 100%;
`;

const ContentWrapper = styled.div`
  width: 1216px;
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const ContentHeader = styled.p`
  color: #111;
  /* Header3 24pt sb */
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;

  margin-bottom: 60px;
`;

const ContentBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ContentBodyP = styled.p`
  color: #111;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`;

const ContentBodyImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
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
