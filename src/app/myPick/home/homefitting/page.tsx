'use client';
import styled from 'styled-components';
import Image from 'next/image';
import check_off from '@/assets/images/check/off.svg';
import check_on from '@/assets/images/check/on.svg';
import DeliveryItem from '@/components/homefitting/DeliveryItem';
import getAccessToken from '@/util/getAccessToken';
import line from '@/assets/images/homefitting/line.svg';
import smallLine from '@/assets/images/homefitting/smallLine.svg';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  selectedMypickPage,
  requestProducts,
  userInfoState,
} from '@/atom/states';
import { inquiryHomeFitting } from '@/api/requests';
import { useRecoilState } from 'recoil';
import { useCookies } from 'react-cookie';

interface Product {
  homeFittingId: number;
  homeFittingState: string;
  product: {
    brand: string;
    detail: string;
    size: string;
    price: number;
    name: string;
    mainImageFile: {
      imagePath: string;
    };
    productId: number;
  };
  isChecked: boolean;
}

function page() {
  const router = useRouter();

  const [cookies, setCookie, removeCookie] = useCookies();

  const [finalProducts, setFinalProducts] = useRecoilState(requestProducts);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const [imageSrc, setImageSrc] = useState<string>(check_off.src);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [selectedCount, setSelectedCount] = useState<number>(0);
  const [selectedTotalPrice, setSelectedTotalPrice] = useState<number>(0);
  const [user, setUser] = useState('');

  const deliveryFee = 0;

  const [deliveringProducts, setDeliveringProducts] = useState<Product[]>([]);
  const [deliveredProducts, setDeliveredProducts] = useState<Product[]>([]);
  const delivered: any[] | ((prevState: Product[]) => Product[]) = [];
  const delivering: any[] | ((prevState: Product[]) => Product[]) = [];
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');

  const dateObject2 = new Date(date2);
  const dateObject1 = new Date(date1);

  const formattedDate1 = `${dateObject1.getFullYear()}년 ${
    dateObject1.getMonth() + 1
  }월 ${dateObject1.getDate()}일`;
  const formattedDate2 = `${
    dateObject2.getMonth() + 1
  }월 ${dateObject2.getDate()}일`;

  const [isDelivering, setIsDelivering] = useState(false);
  const [isDelivered, setIdDelivered] = useState(false);

  useEffect(() => {
    setUser(userInfo.uesrNickname);
  }, []);

  useEffect(() => {
    const get = async () => {
      let accessToken = await getAccessToken(cookies, setCookie);
      const response = await inquiryHomeFitting(accessToken);
      response.forEach((product: any) => {
        if (product.homeFittingState === 'DELIVERED') {
          if (product.length > 0) {
            setIdDelivered(true);
            delivered.push(product);
            setDate2(delivered[0].createdDate);
          } else {
            setIdDelivered(false);
          }
        } else if (product.homeFittingState === 'DELIVERING') {
          if (product.length > 0) {
            setIsDelivering(true);
            delivering.push(product);
            setDate1(delivering[0].createdDate);
          } else {
            setIsDelivering(false);
          }
        }
      });

      setDeliveredProducts(delivered);
      setDeliveringProducts(delivering);

      const productsWithCheckStatus = delivered.map((product: any) => ({
        ...product,
        isChecked: false,
      }));
      setDeliveredProducts(productsWithCheckStatus);
    };
    get();
  }, []);

  const handleClick = () => {
    const updatedProducts = deliveredProducts.map(
      (product: Product): Product => {
        return { ...product, isChecked: !isClicked };
      }
    );

    if (!isClicked) {
      setSelectedCount(updatedProducts.length);
      setSelectedTotalPrice(
        updatedProducts.reduce(
          (acc: any, curr: any) => acc + curr.product.price,
          0
        )
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
    setDeliveredProducts(updatedProducts);
  };

  const handleCheck = (id: number) => {
    const updatedProducts = deliveredProducts.map(
      (product: Product): Product => {
        if (product.homeFittingId === id) {
          const newProduct = { ...product, isChecked: !product.isChecked };

          if (newProduct.isChecked) {
            setSelectedCount((prev) => prev + 1);
            setSelectedTotalPrice((prev) => prev + newProduct.product.price);
            setSelectedProducts((prev) => [...prev, newProduct]);
          } else {
            setSelectedCount((prev) => prev - 1);
            setSelectedTotalPrice((prev) => prev - newProduct.product.price);
            setSelectedProducts((prev) =>
              prev.filter((prod) => prod.homeFittingId !== id)
            );
          }
          return newProduct;
        }
        return product;
      }
    );

    setDeliveredProducts(updatedProducts);

    const allChecked = updatedProducts.every(
      (product: any) => product.isChecked
    );

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

  const goPurchase = async () => {
    const confirm = window.confirm(
      '선택하신 제품들 외에는 반품됩니다. 선택하신 제품들을 구매하시겠습니까?'
    );
    if (confirm) {
      setFinalProducts(selectedProducts);

      router.push('/myPick/shopping/purchase');
    }
  };

  return (
    <Container>
      <Delivery.InfoWrapper>
        <Delivery.NowP1>{'홈피팅 배송 현황'}</Delivery.NowP1>
        <Delivery.NowP2>
          {user}님의 홈피팅을 위해 현재 리픽이 안전하게 배송 중이에요!
        </Delivery.NowP2>
        <Delivery.Info>
          <Delivery.InfoContent>
            <Delivery.InfoDate>
              {isDelivering ? formattedDate1 : '배송 중인 상품이 없습니다.'}
            </Delivery.InfoDate>
            <Delivery.InfoItem>
              <Delivery.InfoItemImg>
                <div style={{ borderRadius: '15px', overflow: 'hidden' }}>
                  {deliveringProducts.length > 0 &&
                    deliveringProducts[0].product && (
                      <Image
                        src={
                          deliveringProducts[0].product.mainImageFile.imagePath
                        }
                        alt="Sample"
                        width={200}
                        height={200}
                      />
                    )}
                </div>
              </Delivery.InfoItemImg>
              <Delivery.InfoItemWrapper>
                <Delivery.InfoItemState>
                  {deliveringProducts.length > 0 &&
                    deliveringProducts[0].product && (
                      <span>
                        {deliveringProducts[0].product.name} 외{' '}
                        {deliveringProducts.length - 1} 건이 현재 배송 중입니다.
                      </span>
                    )}
                </Delivery.InfoItemState>
                <Delivery.InfoItemStateWrapper>
                  <Delivery.InfoItemList>
                    {deliveringProducts.length > 0 &&
                      deliveringProducts.map((item) => (
                        <Delivery.Items key={item.product.productId}>
                          <DeliveryItem
                            brand={`[${item.product.brand}]`}
                            name={`${item.product.size} / ${item.product.name}`}
                          />
                        </Delivery.Items>
                      ))}
                  </Delivery.InfoItemList>
                  <Delivery.InfoItemButton>
                    <Delivery.InfoWrapP
                      onClick={() => alert('현재 이용 불가능한 서비스입니다.')}
                    >
                      배송현황 보러가기
                    </Delivery.InfoWrapP>
                  </Delivery.InfoItemButton>
                </Delivery.InfoItemStateWrapper>
              </Delivery.InfoItemWrapper>
            </Delivery.InfoItem>
          </Delivery.InfoContent>
        </Delivery.Info>
      </Delivery.InfoWrapper>
      <Delivery.Line src={line.src} />
      <Delivered.InfoWrapper>
        <Delivery.NowP1>{'구매를 기다리고 있어요!'}</Delivery.NowP1>
        <Delivery.NowP2>
          {'홈피팅을 하셨나요? 배송 받은 리픽 상품의 구매상품을 선택해주세요'}
        </Delivery.NowP2>
        <Delivered.Info>
          <Delivered.Success>배송완료</Delivered.Success>
        </Delivered.Info>
        {isDelivered ? (
          <Delivered.OrderDate>
            {user}님이 {formattedDate2}날 주문하신 의류입니다.
          </Delivered.OrderDate>
        ) : (
          <Delivered.OrderDate>구매할 상품이 없습니다.</Delivered.OrderDate>
        )}
        <Delivered.ItemWrapper>
          <Delivered.ItemCategory>
            <Option.SelectAll>
              <Option.Check onClick={() => handleClick()}>
                <Option.Off src={imageSrc} />
              </Option.Check>
              <Option.SelectP>전체선택</Option.SelectP>
            </Option.SelectAll>
            <Option.ItemInfo>상품정보</Option.ItemInfo>
            <Option.ItemPrice>상품금액</Option.ItemPrice>
            <Option.ReturnFee>수거비</Option.ReturnFee>
          </Delivered.ItemCategory>
          <Delivered.ItemList>
            {deliveredProducts.flatMap((product: any, index: any) => [
              <Delivered.Item key={index}>
                <Check.Wrapper>
                  <Check.Button
                    onClick={() => handleCheck(product.homeFittingId)}
                  >
                    <Image
                      src={product.isChecked ? check_on.src : check_off.src}
                      alt="checkbox"
                      width={28}
                      height={28}
                    />
                  </Check.Button>
                </Check.Wrapper>
                <Delivered.ItemInfo>
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
                  <Delivered.ItemP>
                    <Item.Brand>브랜드 : {product.product.brand}</Item.Brand>
                    <Item.Explain>
                      의류 설명 : {product.product.detail}
                    </Item.Explain>
                    <Item.Size>사이즈 : {product.product.size}</Item.Size>
                  </Delivered.ItemP>
                </Delivered.ItemInfo>
                <Delivered.ItemPrice>
                  {product.product.price.toLocaleString('en-US')}원
                </Delivered.ItemPrice>
                <Delivered.ItemReturnFee>무료</Delivered.ItemReturnFee>
              </Delivered.Item>,
              index < deliveredProducts.length - 1 ? (
                <Delivered.Line src={smallLine.src} />
              ) : null,
            ])}
          </Delivered.ItemList>
        </Delivered.ItemWrapper>
      </Delivered.InfoWrapper>
      <Order.InfoWrapper>
        <Order.Info>
          <Order.Count>
            <Order.P>주문수량</Order.P>
            <Order.Num>{selectedCount}</Order.Num>
          </Order.Count>
          <Return.Count>
            <Return.P>반품수량</Return.P>
            <Return.Num>{deliveredProducts.length - selectedCount}</Return.Num>
          </Return.Count>
        </Order.Info>
        <Price.All>
          <Price.P>합계 가격</Price.P>
          <Price.Num>
            {(selectedTotalPrice + deliveryFee).toLocaleString('en-US')}원
          </Price.Num>
        </Price.All>
      </Order.InfoWrapper>
      <WarnInfo>*선택하지 않은 수량은 자동으로 반품으로 처리됩니다.</WarnInfo>
      <Purchase.Button onClick={handlePurchase}>
        <Purchase.P>구매하기</Purchase.P>
      </Purchase.Button>
    </Container>
  );
}

export default page;

const Container = styled.div`
  margin-top: 72px;
  width: 1216px;
  height: 100%;
`;

const Delivery = {
  InfoWrapper: styled.div`
    width: 100%;
    margin-bottom: 25px;
  `,

  NowP1: styled.p`
    color: #111;
    font-size: 36px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
  `,

  NowP2: styled.p`
    color: #111;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
  `,

  Info: styled.div`
    width: 100%;
    border-radius: 29px;
    background: rgb(232, 232, 232, 0.1);
  `,

  InfoContent: styled.div`
    margin-top: 20px;
    padding: 24px 48px 21px 56px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  `,

  InfoDate: styled.p`
    color: #b4b4b4;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
    width: 100%;
  `,

  InfoItem: styled.div`
    width: 100%;
    display: flex;
    gap: 50px;
  `,

  InfoItemImg: styled.div``,

  InfoItemWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 52px;
    width: 100%;
  `,

  InfoItemState: styled.p`
    color: #111;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    width: 100%;
  `,

  InfoItemStateWrapper: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
  `,

  InfoItemList: styled.div`
    display: flex;
    flex-direction: column;
    gap: 17px;
  `,
  InfoItemButton: styled.div`
    width: 310px;
    height: 60px;
    margin-left: auto;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    background: #111;
    display: flex;
    cursor: pointer;
  `,

  InfoWrapP: styled.p`
    color: #e8e8e8;
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
    width: 330px;
  `,
  Items: styled.div``,
  Line: styled.img``,
};

const Delivered = {
  InfoWrapper: styled.div`
    width: 100%;
    margin-top: 80px;
    margin-bottom: 80px;
  `,

  Info: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 48px;
    gap: 41px;
    margin-bottom: 8px;
  `,

  Success: styled.p`
    color: var(--serve-color, #ff8a00);
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
  `,

  OrderDate: styled.p`
    width: 100%;
    text-align: center;
    color: var(--3, #b4b4b4);
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    margin-bottom: 25px;
  `,
  ItemWrapper: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    background: var(--5, #fff);

    /* shadow */
    box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.16);
  `,
  ItemCategory: styled.div`
    display: flex;
    width: 100%;
    height: 74px;
    border-radius: 15px 15px 0px 0px;
    background: rgb(255, 138, 0, 0.1);
    align-items: center;
    color: var(--1, #111);
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
  `,

  ItemPrice: styled.p`
    color: var(--1, #111);
    text-align: center;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
  `,

  ItemReturnFee: styled.p`
    color: var(--1, #111);
    text-align: center;
    margin-left: 150px;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
  `,
  ItemList: styled.div`
    display: flex;
    flex-direction: column;
  `,

  Item: styled.div`
    display: flex;
    align-items: center;
    height: 200px;
  `,
  ItemInfo: styled.div`
    display: flex;
    align-items: center;
    color: var(--1, #111);
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
  `,
  ItemP: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 330px;
    margin-left: 64px;
    margin-right: 84px;
    height: 166px;
    font-size: 20px;
    font-weight: 400;
  `,
  Line: styled.img``,
};

const Option = {
  SelectAll: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 110px;
    margin-left: 51px;
  `,
  Check: styled.div`
    margin-right: 12px;
    cursor: pointer;
  `,
  Off: styled.img``,

  SelectP: styled.p`
    width: 70px;
  `,
  ItemInfo: styled.p`
    text-align: center;
    margin-left: 377px;
  `,

  ItemPrice: styled.p`
    text-align: center;
    margin-left: 236px;
    flex-wrap: wrap;
  `,
  ReturnFee: styled.p`
    text-align: center;
    margin-left: 146px;
    margin-right: 105px;
    flex-wrap: wrap;
  `,
};

const Check = {
  Wrapper: styled.div`
    width: 183px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  `,
  Button: styled.div`
    margin-right: 12px;
    cursor: pointer;
  `,
};

const Item = {
  Brand: styled.div``,
  Explain: styled.div``,
  Size: styled.div``,
};

const Order = {
  InfoWrapper: styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
  `,
  Info: styled.div`
    width: 549px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    background: rgba(180, 180, 180, 0.1);
  `,

  Count: styled.div`
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;
  `,

  P: styled.p`
    color: var(--1, #111);
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
  `,

  Num: styled.p`
    color: var(--serve-color, #ff8a00);
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
  `,
};

const Purchase = {
  Button: styled.div`
    width: 360px;
    height: 60px;
    border-radius: 15px;
    margin: 90px auto 148px auto;
    background: var(--1, #111);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  `,
  P: styled.p`
    color: var(--4, #e8e8e8);
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
  `,
};

const Return = {
  Count: styled.div`
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;
  `,

  P: styled.p`
    color: var(--1, #111);
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
  `,
  Num: styled.p`
    color: var(--serve-color, #ff8a00);
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
  `,
};

const Price = {
  All: styled.div`
    width: 493px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    background: rgba(180, 180, 180, 0.1);
    gap: 40px;
  `,

  P: styled.p`
    color: var(--3, #b4b4b4);
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
  `,

  Num: styled.p`
    color: var(--1, #111);
    font-size: 36px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
  `,
};

const WarnInfo = styled.p`
  width: 100%;
  color: var(--3, #b4b4b4);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`;

const ImageDiv = styled.div`
  width: 166px;
  height: 166px;
`;
