'use client';
import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

function page() {
  const router = useRouter();
  return (
    <>
      <Register onClick={() => router.push('/register')}>{'회원가입'}</Register>
    </>
  );
}

export default page;

const Register = styled.div`
  cursor: pointer;
`;
