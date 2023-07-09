'use client';
import React from 'react';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';

function page() {
  const router = useRouter();
  return (
    <>
      <div onClick={() => router.push('/myPick/purchase/enterInfo/success')}>
        <Button content="결제하기" />
      </div>
    </>
  );
}

export default page;
