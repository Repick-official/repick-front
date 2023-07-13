'use client';
import React from 'react';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';

function page() {
  const router = useRouter();

  return (
    <div onClick={() => router.push('/mypage/subscribe')}>
      <Button
        content="멤버십 구독하러 가기"
        back="black"
        color="white"
        width="310"
        height="60"
      />
    </div>
  );
}

export default page;
