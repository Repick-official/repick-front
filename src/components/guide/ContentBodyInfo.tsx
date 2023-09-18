import styled from 'styled-components';
import Image from 'next/image';
import ItemHeartInfo from '@/components/guide/ItemHeartInfo';
import { useRef, useState } from 'react';
import getAccessToken from '@/util/getAccessToken';
import { useCookies } from 'react-cookie';
import { setProductPrice } from '@/api/requests';
interface ContentBodyInfoProps {
  id: number;
  src: string;
  tagName: string;
  size: string;
  name: string;
  price: number | null;
}

const ContentBodyInfo: React.FC<ContentBodyInfoProps> = ({
  id,
  src,
  tagName,
  size,
  name,
  price,
}) => {
  const [isSetPrice, setIsSetPrice] = useState<boolean>(false);
  const [newPrice, setNewPrice] = useState<number | null>(price);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [cookies, setCookie, removeCookie] = useCookies();

  const setInputPrice = async () => {
    console.log(id, newPrice);
    if (!newPrice) return;
    let accessToken = await getAccessToken(cookies, setCookie);
    const response = await setProductPrice(accessToken, id, newPrice);
    if (response.success) {
      alert('가격을 설정하였습니다.');
    }
  };
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
        {price !== null && <Price>{price.toLocaleString('en-US')}원</Price>}
        <IconWrapper>
          <ItemHeartInfo heart={0} seeing={0} />
        </IconWrapper>
        {price === null &&
          (!isSetPrice ? (
            <SetPrice.Button onClick={() => setIsSetPrice(true)}>
              가격설정
            </SetPrice.Button>
          ) : (
            <SetPrice.InputWrapper>
              <SetPrice.InputBox
                type="text"
                placeholder="숫자만 입력하세요"
                value={newPrice !== null ? newPrice.toString() : ''}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (/^[0-9]*$/.test(inputValue)) {
                    setNewPrice(
                      inputValue !== '' ? parseInt(inputValue, 10) : null
                    );
                  } else {
                    setNewPrice(null);
                  }
                }}
                onKeyDown={(e) =>
                  ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()
                }
                ref={inputRef}
              />
              <SetPrice.Cancel onClick={() => setIsSetPrice(false)}>
                취소
              </SetPrice.Cancel>
              <SetPrice.Setting onClick={setInputPrice}>설정</SetPrice.Setting>
            </SetPrice.InputWrapper>
          ))}
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
  color: '#5F5F5F';
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

const SetPrice = {
  Button: styled.div`
    margin-top: 8px;
    font-size: 20px;
    font-weight: 500;
  `,
  InputWrapper: styled.div`
    margin-top: 8px;
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
  `,
  InputBox: styled.input`
    padding: 10px;
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  `,
  Cancel: styled.div``,
  Setting: styled.div``,
};
