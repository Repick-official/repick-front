import styled from 'styled-components';
import Image from 'next/image';

interface OrderItemInfoProps {
  src: string;
  tagName: string;
  size: string;
  name: string;
  price: number;
}

const OrderItem: React.FC<OrderItemInfoProps> = ({
  src,
  tagName,
  size,
  name,
  price,
}) => {
  return (
    <OrderItemWrapper>
      <ImageWrapper>
        <Image src={src} alt="Picture of me" width={80} height={80} />
      </ImageWrapper>
      <OrderItemBody>
        <TagWrapper>
          <TagName>{tagName}</TagName>
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
};

export default OrderItem;

const OrderItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const ImageWrapper = styled.div`
  border-radius: 15px;
  overflow: hidden;
`;
const OrderItemBody = styled.div`
  flex-grow: 1;
`;

const TagWrapper = styled.div`
  display: inline-flex;
  width: auto;
  height: 22px;
  padding: 2px 24px;
  align-items: center;
  border-radius: 5px;
  background: var(--4, #e8e8e8);
`;
const TagName = styled.p`
color: '#5F5F5F'
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  margin: 0;
`;

const ItemInfo = styled.div`
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
  align-items: center;
  width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const PriceWrapperP = styled.div`
  display: flex;
  align-items: center;
`;
const PriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
