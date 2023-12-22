'use client';
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Product, HomeFitProduct, DetailProduct } from '@/interface/interface';
import {
  getDetailPageProducts,
  getMainPageProducts,
  putMypick,
} from '@/api/requests';

function Mobile() {
  const [products, setProducts] = useState<DetailProduct>({
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
      const response = await getDetailPageProducts(Number(split[3]));
      console.log('detail response', response);
      setProducts(response);
    };
    get();
  }, []);

  return (
    <div>
      <Cloth.MainImage>
        <div style={{ overflow: 'hidden' }}>
          {products.mainImageFile.imagePath && (
            <Image
              alt="detail"
              src={products.mainImageFile.imagePath}
              width={390}
              height={339}
            />
          )}
        </div>
      </Cloth.MainImage>

      <Products.Content>
        <Products.Info>
          <Products.Brand>{products.brand}</Products.Brand>
        </Products.Info>
        <Container.Category>{`제품 카테고리 > ${products.categoryInfoList[0].parentCategoryName} > ${products.categoryInfoList[0].categoryName}`}</Container.Category>
        <Products.Info>
          <Products.Sub $bold={'bold'}>{products.name}</Products.Sub>
        </Products.Info>
        <Products.Info>
          <Products.Sub $bold={'bold'}>
            {products.price.toLocaleString('en-US')}원
          </Products.Sub>
        </Products.Info>

        <Details.Wrapper>
          <Details.Content>
            <Details.Tag>사이즈</Details.Tag>
            <Details.Sub>{products.size}</Details.Sub>
          </Details.Content>
        </Details.Wrapper>

        <Cloth.Product>
          {products.detailImageFiles.map((item, idx) => (
            <Cloth.DetailImage key={idx}>
              <div style={{ overflow: 'hidden' }}>
                {item.imagePath && (
                  <Image
                    alt="image"
                    key={idx}
                    src={item.imagePath}
                    width={358}
                    height={358}
                  />
                )}
              </div>
            </Cloth.DetailImage>
          ))}
        </Cloth.Product>
      </Products.Content>
    </div>
  );
}

export default Mobile;

const Container = {
  Category: styled.div`
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    margin: 13px 0px 13px 0px;
  `,
};

const Details = {
  Wrapper: styled.div`
    margin-top: 32px;
  `,
  Content: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  Tag: styled.div`
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    color: var(--2, #5f5f5f);
  `,
  Sub: styled.div`
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    color: var(--1, #111);
  `,
};

const Cloth = {
  Cloth: styled.div``,
  MainImage: styled.div``,
  Product: styled.div`
    display: flex;
    overflow: hidden;
    margin-top: 43px;
  `,
  DetailImage: styled.div``,
};
const Products = {
  Content: styled.div`
    margin: 13px 16px 0px 16px;
  `,
  Info: styled.div`
    display: flex;
    //margin-bottom: 24px;
  `,
  Tag: styled.div`
    font-size: 16px;
    font-weight: 400;
  `,
  Sub: styled.div<{ $bold: string }>`
    //width: 376px;
    font-weight: ${(props) => (props.$bold === 'bold' ? '600' : '400')};
    font-size: ${(props) => (props.$bold === 'bold' ? '24px' : '16px')};
  `,
  Brand: styled.div`
    background-color: #e8e8e8;
    border-radius: 5px;
    padding: 2px 24px;
    color: var(--2, #5f5f5f);
    text-align: center;
    font-size: 14px;
    font-style: normal;
    line-height: 140%; /* 19.6px */
  `,
};
