'use client';
import React from 'react';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';
import { selectedMypickPage } from '@/atom/states';
import { useRecoilState } from 'recoil';

function page() {
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useRecoilState(selectedMypickPage);

  return (
    <>
      <div
        onClick={() => {
          setSelectedPage('구매하기');
          router.push('/myPick/purchase');
        }}
      >
        <Button
          content="구매하기"
          back="black"
          color="white"
          width="360"
          height="60"
        />
      </div>
    </>
  );
}

export default page;
