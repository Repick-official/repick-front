'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { kakaoLogin } from '@/api/requests';
import { useCookies } from 'react-cookie';
import { userInfoState } from '@/atom/states';
import { useRecoilState } from 'recoil';

function page() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const router = useRouter();

  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const checkKakaoLogin = async () => {
    const response = await kakaoLogin(code);
    if (response) {
      console.log(response);
      const expiresDate1 = new Date();
      expiresDate1.setDate(expiresDate1.getDate() + 1);
      setCookie('access', response.accessToken, {
        expires: expiresDate1,
      });
      setUserInfo({
        id: response.id,
        userEmail: response.email,
        uesrNickname: response.nickname,
      });
      alert('환영합니다 ' + response.nickname + '님');
      router.push('/');
    } else {
      alert('잘못된 접근입니다.');
      router.push('/');
    }
  };
  useEffect(() => {
    checkKakaoLogin();
  }, []);

  return <div>로그인 중입니다.</div>;
}

export default page;
