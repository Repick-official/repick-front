'use client';
import logo from '@/assets/images/navigation/logo.svg';
import styled from 'styled-components';
import SearchModal from '@/components/Search/SearchModal';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  selectedMypickPage,
  userInfoState,
  selectedNavPage,
} from '@/atom/states';

function Navigation() {
  const router = useRouter();

  const [isLogin, setIslogin] = useState('');
  const [isUser, setIsUser] = useState('');
  const [bold, setBold] = useState('');

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [selectedPage, setSelectedPage] = useRecoilState(selectedNavPage);
  const [selectedPickPage, setSelectedPickPage] =
    useRecoilState(selectedMypickPage);

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
        setSelectedPage('옷장 정리');
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
    const confirm = window.confirm('로그아웃 하시겠습니까?');
    if (confirm) {
      localStorage.removeItem('recoil-persist');
      alert('로그아웃 되었습니다.');
      document.cookie = 'access=; expires=0; path=/;';
      setIsUser('마이페이지');
      setIslogin('로그인');
      setBold('notBold');
      setSelectedPage('');
      router.push('/login');
    }
  };

  const loginHandler = () => {
    setSelectedPage('');
    router.push('/login');
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
      setSelectedPage('옷장 정리');
      router.push('/wardrobe');
    } else {
      alert('로그인이 필요한 서비스입니다.');
      router.push('/login');
      setSelectedPage('');
    }
  };

  const userPage = () => {
    setSelectedPage('');
    router.push('/mypage');
  };
  const myPage = () => {
    alert('로그인이 필요한 서비스입니다.');
    router.push('/login');
    setSelectedPage('');
  };

  const goHome = () => {
    router.push('/guide');
    setSelectedPage('서비스 가이드');
  };

  return (
    <Container>
      <Contents.Wrapper>
        <Contents.Content>
          <Wrapper.Main>
            <Wrapper.Logo>
              <Wrapper.LogoImage src={logo.src} onClick={() => goHome()} />
              <SearchModal />
            </Wrapper.Logo>
            <Wrapper.Page>
              <Wrapper.My $login={bold}>
                {isUser == '마이페이지' ? (
                  <div onClick={myPage}>{isUser}</div>
                ) : (
                  <div onClick={userPage}>{isUser}</div>
                )}
              </Wrapper.My>
              <Wrapper.Login>
                {isLogin == '로그아웃' ? (
                  <div onClick={logoutHandler}>{isLogin}</div>
                ) : (
                  <div onClick={loginHandler}>{isLogin}</div>
                )}
              </Wrapper.Login>
            </Wrapper.Page>
          </Wrapper.Main>
          <Wrapper.Semi>
            <Menu.Wrapper>
              <Menu.Option
                onClick={() => {
                  setSelectedPage('서비스 가이드');
                  router.push('/guide');
                }}
                $selected={selectedPage === '서비스 가이드' ? true : false}
              >
                서비스 가이드
                {selectedPage === '서비스 가이드' ? (
                  <Menu.SelectedPage />
                ) : (
                  <></>
                )}
              </Menu.Option>
            </Menu.Wrapper>
            <Menu.Wrapper>
              <Menu.Option
                onClick={() => checkUserWardrobe()}
                $selected={selectedPage === '옷장 정리' ? true : false}
              >
                옷장 정리
                {selectedPage === '옷장 정리' ? <Menu.SelectedPage /> : <></>}
              </Menu.Option>
            </Menu.Wrapper>
            <Menu.Wrapper>
              <Menu.Option
                onClick={() => {
                  setSelectedPage('제품 보기');
                  router.push('/product');
                }}
                $selected={selectedPage === '제품 보기' ? true : false}
              >
                제품 보기
                {selectedPage === '제품 보기' ? <Menu.SelectedPage /> : <></>}
              </Menu.Option>
            </Menu.Wrapper>

            <Menu.Wrapper>
              <Menu.Option
                onClick={() => checkUserMypick()}
                $selected={selectedPage === '마이픽' ? true : false}
              >
                장바구니
                {selectedPage === '마이픽' ? <Menu.SelectedPage /> : <></>}
              </Menu.Option>
            </Menu.Wrapper>
          </Wrapper.Semi>
        </Contents.Content>
      </Contents.Wrapper>
    </Container>
  );
}

export default Navigation;

const Container = styled.div``;

const Contents = {
  Wrapper: styled.div`
    box-shadow: 0px 2px 8px 0px rgba(166, 166, 166, 0.25);
    height: 196px;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  Content: styled.div``,
};

const Wrapper = {
  Main: styled.div`
    display: flex;
  `,
  Logo: styled.div`
    margin-top: 55.65px;
    display: flex;
  `,
  LogoImage: styled.img`
    width: 195px;
    height: 64px;
    cursor: pointer;
  `,
  Page: styled.div`
    margin-top: 30px;
    display: flex;
  `,
  My: styled.div<{ $login: string }>`
    font-size: 16px;
    margin-right: 39px;
    font-weight: ${(props) => (props.$login === 'bold' ? '600' : '400')};
    cursor: pointer;
  `,
  Login: styled.div`
    font-size: 16px;
    cursor: pointer;
  `,
  Semi: styled.div`
    display: flex;
    margin: 44px 0 0 0;
  `,
};

const Menu = {
  Wrapper: styled.div``,
  Option: styled.div<{ $selected: boolean }>`
    font-size: 20px;
    margin-right: 83px;
    text-align: center;
    width: 153px;
    font-weight: ${(props) => (props.$selected ? '600' : '400')};
    cursor: pointer;
  `,
  SelectedPage: styled.div`
    width: 153px;
    height: 5px;
    background-color: var(--serve-color, #ff8a00);
    margin-top: 8px;
  `,
};
