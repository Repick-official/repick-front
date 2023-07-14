'use client';
import React from 'react';
import Button from '@/components/common/Button';
import sample from '@/assets/images/homefitting/sample.png'
import { useRouter } from 'next/navigation';
import { selectedMypickPage } from '@/atom/states';
import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import Image from 'next/image';
import DeliveryItem from '@/components/homefitting/DeliveryItem';

function page() {
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useRecoilState(selectedMypickPage);
  const userName = "도현";
  return (
    <Container>
      <DeliveryInfoWrapper>
        <DeliveryNowP1>{"홈피팅 배송 현황"}</DeliveryNowP1>
        <DeliveryNowP2>{userName}님의 홈피팅을 위해 현재 리픽이 안전하게 배송 중이에요!</DeliveryNowP2>
        <DeliveryInfo>
          <DeliveryInfoContent>
            <DeliveryInfoDate>
              2023년 06월 29일
            </DeliveryInfoDate>
            <DeliveryInfoItem>
              <DeliveryInfoItemImg>
                <Image
                  src={sample.src}
                  alt="Sample"
                  width={200}  
                  height={200}  
                />
              </DeliveryInfoItemImg>
              <DeliveryInfoItemWrapper>
                <DeliveryInfoItemState>
                  핀턱 필리츠 미니 스커트 외 2건이 현재 배송 중입니다. 
                </DeliveryInfoItemState>
                <DeliveryInfoItemStateWrapper>
                  <DeliveryInfoItemList>
                    <DeliveryItem
                      brand = "[마뗑킴]"
                      name = "Free / 볼레로 숏패딩 점퍼"
                    />
                    <DeliveryItem
                      brand = "[마뗑킴]"
                      name = "Free / 볼레로 숏패딩 점퍼"
                    />
                    <DeliveryItem
                      brand = "[마뗑킴]"
                      name = "Free / 볼레로 숏패딩 점퍼"
                    />
                  </DeliveryInfoItemList>
                  <DeliveryInfoItemButton>
                    배송현황 보러가기
                  </DeliveryInfoItemButton>
                </DeliveryInfoItemStateWrapper>
              </DeliveryInfoItemWrapper>
            </DeliveryInfoItem>
          </DeliveryInfoContent>
        </DeliveryInfo>
      </DeliveryInfoWrapper>
      <svg xmlns="http://www.w3.org/2000/svg" width="1216" height="2" viewBox="0 0 1216 2" fill="none">
        <path d="M0 1L1216 1.00011" stroke="#B4B4B4" stroke-dasharray="5 5"/>
      </svg>
      <DeliveredInfoWrapper>
        <DeliveryNowP1>{"구매를 기다리고 있어요!"}</DeliveryNowP1>
        <DeliveryNowP2>{"홈피팅을 하셨나요? 배송 받은 리픽 상품의 구매상품을 선택해주세요"}</DeliveryNowP2>
        <DeliveredInfo>
          <DeleveredDate></DeleveredDate>
          <DeliveredSuccess>
          </DeliveredSuccess>
        </DeliveredInfo>
        <DeliveredOrderDate>

        </DeliveredOrderDate>
        <DeliveredItemWrapper>
          <DeliveredItemCategory>
            
          </DeliveredItemCategory>
        </DeliveredItemWrapper>
      </DeliveredInfoWrapper>
    </Container>
  );
}

export default page;

const Container = styled.div`
  margin-top : 72px;
  width : 1216px;
  height : 100%;
`
const DeliveryInfoWrapper = styled.div`
  width: 100%;
  margin-bottom: 25px;
`


const DeliveryNowP1 = styled.p`
  color: #111;
  font-family: Pretendard;
  font-size: 36px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
`

const DeliveryNowP2 = styled.p`
  color: #111;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`

const DeliveryInfo = styled.div`
  width : 100%;
  border-radius: 29px;
  background: rgb(232,232,232,0.1);
`

const DeliveryInfoContent = styled.div`
  margin-top : 20px;
  padding : 24px 48px 21px 56px;
  display:flex;
  flex-direction : column;
  gap : 15px;
`

const DeliveryInfoDate = styled.p`
  color: #B4B4B4;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  width:100%;
`

const DeliveryInfoItem = styled.div`
  width:100%;
  display:flex;
  gap : 50px;
`

const DeliveryInfoItemImg = styled.div`

`

const DeliveryInfoItemWrapper = styled.div`
  display:flex;
  flex-direction: column;
  gap : 52px;
  width:100%;
`

const DeliveryInfoItemState = styled.p`
  color: #111;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  width:100%;
`

const DeliveryInfoItemStateWrapper = styled.div`
  display: flex;
  align-items: center;
  width:100%;
`

const DeliveryInfoItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap : 17px;
`
const DeliveryInfoItemButton = styled.div`
  width: 230px;
  height: 12px;
  padding: 24px 40px;
  margin-left : auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background: #111;
  color: #E8E8E8;
  text-align: center;

  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
`

const DeliveredInfoWrapper = styled.div`
  width: 100%;
  margin-top : 80px;
  margin-bottom: 148px;
  
`