import React from 'react';
import styled from 'styled-components';
import check_off from '@/assets/images/check/off.svg';
import check_on from '@/assets/images/check/on.svg';
import { selectedSubscribePlan } from '@/atom/states';
import { useRecoilState } from 'recoil';

function SelectPlan({
  check,
  plan,
  price,
  percent,
  discounted,
}: {
  check: string;
  plan: string;
  price: string;
  percent: string;
  discounted: string;
}) {
  const [selectPlan, setSelectPlan] = useRecoilState(selectedSubscribePlan);

  return (
    <>
      <Check onClick={() => setSelectPlan(check)}>
        {selectPlan === check ? (
          <On src={check_on.src} />
        ) : (
          <Off src={check_off.src} />
        )}
      </Check>
      <Box>
        <Content>
          <Plan>{plan}</Plan>

          <DiscountWrapper>
            <Price>{price}</Price>
            <Line />
            <Percent>{percent}</Percent>
          </DiscountWrapper>
          <PriceWrapper>
            <Discount>{discounted}</Discount>
            <Tax>{'(부가세 포함)'}</Tax>
          </PriceWrapper>
          <Info>
            {'홈피팅 시 5벌의 의류를 선택 가능합니다.*'}
            <br />
            {'추가로 결제되는 금액은 없습니다.*'}
          </Info>
        </Content>
      </Box>
    </>
  );
}

export default SelectPlan;

const Box = styled.div`
  border-radius: 15px;
  background: var(--5, #fff);
  box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.16);
  width: 549px;
  height: 324px;
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
const Off = styled.img`
  margin-bottom: 24px;
`;
const On = styled.img`
  margin-bottom: 24px;
`;
const Wrapper = styled.div`
  display: flex;
  // justify-content: space-between;
  margin-top: 60px;
`;
const Check = styled.div``;
