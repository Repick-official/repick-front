import React from 'react';
import hearts from '@/assets/images/guide/heart.svg';
import eye from '@/assets/images/guide/eye.svg';
import { styled } from 'styled-components';
function ItemHeartInfo({ seeing, heart }: { seeing : number ,heart: number }) {
  return (
    <HeartInfoWrapper>
      <SeeWrapper>
        <See
          src={eye.src}
        />
        <SeeNum>
          {seeing}
        </SeeNum>
      </SeeWrapper>
      <HeartWrapper>
        <Heart
          src={hearts.src}
        />
        <HeartNum>
          {heart}
        </HeartNum>
      </HeartWrapper>
    </HeartInfoWrapper>
  );
}

export default ItemHeartInfo;

const HeartInfoWrapper = styled.div`
  display : flex;
  align-items : center;
  justify-content: center;
  gap : 4px;
`
const See = styled.img`
  width:16px;
  height:16px;
`

const Heart = styled.img`
  width:16px;
  height:16px;
`

const SeeWrapper = styled.div`
  display:flex;
`
const HeartWrapper = styled.div`
  display:flex;
`
const SeeNum = styled.p`
  margin : 0;
  width : 20px;
  
`
const HeartNum = styled.p`
  margin : 0;
  width : 20px;
  
`