'use client';
import React from 'react';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';

function page() {
  const router = useRouter();

  return (
    <div onClick={() => router.push('/wardrobe/current/success')}>
      <Button content="정산 요청하기" />
    </div>
  );
}

export default page;
