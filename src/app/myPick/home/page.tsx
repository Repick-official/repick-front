'use client';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';
import { selectedMypickPage } from '@/atom/states';
import { useRecoilState } from 'recoil';
import ContentBodyInfo from '@/components/guide/ContentBodyInfo';
import check_off from '@/assets/images/check/off.svg';
import check_on from '@/assets/images/check/on.svg';
import getAccessToken from '@/util/getAccessToken';
import { useCookies } from 'react-cookie';

import { inquiryMypick } from '@/api/requests'; //임시 api

function page() {
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useRecoilState(selectedMypickPage);

  const [cookies, setCookie, removeCookie] = useCookies();

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const get = async () => {
      let accessToken = await getAccessToken(cookies, setCookie);
      const response = await inquiryMypick(accessToken);
      console.log();
      const clothes = response.map((item: any) => {
        return { ...item, isClicked: false };
      });
      setProducts(clothes);
    };
    get();
  }, []);
  console.log(products);

  const handleClick = (productId: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((item) =>
        item.product.productId === productId
          ? { ...item, isClicked: !item.isClicked }
          : item
      )
    );

    console.log(products);
  };

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
              <Product key={item.product.productId}>
                <Check onClick={() => handleClick(item.product.productId)}>
                  <Off src={item.isClicked ? check_on.src : check_off.src} />
                </Check>
                <div>
                  <ContentBodyInfo
                    key={item.productId}
                    src={item.product.mainImageFile.imagePath}
                    tagName={item.product.brand}
                    size={item.product.size}
                    name={item.product.name}
                    price={item.product.price}
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
