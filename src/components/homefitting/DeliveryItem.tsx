import React from 'react';
import { styled } from 'styled-components';
function DeliveryItem({ brand, name }: { brand : string ,name: string }) {
  return (
    <Container>
      <BrandInfo>
        {brand}
      </BrandInfo>
      <NameInfo>
        {name}
      </NameInfo>
    </Container>
  );
}

export default DeliveryItem;

const Container = styled.div`
  width: 100%;
  display:flex;
`

const BrandInfo = styled.p`
  width:150px;
  color: #111;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
`

const NameInfo = styled.p`
  color: #111;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`