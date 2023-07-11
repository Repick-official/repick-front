import React from 'react';
import styled from 'styled-components';

function SearchModal({ clickModal }: any) {
  return (
    <>
      <ModalBox onClick={clickModal}>
        <SearchModalContent onClick={(e: any) => e.stopPropagation()}>
          <Content>
            <div onClick={clickModal}>x</div>
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
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  //display: flex;
  //justify-content: center;
  //align-items: center;
`;

const SearchModalContent = styled.div`
  //padding: 1.5rem 3rem;
  width: 1919px;
  height: 300px;
  //border: 3px solid #000000;
  //display: flex;
  //flex-direction: column;
  background-color: var(--5, #fff);
  //justify-content: center;
`;
const Content = styled.div`
  width: 1216px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
