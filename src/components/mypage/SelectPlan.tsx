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
    <Container>
      <Choice.Check onClick={() => setSelectPlan(check)}>
        {selectPlan === check ? (
          <Choice.On src={check_on.src} />
        ) : (
          <Choice.Off src={check_off.src} />
        )}
      </Choice.Check>
      <Choice.Box>
        <Content.Wrapper>
          <Content.Plan>{plan}</Content.Plan>

          <Content.DiscountWrapper>
            <Content.Price>{price}</Content.Price>
            <Content.Line />
            <Content.Percent>{percent}</Content.Percent>
          </Content.DiscountWrapper>
          <Content.PriceWrapper>
            <Content.Discount>{discounted}</Content.Discount>
            <Content.Tax>{'(부가세 포함)'}</Content.Tax>
          </Content.PriceWrapper>
          <Content.Info>
            {'홈피팅 시 5벌의 의류를 선택 가능합니다.*'}
            <br />
            {'추가로 결제되는 금액은 없습니다.*'}
          </Content.Info>
        </Content.Wrapper>
      </Choice.Box>
    </Container>
  );
}

export default SelectPlan;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Choice = {
  Off: styled.img`
    margin-bottom: 24px;
  `,
  On: styled.img`
    margin-bottom: 24px;
  `,
  Check: styled.div``,
  Box: styled.div`
    border-radius: 15px;
    background: var(--5, #fff);
    box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.16);
    width: 549px;
    height: 324px;
  `,
};

const Content = {
  Wrapper: styled.div`
    margin-left: 60px;
    margin-top: 50px;
  `,
  Plan: styled.div`
    font-weight: 600;
    font-size: 24px;
    line-height: 150%;
  `,
  Price: styled.div`
    font-weight: 600;
    font-size: 36px;
    line-height: 140%;
  `,
  Discount: styled.div`
    font-weight: 600;
    font-size: 48px;
    line-height: 140%;
  `,
  Info: styled.div`
    font-weight: 400;
    font-size: 16px;
    margin-top: 10px;
    line-height: 140%;
  `,
  Percent: styled.div`
    color: var(--unnamed, #ff3d00);
    font-weight: 600;
    font-size: 24px;
    margin-left: 12px;
    line-height: 150%;
  `,
  DiscountWrapper: styled.div`
    display: flex;
    align-items: center;
    margin-top: 12px;
    position: relative;
  `,
  PriceWrapper: styled.div`
    display: flex;
    margin-top: 10px;
  `,
  Tax: styled.div`
    font-weight: 600;
    font-size: 20px;
    margin-top: 30px;
    margin-left: 12px;
    line-height: 140%;
  `,
  Line: styled.div`
    width: 153px;
    height: 3px;
    background: var(--unnamed, #ff3d00);
    position: absolute;
  `,
};
