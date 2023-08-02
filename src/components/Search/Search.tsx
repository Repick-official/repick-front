import styled from 'styled-components';
import X from '@/assets/images/x.svg';
import search_dark from '@/assets/images/search_dark.svg';
import React, { useEffect, useState, useRef } from 'react';
import { searchItem } from '@/api/requests';
import { useRouter, redirect } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { keyword, searchedlastProductId } from '@/atom/states';

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
  const router = useRouter();
  const inputRef = useRef<any>();
  const [inputText, setInputText] = useState('');
  const [productId, setProductId] = useRecoilState(searchedlastProductId);
  const [cursorId, setCursorId] = useState<number>(0);

  const pageSize = 16;

  const [text, setText] = useRecoilState(keyword);

  const handleChange = async (e: { target: { value: string } }) => {
    setInputText(e.target.value);
  };
  const handleOnKeyPress = async (e: { key: string }) => {
    if (e.key === 'Enter') {
      setText(inputText);
      search();
    }
  };
  const search = async () => {
    if (inputText.trim() !== '') {
      const response = await searchItem(cursorId, pageSize, text);
      if (response.length > 0) {
        const lastProductId = response[response.length - 1].productId;
        //setProductId(lastProductId);
        sessionStorage.setItem('items', JSON.stringify(response));
        clickModal();
        window.location.href = '/product/searched';
      } else {
        window.location.href = '/product/none';
      }
    }
  };

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);
  return (
    <>
      <ModalBox onClick={clickModal}>
        <SearchModalContent onClick={(e: any) => e.stopPropagation()}>
          <Remove onClick={clickModal} src={X.src}></Remove>
          <Content>
            <SearchWrapper>
              <SearchBox
                ref={inputRef}
                value={inputText}
                onChange={handleChange}
                onKeyPress={handleOnKeyPress}
              />
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

  cursor: default;
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
