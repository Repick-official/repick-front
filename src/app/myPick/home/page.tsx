'use client';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';
import { selectedMypickPage } from '@/atom/states';
import { useRecoilState } from 'recoil';
import ContentBodyInfo from '@/components/guide/ContentBodyInfo';
import check_off from '@/assets/images/check/off.svg';
import check_on from '@/assets/images/check/on.svg';
import getAccessToken from '@/util/getAccessToken';
import { useCookies } from 'react-cookie';
import Alert from '@/components/mypick/Alert';

import {
  inquiryMypick,
  applyHomeFitting,
  getIsSubscribe,
} from '@/api/requests';
import { NONAME } from 'dns';

function page() {
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useRecoilState(selectedMypickPage);

  const [cookies, setCookie, removeCookie] = useCookies();

  const [products, setProducts] = useState<any[]>([]);

  const [selectAll, setSelectAll] = useState('전체 선택');

  useEffect(() => {
    const get = async () => {
      let accessToken = await getAccessToken(cookies, setCookie);
      const response = await inquiryMypick(accessToken);
      const clothes = response.map((item: any) => {
        return { ...item, isClicked: false };
      });
      setProducts(clothes);
    };
    get();
    const areAllSelected = products.every((product) => product.isClicked);
    setSelectAll(areAllSelected ? '전체 선택' : '전체 선택 해제');
  }, []);

  const handleClick = (productId: number) => {
    //상품 클릭
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((item) =>
        item.product.productId === productId
          ? { ...item, isClicked: !item.isClicked }
          : item
      );

      const areAllProductsSelected = updatedProducts.every(
        (product) => product.isClicked
      );
      setSelectAll(areAllProductsSelected ? '전체 선택 해제' : '전체 선택');

      return updatedProducts;
    });
  };

  const [showAlert, setShowAlert] = useState(false);
  const clickModal = () => setShowAlert(!showAlert);
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');

  const handleApply = async () => {
    let accessToken = await getAccessToken(cookies, setCookie);
    const response = await getIsSubscribe(accessToken);
    const selectedProducts = products.filter((item) => item.isClicked);
    if (selectedProducts.length <= 0) {
      alert('신청할 제품을 선택해주세요.');
    } else {
      if (response == 'NONE') {
        setShowAlert(!showAlert);
        setText1('멤버십 구독 회원만 이용 가능한 서비스입니다.');
        setText2('리픽 멤버십을 구독하시겠어요?');
      } else if (response == 'BASIC') {
        if (selectedProducts.length > 3) {
          setShowAlert(!showAlert);
          setText1('베이직 멤버십 회원은 3벌까지만 입어볼 수 있어요!');
          setText2('프로 플랜 멤버십으로 바꾸시겠어요?');
        } else {
          selectedProducts.forEach((item) =>
            handleHomeFitting(item.cartProductId)
          );
        }
      } else {
        if (selectedProducts.length > 5) {
          setShowAlert(!showAlert);
          setText1('홈피팅은 한 번에 최대 5벌까지만 가능해요.');
          setText2('5벌 홈피팅 완료 후 다시 신청해주세요.');
        } else {
          selectedProducts.forEach((item) =>
            handleHomeFitting(item.cartProductId)
          );
        }
      }
    }
  };

  const handlePurchase = async () => {
    let accessToken = await getAccessToken(cookies, setCookie);
    const response = await getIsSubscribe(accessToken);
    if (response == 'NONE') {
      alert('구독이 필요한 서비스입니다.');
      router.push('/mypage/subscribe');
    } else {
      const selectedProducts = products.filter((item) => item.isClicked);
      if (selectedProducts.length > 0) {
        selectedProducts.forEach((item) => goPurchase());
      } else {
        alert('구매할 제품을 선택해주세요.');
      }
    }
  };

  const handleHomeFitting = async (Id: any) => {
    let accessToken = await getAccessToken(cookies, setCookie);
    const response = await applyHomeFitting(accessToken, Id);
    setSelectedPage('홈피팅');
    router.push('/myPick/home/homefitting/success');
  };

  const goPurchase = async () => {
    alert('현재 이용 불가능한 서비스입니다. 홈피팅 신청 먼저 해주세요.');
    // setSelectedPage('구매하기');
    // router.push('/myPick/shopping/purchase');
  };

  const handleClickAll = () => {
    const areAllProductsSelected = products.every(
      (product) => product.isClicked
    );

    const updatedProducts = products.map((product) => {
      return { ...product, isClicked: !areAllProductsSelected };
    });

    setProducts(updatedProducts);

    setSelectAll(!areAllProductsSelected ? '전체 선택 해제' : '전체 선택');
  };

  const handleClickDelte = () => {
    const selectedProducts = products.filter((item) => item.isClicked);
    if (selectedProducts.length <= 0) {
      alert('신청할 제품을 선택해주세요.');
    } else {
      const confirmDelete = confirm('선택한 제품을 삭제할까요?');
      if (confirmDelete) {
        const updatedProducts = products.filter((item) => !item.isClicked);
        // 이제 updatedProducts 배열은 isClicked가 false인 제품들만 포함하고 있으므로 선택한 제품들이 삭제됩니다.
        // 여기에서 'products' 상태나 변수를 'updatedProducts'로 업데이트할 수 있습니다.
        setProducts(updatedProducts);
      }
    }
  };

  return (
    <Container>
      <SemiContainer>
        <Content>
          <Pick>
            <Title>내가 픽한제품</Title>
            <Filter>
              <Delte onClick={() => handleClickDelte()}>선택 상품 삭제</Delte>
              <Clear onClick={() => handleClickAll()}>{selectAll}</Clear>
            </Filter>
          </Pick>

          <Products>
            {products.map((item) => (
              <Product key={item.product.productId}>
                <Check onClick={() => handleClick(item.product.productId)}>
                  <Off src={item.isClicked ? check_on.src : check_off.src} />
                </Check>
                <div
                  key={item.product.productId}
                  onClick={() =>
                    router.push(`/product/detail/${item.product.productId}`)
                  }
                >
                  {/* 여기 왜 이동이 안 되는거지? */}
                  <ContentBodyInfo
                    key={item.product.productId}
                    src={item.product.mainImageFile.imagePath}
                    tagName={item.product.brand}
                    size={item.product.size}
                    name={item.product.name}
                    price={item.product.price}
                  />
                </div>
              </Product>
            ))}
          </Products>

          <ButtonWrapper>
            <div onClick={() => handleApply()}>
              <Button content="홈피팅 신청하기" num="5" />
            </div>
            {showAlert && (
              <Alert text1={text1} text2={text2} clickModal={clickModal} />
            )}
            <div onClick={() => handlePurchase()}>
              <Button content="구매하기" num="6" />
            </div>
          </ButtonWrapper>
        </Content>
      </SemiContainer>
    </Container>
  );
}

export default page;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SemiContainer = styled.div`
  width: 1216px;
`;

const Pick = styled.div`
  width: 1216px;
  margin-top: 104px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
`;
const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
`;
const Filter = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: var(--2, #5f5f5f);
  display: flex;
`;
const OnlyProduct = styled.div``;
const Delte = styled.div``;
const Clear = styled.div`
  margin-left: 54px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ButtonWrapper = styled.div`
  display: flex;
  width: 744px;
  justify-content: space-between;
  margin-bottom: 148px;
`;
const Product = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
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
  // justify-content: space-between;
  margin-bottom: 70px;
  gap: 24px;
`;
