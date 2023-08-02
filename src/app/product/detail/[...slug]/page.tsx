'use client';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import line from '@/assets/images/detail/line.svg';
import Image from 'next/image';
import ContentBodyInfo from '@/components/guide/ContentBodyInfo';
import getAccessToken from '@/util/getAccessToken';
import leftArrow from '@/assets/images/product/leftArrow.svg';
import rightArrow from '@/assets/images/product/rightArrow.svg';
import { useEffect, useState } from 'react';
import {
  getDetailPageProducts,
  getMainPageProducts,
  putMypick,
} from '@/api/requests';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { userInfoState } from '@/atom/states';
import { useRecoilState } from 'recoil';
import { selectedNavPage, requestProducts, Product } from '@/atom/states';

function page() {
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

  const [cookies, setCookie, removeCookie] = useCookies();

  const router = useRouter();

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [selectedPage, setSelectedPage] = useRecoilState(selectedNavPage);
  const [finalProducts, setFinalProducts] = useRecoilState(requestProducts);

  const [recommends, setRecommends] = useState<any[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sliderImageCount = 3;

  useEffect(() => {
    const get = async () => {
      let location = window.location.pathname;
      let split = location.split('/');
      const response = await getDetailPageProducts(split[3]);
      setProducts(response);
    };
    get();
  }, []);

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

        setFinalProducts([newProduct]);
      } else {
        alert('로그인이 필요한 서비스입니다.');
        router.push('/login');
        setSelectedPage('');
      }
    }
  };

  const handleLeftArrowClick = () => {
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
    <Container.Container>
      <Container.Content>
        <Cloth.Cloth>
          <Cloth.MainImage>
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
          </Cloth.MainImage>

          <Cloth.Cut>
            <Cloth.LeftArrow
              src={leftArrow.src}
              onClick={handleLeftArrowClick}
            />

            <Cloth.Product>
              {products.detailImageFiles
                .slice(currentImageIndex, currentImageIndex + sliderImageCount)
                .map((item, idx) => (
                  <Cloth.DetailImage key={idx}>
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
                  </Cloth.DetailImage>
                ))}
            </Cloth.Product>
            <Cloth.RightArrow
              src={rightArrow.src}
              onClick={handleRightArrowClick}
            />
          </Cloth.Cut>
        </Cloth.Cloth>
        <Container.DetailContent>
          <Container.Category>{`제품 카테고리 > ${products.categoryInfoList[0].parentCategoryName} > ${products.categoryInfoList[0].categoryName}`}</Container.Category>
          <Products.Content>
            <Products.Info>
              <Products.Tag>브랜드</Products.Tag>
              <Products.Brand>{products.brand}</Products.Brand>
            </Products.Info>
            <Products.Info>
              <Products.Tag>제품명</Products.Tag>
              <Products.Sub $bold={'bold'}>{products.name}</Products.Sub>
            </Products.Info>
            <Products.Info>
              <Products.Tag>사이즈</Products.Tag>
              <Products.Sub $bold={'notBold'}>{products.size}</Products.Sub>
            </Products.Info>
            <Products.Info>
              <Products.Tag>제품 성격</Products.Tag>
              <Products.Sub $bold={'notBold'}>{products.detail}</Products.Sub>
            </Products.Info>
            <Products.Info>
              <Products.Tag>가격</Products.Tag>
              <Products.Sub $bold={'bold'}>
                {products.price.toLocaleString('en-US')}원
              </Products.Sub>
            </Products.Info>
          </Products.Content>
          <div className="button">
            <div className="btn" onClick={() => putMypickCart()}>
              <Button content="마이픽에 담기" num="1" />
            </div>
            <div className="btn" onClick={() => purchase()}>
              <Button content="구매하기" num="2" />
            </div>
          </div>
        </Container.DetailContent>
      </Container.Content>
      <Container.Line src={line.src} />
      <Container.Recommend>이런 제품은 어떠세요?</Container.Recommend>
      <Container.Products>
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
      </Container.Products>
    </Container.Container>
  );
}

export default page;

const Container = {
  Container: styled.div`
    width: 1216px;
  `,
  Content: styled.div`
    display: flex;
    width: 1216px;
    height: 750px;

    margin-top: 120px;
  `,
  Products: styled.div`
    width: 1216px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 148px;
  `,
  DetailContent: styled.div`
    margin-left: 106px;
    .button {
      margin-top: 244px;
    }
    .btn {
      margin-top: 29px;
    }
  `,
  Line: styled.img`
    margin-top: 127px;
    margin-bottom: 20px;
  `,
  Recommend: styled.div`
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 40px;
  `,
  Category: styled.div`
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
  `,
};

const Cloth = {
  Cloth: styled.div``,
  MainImage: styled.div``,
  DetailImage: styled.div`
    margin-right: 21px;
  `,
  Cut: styled.div`
    display: flex;
    width: 592px;
    margin-top: 24px;
  `,
  LeftArrow: styled.img`
    margin-right: 10px;
  `,
  RightArrow: styled.img`
    margin-left: 10px;
  `,
  Product: styled.div`
    width: 538.46px;
    display: flex;
    overflow: hidden;
  `,
};

const Products = {
  Content: styled.div`
    margin-top: 68px;
  `,
  Info: styled.div`
    display: flex;
    margin-bottom: 24px;
  `,
  Tag: styled.div`
    font-size: 16px;
    font-weight: 400;
    width: 128px;
  `,
  Sub: styled.div<{ $bold: string }>`
    width: 376px;
    font-weight: ${(props) => (props.$bold === 'bold' ? '600' : '400')};
    font-size: ${(props) => (props.$bold === 'bold' ? '20px' : '16px')};
  `,
  Brand: styled.div`
    font-size: 16px;
    font-weight: 600;
    background-color: #e8e8e8;
    border-radius: 5px;
    padding: 2px 24px;
  `,
};
