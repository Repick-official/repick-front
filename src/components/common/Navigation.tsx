'use client';
import React from 'react';
import logo from '@/assets/images/loco.svg';
import styled from 'styled-components';
import SearchModal from '@/components/Search/SearchModal';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { selectedNavPage } from '@/atom/states';
import { useRecoilState } from 'recoil';
import { userInfoState } from '@/atom/states';
import { selectedMypickPage } from '@/atom/states';

function Navigation() {
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useRecoilState(selectedNavPage);

  const [selectedPickPage, setSelectedPickPage] =
    useRecoilState(selectedMypickPage);

  const [isLogin, setIslogin] = useState('');
  const [isUser, setIsUser] = useState('');
  const [bold, setBold] = useState('');

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  useEffect(() => {
    if (userInfo.uesrNickname) {
      setSelectedPage('서비스 가이드');
      setIsUser(userInfo.uesrNickname);
      setIslogin('로그아웃');
      setBold('bold');
    } else {
      setSelectedPage('서비스 가이드');
      setIsUser('마이페이지');
      setIslogin('로그인');
      setBold('notBold');
    }
  }, [userInfo]);

  useEffect(() => {
    let location = window.location.pathname;
    let split = location.split('/');
    switch (split[1]) {
      case 'guide':
        setSelectedPage('서비스 가이드');
        break;
      case 'product':
        setSelectedPage('제품 보기');
        break;
      case 'myPick':
        setSelectedPage('마이픽');
        break;
      case 'wardrobe':
        setSelectedPage('옷장 수거');
        break;
      case 'mypage':
        setSelectedPage('');
        break;
      case 'login':
        setSelectedPage('');
        break;
    }
  }, []);

  const logoutHandler = async () => {
    localStorage.removeItem('recoil-persist');
    alert('로그아웃 되었습니다.');
    document.cookie = 'access=; expires=0; path=/;';
    setIsUser('마이페이지');
    setIslogin('로그인');
    setBold('notBold');
    setSelectedPage('서비스 가이드');
  };

  const checkUserMypick = () => {
    if (userInfo.uesrNickname) {
      setSelectedPickPage('마이픽 현황');
      setSelectedPage('마이픽');
      router.push('/myPick/home');
    } else {
      alert('로그인이 필요한 서비스입니다.');
      router.push('/login');
      setSelectedPage('');
    }
  };

  const checkUserWardrobe = () => {
    if (userInfo.uesrNickname) {
      setSelectedPage('옷장 수거');
      router.push('/wardrobe');
    } else {
      alert('로그인이 필요한 서비스입니다.');
      router.push('/login');
      setSelectedPage('');
    }
  };

  const checkUserMypage = () => {
    if (userInfo.uesrNickname) {
      setSelectedPage('');
      router.push('/mypage');
    } else {
      alert('로그인이 필요한 서비스입니다.');
      router.push('/login');
      setSelectedPage('');
    }
  };

  const goHome = () => {
    router.push('/guide');
    setSelectedPage('서비스 가이드');
  };

  return (
    <Container>
      <Q>
        <S>
          <MainWrapper>
            <LogoWrapper>
              <Logo src={logo.src} onClick={() => goHome()} />

              <SearchModal />
            </LogoWrapper>
            <PageWrapper>
              <My login={bold} onClick={() => checkUserMypage()}>
                {isUser}
              </My>
              <Login
                onClick={() => {
                  setSelectedPage('');
                  router.push('/login');
                }}
              >
                {isLogin == '로그아웃' ? (
                  <div onClick={logoutHandler}>{isLogin}</div>
                ) : (
                  <div>{isLogin}</div>
                )}
              </Login>
            </PageWrapper>
          </MainWrapper>
          <SemiWrapper>
            <Section>
              <Option
                onClick={() => {
                  setSelectedPage('서비스 가이드');
                  router.push('/guide');
                }}
                selected={selectedPage === '서비스 가이드' ? true : false}
              >
                서비스 가이드
                {selectedPage === '서비스 가이드' ? <SelectedPage /> : <></>}
              </Option>
            </Section>
            <Section>
              <Option
                onClick={() => {
                  setSelectedPage('제품 보기');
                  router.push('/product');
                }}
                selected={selectedPage === '제품 보기' ? true : false}
              >
                제품 보기
                {selectedPage === '제품 보기' ? <SelectedPage /> : <></>}
              </Option>
            </Section>

            <Section>
              <Option
                onClick={() => checkUserMypick()}
                selected={selectedPage === '마이픽' ? true : false}
              >
                마이픽
                {selectedPage === '마이픽' ? <SelectedPage /> : <></>}
              </Option>
            </Section>

            <Section>
              <Option
                onClick={() => checkUserWardrobe()}
                selected={selectedPage === '옷장 수거' ? true : false}
              >
                옷장 수거
                {selectedPage === '옷장 수거' ? <SelectedPage /> : <></>}
              </Option>
            </Section>
          </SemiWrapper>
        </S>
      </Q>
    </Container>
  );
}

export default Navigation;

const Section = styled.div``;
const SelectedPage = styled.div`
  width: 153px;
  height: 5px;
  background-color: var(--serve-color, #ff8a00);
  margin-top: 8px;
`;
const S = styled.div``;
const Logo = styled.img`
  width: 195px;
  height: 64px;
  cursor: pointer;
`;
const Container = styled.div``;
const Q = styled.div`
  box-shadow: 0px 2px 8px 0px rgba(166, 166, 166, 0.25);
  height: 196px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const LogoWrapper = styled.div`
  margin-top: 55.65px;
  display: flex;
`;
const PageWrapper = styled.div`
  margin-top: 30px;
  display: flex;
`;
const My = styled.div<{ login: string }>`
  font-size: 16px;
  margin-right: 39px;
  font-weight: ${(props) => (props.login === 'bold' ? '600' : '400')};
  cursor: pointer;
`;
const Login = styled.div`
  font-size: 16px;
  cursor: pointer;
`;
const MainWrapper = styled.div`
  display: flex;
`;
const SemiWrapper = styled.div`
  display: flex;
  margin: 44px 0 0 0;
`;
const Option = styled.div<{ selected: boolean }>`
  font-size: 20px;
  margin-right: 83px;
  text-align: center;
  width: 153px;
  font-weight: ${(props) => (props.selected ? '600' : '400')};
  cursor: pointer;
`;
