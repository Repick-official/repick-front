import styled from 'styled-components';
import X from '@/assets/images/mypick/x.svg';
import search_dark from '@/assets/images/search_dark.svg';
import React, { useEffect, useState, useRef } from 'react';
import { searchItem } from '@/api/requests';
import { useRouter, redirect } from 'next/navigation';
import { selectedNavPage } from '@/atom/states';
import { useRecoilState } from 'recoil';

function SearchModal({
  clickModal,
  text1,
  text2,
  button,
}: {
  clickModal: any;
  text1: string;
  text2: string;
  button: number;
}) {
  const router = useRouter();
  const [selectedNaviPage, setSelectedNaviPage] =
    useRecoilState(selectedNavPage);

  const goSubscribe = () => {
    setSelectedNaviPage('');
    router.push('/mypage');
  };

  let text1JSX: any = text1;
  let text2Style = {};

  if (text1.includes('5벌까지만 가능해요.')) {
    text1JSX = (
      <>
        홈피팅은 한 번에 <span className="orange-text">최대 5벌까지</span>만
        가능해요.
      </>
    );
  } else if (text1.includes('3벌까지만 입어볼 수 있어요!')) {
    text1JSX = (
      <>
        베이직 멤버십 회원은 <span className="orange-text">3벌까지</span>만
        입어볼 수 있어요!
      </>
    );
  }

  // text2는 항상 검정색으로 렌더링
  text2Style = { color: 'black' };

  return (
    <>
      <ModalBox onClick={clickModal}>
        <SearchModalContent onClick={(e: any) => e.stopPropagation()}>
          <Remove onClick={clickModal} src={X.src}></Remove>
          <Content>
            <Text>{text1JSX}</Text>
            <Text style={text2Style}>{text2}</Text>
            {button === 2 ? (
              <Button>
                <Small $size="normal" onClick={clickModal}>
                  다음에 하기
                </Small>
                <Small $size="small" onClick={goSubscribe}>
                  프로 플랜으로 바꾸러 가기
                </Small>
              </Button>
            ) : button === 3 ? (
              <Button>
                <Small $size="normal" onClick={clickModal}>
                  다음에 하기
                </Small>
                <Small $size="small" onClick={goSubscribe}>
                  구독하러 가기
                </Small>
              </Button>
            ) : (
              <Button>
                <Large onClick={clickModal}>확인했어요</Large>
              </Button>
            )}
          </Content>
        </SearchModalContent>
      </ModalBox>
    </>
  );
}

export default SearchModal;

const Button = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 38px;
`;
const Small = styled.div<{ $size: string }>`
  border-radius: 15px;
  background: var(--1, #111);
  display: flex;
  width: 238px;
  height: 80px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => (props.$size === 'normal' ? '20px' : '16px')};
  font-style: normal;
  font-weight: 600;
  color: var(--4, #e8e8e8);
`;
const Large = styled.div`
  border-radius: 15px;
  background: var(--1, #111);
  display: flex;
  width: 360.622px;
  height: 80px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--4, #e8e8e8);
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
`;

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

  .orange-text {
    color: orange;
  }
`;
