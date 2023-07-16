'use client';
import React, { useEffect, useState } from 'react';
import sub from '@/assets/images/subscription.png';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';
import { selectedMypickPage } from '@/atom/states';
import { useRecoilState } from 'recoil';
import ContentBodyInfo from '@/components/guide/ContentBodyInfo';
import cloth_1 from '@/assets/images/mypick/cloth_1.png';
import cloth_2 from '@/assets/images/mypick/cloth_2.png';
import cloth_3 from '@/assets/images/mypick/cloth_3.png';
import cloth_4 from '@/assets/images/mypick/cloth_4.png';
import check_off from '@/assets/images/check/off.svg';
import check_on from '@/assets/images/check/on.svg';

import { getMainPageProducts } from '@/api/requests'; //임시 api

function page() {
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useRecoilState(selectedMypickPage);

  const [imageSrc, setImageSrc] = useState(check_off.src);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (isClicked) {
      setImageSrc(check_off.src);
      setIsClicked(false);
    } else {
      setImageSrc(check_on.src);
      setIsClicked(true);
    }
  };

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const get = async () => {
      const response = await getMainPageProducts();

      const clothes = response.map((item: any) => {
        return item;
      });
      setProducts(clothes);
    };

    get();
  }, []); //임시 api

  return (
    <Container>
      <SemiContainer>
        <Content>
          <Pick>
            <Title>내가 픽한제품</Title>
            <Filter>
              <Clear>전체 선택 해제</Clear>
            </Filter>
          </Pick>

          <Products>
            {products.map((item) => (
              <Product>
                <Check onClick={() => handleClick()}>
                  <Off src={imageSrc} />
                </Check>
                <div key={item.productId}>
                  <ContentBodyInfo
                    key={item.productId}
                    src={item.mainImageFile.imagePath}
                    tagName={item.brand}
                    size={item.size}
                    name={item.name}
                    price={item.price}
                  />
                </div>
              </Product>
            ))}
          </Products>

          <ButtonWrapper>
            <div
              onClick={() => {
                setSelectedPage('홈피팅');
                router.push('/myPick/home/homefitting/success');
              }}
            >
              <Button content="홈피팅 신청하기" num="5" />
            </div>
            <div
              onClick={() => {
                setSelectedPage('구매하기');
                router.push('/myPick/shopping/purchase');
              }}
            >
              <Button content="구매하기" num="6" />
            </div>
            {/* 디자인 나중에 바꾸기 */}
          </ButtonWrapper>
        </Content>
      </SemiContainer>
    </Container>
  );
}

export default page;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SemiContainer = styled.div`
  width: 1216px;
`;

const Pick = styled.div`
  width: 1216px;
  margin-top: 104px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 60px;
`;
const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
`;
const Filter = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: var(--2, #5f5f5f);
  display: flex;
`;
const OnlyProduct = styled.div``;
const Clear = styled.div`
  margin-left: 54px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ButtonWrapper = styled.div`
  display: flex;
  width: 744px;
  justify-content: space-between;
  margin-bottom: 148px;
`;
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
