import styled from 'styled-components';
import X from '@/assets/images/mypick/x.svg';
import search_dark from '@/assets/images/search_dark.svg';
import React, { useEffect, useState, useRef } from 'react';
import { searchItem } from '@/api/requests';
import { useRouter, redirect } from 'next/navigation';

function SearchModal({
  clickModal,
  text1,
  text2,
}: {
  clickModal: any;
  text1: string;
  text2: string;
}) {
  const router = useRouter();

  return (
    <>
      <ModalBox onClick={clickModal}>
        <SearchModalContent onClick={(e: any) => e.stopPropagation()}>
          <Remove onClick={clickModal} src={X.src}></Remove>
          <Content>
            <Text>{text1} </Text>
            <Text>{text2}</Text>
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
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchModalContent = styled.div`
  width: 580px;
  height: 329px;
  background-color: var(--5, #fff);
  //   display: flex;
  //   flex-direction: column;
  //   align-items: center;
  box-shadow: 0px 2px 24px 0px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 35px;
`;
const Remove = styled.img`
  width: 26px;
  height: 26px;
  margin-top: 34px;
  margin-left: 520px;
`;
const Text = styled.div`
  color: var(--1, #111);
  text-align: center;
  font-size: 24px;
  font-weight: 600;
`;
