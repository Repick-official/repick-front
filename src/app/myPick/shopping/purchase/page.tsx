'use client';
import React, { useState } from 'react';
import '../../reset.css';
import { useRouter } from 'next/navigation';
import { styled } from 'styled-components';
import ContentBodyInfo from '@/components/guide/ContentBodyInfo';
import sample from '@/assets/images/homefitting/sample.png'
import line from '@/assets/images/line.svg';
import check_off from '@/assets/images/check/off.svg';
import check_on from '@/assets/images/check/on.svg';
function page() {
  const router = useRouter();
  const [imageSrc, setImageSrc] = useState(check_off.src);
  
  const [isClicked, setIsClicked] = useState(false);
  const userName = "도현";
  const handleClick = () => {
    if (isClicked) {
      setImageSrc(check_off.src);
      setIsClicked(false);
    } else {
      setImageSrc(check_on.src);
      setIsClicked(true);
    }
  };
  return (
<<<<<<< HEAD:src/app/myPick/purchase/page.tsx
    <Container>
      <OrderGuideP1>주문 상품 정보</OrderGuideP1>
      <OrderGuideP2>회원님이 구매할 제품들이에요</OrderGuideP2>
      {/* <div onClick={() => router.push('/myPick/purchase/success')}>
        <Button content="결제하기" num="7" />
      </div> */}
      <OrderItemWrapper>
        <ContentBodyInfo
          src={sample.src}
          tagName={"마뗑킴"}
          size={"300"}
          name={"Free / 볼레로 숏패딩 점퍼"}
          price={85000}
        />
        <ContentBodyInfo
          src={sample.src}
          tagName={"스파오"}
          size={"300"}
          name={"Free / 부클 집업 가디건"}
          price={15000}
        />
        <ContentBodyInfo
          src={sample.src}
          tagName={"NO BRAND"}
          size={"300"}
          name={"S / 핀턱 플리츠 미니 스커트"}
          price={10000}
        />
      </OrderItemWrapper>
      <OrderInfoWrapper>
        <OrderInfo>
          <Line100 src={line.src} />
          <User>배송자 정보</User>
          <SenderWrapper>
            <CheckWrapper>
              <Check onClick={() => handleClick()}>
                <Off src={imageSrc} />
              </Check>
              <CheckP>
                배송자 정보가 회원 정보와 달라요
              </CheckP>
            </CheckWrapper>
            <Wrapper>
              <Info>
                이름
              </Info>
              <Content placeholder='김회원'/>
            </Wrapper>
            <Wrapper>
              <Info>
                전화번호
              </Info>
              <Content />
            </Wrapper>
            <Wrapper>
              <Info>
                등록주소
              </Info>
              <Content />
            </Wrapper>
          </SenderWrapper>
          <Line src={line.src} />
          <DestinationWrapper>
            <User>배송자 정보 입력</User>
            <Wrapper>
              <Info>
                {'배송 주소'}
                <div className="star">{'*'}</div>
              </Info>
              <CheckWrapper>
                <Check onClick={() => handleClick()}>
                  <Off src={imageSrc} />
                </Check>
                <CheckP>
                  등록 정보로 배송 받기
                </CheckP>
              </CheckWrapper>
            </Wrapper>
            <Address>
              <ConfirmWrapper>
                <Content className="address" placeholder="우편번호를 검색해주세요" />
                <Confirm>{'우편번호'}</Confirm>
              </ConfirmWrapper>
              <Content className="detail-address" />
              <Content
                className="detail-address"
                placeholder="상세 주소를 입력해주세요"
              />
            </Address>
          </DestinationWrapper>
        </OrderInfo>
        <FinalInfo>

        </FinalInfo>
      </OrderInfoWrapper>
    </Container>
=======
    <>
      <div onClick={() => router.push('/myPick/shopping/purchase/success')}>
        <Button content="결제하기" num="7" />
      </div>
    </>
>>>>>>> 9642a4799c63918d3593c231e5b2e2f3c0d6c9b2:src/app/myPick/shopping/purchase/page.tsx
  );
}

export default page;
const Container = styled.div`
  margin-top : 62px;
  width : 1216px;
  height : 100%;
`


const OrderGuideP1 = styled.p`
  color: #111;
  font-family: Pretendard;
  font-size: 36px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
`
const OrderGuideP2 = styled.p`
  color: #111;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`

const OrderItemWrapper = styled.div`
  display:flex;
  margin-top : 60px;
  gap : 18px;
`

const OrderInfoWrapper = styled.div`
  width : 100%;
  display:flex;
  justify-content: space-between;
`

const OrderInfo = styled.div`
  width : 666px;
`

const FinalInfo = styled.div`
  width : 388px;
`
const Info = styled.div`
  font-size: 20px;
  width: 207px;
  display: flex;

  .star {
    color: rgba(255, 61, 0, 1);
  }
`;

const On = styled.img``;
const Off = styled.img``;

const User = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 40px;
`;

const Line100 = styled.img`
  margin-top: 80px;
  width : 1216px;
`;

const Line = styled.img`
  margin-top : 80px;
  width : 100%;
`
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 18px;
`;

const Content = styled.input`
  width: 436px;
  height: 56px;
  background-color: rgba(232, 232, 232, 1);
  border-radius: 15px;
  border: none;
  font-size: 20px;
  font-weight: 400;
  font-family: 'Pretendard';
  color: rgba(180, 180, 180, 1);
  padding: 0px 0px 0px 24px;
  outline: none;

  &.address {
    width: 308px;
  }

  &.detail-address {
    margin-left: 206px; //이게 맞나 모르겠다
  }
`;

const Check = styled.div`
  margin-right : 10px;
  cursor : pointer;
`

const CheckWrapper = styled.div`
  display:flex;

`

const CheckP = styled.p`
  color: var(--2, #5F5F5F);

  /* Header4 20pt sb */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
`

const SenderWrapper = styled.div`
  display:flex;
  flex-direction : column;
  gap : 18px;
`

const Address = styled.div`
  display: flex;
  flex-direction: column;
  align-items : end;
  gap : 18px;
`;

const DestinationWrapper = styled.div`
`

const Confirm = styled.button`
  border-radius: 15px;
  background: var(--3, #b4b4b4);
  width: 104px;
  height: 56px;
  border: none;
  font-weight: 600;
  font-size: 16px;
  margin-left: 24px;
`;

const ConfirmWrapper = styled.div`
  display:flex;
`