'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import getAccessToken from '@/util/getAccessToken';
import {kakaoLogin} from '@/api/requests';

function page() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const checkIsVoted = async () => {
      
      const response = await kakaoLogin(code);
      console.log(response);
    };

    checkIsVoted();
  }, []);

  return <div>로그인 중입니다.</div>;
}

export default page;
