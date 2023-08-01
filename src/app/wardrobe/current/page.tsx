'use client';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import ContentBodyInfo from '@/components/guide/ContentBodyInfo';
import getAccessToken from '@/util/getAccessToken';
import { useCookies } from 'react-cookie';
import {
  showWardrobeAll,
  showWardrobeSelling,
  showWardrobeSold,
  showWardrobeSettlement,
  showWardrobeSettled,
} from '@/api/requests';

function page() {
  const router = useRouter();
  const [order, setOrder] = useState<string>('all');
  const [products, setProducts] = useState<any[]>([]);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [total, setTotal] = useState<number>(0);
  const [sold, setSold] = useState<any[]>([]);

  const clickSettlement = async () => {
    const confirm = window.confirm('정산 요청을 신청하시겠습니까?');
    if (confirm) {
      if (order === 'all' || order === 'sold') {
        if (sold.length === 0) {
          // 'sold' 배열이 비어있는 경우 알림창 띄우기
          alert('정산 요청할 상품이 없습니다.');
        } else {
          let accessToken = await getAccessToken(cookies, setCookie);
          const settle = await showWardrobeSettlement(accessToken, sold);
          router.push('/wardrobe/current/success');
        }
      } else {
        alert('정산 요청이 불가능한 상품입니다.');
      }
    }
  };

  useEffect(() => {
    const get = async () => {
      let accessToken = await getAccessToken(cookies, setCookie);
      const response = await showWardrobeAll(accessToken);
      const clothes = response.map((item: any) => {
        if (item.productState === 'SOLD_OUT') {
          setTotal((prev) => prev + item.price);
          setSold((prevSold) => [...prevSold, item.productId]);
        }
        return item;
      });
      setProducts(clothes);
    };
    get();
  }, []);
  console.log(products);
  console.log('sold', sold);

  const handleChange = async (newOrder: string, apiFunction: any) => {
    setOrder(newOrder);
    let accessToken = await getAccessToken(cookies, setCookie);
    const response = await apiFunction(accessToken);
    setProducts(response);
  };

  const ChangeAll = async (newOrder: string) => {
    await handleChange(newOrder, showWardrobeAll);
  };

  const ChangeSelling = async (newOrder: string) => {
    await handleChange(newOrder, showWardrobeSelling);
  };

  const ChangeSold = async (newOrder: string) => {
    await handleChange(newOrder, showWardrobeSold);
  };

  const ChangeSettled = async (newOrder: string) => {
    await handleChange(newOrder, showWardrobeSettled);
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
            $isselected={(order === 'all').toString()}
            onClick={() => ChangeAll('all')}
          >
            전체보기
          </Filter>
          <Filter
            $isselected={(order === 'selling').toString()}
            onClick={() => ChangeSelling('selling')}
          >
            판매중
          </Filter>
          <Filter
            $isselected={(order === 'sold').toString()}
            onClick={() => ChangeSold('sold')}
          >
            판매완료
          </Filter>
          <Filter
            $isselected={(order === 'settled').toString()}
            onClick={() => ChangeSettled('settled')}
          >
            정산완료
          </Filter>
        </F>
      </Current>

      <Products>
        {products.map((item) => (
          <Product key={item.productId}>
            {item.productState === 'SELLING' ||
            item.productState === 'PENDING' ? (
              <Option $option="selling">판매 진행중</Option>
            ) : item.productState === 'SOLD_OUT' ? (
              <Option $option="sold-out">판매완료</Option>
            ) : (
              <Option $option="settled">정산완료</Option>
            )}
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

      <Price>
        <Total>
          <S>판매된 총 금액</S>
          <P>
            <div className="price">{total.toLocaleString('en-US')}</div>원
          </P>
        </Total>
      </Price>

      <div onClick={() => clickSettlement()} className="button">
        {order === 'selling' || order === 'settled' ? (
          <Call $isblack="black">정산 요청하기</Call>
        ) : (
          <Call $isblack="gray">정산 요청하기</Call>
        )}
      </div>
    </Container>
  );
}

export default page;

const Call = styled.div<{ $isblack: string }>`
  border: none;
  display: flex;
  padding: 24px 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;

  width: 280px;
  height: 16px;
  background: ${(props) =>
    props.$isblack == 'black' ? 'var(--3, #B4B4B4)' : 'var(--1, #111)'};
  color: var(--4, #e8e8e8);
`;

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
const Filter = styled.div<{ $isselected: string }>`
  margin-left: 24px;
  margin-top: 50px;
  font-size: 20px;
  font-weight: ${(props) => (props.$isselected === 'true' ? '600' : '400')};
  color: ${(props) =>
    props.$isselected === 'true' ? 'var(--1, #111)' : 'var(--2, #5F5F5F);'};
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
const Option = styled.div<{ $option: string }>`
  margin-bottom: 20px;
  font-size: 20px;

  font-weight: 600;
  color: ${(props) =>
    props.$option === 'selling'
      ? 'var(--1, #111)'
      : props.$option === 'sold-out'
      ? 'var(--serve-color, #FF8A00)'
      : 'var(--3, #B4B4B4);'};
`;
const On = styled.img``;
const Off = styled.img``;
const Products = styled.div`
  width: 1216px;
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-between;
  margin-bottom: 80px;
  gap: 15px;
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
