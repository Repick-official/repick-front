import styled from 'styled-components';
import Image from 'next/image';
import ItemHeartInfo from '@/components/guide/ItemHeartInfo';

interface ContentBodyInfoProps {
  src: string;
  tagName: string;
  size: string;
  name: string;
  price: number;
}

const ContentBodyInfo: React.FC<ContentBodyInfoProps> = ({
  src,
  tagName,
  size,
  name,
  price,
}) => {
  return (
    <ImageWrapper>
      <ImageDiv style={{ borderRadius: '15px', overflow: 'hidden' }}>
        <Image src={src} alt="Picture of me" width={286} height={286} />
      </ImageDiv>
      <ImageBody>
        <TagWrapper>
          <TagName>{tagName}</TagName>
        </TagWrapper>
        <ItemInfoWrapper>
          <ItemInfo>{size}</ItemInfo>
          {' / '}
          <ItemInfo>{name}</ItemInfo>
        </ItemInfoWrapper>
        <Price>{price.toLocaleString('en-US')}원</Price>
        <IconWrapper>
          <ItemHeartInfo heart={0} seeing={0} />
        </IconWrapper>
      </ImageBody>
    </ImageWrapper>
  );
};

export default ContentBodyInfo;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ImageDiv = styled.div`
  transition: transform 0.2s;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;

const ImageBody = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const TagWrapper = styled.div`
  display: inline-flex;
  height: 26px;
  padding: 2px 24px;
  align-items: center;
  border-radius: 5px;
  background: var(--4, #e8e8e8);
`;
const TagName = styled.p`
  color: '#5F5F5F'
  text-align: center;
  font-size: 16px;
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

const IconWrapper = styled.div``;
const ItemInfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;
