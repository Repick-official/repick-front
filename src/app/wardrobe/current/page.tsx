'use client';
import React, { useState } from 'react';
import Button from '@/components/common/Button';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import ContentBodyInfo from '@/components/guide/ContentBodyInfo';
import cloth_1 from '@/assets/images/mypick/cloth_1.png';
import cloth_2 from '@/assets/images/mypick/cloth_2.png';
import cloth_3 from '@/assets/images/mypick/cloth_3.png';
import cloth_4 from '@/assets/images/mypick/cloth_4.png';
import check_off from '@/assets/images/check/off.svg';
import check_on from '@/assets/images/check/on.svg';
import more from '@/assets/images/wardrobe/more.svg';

function page() {
  const router = useRouter();

  const price = 8000;

  const [select, setSelect] = useState(false);

  return (
    <Container>
      <Current>
        <T>
          <Title>나의 옷장 정리 현황</Title>
          <SemiTitle>내가 판매 중인 제품들을 볼 수 있어요</SemiTitle>
        </T>
        <F>
          <Filter>전체보기</Filter>
          <Filter>판매중만</Filter>
          <Filter>판매완료만</Filter>
        </F>
      </Current>
      <Products>
        <Product>
          <Check onClick={() => setSelect(!select)}>
            {select ? <On src={check_on.src} /> : <Off src={check_off.src} />}
          </Check>
          <ContentBodyInfo
            src={cloth_1.src}
            tagName={'MM6'}
            itemInfo={'3, 55 / 코튼 점퍼 자켓'}
            price={355000}
          />
        </Product>
        <Product>
          <Check onClick={() => setSelect(!select)}>
            {select ? <On src={check_on.src} /> : <Off src={check_off.src} />}
          </Check>
          <ContentBodyInfo
            src={cloth_2.src}
            tagName={'마뗑킴'}
            itemInfo={'Free / 볼레로 숏패딩 점퍼'}
            price={85000}
          />
        </Product>
        <Product>
          <Check onClick={() => setSelect(!select)}>
            {select ? <On src={check_on.src} /> : <Off src={check_off.src} />}
          </Check>
          <ContentBodyInfo
            src={cloth_3.src}
            tagName={'스파오'}
            itemInfo={'Fress / 부클 집업 가디건'}
            price={15000}
          />
        </Product>
        <Product>
          <Check onClick={() => setSelect(!select)}>
            {select ? <On src={check_on.src} /> : <Off src={check_off.src} />}
          </Check>
          <ContentBodyInfo
            src={cloth_4.src}
            tagName={'NO BRAND'}
            itemInfo={'S / 핀턱 플리츠 미니 스커트'}
            price={10000}
          />
        </Product>
        <Product>
          <Check onClick={() => setSelect(!select)}>
            {select ? <On src={check_on.src} /> : <Off src={check_off.src} />}
          </Check>
          <ContentBodyInfo
            src={cloth_4.src}
            tagName={'NO BRAND'}
            itemInfo={'S / 핀턱 플리츠 미니 스커트'}
            price={10000}
          />
        </Product>
        <Product>
          <Check onClick={() => setSelect(!select)}>
            {select ? <On src={check_on.src} /> : <Off src={check_off.src} />}
          </Check>
          <ContentBodyInfo
            src={cloth_4.src}
            tagName={'NO BRAND'}
            itemInfo={'S / 핀턱 플리츠 미니 스커트'}
            price={10000}
          />
        </Product>
        <Product>
          <Check onClick={() => setSelect(!select)}>
            {select ? <On src={check_on.src} /> : <Off src={check_off.src} />}
          </Check>
          <ContentBodyInfo
            src={cloth_4.src}
            tagName={'NO BRAND'}
            itemInfo={'S / 핀턱 플리츠 미니 스커트'}
            price={10000}
          />
        </Product>
        <Product>
          <Check onClick={() => setSelect(!select)}>
            {select ? <On src={check_on.src} /> : <Off src={check_off.src} />}
          </Check>
          <ContentBodyInfo
            src={cloth_4.src}
            tagName={'NO BRAND'}
            itemInfo={'S / 핀턱 플리츠 미니 스커트'}
            price={10000}
          />
        </Product>
      </Products>
      <More>
        상품 더보기
        <Arrow src={more.src} />
      </More>
      <Price>
        <Total>
          <S>판매된 총 금액</S>
          <P>
            <div className="price">{price.toLocaleString('en-US')}</div>원
          </P>
        </Total>
      </Price>
      <div
        onClick={() => router.push('/wardrobe/current/success')}
        className="button"
      >
        <Button content="정산 요청하기" />
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
const Filter = styled.div`
  margin-left: 24px;
  margin-top: 50px;
  font-size: 20px;
  font-weight: 400;
  color: var(--2, #5f5f5f);
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
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
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
