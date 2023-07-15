'use client';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import line from '@/assets/images/line.svg';
import Image from 'next/image';
import { getDetailPageProducts } from '@/api/requests';

function page() {
  const [products, setProducts] = useState({
    productId: 0,
    name: '',
    size: '',
    detail: '',
    price: 0,
    mainImageFile: {
      imagePath: '',
    },
    detailImageFiles: [
      {
        imagePath: '',
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

  return (
    <Container>
      <Content>
        <Cloth>
          <MainImage>
            <Image
              alt="detail"
              src={products.mainImageFile.imagePath}
              width={592}
              height={542}
            />
          </MainImage>
          <DetailImage>
            <Cut>
              {products.detailImageFiles.map((item, idx) => (
                <Image
                  alt="image"
                  key={idx}
                  src={item.imagePath}
                  width={183}
                  height={182}
                />
              ))}
            </Cut>
          </DetailImage>
        </Cloth>
        <DetailContent>
          <Category>{'제품 카테고리 > 하의 > 팬츠'}</Category>
          <ProductContent>
            <Info>
              <Tag>제품 이름</Tag>
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
              <Sub bold={'bold'}>{products.price}</Sub>
            </Info>
          </ProductContent>
          <div className="button">
            <div className="btn">
              <Button content="마이픽에 담기" num="1" />
            </div>
            <div className="btn">
              <Button content="구매하기" num="2" />
            </div>
          </div>
        </DetailContent>
      </Content>
      <Line src={line.src} />
      <Recommend>이런 제품은 어떠세요?</Recommend>
      <Products>
        {/* <Product>
          <ContentBodyInfo
            src={cloth_1.src}
            tagName={'MM6'}
            itemInfo={'3, 55 / 코튼 점퍼 자켓'}
            price={355000}
          />
        </Product>
        <Product>
          <ContentBodyInfo
            src={cloth_2.src}
            tagName={'마뗑킴'}
            itemInfo={'Free / 볼레로 숏패딩 점퍼'}
            price={85000}
          />
        </Product>
        <Product>
          <ContentBodyInfo
            src={cloth_3.src}
            tagName={'스파오'}
            itemInfo={'Fress / 부클 집업 가디건'}
            price={15000}
          />
        </Product>
        <Product>
          <ContentBodyInfo
            src={cloth_4.src}
            tagName={'NO BRAND'}
            itemInfo={'S / 핀턱 플리츠 미니 스커트'}
            price={10000}
          />
        </Product> */}
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
  display: flex;
  width: 592px;
  justify-content: space-between;
  margin-top: 24px;
`;
const Cut = styled.div`
  display: flex;
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
    margin-top: 300px;
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

const Line = styled.img`
  margin-top: 127px;
  margin-bottom: 20px;
`;
const Recommend = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 40px;
`;

const Product = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Products = styled.div`
  width: 1216px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 148px;
`;
