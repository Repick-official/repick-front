'use client';
import React from 'react';
import styled from 'styled-components';
import check_off from '@/assets/images/check/off.svg';
import check_on from '@/assets/images/check/on.svg';
import Button from '@/components/common/Button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function page() {
  const router = useRouter();

  const [basic, setBasic] = useState(false);
  const [pro, setPro] = useState(false);
  const [selectPlan, setSelectPlan] = useState('');

  const selectBasic = (e: any) => {
    setBasic(true);
    setPro(false);
    setSelectPlan('Basic Plan');
  };

  const selectPro = (e: any) => {
    setBasic(false);
    setPro(true);
    setSelectPlan('Pro Plan');
  };

  const changePage = () => {
    if (selectPlan == 'Basic Plan') {
      router.push('/mypage/subscribe/request1');
    } else {
      router.push('/mypage/subscribe/request2');
    }
  };

  return (
    <Container>
      <Title>{'리픽 멤버십 구독 플랜'}</Title>
      <SemiTitle>
        {'리픽 멤버십 구독을 통해 온라인 제품을 홈피팅 후 옷을 구매해보세요!'}
      </SemiTitle>
      <Wrapper>
        <Choice>
          <Check onClick={(e: any) => selectBasic(e)}>
            {basic ? <On src={check_on.src} /> : <Off src={check_off.src} />}
          </Check>
          <Box>
            <Content>
              <Plan>{'Basic Plan'}</Plan>

              <DiscountWrapper>
                <Price>{'15,900원'}</Price>
                <Line />
                <Percent>{'40%'}</Percent>
              </DiscountWrapper>
              <PriceWrapper>
                <Discount>{'월 9,540원'}</Discount>
                <Tax>{'(부가세 포함)'}</Tax>
              </PriceWrapper>
              <Info>
                {'홈피팅 시 5벌의 의류를 선택 가능합니다.*'}
                <br />
                {'추가로 결제되는 금액은 없습니다.*'}
              </Info>
            </Content>
          </Box>
        </Choice>
        <Choice>
          <Check onClick={(e: any) => selectPro(e)}>
            {pro ? <On src={check_on.src} /> : <Off src={check_off.src} />}
          </Check>
          <Box>
            <Content>
              <Plan>{'Pro Plan'}</Plan>

              <DiscountWrapper>
                <Price>{'25,900원'}</Price>
                <Line />
                <Percent>{'60%'}</Percent>
              </DiscountWrapper>
              <PriceWrapper>
                <Discount>{'월 15,540원'}</Discount>
                <Tax>{'(부가세 포함)'}</Tax>
              </PriceWrapper>
              <Info>
                {'홈피팅 시 5벌의 의류를 선택 가능합니다.*'}
                <br />
                {'추가로 결제되는 금액은 없습니다.*'}
              </Info>
            </Content>
          </Box>
        </Choice>
      </Wrapper>
      <div className="button" onClick={() => changePage()}>
        <Button content="구독하기" />
      </div>
    </Container>
  );
}

export default page;

const Container = styled.div`
  .button {
    display: flex;
    justify-content: center;
    margin-top: 60px;
    margin-bottom: 148px;
  }
`;
const Title = styled.div`
  font-size: 36px;
  font-weight: 600;
  margin-top: 120px;
  text-align: center;
`;
const SemiTitle = styled.div`
  font-size: 20px;
  font-weight: 400;
  text-align: center;
`;
const Choice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 40px;
  margin-right: 40px;
`;
const Off = styled.img`
  margin-bottom: 24px;
`;
const On = styled.img`
  margin-bottom: 24px;
`;
const Box = styled.div`
  border-radius: 15px;
  background: var(--5, #fff);
  box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.16);
  width: 549px;
  height: 324px;
`;
const Wrapper = styled.div`
  display: flex;
  // justify-content: space-between;
  margin-top: 60px;
`;
const Content = styled.div`
  margin-left: 60px;
  margin-top: 50px;
`;
const Plan = styled.div`
  font-weight: 600;
  font-size: 24px;
`;
const Price = styled.div`
  font-weight: 600;
  font-size: 36px;
`;
const Discount = styled.div`
  font-weight: 600;
  font-size: 48px;
`;
const Info = styled.div`
  font-weight: 400;
  font-size: 16px;
  margin-top: 10px;
`;
const Percent = styled.div`
  color: var(--unnamed, #ff3d00);
  font-weight: 600;
  font-size: 24px;
  margin-left: 12px;
`;
const DiscountWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
  position: relative;
`;
const PriceWrapper = styled.div`
  display: flex;
  margin-top: 10px;
`;
const Tax = styled.div`
  font-weight: 600;
  font-size: 20px;
  margin-top: 30px;
  margin-left: 12px;
`;
const Line = styled.div`
  width: 153px;
  height: 3px;
  background: var(--unnamed, #ff3d00);
  position: absolute;
`;
const Check = styled.div``;
