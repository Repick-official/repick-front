'use client';
import React, { useEffect, useState } from 'react';
import ContentBodyInfo from '@/components/guide/ContentBodyInfo';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { keyword, searchedlastProductId } from '@/atom/states';
import {
  getCategory,
  getItemSeen,
  searchItemByPrice,
  searchItem,
} from '@/api/requests';
import { flexBetween, flexCenter, flexColumn } from '@/styles/theme';
import { Product, CategoryType, CategoryMap } from '@/interface/interface';

function page() {
  const router = useRouter();
  const [categoryData, setCategoryData] = useState<CategoryMap>({});
  const [cursorId, setCursorId] = useState<number>(0);
  const [cursorPrice, setCursorPrice] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [order, setOrder] = useState<string>('latest');
  const [products, setProducts] = useState<Product[]>([]);
  const [isSearchedItem, setIsSearchedItem] = useState<boolean>(false);
  const pageSize = 16;

  const [text, setText] = useRecoilState(keyword);
  const [productId, setProductId] = useRecoilState(searchedlastProductId);

  console.log('searched page');

  const fetchItem = async () => {
    let response: Product[];
    switch (order) {
      case 'latest':
        response = await searchItem(cursorId, pageSize, text);
        break;
      case 'lowest':
        response = await searchItemByPrice(
          cursorId,
          cursorPrice,
          pageSize,
          text,
          'low'
        );
        break;
      case 'highest':
        response = await searchItemByPrice(
          cursorId,
          cursorPrice,
          pageSize,
          text,
          'high'
        );
        break;
      case 'seen':
        response = await searchItem(cursorId, categoryId, text);
        alert('조회순은 아직 없습니다.');
        break;
      default:
        response = await searchItem(cursorId, pageSize, text);
    }
    setProducts(response);
    if (response.length > 0) {
      const lastProductId = response[response.length - 1].productId;
      const lastProductPrice = response[response.length - 1].price;
      setCursorId(lastProductId);
      setCursorPrice(lastProductPrice);
    }
  };

  useEffect(() => {
    const fetchCategory = async () => {
      const response: CategoryType[] = await getCategory();
      const categoryMap = response.reduce(
        (map: CategoryMap, item: CategoryType) => {
          if (item.parentId === null) {
            console.log('map', map);
            return map;
          }
          if (!map[item.parentId]) {
            map[item.parentId] = [];
          }
          map[item.parentId].push(item);
          console.log('map', map);
          return map;
        },
        []
      );
      setCategoryData(categoryMap);
    };
    fetchCategory();
    setProducts([]);
    fetchItem();
    return () => {
      setText('');
    };
  }, []);
  useEffect(() => {
    fetchItem();
  }, [order]);

  const loadMoreItems = () => {
    fetchItem();
  };
  const handleOrderChange = (newOrder: string) => {
    if (newOrder === 'seen') {
      alert('조회순은 아직 없습니다~');
      return;
    }
    setOrder(newOrder);
    setCursorId(0);
    setCursorPrice(0);
  };
  return (
    <>
      <ContentWrapper>
        <Header>
          <Comment>인기 상품을 추천해드려요</Comment>
          <SelectOrder>
            <WrapMenu
              $isselected={(order === 'latest').toString()}
              onClick={() => handleOrderChange('latest')}
            >
              <OrderMenu $isselected={(order === 'latest').toString()}>
                최신순
              </OrderMenu>
            </WrapMenu>
            <WrapMenu
              $isselected={(order === 'seen').toString()}
              onClick={() => handleOrderChange('seen')}
            >
              <OrderMenu $isselected={(order === 'seen').toString()}>
                조회순
              </OrderMenu>
            </WrapMenu>
            <WrapMenu
              $isselected={(order === 'highest').toString()}
              onClick={() => handleOrderChange('highest')}
            >
              <OrderMenu $isselected={(order === 'highest').toString()}>
                높은 가격순
              </OrderMenu>
            </WrapMenu>
            <WrapMenu
              $isselected={(order === 'lowest').toString()}
              onClick={() => handleOrderChange('lowest')}
            >
              <OrderMenu $isselected={(order === 'lowest').toString()}>
                낮은 가격순
              </OrderMenu>
            </WrapMenu>
          </SelectOrder>
        </Header>
        <OptionWrapper>
          <S>
            {Object.keys(categoryData).map((parentId) => (
              <OptionList key={parentId}>
                <OptionP>
                  {categoryData[Number(parentId)][0]?.parentName}
                </OptionP>
                <OptionDetail>
                  {categoryData[Number(parentId)].map(
                    ({ id, name }: { id: number; name: string }) => (
                      <Option
                        $isselected={(id === categoryId).toString()}
                        key={id}
                        // onClick={() => {
                        //   setCategoryId(id);
                        //   setCursorId(0);
                        // }}
                      >
                        {name}
                      </Option>
                    )
                  )}
                </OptionDetail>
              </OptionList>
            ))}
          </S>
          <OptionReset
            onClick={() => {
              setCategoryId(0);
              setCursorId(0);
            }}
          >
            초기화
          </OptionReset>
        </OptionWrapper>
        <ProductsWrapper>
          {products.map((product, index) => {
            if (index % 4 === 0) {
              return (
                <ProductWrapper key={product.productId}>
                  {products
                    .slice(index, index + 4)
                    .map((product, innerIndex) => (
                      <Products key={`${product.productId}_${innerIndex}`}>
                        <SoleProduct
                          onClick={() =>
                            router.push(`/product/detail/${product.productId}`)
                          }
                        >
                          <ContentBodyInfo
                            src={product.mainImageFile.imagePath}
                            tagName={product.brand}
                            size={product.size}
                            name={product.name}
                            price={product.price}
                          />
                        </SoleProduct>
                      </Products>
                    ))}
                </ProductWrapper>
              );
            }
            return null;
          })}
        </ProductsWrapper>
        <ShowMoreItems onClick={loadMoreItems}>
          <ShowP>상품 더보기</ShowP>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="12"
            viewBox="0 0 25 12"
            fill="none"
          >
            <path d="M0.921875 1L12.403 11L23.8841 1" stroke="#5F5F5F" />
          </svg>
        </ShowMoreItems>
      </ContentWrapper>
    </>
  );
}

export default page;

const S = styled.div`
  ${flexColumn}
  gap: 16px;
  margin-left: 108px;
`;

const SoleProduct = styled.div`
  ${flexColumn}
  align-items: center;
`;
const Check = styled.div`
  margin-bottom: 20px;
`;
const On = styled.img``;
const Off = styled.img``;
const Products = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BannerWrapper = styled.div`
  width: 100%;
  margin-top: 60px;
`;

const ContentWrapper = styled.div`
  width: 1216px;
  margin: 0 auto;
  margin-top: 60px;
`;

const Header = styled.div`
  ${flexBetween}
  width: 100%;
  height: 56px;
`;

const Comment = styled.p`
  color: ${(props) => props.theme.colors.black};
  font-size: 36px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 50.4px */
`;

const SelectOrder = styled.div`
  ${flexCenter}
  width: 459px;
  height: 56px;
  flex-shrink: 0;
  border-radius: 12px;
  background: ${(props) => props.theme.colors.lightgray};
`;

const WrapMenu = styled.div<{ $isselected: string }>`
  display: inline-flex;
  padding: 8px 23px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  background: ${(props) =>
    props.$isselected === 'true'
      ? props.theme.colors.black
      : props.theme.colors.lightgray};
  cursor: pointer;
`;

const OrderMenu = styled.div<{ $isselected: string }>`
  color: ${(props) =>
    props.$isselected === 'true'
      ? props.theme.colors.lightgray
      : props.theme.colors.black};
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: ${(props) => (props.$isselected === 'true' ? '700' : '400')};
  line-height: 140%; /* 22.4px */
`;

const OptionWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 1216px;
  margin-bottom: 65px;
  margin-top: 55.89px;
  border-radius: 15px;
  background-color: rgba(232, 232, 232, 0.5);
  height: 118.109px;
`;
const OptionList = styled.div`
  width: 960px;
  height: 28px;
  display: flex;
  gap: 103px;
  align-items: center;
`;
const OptionP = styled.p`
  color: ${(props) => props.theme.colors.black};
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 28px */
`;

const OptionDetail = styled.div`
  display: flex;
  gap: 33px;
  align-items: center;
`;
const Option = styled.p<{ $isselected: string }>`
  color: ${(props) =>
    props.$isselected === 'true'
      ? props.theme.colors.white
      : props.theme.colors.black};
  cursor: pointer;
  text-align: center;

  border-radius: 12px;
  background: ${(props) =>
    props.$isselected === 'true' ? props.theme.colors.black : ''};

  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 22.4px */
`;
const OptionReset = styled.p`
  width: 100%;
  text-align: end;
  cursor: pointer;
  margin-right: 73px;
  color: ${(props) => props.theme.colors.darkgray};
  font-size: 16px;
`;

const ProductWrapper = styled.div`
  display: flex;
  gap: 24px;
`;

const ProductsWrapper = styled.div`
  ${flexColumn}
  gap: 80px;
`;

const ShowMoreItems = styled.div`
  ${flexCenter}
  height: 80px;
  width: 100%;
  gap: 24px;
  border-radius: 15px;
  border: 1px solid #000;
  background: ${(props) => props.theme.colors.white};
  margin-top: 80px;
  margin-bottom: 148px;
  cursor: pointer;
`;
const ShowP = styled.p`
  color: ${(props) => props.theme.colors.darkgray};
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
`;
