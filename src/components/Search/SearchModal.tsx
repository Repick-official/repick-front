import React from 'react';
import styled from 'styled-components';
import search from '@/assets/images/search.svg';
import { useState } from 'react';
import Modal from '@/components/Search/Search';

function SearchModal() {
  const [showModal, setShowModal] = useState(false);
  const clickModal = () => setShowModal(!showModal);

  return (
    <Contatiner>
      <SearchWrapper>
        <SearchInputWrapper>
          <SearchBox placeholder="어떤 의류를 찾고 계신가요?"></SearchBox>
          <ButtonWrapper src={search.src} onClick={clickModal} />
          {showModal && <Modal clickModal={clickModal} />}
        </SearchInputWrapper>
      </SearchWrapper>
    </Contatiner>
  );
}

export default SearchModal;

const SearchWrapper = styled.div`
  margin: 0px 65px 0px 108px;
`;
const SearchInputWrapper = styled.div`
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
`;
const SearchBox = styled.input`
  width: 215px;
  height: 28px;
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 20px;
  margin-right: 386px;
  border: none;
  background: rgba(238, 238, 238, 1);
  outline: none;
`;
const ButtonWrapper = styled.img`
  cursor: pointer;
  width: 26px;
  height: 26px;
`;
const Contatiner = styled.div``;
