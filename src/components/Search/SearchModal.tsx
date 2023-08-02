import styled from 'styled-components';
import search from '@/assets/images/search/search.svg';
import Modal from '@/components/Search/Search';
import { useState } from 'react';

function SearchModal() {
  const [showModal, setShowModal] = useState(false);
  const clickModal = () => setShowModal(!showModal);

  return (
    <Contatiner>
      <Search.Wrapper>
        <Search.InputWrapper onClick={clickModal}>
          <Search.Box
            placeholder="어떤 의류를 찾고 계신가요?"
            onClick={clickModal}
          ></Search.Box>
          <Search.Button src={search.src} onClick={clickModal} />
          {showModal && <Modal clickModal={clickModal} />}
        </Search.InputWrapper>
      </Search.Wrapper>
    </Contatiner>
  );
}

export default SearchModal;

const Contatiner = styled.div``;

const Search = {
  Wrapper: styled.div`
    margin: 0px 65px 0px 108px;
  `,
  InputWrapper: styled.div`
    display: flex;
    align-items: center;
    width: 659px;
    height: 56px;
    background: rgba(238, 238, 238, 1);
    border-radius: 15px;
    padding-left: 24px;
    ::placeholder {
      color: var(--3, #b4b4b4);
    }
    cursor: pointer;
  `,
  Box: styled.input`
    width: 215px;
    height: 28px;
    font-weight: 400;
    font-size: 20px;
    margin-right: 380px;
    border: none;
    background: rgba(238, 238, 238, 1);
    outline: none;
    cursor: pointer;
    line-height: 140%;
    font-family: Pretendard;
  `,
  Button: styled.img`
    cursor: pointer;
    width: 26px;
    height: 26px;
  `,
};
