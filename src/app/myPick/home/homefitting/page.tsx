// import '../../reset.css';
'use client';
import React, { useEffect, useState } from 'react';
import sample from '@/assets/images/homefitting/sample.png';
import { useRouter } from 'next/navigation';
import { selectedMypickPage, requestProducts, totalPrice } from '@/atom/states';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import Image from 'next/image';
import check_off from '@/assets/images/check/off.svg';
import check_on from '@/assets/images/check/on.svg';
import DeliveryItem from '@/components/homefitting/DeliveryItem';
import getAccessToken from '@/util/getAccessToken';
import { userInfoState } from '@/atom/states';

import { inquiryHomeFitting } from '@/api/requests';
import { useCookies } from 'react-cookie';

interface Product {
  homeFittingId: number;
  product: {
    brand: string;
    detail: string;
    size: string;
    price: number;
    name: string;
    mainImageFile: {
      imagePath: string;
    };
    productId : number,
  };
  isChecked: boolean;
}

function page() {
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useRecoilState(selectedMypickPage);
  const [imageSrc, setImageSrc] = useState<string>(check_off.src);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  // const [unselectedProducts, setUnselectedProducts] = useState<Product[]>([]);
  const [finalProducts, setFinalProducts] = useRecoilState(requestProducts);
  const [selectedCount, setSelectedCount] = useState<number>(0);
  const [selectedTotalPrice, setSelectedTotalPrice] = useState<number>(0);
  const [total, setTotal] = useRecoilState<number>(totalPrice);
  const deliveryFee = 0; //

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const [user, setUser] = useState('');

  useEffect(() => {
    setUser(userInfo.uesrNickname);
  }, []);

  const handleClick = () => {
    const updatedProducts = products.map((product: Product): Product => {
      return { ...product, isChecked: !isClicked };
    });
  
    if (!isClicked) {
      setSelectedCount(updatedProducts.length);
      setSelectedTotalPrice(
        updatedProducts.reduce((acc, curr) => acc + curr.product.price, 0)
      );
      setSelectedProducts(updatedProducts);
      setImageSrc(check_on.src);
    } else {
      setSelectedCount(0);
      setSelectedTotalPrice(0);
      setSelectedProducts([]);
      setImageSrc(check_off.src);
    }
  
    setIsClicked(!isClicked);
    setProducts(updatedProducts);
  };
  
  

  const [cookies, setCookie, removeCookie] = useCookies();

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const get = async () => {
      let accessToken = await getAccessToken(cookies, setCookie);
      const response = await inquiryHomeFitting(accessToken);
      const productsWithCheckStatus = response.map((product: any) => ({
        ...product,
        isChecked: false,
      }));
      setProducts(productsWithCheckStatus);
      // setUnselectedProducts(productsWithCheckStatus);
    };
    get();
  }, []);
  const handleCheck = (id: number) => {
    const updatedProducts = products.map((product: Product): Product => {
      if (product.homeFittingId === id) {
        const newProduct = { ...product, isChecked: !product.isChecked };

        if (newProduct.isChecked) {
          setSelectedCount((prev) => prev + 1);
          setSelectedTotalPrice((prev) => prev + newProduct.product.price);
          setSelectedProducts((prev) => [...prev, newProduct]);
          // setUnselectedProducts((prev) =>
          //   prev.filter((prod) => prod.homeFittingId !== id)
          // );
        } else {
          setSelectedCount((prev) => prev - 1);
          setSelectedTotalPrice((prev) => prev - newProduct.product.price);
          setSelectedProducts((prev) =>
            prev.filter((prod) => prod.homeFittingId !== id)
          );
          // setUnselectedProducts((prev) => [...prev, newProduct]);
        }

        return newProduct;
      }

      return product;
    });

    setProducts(updatedProducts);

    // Check if all items are selected or not
    const allChecked = updatedProducts.every((product) => product.isChecked);

    if (allChecked) {
      setImageSrc(check_on.src);
      setIsClicked(true);
    } else {
      setImageSrc(check_off.src);
      setIsClicked(false);
    }
  };

  const handlePurchase = () => {
    console.log(selectedProducts.length);
    selectedProducts.length === 0 ? alert('제품을 선택하세요') : goPurchase();
  };

  const goPurchase = () => {
    setFinalProducts(selectedProducts);
    setTotal(selectedTotalPrice + deliveryFee);
    router.push('/myPick/shopping/purchase');
  };

  return (
    <Container>
      <DeliveryInfoWrapper>
        <DeliveryNowP1>{'홈피팅 배송 현황'}</DeliveryNowP1>
        <DeliveryNowP2>
          {user}님의 홈피팅을 위해 현재 리픽이 안전하게 배송 중이에요!
        </DeliveryNowP2>
        <DeliveryInfo>
          <DeliveryInfoContent>
            <DeliveryInfoDate>2023년 06월 29일</DeliveryInfoDate>
            <DeliveryInfoItem>
              <DeliveryInfoItemImg>
                <Image src={sample.src} alt="Sample" width={200} height={200} />
              </DeliveryInfoItemImg>
              <DeliveryInfoItemWrapper>
                <DeliveryInfoItemState>
                  핀턱 필리츠 미니 스커트 외 2건이 현재 배송 중입니다.
                </DeliveryInfoItemState>
                <DeliveryInfoItemStateWrapper>
                  <DeliveryInfoItemList>
                    <DeliveryItem
                      brand="[마뗑킴]"
                      name="Free / 볼레로 숏패딩 점퍼"
                    />
                    <DeliveryItem
                      brand="[마뗑킴]"
                      name="Free / 볼레로 숏패딩 점퍼"
                    />
                    <DeliveryItem
                      brand="[마뗑킴]"
                      name="Free / 볼레로 숏패딩 점퍼"
                    />
                  </DeliveryInfoItemList>
                  <DeliveryInfoItemButton>
                    <DeliveryInfoWrapP
                      onClick={() => alert('현재 이용 불가능한 서비스입니다.')}
                    >
                      배송현황 보러가기
                    </DeliveryInfoWrapP>
                  </DeliveryInfoItemButton>
                </DeliveryInfoItemStateWrapper>
              </DeliveryInfoItemWrapper>
            </DeliveryInfoItem>
          </DeliveryInfoContent>
        </DeliveryInfo>
      </DeliveryInfoWrapper>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1216"
        height="2"
        viewBox="0 0 1216 2"
        fill="none"
      >
        <path d="M0 1L1216 1.00011" stroke="#B4B4B4" strokeDasharray="5 5" />
      </svg>
      <DeliveredInfoWrapper>
        <DeliveryNowP1>{'구매를 기다리고 있어요!'}</DeliveryNowP1>
        <DeliveryNowP2>
          {'홈피팅을 하셨나요? 배송 받은 리픽 상품의 구매상품을 선택해주세요'}
        </DeliveryNowP2>
        <DeliveredInfo>
          <DeliveredSuccess>배송완료</DeliveredSuccess>
          <DeliveredDate>6/20(화) 도착</DeliveredDate>
        </DeliveredInfo>
        <DeliveredOrderDate>
          {user}님이 6월 19일날 주문하신 의류입니다.
        </DeliveredOrderDate>
        <DeliveredItemWrapper>
          <DeliveredItemCategory>
            <SelectAll>
              <Check onClick={() => handleClick()}>
                <Off src={imageSrc} />
              </Check>
              <SelectP>전체선택</SelectP>
            </SelectAll>
            <ItemInfo>상품정보</ItemInfo>
            <ItemPrice>상품금액</ItemPrice>
            <ReturnFee>수거비</ReturnFee>
          </DeliveredItemCategory>
          <DeliveredItemList>
            {products.flatMap((product, index) => [
              <DeliveredItem key={index}>
                <CheckWrapper>
                  <Check onClick={() => handleCheck(product.homeFittingId)}>
                    <Image
                      src={product.isChecked ? check_on.src : check_off.src}
                      alt="checkbox"
                      width={28}
                      height={28}
                    />
                  </Check>
                </CheckWrapper>
                <DeliveredItemInfo>
                  <ImageDiv
                    style={{
                      borderRadius: '15px',
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      src={product.product.mainImageFile.imagePath}
                      alt={product.product.name}
                      width={166}
                      height={166}
                    />
                  </ImageDiv>
                  <DeliveredItemP>
                    <ItemBrand>브랜드 : {product.product.brand}</ItemBrand>
                    <ItemExplain>
                      의류 설명 : {product.product.detail}
                    </ItemExplain>
                    <ItemSize>사이즈 : {product.product.size}</ItemSize>
                  </DeliveredItemP>
                </DeliveredItemInfo>
                <DeliveredItemPrice>
                  {product.product.price.toLocaleString('en-US')}원
                </DeliveredItemPrice>
                <DeliveredItemReturnFee>무료</DeliveredItemReturnFee>
              </DeliveredItem>,
              index < products.length - 1 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1216"
                  height="2"
                  viewBox="0 0 1216 2"
                  fill="none"
                  key={`svg${index}`}
                >
                  <path
                    d="M0 1L1216 1.00011"
                    stroke="#B4B4B4"
                    strokeDasharray="5 5"
                  />
                </svg>
              ) : null,
            ])}
          </DeliveredItemList>
        </DeliveredItemWrapper>
      </DeliveredInfoWrapper>
      <OrderInfoWrapper>
        <OrderInfo>
          <OrderCount>
            <OrderP>주문수량</OrderP>
            <OrderNum>{selectedCount}</OrderNum>
          </OrderCount>
          <ReturnCount>
            <ReturnP>반품수량</ReturnP>
            <ReturnNum>{products.length - selectedCount}</ReturnNum>
          </ReturnCount>
        </OrderInfo>
        <AllPrice>
          <PriceP>합계 가격</PriceP>
          <PriceNum>
            {(selectedTotalPrice + deliveryFee).toLocaleString('en-US')}원
          </PriceNum>
        </AllPrice>
      </OrderInfoWrapper>
      <WarnInfo>*선택하지 않은 수량은 자동으로 반품으로 처리됩니다.</WarnInfo>
      <PurchaseButton onClick={handlePurchase}>
        <PurchaseP>구매하기</PurchaseP>
      </PurchaseButton>
    </Container>
  );
}

export default page;

const Container = styled.div`
  margin-top: 72px;
  width: 1216px;
  height: 100%;
`;
const DeliveryInfoWrapper = styled.div`
  width: 100%;
  margin-bottom: 25px;
`;

const DeliveryNowP1 = styled.p`
  color: #111;
  font-family: Pretendard;
  font-size: 36px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
`;

const DeliveryNowP2 = styled.p`
  color: #111;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`;

const DeliveryInfo = styled.div`
  width: 100%;
  border-radius: 29px;
  background: rgb(232, 232, 232, 0.1);
`;

const DeliveryInfoContent = styled.div`
  margin-top: 20px;
  padding: 24px 48px 21px 56px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const DeliveryInfoDate = styled.p`
  color: #b4b4b4;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  width: 100%;
`;

const DeliveryInfoItem = styled.div`
  width: 100%;
  display: flex;
  gap: 50px;
`;

const DeliveryInfoItemImg = styled.div``;

const DeliveryInfoItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 52px;
  width: 100%;
`;

const DeliveryInfoItemState = styled.p`
  color: #111;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  width: 100%;
`;

const DeliveryInfoItemStateWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const DeliveryInfoItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 17px;
`;
const DeliveryInfoItemButton = styled.div`
  width: 310px;
  height: 60px;
  margin-left: auto;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background: #111;
  display: flex;
  cursor: pointer;
`;

const DeliveryInfoWrapP = styled.p`
  color: #e8e8e8;
  text-align: center;

  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  width: 330px;
`;

const DeliveredInfoWrapper = styled.div`
  width: 100%;
  margin-top: 80px;
  margin-bottom: 80px;
`;

const DeliveredInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 48px;
  gap: 41px;
  margin-bottom: 8px;
`;

const DeliveredSuccess = styled.p`
  color: var(--serve-color, #ff8a00);

  /* Header3 24pt sb */
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`;

const DeliveredDate = styled.p`
  color: var(--1, #111);

  /* Header3 24pt sb */
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`;

const DeliveredOrderDate = styled.p`
  width: 100%;
  text-align: center;
  color: var(--3, #b4b4b4);

  /* Header4 20pt rg */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  margin-bottom: 25px;
`;
const DeliveredItemWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  background: var(--5, #fff);

  /* shadow */
  box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.16);
`;

const DeliveredItemCategory = styled.div`
  display: flex;
  width: 100%;
  height: 74px;
  border-radius: 15px 15px 0px 0px;
  background: rgb(255, 138, 0, 0.1);
  align-items: center;
  color: var(--1, #111);

  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
`;

const SelectAll = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 110px;
  margin-left: 51px;
`;
const Check = styled.div`
  margin-right: 12px;
  cursor: pointer;
`;

const SelectP = styled.p`
  width: 70px;
`;

const ItemInfo = styled.p`
  text-align: center;
  margin-left: 377px;
`;

const ItemPrice = styled.p`
  text-align: center;
  margin-left: 236px;
  flex-wrap: wrap;
`;
const ReturnFee = styled.p`
  text-align: center;
  margin-left: 146px;
  margin-right: 105px;
  flex-wrap: wrap;
`;

const DeliveredItemList = styled.div`
  display: flex;
  flex-direction: column;
`;

const DeliveredItem = styled.div`
  display: flex;
  align-items: center;
  height: 200px;
`;

const CheckWrapper = styled.div`
  width: 183px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const DeliveredItemInfo = styled.div`
  display: flex;
  align-items: center;
  color: var(--1, #111);

  /* Header4 20pt rg */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`;
const DeliveredItemP = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 330px;
  margin-left: 64px;
  margin-right: 84px;
  height: 166px;
`;

const ItemBrand = styled.div``;
const ItemExplain = styled.div``;
const ItemSize = styled.div``;

const DeliveredItemPrice = styled.p`
  color: var(--1, #111);
  text-align: center;
  /* Header3 24pt sb */
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`;

const DeliveredItemReturnFee = styled.p`
  color: var(--1, #111);
  text-align: center;
  margin-left: 150px;

  /* Header4 20pt sb */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
`;
const On = styled.img``;
const Off = styled.img``;

const OrderInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;
const OrderInfo = styled.div`
  width: 549px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background: rgba(180, 180, 180, 0.1);
`;

const OrderCount = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
`;

const OrderP = styled.p`
  color: var(--1, #111);

  /* Header4 20pt sb */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
`;

const OrderNum = styled.p`
  color: var(--serve-color, #ff8a00);

  /* Header4 20pt rg */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`;

const ReturnCount = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
`;

const ReturnP = styled.p`
  color: var(--1, #111);

  /* Header4 20pt sb */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
`;

const ReturnNum = styled.p`
  color: var(--serve-color, #ff8a00);

  /* Header4 20pt rg */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`;

const AllPrice = styled.div`
  width: 493px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background: rgba(180, 180, 180, 0.1);
  gap: 40px;
`;

const PriceP = styled.p`
  color: var(--3, #b4b4b4);

  /* Header3 24pt sb */
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`;

const PriceNum = styled.p`
  color: var(--1, #111);

  /* Header2 32pt sb */
  font-family: Pretendard;
  font-size: 36px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
`;

const WarnInfo = styled.p`
  width: 100%;
  color: var(--3, #b4b4b4);

  /* Caption 14pt rg */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`;

const PurchaseButton = styled.div`
  width: 360px;
  height: 60px;
  border-radius: 15px;
  margin: 90px auto 148px auto;
  background: var(--1, #111);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const PurchaseP = styled.p`
  color: var(--4, #e8e8e8);
  text-align: center;

  /* Body1 16pt sb */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
`;

const ImageDiv = styled.div`
  width: 166px;
  height: 166px;
`;
