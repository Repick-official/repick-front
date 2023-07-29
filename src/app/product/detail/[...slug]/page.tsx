'use client';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import line from '@/assets/images/line.svg';
import Image from 'next/image';
import {
  getDetailPageProducts,
  getMainPageProducts,
  getCategories,
  putMypick,
} from '@/api/requests';
import { useRouter } from 'next/navigation';
import ContentBodyInfo from '@/components/guide/ContentBodyInfo';
import getAccessToken from '@/util/getAccessToken';
import { useCookies } from 'react-cookie';
import leftArrow from '@/assets/images/product/leftArrow.svg';
import rightArrow from '@/assets/images/product/rightArrow.svg';
import { userInfoState } from '@/atom/states';
import { useRecoilState } from 'recoil';
import { selectedNavPage } from '@/atom/states';
import { requestProducts } from '@/atom/states';
import { Product } from '@/atom/states';

function page() {
  //제품 디테일 api
  const [products, setProducts] = useState({
    productId: 0,
    name: '',
    size: '',
    detail: '',
    brand: '',
    price: 0,
    mainImageFile: {
      imagePath: '',
    },
    detailImageFiles: [
      {
        imagePath: '',
      },
    ],
    categoryInfoList: [
      {
        parentCategoryName: '',
        categoryName: '',
      },
    ],
  });

  useEffect(() => {
    const get = async () => {
      let location = window.location.pathname;
      let split = location.split('/');
      const response = await getDetailPageProducts(split[3]);
      setProducts(response);
    };
    get();
  }, []);

  //추천 상품 api
  const [recommends, setRecommends] = useState<any[]>([]);

  useEffect(() => {
    const get = async () => {
      const response = await getMainPageProducts();

      const clothes = response.map((item: any) => {
        return item;
      });
      setRecommends(clothes);
    };

    get();
  }, []);

  //마이픽 담기 api
  const [cookies, setCookie, removeCookie] = useCookies();
  const router = useRouter();
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [selectedPage, setSelectedPage] = useRecoilState(selectedNavPage);
  const [finalProducts, setFinalProducts] = useRecoilState(requestProducts);

  const putMypickCart = async () => {
    const confirm = window.confirm('해당 상품을 마이픽에 담으시겠습니까?');
    if (confirm) {
      if (cookies.access) {
        let location = window.location.pathname;
        let split = location.split('/');
        let accessToken = await getAccessToken(cookies, setCookie);
        const response = await putMypick(accessToken, split[3]);
        if (response.success) {
          alert('이미 마이픽 또는 홈피팅에 있는 제품입니다.');
          return;
        } else {
          alert('선택하신 제품을 마이픽에 담았습니다.');
          router.push('/product');
        }
      } else {
        alert('로그인이 필요한 서비스입니다.');
        router.push('/login');
        setSelectedPage('');
      }
    }
  };

  const purchase = () => {
    const confirm = window.confirm('해당 상품을 바로 구매하시겠습니까?');
    if (confirm) {
      if (userInfo.uesrNickname) {
        const newProduct: Product = {
          homeFittingId: 0,
          product: {
            brand: products.brand,
            detail: products.detail,
            size: products.size,
            price: products.price,
            name: products.name,
            mainImageFile: {
              imagePath: products.mainImageFile.imagePath,
            },
            productId: products.productId,
          },
          isChecked: false,
        };
        router.push('/myPick/shopping/purchase');

        // const updatedProducts = [...finalProducts, newProduct];

        // 합쳐진 배열을 setFinalProducts를 통해 requestProducts에 할당
        setFinalProducts([newProduct]);
      } else {
        alert('로그인이 필요한 서비스입니다.');
        router.push('/login');
        setSelectedPage('');
      }
    }
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sliderImageCount = 3;

  const handleLeftArrowClick = () => {
    // 왼쪽 화살표를 누르면 이미지들을 오른쪽으로 이동
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleRightArrowClick = () => {
    if (
      currentImageIndex <
      products.detailImageFiles.length - sliderImageCount
    ) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  return (
    <Container>
      <Content>
        <Cloth>
          <MainImage>
            <div style={{ borderRadius: '15px', overflow: 'hidden' }}>
              {products.mainImageFile.imagePath && (
                <Image
                  alt="detail"
                  src={products.mainImageFile.imagePath}
                  width={592}
                  height={542}
                />
              )}
            </div>
          </MainImage>

          <Cut>
            <LeftArrow src={leftArrow.src} onClick={handleLeftArrowClick} />

            <P>
              {products.detailImageFiles
                .slice(currentImageIndex, currentImageIndex + sliderImageCount)
                .map((item, idx) => (
                  <DetailImage key={idx}>
                    <div style={{ borderRadius: '15px', overflow: 'hidden' }}>
                      {item.imagePath && (
                        <Image
                          alt="image"
                          key={idx}
                          src={item.imagePath}
                          width={164.81}
                          height={164.81}
                        />
                      )}
                    </div>
                  </DetailImage>
                ))}
            </P>
            <RightArrow src={rightArrow.src} onClick={handleRightArrowClick} />
          </Cut>
        </Cloth>
        <DetailContent>
          <Category>{`제품 카테고리 > ${products.categoryInfoList[0].parentCategoryName} > ${products.categoryInfoList[0].categoryName}`}</Category>
          <ProductContent>
            <Info>
              <Tag>브랜드</Tag>
              <Brand>{products.brand}</Brand>
            </Info>
            <Info>
              <Tag>제품명</Tag>
              <Sub bold={'bold'}>{products.name}</Sub>
            </Info>
            <Info>
              <Tag>사이즈</Tag>
              <Sub bold={'notBold'}>{products.size}</Sub>
            </Info>
            <Info>
              <Tag>제품 성격</Tag>
              <Sub bold={'notBold'}>{products.detail}</Sub>
            </Info>
            <Info>
              <Tag>가격</Tag>
              <Sub bold={'bold'}>
                {products.price.toLocaleString('en-US')}원
              </Sub>
            </Info>
          </ProductContent>
          <div className="button">
            <div className="btn" onClick={() => putMypickCart()}>
              <Button content="마이픽에 담기" num="1" />
            </div>
            <div className="btn" onClick={() => purchase()}>
              <Button content="구매하기" num="2" />
            </div>
          </div>
        </DetailContent>
      </Content>
      <Line src={line.src} />
      <Recommend>이런 제품은 어떠세요?</Recommend>
      <Products>
        {recommends.map((item) => (
          <div
            key={item.productId}
            onClick={() => router.push(`/product/detail/${item.productId}`)}
          >
            <ContentBodyInfo
              key={item.productId}
              src={item.mainImageFile.imagePath}
              tagName={item.brand}
              size={item.size}
              name={item.name}
              price={item.price}
            />
          </div>
        ))}
      </Products>
    </Container>
  );
}

export default page;

const Container = styled.div`
  width: 1216px;
`;
const Cloth = styled.div``;
const MainImage = styled.div``;
const DetailImage = styled.div`
  margin-right: 21px;
`;
const Cut = styled.div`
  display: flex;
  width: 592px;
  margin-top: 24px;
`;
const Content = styled.div`
  display: flex;
  width: 1216px;
  height: 750px;

  margin-top: 120px;
`;
const DetailContent = styled.div`
  margin-left: 106px;
  .button {
    margin-top: 244px;
  }
  .btn {
    margin-top: 29px;
  }
`;
const Category = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
`;
const ProductContent = styled.div`
  margin-top: 68px;
`;
const Info = styled.div`
  display: flex;
  margin-bottom: 24px;
`;
const Tag = styled.div`
  font-size: 16px;
  font-weight: 400;
  width: 128px;
`;
const Sub = styled.div<{ bold: string }>`
  width: 376px;
  font-weight: ${(props) => (props.bold === 'bold' ? '600' : '400')};
  font-size: ${(props) => (props.bold === 'bold' ? '20px' : '16px')};
`;
const Brand = styled.div`
  font-size: 16px;
  font-weight: 600;
  background-color: #e8e8e8;
  border-radius: 5px;
  padding: 2px 24px;
`;

const Line = styled.img`
  margin-top: 127px;
  margin-bottom: 20px;
`;
const Recommend = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 40px;
`;

const Products = styled.div`
  width: 1216px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 148px;
`;

const LeftArrow = styled.img`
  margin-right: 10px;
`;
const RightArrow = styled.img`
  margin-left: 10px;
`;
const P = styled.div`
  width: 538.46px;

  display: flex;
  overflow: hidden;
`;
