import styled from 'styled-components';
import X from '@/assets/images/search/x.svg';
import search_dark from '@/assets/images/search/search_dark.svg';
import { useEffect, useState, useRef } from 'react';
import { searchItem } from '@/api/requests';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { keyword, searchedlastProductId } from '@/atom/states';
import { SearchModalProps } from '@/interface/interface';

function SearchModal({ clickModal }: SearchModalProps) {
  const router = useRouter();
  const [inputText, setInputText] = useState<string>('');
  const [cursorId, setCursorId] = useState<number>(0);

  const pageSize = 16;

  const inputRef = useRef<any>();

  const [text, setText] = useRecoilState(keyword);
  const [productId, setProductId] = useRecoilState(searchedlastProductId);

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const handleChange = async (e: { target: { value: string } }) => {
    setInputText(e.target.value);
  };

  const handleOnKeyPress = async (e: { key: string }) => {
    if (e.key === 'Enter') {
      setText(inputText);
      search(inputText);
    }
  };

  const search = async (inputText: string) => {
    if (inputText.trim() !== '') {
      const response = await searchItem(cursorId, pageSize, inputText);
      if (response.length > 0) {
        clickModal();
        window.location.href = '/product/searched';
      } else {
        window.location.href = '/product/none';
      }
    }
  };

  return (
    <Container>
      <Wrapper.ModalBox onClick={clickModal}>
        <Wrapper.ModalContent
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        >
          <Remove onClick={clickModal} src={X.src}></Remove>
          <Content.Wrapper>
            <Content.Search>
              <Content.SearchBox
                ref={inputRef}
                value={inputText}
                onChange={handleChange}
                onKeyPress={handleOnKeyPress}
              />
              <Content.Button
                src={search_dark.src}
                onClick={() => search(inputText)}
              />
            </Content.Search>
            <Content.Recommend>
              <Recommend.Current>최근 검색어</Recommend.Current>
              <Recommend.Keywords>
                <Recommend.Key>추천키워드</Recommend.Key>
                <Recommend.Words>
                  <Recommend.Word>오프숄더</Recommend.Word>
                  <Recommend.Word>레인 부츠</Recommend.Word>
                  <Recommend.Word>크롭 반팔티</Recommend.Word>
                </Recommend.Words>
              </Recommend.Keywords>
            </Content.Recommend>
          </Content.Wrapper>
        </Wrapper.ModalContent>
      </Wrapper.ModalBox>
    </Container>
  );
}

export default SearchModal;

const Container = styled.div``;

const Wrapper = {
  ModalBox: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    cursor: default;
  `,
  ModalContent: styled.div`
    width: 100vw;
    height: 600px;
    background-color: var(--5, #fff);
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
};

const Content = {
  Wrapper: styled.div`
    width: 1216px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
  Search: styled.div`
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
  `,
  SearchBox: styled.input`
    width: 780px;
    height: 80px;
    border: none;
    background: var(--unnamed, #f6f6f6);
    font-size: 28px;
    font-weight: 400;
    outline: none;
  `,
  Button: styled.img`
    cursor: pointer;
    width: 26px;
    height: 26px;
  `,
  Recommend: styled.div`
    display: flex;
    margin-top: 40px;
  `,
};

const Remove = styled.img`
  width: 31px;
  height: 31px;
  margin-top: 67px;
  margin-left: 1400px; //임시
`;

const Recommend = {
  Current: styled.div`
    font-size: 24px;
    font-weight: 600;
    width: 425px;
  `,
  Keywords: styled.div`
    width: 425px;
  `,
  Word: styled.div`
    margin-bottom: 24px;
  `,
  Words: styled.div`
    margin-top: 20px;
  `,
  Key: styled.div`
    font-size: 24px;
    font-weight: 600;
  `,
};
