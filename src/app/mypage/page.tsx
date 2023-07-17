'use client';
'use client';
import '../reset.css';
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import line from '@/assets/images/line.svg';
import lineStraight from '@/assets/images/LineStraight.svg';
import lineSelected from '@/assets/images/LineSelected.svg';
import check_off from '@/assets/images/check/off.svg';
import check_on from '@/assets/images/check/on.svg';
import { useRouter } from 'next/navigation';

function page() {
  const router = useRouter();
  const [imageSrc, setImageSrc] = useState(check_off.src);
  const [isClicked, setIsClicked] = useState(false);
  const [subscribeInfo, setSubscribeInfo] =useState(1);
  const handleClick = () => {
    if (isClicked) {
      setImageSrc(check_off.src);
      setIsClicked(false);
    } else {
      setImageSrc(check_on.src);
      setIsClicked(true);
    }
  };
  const handleSubscribeClick = (num) => {
    setSubscribeInfo(num);
  }
  return (
    <Container>
      <R>
        <Title>
          <Register>{'마이페이지'}</Register>
        </Title>
        <Line src={line.src} />
        <User>{'회원 정보'}</User>
        <Wrapper>
          <Info>
            {'이름'}
            <div className="star">{'*'}</div>
          </Info>
          <Content />
        </Wrapper>
        <Wrapper>
          <Info>
            {'전화번호'}
            <div className="star">{'*'}</div>
          </Info>
          <Content />
        </Wrapper>
        <Wrapper>
          <Info>
            {'등록계좌'}
          </Info>
          <Contents>
            <ContentWrapper>
              <InfoBank>
                은행
              </InfoBank>
              <ContentBank />
            </ContentWrapper>
            <ContentWrapper>
              <InfoBank>
                계좌번호
              </InfoBank>
              <ContentBanks />
            </ContentWrapper>
          </Contents>
        </Wrapper>
        <Wrapper>
          <Info>
            {'등록주소'}
          </Info>
          <Content/>
        </Wrapper>
        <Wrapper>
          <Info>
            {'아이디'}
          </Info>
          <Content placeholder="숫자, 영문 대소문자만 사용 가능합니다" />
        </Wrapper>
        <Wrapper>
          <Info>
            {'이메일'}
            <div className="star">{'*'}</div>
          </Info>
          <Content />
        </Wrapper>
      </R>
      <InfoEditButton>
        <Button content="멤버십 구독하러 가기" num="3" />
      </InfoEditButton>
      <Line src={line.src} />
      <MarketP>{'마케팅 정보 수신'}</MarketP>
      <CheckWrapper>
        <Check onClick={() => handleClick()}>
          <Off src={imageSrc} />
        </Check>
        <CheckP>
          마케팅 정보 수신에 동의합니다.
        </CheckP>
      </CheckWrapper>
      <Line src={line.src} />
      <SubscribeCategory>
        <SubscribeMenu onClick={() => handleSubscribeClick(1)}>
          구독 내역
        </SubscribeMenu>
        <SubscribeMenu onClick={() =>handleSubscribeClick(2)}>
          구매 내역
        </SubscribeMenu>
        <SubscribeMenu  onClick={ ()=>handleSubscribeClick(3)}>
          옷장 수거 내역
        </SubscribeMenu>
        <SubscribeMenu  onClick={()=>handleSubscribeClick(4)}>
          정산 내역
        </SubscribeMenu>
      </SubscribeCategory>
      <NavSubscribed>
        <LineStraight src = {lineStraight.src}/>
        <SelectedSubscribed>
          <MenuWrapper>
            {subscribeInfo === 1 && <LineSelected src={lineSelected.src}/> }
          </MenuWrapper>
          <MenuWrapper>
            {subscribeInfo === 2 && <LineSelected src={lineSelected.src}/> }
          </MenuWrapper>
          <MenuWrapper>
            {subscribeInfo === 3 && <LineSelected src={lineSelected.src}/> }
          </MenuWrapper>
          <MenuWrapper>
            {subscribeInfo === 4 && <LineSelected src={lineSelected.src}/> }
          </MenuWrapper>
        </SelectedSubscribed>
      </NavSubscribed>
      <MembershipCategory>
        <MembershipMenu>
          상태
        </MembershipMenu>
        <MembershipMenu>
          멤버쉽 종류
        </MembershipMenu>
        <MembershipMenu>
          결제 날짜
        </MembershipMenu>
        <MembershipMenu>
          만료 날짜
        </MembershipMenu>
        <MembershipMenu>
          결제 금액
        </MembershipMenu>
      </MembershipCategory>
      <LineNM src={line.src} />
      {/* 멤버쉽 정보가 없을 때 */}
      {/* <MembershipInfo>
        <InfoWrapper>
          <NoMembership>
            구독 내역이 없어요
          </NoMembership>
          <MembershipAddButton>
            <Button content="멤버쉽 구독하러 가기" num="3" />
          </MembershipAddButton>
        </InfoWrapper>
      </MembershipInfo> */}
      <MembershipInfo>
        <MembershipInfoWrapper>
          <MembershipInfoMenu>
            구독중
          </MembershipInfoMenu>
          <MembershipInfoMenu>
            리픽 Basic 구독
          </MembershipInfoMenu>
          <MembershipInfoMenu>
            2023. 06. 28. 23:25
          </MembershipInfoMenu>
          <MembershipInfoMenu>
            2023. 07. 28. 23:25
          </MembershipInfoMenu>
          <MembershipInfoMenu>
            9,540 원
          </MembershipInfoMenu>
        </MembershipInfoWrapper>
      </MembershipInfo>


      <LineNM src={line.src} />
      <MembershipWithDraw>
        구독제 변경 및 해지하기
      </MembershipWithDraw>
    </Container>
  );
}

export default page;

const Container = styled.div`
  .button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 70px;
    margin-bottom: 148px;
  }
`;
const R = styled.div`
  margin-top: 120px;
  ::placeholder {
    color: var(--3, #b4b4b4);
  }
`;
const Title = styled.div`
  color: var(--1, #111);
`;
const Register = styled.div`
  font-size: 36px;
  font-weight: 600;
`;
const Welcome = styled.div`
  font-size: 20px;
  font-weight: 400;
`;
const Info = styled.div`
  font-size: 20px;
  width: 207px;
  display: flex;

  .star {
    color: rgba(255, 61, 0, 1);
  }
`;
const User = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 80px;
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
    margin-bottom: 18px;
    margin-left: 206px; //이게 맞나 모르겠다
  }
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 18px;
`;
const Line = styled.img`
  margin-top: 60px;
`;

const ContentWrapper = styled.div`
  display:flex;
  gap : 12px;
  align-items: center;

`
const InfoBank = styled.div`
  font-size: 20px;
  display: flex;

  .star {
    color: rgba(255, 61, 0, 1);
  }
`;

const ContentBank = styled.input`
  width: 120px;
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
    margin-bottom: 18px;
    margin-left: 206px; //이게 맞나 모르겠다
  }
`;
const ContentBanks = styled.input`
  width: 220px;
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
    margin-bottom: 18px;
    margin-left: 206px; //이게 맞나 모르겠다
  }
`;
const Contents = styled.div`
  display:flex;
  gap : 24px;
`
const InfoEditButton =styled.div`
  display:flex;
  justify-content: center;
  margin-top : 52px;
  margin-bottom : 30px;
`
const Check = styled.div`
  margin-right : 10px;
  cursor : pointer;
`
const CheckWrapper = styled.div`
  display:flex;
  margin-bottom :20px;
`

const CheckP = styled.p`
  color: var(--2, #5F5F5F);
  /* Header4 20pt sb */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  .star {
    color: rgba(255, 61, 0, 1);
  }
`

const On = styled.img``;
const Off = styled.img``;

const MarketP = styled.p`
  color: var(--1, #111);
  /* Header3 24pt sb */
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 36px */
  margin-bottom : 40px;
  margin-top : 20px;
`

const SubscribeCategory = styled.div`
  width:100%;
  display:flex;
  margin-top : 24px;
  margin-bottom : 24px;
  justify-content: space-evenly;
`
const SubscribeMenu = styled.p`
  width : 135px;
  text-align : center;
  cursor: pointer;
`

const NavSubscribed = styled.div`
  margin-bottom :20px;
  position : relative;
`;

const LineStraight = styled.img`
`
const LineSelected = styled.img`
`
const SelectedSubscribed = styled.div`
  position : absolute;
  top : 0;
  display:flex;
  justify-content: space-evenly;
  width:100%
`
const MenuWrapper = styled.div`
  width : 134px;
`
const LineNM = styled.img`
  margin-top : 30px;
`
const MembershipCategory = styled.div`
  width:100%;
  display:flex;
  justify-content: space-around;
  margin-top : 30px;
`
const MembershipMenu = styled.p`
  width:140px;
  text-align: center;
`

const MembershipInfo = styled.div`
  display:flex;
  justify-content: center;
  align-items : center;
  flex-direction: column;
  height:207px;
`
const NoMembership = styled.p`
  color: var(--2, #5F5F5F);
  text-align: center;

  /* Body2 16pt rg */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  margin-bottom : 24px;
`
const InfoWrapper = styled.div`
`
const MembershipAddButton = styled.div`
`

const MembershipInfoWrapper = styled.div`
  display:flex;
  justify-content: space-around;
  width:100%;
`
const MembershipInfoMenu = styled.p`
  width:140px;
  text-align: center;
`
const MembershipWithDraw = styled.p`
  width:100%;
  text-align : end;
  margin-top : 24px;
  margin-bottom : 148px;
  color: var(--2, #5F5F5F);

  /* Body2 16pt rg */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`