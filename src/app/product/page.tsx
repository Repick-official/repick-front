'use client';
import '../reset.css';
import React,{useEffect,useState} from 'react';
import ContentBodyInfo from '@/components/guide/ContentBodyInfo';
import cloth_1 from '@/assets/images/mypick/cloth_1.png';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import logo_guide from '@/assets/images/guide/logo_guide.png';
import Image from 'next/image';
import Banner from '@/components/common/Banner';
function page() {
  const router = useRouter();
  useEffect(() => {
    
  }, []);
  return (
    <>
      <BannerWrapper>
        <Image
          src={logo_guide}
          alt="Picture of me"
          style={{ width: '100vw', height: '657px' }}
          placeholder="blur" // Optional blur-up while loading
        />
      </BannerWrapper>
      <ContentWrapper>
        <Header>
          <Comment>
            인기 상품을 추천해드려요 
          </Comment>
          <SelectOrder>
            <WrapMenu>
              <OrderMenu>
                최신순
              </OrderMenu>
            </WrapMenu>
            <WrapMenu>
              <OrderMenu>
                조회순
              </OrderMenu>
            </WrapMenu>
            <WrapMenu>
              <OrderMenu>
                높은 가격순
              </OrderMenu>
            </WrapMenu>
            <WrapMenu>
              <OrderMenu>
                낮은 가격순
              </OrderMenu>
            </WrapMenu>
          </SelectOrder>
        </Header>
        <OptionWrapper>
          <OptionList>
            <OptionP>
              상의
            </OptionP>
            <OptionDetail>
              <Option>
                티셔츠
              </Option>
              <Option>
                블라우스/셔츠
              </Option>
              <Option>
                후드/스웨트 셔츠
              </Option>
              <Option>
                재킷/블레이저
              </Option>
              <Option>
                드레스/원피스
              </Option>
            </OptionDetail>
          </OptionList>
          <OptionReset>
            초기화
          </OptionReset>
          <OptionList>
            <OptionP>
              하의
            </OptionP>
            <OptionDetail>
              <Option>
                팬츠
              </Option>
              <Option>
                스커트
              </Option>
              <Option>
                쇼츠
              </Option>
            </OptionDetail>
          </OptionList>
        </OptionWrapper>
        <ProductsWrapper>
          <ProductWrapper>
            <Products>
              <Product onClick={() => router.push(`/product/detail/${1}`)}>
                {/* 임의로 경로 1 설정 */}
                <ContentBodyInfo
                  src={cloth_1.src}
                  tagName={'MM6'}
                  size={'3, 55'}
                  name = {'코튼 점퍼 자켓'}
                  price={355000}
                />
              </Product>
            </Products>
            <Products>
              <Product onClick={() => router.push(`/product/detail/${1}`)}>
                {/* 임의로 경로 1 설정 */}
                <ContentBodyInfo
                  src={cloth_1.src}
                  tagName={'MM6'}
                  size = {'3,55'}
                  name = {'코튼 점퍼 자켓'}

                  price={355000}
                />
              </Product>
            </Products>
            <Products>
              <Product onClick={() => router.push(`/product/detail/${1}`)}>
                {/* 임의로 경로 1 설정 */}
                <ContentBodyInfo
                  src={cloth_1.src}
                  tagName={'MM6'}
                  size = {'3,55'}
                  name = {'코튼 점퍼 자켓'}

                  price={355000}
                />
              </Product>
            </Products>
            <Products>
              <Product onClick={() => router.push(`/product/detail/${1}`)}>
                {/* 임의로 경로 1 설정 */}
                <ContentBodyInfo
                  src={cloth_1.src}
                  tagName={'MM6'}
                  size = {'3,55'}
                  name = {'코튼 점퍼 자켓'}

                  price={355000}
                />
              </Product>
            </Products>
          </ProductWrapper>
          <ProductWrapper>
            <Products>
              <Product onClick={() => router.push(`/product/detail/${1}`)}>
                {/* 임의로 경로 1 설정 */}
                <ContentBodyInfo
                  src={cloth_1.src}
                  tagName={'MM6'}
                  size = {'3,55'}
                  name = {'코튼 점퍼 자켓'}

                  price={355000}
                />
              </Product>
            </Products>
            <Products>
              <Product onClick={() => router.push(`/product/detail/${1}`)}>
                {/* 임의로 경로 1 설정 */}
                <ContentBodyInfo
                  src={cloth_1.src}
                  tagName={'MM6'}
                  size = {'3,55'}
                  name = {'코튼 점퍼 자켓'}

                  price={355000}
                />
              </Product>
            </Products>
            <Products>
              <Product onClick={() => router.push(`/product/detail/${1}`)}>
                {/* 임의로 경로 1 설정 */}
                <ContentBodyInfo
                  src={cloth_1.src}
                  tagName={'MM6'}
                  size = {'3,55'}
                  name = {'코튼 점퍼 자켓'}

                  price={355000}
                />
              </Product>
            </Products>
            <Products>
              <Product onClick={() => router.push(`/product/detail/${1}`)}>
                {/* 임의로 경로 1 설정 */}
                <ContentBodyInfo
                  src={cloth_1.src}
                  tagName={'MM6'}
                  size = {'3,55'}
                  name = {'코튼 점퍼 자켓'}

                  price={355000}
                />
              </Product>
            </Products>
          </ProductWrapper>
          <ProductWrapper>
            <Products>
              <Product onClick={() => router.push(`/product/detail/${1}`)}>
                {/* 임의로 경로 1 설정 */}
                <ContentBodyInfo
                  src={cloth_1.src}
                  tagName={'MM6'}
                  size = {'3,55'}
                  name = {'코튼 점퍼 자켓'}

                  price={355000}
                />
              </Product>
            </Products>
            <Products>
              <Product onClick={() => router.push(`/product/detail/${1}`)}>
                {/* 임의로 경로 1 설정 */}
                <ContentBodyInfo
                  src={cloth_1.src}
                  tagName={'MM6'}
                  size = {'3,55'}
                  name = {'코튼 점퍼 자켓'}

                  price={355000}
                />
              </Product>
            </Products>
            <Products>
              <Product onClick={() => router.push(`/product/detail/${1}`)}>
                {/* 임의로 경로 1 설정 */}
                <ContentBodyInfo
                  src={cloth_1.src}
                  tagName={'MM6'}
                  size = {'3,55'}
                  name = {'코튼 점퍼 자켓'}

                  price={355000}
                />
              </Product>
            </Products>
            <Products>
              <Product onClick={() => router.push(`/product/detail/${1}`)}>
                {/* 임의로 경로 1 설정 */}
                <ContentBodyInfo
                  src={cloth_1.src}
                  tagName={'MM6'}
                  size = {'3,55'}
                  name = {'코튼 점퍼 자켓'}

                  price={355000}
                />
              </Product>
            </Products>
          </ProductWrapper>
          <Banner/>
          <ProductWrapper>
            <Products>
              <Product onClick={() => router.push(`/product/detail/${1}`)}>
                {/* 임의로 경로 1 설정 */}
                <ContentBodyInfo
                  src={cloth_1.src}
                  tagName={'MM6'}
                  size = {'3,55'}
                  name = {'코튼 점퍼 자켓'}

                  price={355000}
                />
              </Product>
            </Products>
            <Products>
              <Product onClick={() => router.push(`/product/detail/${1}`)}>
                {/* 임의로 경로 1 설정 */}
                <ContentBodyInfo
                  src={cloth_1.src}
                  tagName={'MM6'}
                  size = {'3,55'}
                  name = {'코튼 점퍼 자켓'}

                  price={355000}
                />
              </Product>
            </Products>
            <Products>
              <Product onClick={() => router.push(`/product/detail/${1}`)}>
                {/* 임의로 경로 1 설정 */}
                <ContentBodyInfo
                  src={cloth_1.src}
                  tagName={'MM6'}
                  size = {'3,55'}
                  name = {'코튼 점퍼 자켓'}

                  price={355000}
                />
              </Product>
            </Products>
            <Products>
              <Product onClick={() => router.push(`/product/detail/${1}`)}>
                {/* 임의로 경로 1 설정 */}
                <ContentBodyInfo
                  src={cloth_1.src}
                  tagName={'MM6'}
                  size = {'3,55'}
                  name = {'코튼 점퍼 자켓'}

                  price={355000}
                />
              </Product>
            </Products>
          </ProductWrapper>
        </ProductsWrapper>
        <ShowMoreItems>
          <ShowP>
            상품 더보기
          </ShowP>
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="12" viewBox="0 0 25 12" fill="none">
            <path d="M0.921875 1L12.403 11L23.8841 1" stroke="#5F5F5F"/>
          </svg>
        </ShowMoreItems>
      </ContentWrapper>
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
  display: flex;
  justify-content: space-between;
`;

const BannerWrapper = styled.div`
  width: 100%;
  margin-top : 60px;
`;

const ContentWrapper = styled.div`
  width : 1216px;
  margin : 0 auto;
  margin-top : 33px;
`

const Header = styled.div`
  width : 100%;
  display:flex;
  justify-content: space-between;
`

const Comment = styled.p`
  color: var(--1, #111);
  /* Header2 32pt sb */
  font-family: Pretendard;
  font-size: 36px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 50.4px */
`

const SelectOrder = styled.div`
  display:flex;
  align-items :center;
  justify-content: center;
  width: 459px;
  height: 56px;
  flex-shrink: 0;
  border-radius: 12px;
  background: var(--4, #E8E8E8);
`

const WrapMenu = styled.div`
  display: inline-flex;
  padding: 8px 23px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  background: var(--1, #111);
  cursor : pointer;
`

const OrderMenu = styled.p`
  color: var(--4, #E8E8E8);
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 22.4px */
`

const OptionWrapper = styled.div`
  display:flex;
  flex-direction: column;
  width : 829px;
  padding : 28px 103px 28px 103px;
  margin : 0 auto;
  margin-bottom :60px;
  margin-top : 60px;
`

const OptionList = styled.div`
  width : 100%;
  display:flex;
  gap : 103px;
`
const OptionP = styled.p`
  color: var(--1, #111);
  text-align: center;

  /* Header4 20pt sb */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 28px */
`

const OptionDetail = styled.div`
  display:flex;
  gap : 33px;
`
const Option = styled.p`
  color: var(--1, #111);
  text-align: center;

  /* Body2 16pt rg */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 22.4px */
`
const OptionReset = styled.p`
  width:100%;
  text-align : end;
`

const ProductWrapper =styled.div`
  display:flex;
  gap : 24px;
`

const ProductsWrapper = styled.div`
  display:flex;
  flex-direction: column;
  gap : 80px;
`

const ShowMoreItems = styled.div`
  display:flex;
  height: 80px;
  width:100%;
  align-items : center;
  justify-content : center;
  gap : 24px;
  border-radius: 15px;
  border: 1px solid #000;
  background: var(--5, #FFF);
  margin-top : 80px;
  margin-bottom : 148px;
  cursor : pointer;
`
const ShowP = styled.p`
  color: var(--2, #5F5F5F);

  /* Header4 20pt rg */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
`