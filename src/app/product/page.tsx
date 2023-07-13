'use client';
import React from 'react';
import ContentBodyInfo from '@/components/guide/ContentBodyInfo';
import cloth_1 from '@/assets/images/mypick/cloth_1.png';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

function page() {
  const router = useRouter();

  return (
    <>
      <Products>
        <Product onClick={() => router.push(`/product/detail/${1}`)}>
          {/* 임의로 경로 1 설정 */}
          <ContentBodyInfo
            src={cloth_1.src}
            tagName={'MM6'}
            itemInfo={'3, 55 / 코튼 점퍼 자켓'}
            price={355000}
          />
        </Product>
      </Products>
    </>
  );
}

export default page;

const Product = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Check = styled.div`
  margin-bottom: 20px;
`;
const On = styled.img``;
const Off = styled.img``;
const Products = styled.div`
  width: 1216px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 70px;
`;
