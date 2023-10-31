'use client';
import ContentBodyInfo from '@/components/guide/ContentBodyInfo';
import getAccessToken from '@/util/getAccessToken';
import styled, { keyframes } from 'styled-components';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import {
  showWardrobeAll,
  showWardrobeSelling,
  showWardrobeSold,
  showWardrobeSettlement,
  showWardrobeSettled,
  showWardrobePreparing,
} from '@/api/requests';
import { flexCenter, flexColumn } from '@/styles/theme';
import { Product } from '@/interface/interface';

function page() {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies();

  const [order, setOrder] = useState<string>('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [sold, setSold] = useState<number[]>([]);
  useEffect(() => {
    const get = async () => {
      let accessToken = await getAccessToken(cookies, setCookie);
      const response = await showWardrobeAll(accessToken);
      const clothes = response.map((item: Product) => {
        if (item.productState === 'SOLD_OUT') {
          setTotal((prev) => prev + item.price);
          setSold((prevSold) => [...prevSold, item.productId]);
        }
        return item;
      });
      console.log(clothes);
      setProducts(clothes);
    };
    get();
  }, []);

  console.log('products', products);

  const clickSettlement = async () => {
    const confirm = window.confirm('정산 요청을 신청하시겠습니까?');
    if (confirm) {
      if (order === 'all' || order === 'sold') {
        if (sold.length === 0) {
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
  const ChangePreparing = async (newOrder: string) => {
    await handleChange(newOrder, showWardrobePreparing);
  };
  return (
    <Container>
      <Current.Wrapper>
        <Current.Wrap>
          <Current.Title>나의 옷장 정리 현황</Current.Title>
          <Current.SemiTitle>
            내가 판매 중인 제품들을 볼 수 있어요
          </Current.SemiTitle>
        </Current.Wrap>
        <Current.Category>
          <Current.Filter
            $isselected={(order === 'all').toString()}
            onClick={() => ChangeAll('all')}
          >
            전체보기
          </Current.Filter>
          <Current.Filter
            $isselected={(order === 'preparing').toString()}
            onClick={() => ChangePreparing('preparing')}
          >
            판매전
          </Current.Filter>
          <Current.Filter
            $isselected={(order === 'selling').toString()}
            onClick={() => ChangeSelling('selling')}
          >
            판매중
          </Current.Filter>
          <Current.Filter
            $isselected={(order === 'sold').toString()}
            onClick={() => ChangeSold('sold')}
          >
            판매완료
          </Current.Filter>
          <Current.Filter
            $isselected={(order === 'settled').toString()}
            onClick={() => ChangeSettled('settled')}
          >
            정산완료
          </Current.Filter>
        </Current.Category>
      </Current.Wrapper>

      <Products.Wrapper>
        {products.map((item) => (
          <Products.Content key={item.productId}>
            {item.productState === 'SELLING' ||
            item.productState === 'PENDING' ? (
              <Products.Option $option="selling">판매 진행중</Products.Option>
            ) : item.productState === 'SOLD_OUT' ? (
              <Products.Option $option="sold-out">판매완료</Products.Option>
            ) : item.productState === 'PREPARING' ? (
              <Products.Preparing>
                <Products.Option $option="preparing">판매전</Products.Option>
              </Products.Preparing>
            ) : (
              <Products.Option $option="settled">정산완료</Products.Option>
            )}
            <ContentBodyInfo
              id={item.productId}
              src={item.mainImageFile.imagePath}
              tagName={item.brand}
              size={item.size}
              name={item.name}
              price={item.price}
            />
          </Products.Content>
        ))}
      </Products.Wrapper>

      <Price.Wrapper>
        <Price.Total>
          <Price.Name>판매된 총 금액</Price.Name>
          <Price.Price>
            <div className="price">{total.toLocaleString('en-US')}</div>원
          </Price.Price>
        </Price.Total>
      </Price.Wrapper>

      <div onClick={() => clickSettlement()} className="button">
        {order === 'selling' || order === 'settled' ? (
          <Price.Call $isblack="black">정산 요청하기</Price.Call>
        ) : (
          <Price.Call $isblack="gray">정산 요청하기</Price.Call>
        )}
      </div>
    </Container>
  );
}

export default page;
function blinkingEffect() {
  return keyframes`
    50% {
      opacity: 0;
    }
  `;
}
const Container = styled.div`
  ${flexColumn}
  align-items: center;

  .button {
    margin-bottom: 148px;
  }
`;

const Current = {
  Wrapper: styled.div`
    display: flex;
    width: 1216px;
    justify-content: space-between;
    margin-top: 120px;
  `,
  Wrap: styled.div`
    ${flexColumn}
  `,
  Title: styled.div`
    font-size: 36px;
    font-weight: 600;
    line-height: 140%;
  `,
  SemiTitle: styled.div`
    font-size: 20px;
    font-weight: 400;
  `,
  Category: styled.div`
    display: flex;
  `,
  Filter: styled.div<{ $isselected: string }>`
    margin-left: 24px;
    margin-top: 50px;
    font-size: 20px;
    font-weight: ${(props) => (props.$isselected === 'true' ? '600' : '400')};
    color: ${(props) =>
      props.$isselected === 'true'
        ? props.theme.colors.black
        : props.theme.colors.darkgray};
  `,
};

const Products = {
  Wrapper: styled.div`
    width: 1216px;
    display: flex;
    flex-wrap: wrap;

    margin-top: 60px;
    gap: 15px;
  `,
  Content: styled.div`
    ${flexColumn}
    align-items: center;
    margin-bottom: 80px;
  `,
  Option: styled.div<{ $option: string }>`
    margin-bottom: 20px;
    font-size: 20px;

    font-weight: 600;
    color: ${(props) =>
      props.$option === 'selling'
        ? props.theme.colors.black
        : props.$option === 'sold-out'
        ? props.theme.colors.main
        : props.$option === 'preparing'
        ? props.theme.colors.orange
        : props.theme.colors.gray};
    animation: ${(props) =>
      props.$option === 'preparing'
        ? `${blinkingEffect} 1s linear infinite`
        : ''};
  `,
  Preparing: styled.div`
    animation: ${blinkingEffect} 1s linear infinite;
  `,
};

const Price = {
  Wrapper: styled.div`
    ${flexCenter}
    width: 498px;
    height: 60px;
    border-radius: 13px;
    background: ${(props) => props.theme.colors.lightgray};
    margin-bottom: 70px;
  `,
  Total: styled.div`
    width: 370.56px;
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    font-weight: 400;
  `,
  Name: styled.div``,
  Price: styled.div`
    display: flex;
    .price {
      font-weight: 600;
    }
  `,
  Call: styled.div<{ $isblack: string }>`
    ${flexCenter}
    ${flexColumn}
    border: none;
    padding: 24px 40px;
    border-radius: 15px;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;

    width: 280px;
    height: 16px;
    background: ${(props) =>
      props.$isblack == 'black'
        ? props.theme.colors.gray
        : props.theme.colors.black};
    color: ${(props) => props.theme.colors.lightgray};
  `,
};
