import styled from 'styled-components';
import X from '@/assets/images/x.svg';
import search_dark from '@/assets/images/search_dark.svg';
import React, { useEffect, useState } from 'react';
import { searchItem } from '@/api/requests';

interface Product {
  brand: string;
  detail: string;
  discountRate: number;
  mainImageFile: {
    imagePath: string;
    imageKey: string;
    isMainImage: boolean;
  };
  name: string;
  price: number;
  productId: number;
  productState: string;
  size: string;
}

function SearchModal({ clickModal }: any) {
  const [inputText, setInputText] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [cursorId, setCursorId] = useState<number>(0);
  const [keyword, setKeyword] = useState('');
  const pageSize = 16;

  const handleChange = async (e: { target: { value: any } }) => {
    setInputText(e.target.value);
  };

  const search = async () => {
    if (inputText !== '') {
      setKeyword(inputText);
      const response = await searchItem(cursorId, pageSize, keyword);
      setProducts((prevProducts) => [...prevProducts, ...response]);
      if (response.length > 0) {
        const lastProductId = response[response.length - 1].productId;
        setCursorId(lastProductId);
      }
      console.log('r', response);
    }
    console.log('p', products);
  };

  return (
    <>
      <ModalBox onClick={clickModal}>
        <SearchModalContent onClick={(e: any) => e.stopPropagation()}>
          <Remove onClick={clickModal} src={X.src}></Remove>
          <Content>
            <SearchWrapper>
              <SearchBox value={inputText} onChange={handleChange} />
              <ButtonWrapper src={search_dark.src} onClick={() => search()} />
            </SearchWrapper>
            <ContentWrapper>
              <Current>최근 검색어</Current>
              <Keywords>
                <Key>추천키워드</Key>
                <Words>
                  <Word>오프숄더</Word>
                  <Word>레인 부츠</Word>
                  <Word>크롭 반팔티</Word>
                </Words>
              </Keywords>
            </ContentWrapper>
          </Content>
        </SearchModalContent>
      </ModalBox>
    </>
  );
}

export default SearchModal;

const ModalBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

const SearchModalContent = styled.div`
  width: 100vw;
  height: 600px;
  background-color: var(--5, #fff);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Content = styled.div`
  width: 1216px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Remove = styled.img`
  width: 31px;
  height: 31px;
  margin-top: 67px;
  margin-left: 1400px; //임시
`;
const SearchBox = styled.input`
  width: 780px;
  height: 80px;
  border: none;
  background: var(--unnamed, #f6f6f6);
  font-size: 28px;
  font-weight: 400;
  outline: none;
`;
const ButtonWrapper = styled.img`
  cursor: pointer;
  width: 26px;
  height: 26px;
`;
const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 850px;
  height: 80px;
  font-weight: 400;
  border-radius: 15px;
  border: none;
  background: var(--unnamed, #f6f6f6);
  outline: none;
  padding-left: 28px;
`;
const ContentWrapper = styled.div`
  display: flex;
  margin-top: 40px;
`;
const Current = styled.div`
  font-size: 24px;
  font-weight: 600;
  width: 425px;
`;
const Keywords = styled.div`
  width: 425px;
`;
const Word = styled.div`
  margin-bottom: 24px;
`;
const Words = styled.div`
  margin-top: 20px;
`;
const Key = styled.div`
  font-size: 24px;
  font-weight: 600;
`;
