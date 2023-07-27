'use client';
import React, { useEffect, useState } from 'react';
import Button from '@/components/common/Button';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import ContentBodyInfo from '@/components/guide/ContentBodyInfo';
import check_off from '@/assets/images/check/off.svg';
import check_on from '@/assets/images/check/on.svg';
import more from '@/assets/images/wardrobe/more.svg';
import getAccessToken from '@/util/getAccessToken';
import { useCookies } from 'react-cookie';

import {
  showWardrobeAll,
  showWardrobeSelling,
  showWardrobeSold,
  showWardrobeSettlement,
} from '@/api/requests';

function page() {
  const router = useRouter();
  const [order, setOrder] = useState<string>('all');
  const [products, setProducts] = useState<any[]>([]);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [total, setTotal] = useState<number>(0);
  const [settlement, setSettlement] = useState<any[]>([]);

  const clickSettlement = async () => {
    const selectedProducts = products.filter((item) => item.isClicked === true);

    const selectedProductIds = selectedProducts.map((item) => item.productId);

    if (selectedProducts.length === 0) {
      alert('상품을 선택해주세요.');
      return;
    } else if (
      selectedProducts.some((item) => item.productState !== 'SOLD_OUT')
    ) {
      alert('판매 완료된 상품만 선택해주세요.');
    } else if (
      selectedProducts.every((item) => item.productState === 'SOLD_OUT')
    ) {
      setSettlement((prevSettlement) => [
        ...prevSettlement,
        ...selectedProductIds,
      ]);
    }
  };
  useEffect(() => {
    if (settlement.length > 0) {
      (async () => {
        let accessToken = await getAccessToken(cookies, setCookie);
        const settle = await showWardrobeSettlement(accessToken, settlement);
        console.log('set', settlement);
        router.push('/wardrobe/current/success');
      })();
    }
  }, [settlement]);

  useEffect(() => {
    const get = async () => {
      let accessToken = await getAccessToken(cookies, setCookie);
      const response = await showWardrobeAll(accessToken);
      const clothes = response.map((item: any) => {
        if (item.productState === 'SOLD_OUT') {
          setTotal((prev) => prev + item.price);
        }
        return { ...item, isClicked: false };
      });
      setProducts(clothes);
    };
    get();
  }, []);

  const handleClick = (productId: number) => {
    //상품 클릭
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((item) =>
        item.productId === productId
          ? { ...item, isClicked: !item.isClicked }
          : item
      );

      return updatedProducts;
    });
  };

  const ChangeAll = async (newOrder: string) => {
    setOrder(newOrder);
    let accessToken = await getAccessToken(cookies, setCookie);
    const response = await showWardrobeAll(accessToken);
    const clothes = response.map((item: any) => {
      return { ...item, isClicked: false };
    });
    setProducts(clothes);
  };
  const ChangeSelling = async (newOrder: string) => {
    setOrder(newOrder);
    let accessToken = await getAccessToken(cookies, setCookie);
    const response = await showWardrobeSelling(accessToken);
    const clothes = response.map((item: any) => {
      return { ...item, isClicked: false };
    });
    setProducts(clothes);
  };
  const ChangeSold = async (newOrder: string) => {
    setOrder(newOrder);
    let accessToken = await getAccessToken(cookies, setCookie);
    const response = await showWardrobeSold(accessToken);
    const clothes = response.map((item: any) => {
      return { ...item, isClicked: false };
    });
    setProducts(clothes);
  };

  return (
    <Container>
      <Current>
        <T>
          <Title>나의 옷장 정리 현황</Title>
          <SemiTitle>내가 판매 중인 제품들을 볼 수 있어요</SemiTitle>
        </T>
        <F>
          <Filter
            isselected={(order === 'all').toString()}
            onClick={() => ChangeAll('all')}
          >
            전체보기
          </Filter>
          <Filter
            isselected={(order === 'selling').toString()}
            onClick={() => ChangeSelling('selling')}
          >
            판매중만
          </Filter>
          <Filter
            isselected={(order === 'sold').toString()}
            onClick={() => ChangeSold('sold')}
          >
            판매완료만
          </Filter>
        </F>
      </Current>

      <Products>
        {products.map((item) => (
          <Product key={item.productId}>
            <Check onClick={() => handleClick(item.productId)}>
              <Off src={item.isClicked ? check_on.src : check_off.src} />
            </Check>
            <ContentBodyInfo
              src={item.mainImageFile.imagePath}
              tagName={item.brand}
              size={item.size}
              name={item.name}
              price={item.price}
            />
          </Product>
        ))}
      </Products>

      <More>
        상품 더보기
        <Arrow src={more.src} />
      </More>
      <Price>
        <Total>
          <S>판매된 총 금액</S>
          <P>
            <div className="price">{total.toLocaleString('en-US')}</div>원
          </P>
        </Total>
      </Price>

      <div onClick={() => clickSettlement()} className="button">
        <Button content="정산 요청하기" num="4" />
      </div>
    </Container>
  );
}

export default page;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .button {
    margin-bottom: 148px;
  }
`;
const Current = styled.div`
  display: flex;
  width: 1216px;
  justify-content: space-between;
  margin-top: 120px;
`;
const Title = styled.div`
  font-size: 36px;
  font-weight: 600;
`;
const SemiTitle = styled.div`
  font-size: 20px;
  font-weight: 400;
`;
const T = styled.div`
  display: flex;
  flex-direction: column;
`;
const F = styled.div`
  display: flex;
`;
const Filter = styled.div<{ isselected: string }>`
  margin-left: 24px;
  margin-top: 50px;
  font-size: 20px;
  font-weight: ${(props) => (props.isselected === 'true' ? '600' : '400')};
  color: ${(props) =>
    props.isselected === 'true' ? 'var(--1, #111)' : 'var(--2, #5F5F5F);'};
`;

const Product = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 40px;
`;
const Check = styled.div`
  margin-bottom: 20px;
`;
const On = styled.img``;
const Off = styled.img``;
const Products = styled.div`
  width: 1216px;
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-between;
  margin-bottom: 70px;
  gap: 24px;
`;
const More = styled.div`
  width: 1216px;
  height: 80px;
  border-radius: 15px;
  border: 1px solid var(--2, #5f5f5f);
  background: var(--5, #fff);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: var(--2, #5f5f5f);
  font-weight: 400;
`;
const Arrow = styled.img`
  width: 22.962px;
  height: 10px;
  margin-left: 23.96px;
`;
const Price = styled.div`
  width: 498px;
  height: 60px;
  border-radius: 13px;
  background: var(--4, #e8e8e8);
  margin-top: 80px;
  margin-bottom: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Total = styled.div`
  width: 370.56px;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  font-weight: 400;
`;
const S = styled.div``;
const P = styled.div`
  display: flex;
  .price {
    font-weight: 600;
  }
`;
