'use client';
import '../reset.css';
import React, { useEffect, useState } from 'react';
import ContentBodyInfo from '@/components/guide/ContentBodyInfo';
import cloth_1 from '@/assets/images/mypick/cloth_1.png';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import logo_guide from '@/assets/images/guide/logo_guide.png';
import Image from 'next/image';
import Banner from '@/components/common/Banner';
import {
  getCategory,
  getItemLatest,
  getItemLowest,
  getItemHighest,
  getItemSeen,
} from '@/api/requests';
interface Product {
  brand: string;
  detail: string;
  discountRate: number;
  mainImageFile: {
    imagePath: string;
    imageKey: string;
    isMainImage: boolean;
  };
  name: string;
  price: number;
  productId: number;
  productState: string;
  size: string;
}
function page() {
  const router = useRouter();
  const [categoryData, setCategoryData] = useState<any>({});
  const [cursorId, setCursorId] = useState<number>(0);
  const [cursorPrice, setCursorPrice] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [order, setOrder] = useState<string>('latest');
  const [products, setProducts] = useState<Product[]>([]);
  const [isSearchedItem, setIsSearchedItem] = useState<boolean>(false);
  const [loadMoreTimer, setLoadMoreTimer] = useState<NodeJS.Timeout | null>(
    null
  );
  const fetchItem = async () => {
    let response: Product[];
    switch (order) {
      case 'latest':
        response = await getItemLatest(cursorId, categoryId);
        break;
      case 'lowest':
        response = await getItemLowest(cursorId, cursorPrice, categoryId);
        break;
      case 'highest':
        response = await getItemHighest(cursorId, cursorPrice, categoryId);
        break;
      case 'seen':
        // response = await getItemSeen(cursorId, categoryId);
        response = await getItemLatest(cursorId, categoryId);
        alert('조회순은 아직 없습니다~');
        setCategoryId(0);
        break;
      default:
        response = await getItemLatest(cursorId, categoryId);
    }
    setProducts((prevProducts) => [...prevProducts, ...response]);
    if (response.length > 0) {
      const lastProductId = response[response.length - 1].productId;
      const lastProductPrice = response[response.length - 1].price;
      setCursorId(lastProductId);
      setCursorPrice(lastProductPrice);
    }
  };
  useEffect(() => {
    const fetchCategory = async () => {
      const response: any = await getCategory();
      const categoryMap = response.reduce((map: any, item: any) => {
        if (item.parentId === null) {
          return map;
        }

        if (!map[item.parentId]) {
          map[item.parentId] = [];
        }
        map[item.parentId].push(item);
        return map;
      }, {});
      setCategoryData(categoryMap);
    };
    fetchCategory();
    const item = sessionStorage.getItem('items');
    const searchedItem = item ? JSON.parse(item) : null;

    if (searchedItem) {
      setProducts(searchedItem);
      setCursorId(searchedItem[searchedItem.length - 1].productId);
      setCursorPrice(searchedItem[searchedItem.length - 1].price);
      sessionStorage.clear();
      setIsSearchedItem(true);
    } else {
      setProducts([]);
      fetchItem();
    }
  }, [categoryId, order]);

  const loadMoreItems = () => {
    if (loadMoreTimer) {
      clearTimeout(loadMoreTimer);
    }
    const timer = setTimeout(fetchItem, 500);
    setLoadMoreTimer(timer);
  };

  const handleOrderChange = (newOrder: string) => {
    if(newOrder === 'seen'){
      alert("조회순은 아직 없습니다~");
      return ;
    }
    setOrder(newOrder);
    setCursorId(0);
    setCursorPrice(0);
    // setProducts([]);
  };
  useEffect(() => {
    return () => {
      if (loadMoreTimer) {
        clearTimeout(loadMoreTimer);
      }
    };
  }, [loadMoreTimer]);
  return (
    <>
      {/* <BannerWrapper>
        <Image
          src={logo_guide}
          alt="Picture of me"
          style={{ width: '100vw', height: '657px' }}
          placeholder="blur" // Optional blur-up while loading
        />
      </BannerWrapper> */}
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
                <OptionP>{categoryData[parentId][0]?.parentName}</OptionP>
                <OptionDetail>
                  {categoryData[parentId].map(
                    ({ id, name }: { id: number; name: string }) => (
                      <Option
                        $isselected={(id === categoryId).toString()}
                        key={id}
                        onClick={() => {
                          setCategoryId(id);
                          setCursorId(0);
                          setCursorPrice(0);
                        }}
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
              setCursorPrice(0);
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
                        <Product
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
                        </Product>
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
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-left: 108px;
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
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
`;

const Comment = styled.p`
  color: var(--1, #111);
  font-size: 36px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 50.4px */
`;

const SelectOrder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 459px;
  height: 56px;
  flex-shrink: 0;
  border-radius: 12px;
  background: var(--4, #e8e8e8);
`;

const WrapMenu = styled.div<{ $isselected: string }>`
  display: inline-flex;
  padding: 8px 23px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  background: ${(props) =>
    props.$isselected === 'true' ? 'var(--1, #111)' : 'var(--4, #E8E8E8)'};
  cursor: pointer;
`;

const OrderMenu = styled.div<{ $isselected: string }>`
  color: ${(props) =>
    props.$isselected === 'true' ? 'var(--4, #E8E8E8)' : 'var(--1, #111)'};
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
  width: 794px;
  height: 28px;
  display: flex;
  gap: 103px;
  align-items: center;
`;
const OptionP = styled.p`
  color: var(--1, #111);
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
    props.$isselected === 'true' ? 'var(--4, #FFF)' : 'var(--1, #111)'};
  cursor: pointer;
  text-align: center;

  border-radius: 12px;
  background: ${(props) =>
    props.$isselected === 'true' ? 'var(--1, #111)' : ''};

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
  color: var(--2, #5f5f5f);
  font-size: 16px;
`;

const ProductWrapper = styled.div`
  display: flex;
  gap: 24px;
`;

const ProductsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

const ShowMoreItems = styled.div`
  display: flex;
  height: 80px;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 24px;
  border-radius: 15px;
  border: 1px solid #000;
  background: var(--5, #fff);
  margin-top: 80px;
  margin-bottom: 148px;
  cursor: pointer;
`;
const ShowP = styled.p`
  color: var(--2, #5f5f5f);
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
`;
