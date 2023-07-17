import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

interface OrderItemInfoProps {
  src: string;
  tagName: string;
  size: string;
  name: string;
  price: number;
}
interface TagWrapperProps {
  bgcolor: string;
}

interface TagNameProps {
  textcolor: string;
}

const OrderItem: React.FC<OrderItemInfoProps> = ({
  src,
  tagName,
  size,
  name,
  price,
}) => {
  const tagColors: { [key: string]: string } = {
    '나이키 에센셜': '#5F5F5F',
    꼼데가르송: '#111',
    미쏘: '#B4B4B4',
    MM6: '#111',
    마뗑킴: '#5F5F5F',
    스파오: '#B4B4B4',
    // 필요한 만큼 추가
  };
  const tagNameColors: { [key: string]: string } = {
    '나이키 에센셜': '#fff',
    꼼데가르송: '#fff',
    미쏘: '#111',
    MM6: '#fff',
    마뗑킴: '#fff',
    스파오: '#111',
    // 필요한 만큼 추가
  };
  return (
    <OrderItemWrapper>
      <ImageWrapper>
        <Image
          src={src}
          alt="Picture of me"
          width={80}  
          height={80}  
        />
      </ImageWrapper>
      <OrderItemBody>
        <TagWrapper bgcolor={tagColors[tagName]}>
          <TagName textcolor={tagNameColors[tagName]}>{tagName}</TagName>
        </TagWrapper>
        <PriceWrapper>
          <ItemInfoWrapper>
            <ItemInfo>{size}</ItemInfo>
            {'/'}
            <ItemInfo>{name}</ItemInfo>
          </ItemInfoWrapper>
          <PriceWrapperP>
            <Price>{price.toLocaleString('en-US')}원</Price>

          </PriceWrapperP>
        </PriceWrapper>
      </OrderItemBody>
    </OrderItemWrapper>

  );
}

export default OrderItem;

const OrderItemWrapper = styled.div`
  display: flex;
  align-items : center;
  gap : 24px;
`

const ImageWrapper = styled.div`
  border-radius: 15px;
  overflow : hidden;
`
const OrderItemBody = styled.div`
  flex-grow : 1;
`

const TagWrapper = styled.div<TagWrapperProps>`
  display: inline-flex;
  width : auto;
  height: 22px;
  padding: 2px 24px;
  align-items: center;
  border-radius: 5px;
  background: ${(props) =>
    props.bgcolor ||
    '#E8E8E8'}; // bgColor props를 받아서 적용하거나, 값이 없을 경우 기본값으로 #5F5F5F를 사용
`;
const TagName = styled.p<TagNameProps>`
  color: ${(props) => props.textcolor || '#5F5F5F'};
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  margin: 0;
`;

const ItemInfo = styled.p`
  color: var(--1, #111);
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const Price = styled.p`
  color: var(--1, #111);
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  margin: 0;
`;
const ItemInfoWrapper = styled.div`
  display: flex;
  align-items : center;
`;
const PriceWrapperP= styled.div`
  display:flex;
  align-items : center;
`
const PriceWrapper = styled.div`
  display:flex;
  justify-content: space-between;
`