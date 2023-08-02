import styled from 'styled-components';

function SubscribePlan({
  plan,
  price,
  discounted,
}: {
  plan: string;
  price: string;
  discounted: string;
}) {
  return (
    <Container>
      <Wrapper>
        <Box>
          <Content>
            <Plan>{plan}</Plan>

            <DiscountWrapper>
              <Price>{price}</Price>
              <Line />

              <PriceWrapper>
                <Discount>{discounted}</Discount>
                <Tax>{'(부가세 포함)'}</Tax>
              </PriceWrapper>
            </DiscountWrapper>

            <Info>
              {'3벌의 의류를 선택가능합니다.*'}
              <br />
              {
                ' 모든 가격은 부가가치세가 포함된 가격이며, 추가로 결제되는 금액은 없습니다.*'
              }
            </Info>
          </Content>
        </Box>
      </Wrapper>
    </Container>
  );
}

export default SubscribePlan;

const Container = styled.div``;
const Wrapper = styled.div`
  display: flex;
  margin-top: 60px;
`;
const Box = styled.div`
  border-radius: 15px;
  background: var(--5, #fff);
  box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.16);
  width: 1216px;
  height: 260px;
`;
const Content = styled.div`
  margin-left: 101px;
  margin-top: 42px;
`;
const Plan = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 150%;
`;
const Price = styled.div`
  font-weight: 600;
  font-size: 48px;
  line-height: 140%;
`;
const Discount = styled.div`
  font-weight: 600;
  font-size: 48px;
  line-height: 140%;
`;
const Info = styled.div`
  font-weight: 400;
  font-size: 16px;
  margin-top: 30px;
  line-height: 140%;
`;

const DiscountWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
  position: relative;
`;
const PriceWrapper = styled.div`
  display: flex;
  margin-left: 24px;
`;
const Tax = styled.div`
  font-weight: 600;
  font-size: 20px;
  margin-top: 30px;
  margin-left: 12px;
  line-height: 140%;
`;
const Line = styled.div`
  width: 204px;
  height: 5px;
  background: var(--unnamed, #ff3d00);
  position: absolute;
`;
