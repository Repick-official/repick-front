'use client';
import ContentBodyInfo from '@/components/guide/ContentBodyInfo';
import line from '@/assets/images/homefitting/purchaseLine.svg';
import check_off from '@/assets/images/check/off.svg';
import check_on from '@/assets/images/check/on.svg';
import OrderItem from '@/components/homefitting/OrderItem';
import getAccessToken from '@/util/getAccessToken';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { styled } from 'styled-components';
import { requestProducts, selectedMypickPage } from '@/atom/states';
import { useRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
import { orderProducts, getUserInfo } from '@/api/requests';
import { useCookies } from 'react-cookie';

interface HookFormTypes {
  access: any;
  address: {
    detailAddress: string;
    mainAddress: string;
    zipCode: string;
  };
  name: string;
  phoneNumber: string;
  productIds: number[];
  requestDetail: string;
}

function page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<HookFormTypes>({
    defaultValues: {
      address: {
        detailAddress: '',
        mainAddress: '',
        zipCode: '',
      },
      name: '',
      phoneNumber: '',
      productIds: [],
      requestDetail: '',
    },
  });

  const router = useRouter();

  const [cookies, setCookie, removeCookie] = useCookies();

  const [finalProducts, setFinalProducts] = useRecoilState(requestProducts);
  const [selectedPage, setSelectedPage] = useRecoilState(selectedMypickPage);
  const [imageSrc, setImageSrc] = useState(check_off.src);
  const [isClicked, setIsClicked] = useState(false);
  const [product, setProduct] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [isDeliveryDiff, setIsDeliveryDiff] = useState(false);
  const [useRegisteredAddr, setUseRegisteredAddr] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');

  useEffect(() => {
    const check = async () => {
      if (!isDeliveryDiff) {
        let accessToken = await getAccessToken(cookies, setCookie);
        const response = await getUserInfo(accessToken);
        if (response) {
          setValue('name', response.name || '');
          setValue('phoneNumber', response.phoneNumber || '');
        }
      } else {
        setValue('name', '');
        setValue('phoneNumber', '');
      }
    };
    check();
  }, [isDeliveryDiff]);

  useEffect(() => {
    const check = async () => {
      if (useRegisteredAddr) {
        let accessToken = await getAccessToken(cookies, setCookie);
        const response = await getUserInfo(accessToken);
        if (response) {
          setValue('address.zipCode', response.address?.zipCode || '');
          setValue('address.mainAddress', response.address?.mainAddress || '');
          setValue(
            'address.detailAddress',
            response.address?.detailAddress || ''
          );
        }
      } else {
        setValue('address.zipCode', '');
        setValue('address.mainAddress', '');
        setValue('address.detailAddress', '');
      }
    };
    check();
  }, [useRegisteredAddr]);

  useEffect(() => {
    if (finalProducts.length === 0) {
      alert('구매할 제품이 없습니다.');
      setSelectedPage('마이픽 현황');
      router.push('/myPick/home');
      return;
    }

    if (finalProducts.length > 0) {
      // finalProducts 배열이 비어있지 않은 경우에만 setTotal 호출
      const clothes = finalProducts.map((item: any) => {
        setTotal((prevTotal) => prevTotal + item.product.price);
        return item;
      });
      setProduct(clothes);
    }
  }, []);

  const handleDeliveryDiffClick = () => {
    setIsDeliveryDiff(!isDeliveryDiff);
  };

  const handleUseRegisteredAddrClick = async () => {
    setUseRegisteredAddr(!useRegisteredAddr);
  };

  const handlePaymentMethodClick = (method: string) => {
    setPaymentMethod(method);
  };

  const clearProducts = () => {
    setFinalProducts([]);
    return;
  };

  const handleClick = () => {
    if (isClicked) {
      setImageSrc(check_off.src);
      setIsClicked(false);
    } else {
      setImageSrc(check_on.src);
      setIsClicked(true);
    }
  };

  const registerHandler = async (data: HookFormTypes) => {
    const productIds = finalProducts.map((item) => item.product.productId);
    let updatedData: HookFormTypes = {
      ...data,
      productIds: productIds,
    };

    if (isClicked && paymentMethod) {
      const confirm = window.confirm('결제하시겠습니까?');
      if (confirm) {
        let accessToken = await getAccessToken(cookies, setCookie);
        const response = await orderProducts(accessToken, updatedData);
        if (response.success) {
          router.push('/myPick/shopping/purchase/success');
          clearProducts();
        }
      }
    } else {
      alert('결제 수단을 선택하고 결제에 동의 해주세요');
    }
  };

  return (
    <Container>
      <Order.GuideP1>주문 상품 정보</Order.GuideP1>
      <Order.GuideP2>회원님이 구매할 제품들이에요</Order.GuideP2>

      <Order.ItemWrapper>
        {product.map((item) => (
          <div key={item.product.productId}>
            <ContentBodyInfo
              src={item.product.mainImageFile.imagePath}
              tagName={item.product.brand}
              size={item.product.size}
              name={item.product.name}
              price={item.product.price}
            />
          </div>
        ))}
      </Order.ItemWrapper>
      <form onSubmit={handleSubmit(registerHandler)}>
        <Order.InfoWrapper>
          <Order.Info>
            <Order.Line src={line.src} />
            <Order.User>배송자 정보</Order.User>
            <Wrapper.Sender>
              <Wrapper.Check>
                <Info.Check onClick={handleDeliveryDiffClick}>
                  <Info.Off
                    src={isDeliveryDiff ? check_on.src : check_off.src}
                  />
                </Info.Check>
                <Info.CheckP>배송자 정보가 회원 정보와 달라요</Info.CheckP>
              </Wrapper.Check>

              <Wrapper.Wrapper>
                <Info.Info>이름</Info.Info>
                <Info.Content
                  placeholder="김회원"
                  required
                  {...register('name', {
                    pattern: {
                      value: /^[a-zA-Z가-힣]+$/,
                      message: '*',
                    },
                  })}
                />
                {errors.name && <Error>{errors.name.message}</Error>}
              </Wrapper.Wrapper>
              <Wrapper.Wrapper>
                <Info.Info>전화번호</Info.Info>
                <Info.Content
                  {...register('phoneNumber', {
                    pattern: {
                      value: /^[\d-]*$/,
                      message: '*',
                    },
                    minLength: {
                      value: 11,
                      message: '*',
                    },
                    maxLength: {
                      value: 13,
                      message: '*',
                    },
                  })}
                  required
                />
                {errors.phoneNumber && (
                  <Error>{errors.phoneNumber.message}</Error>
                )}
              </Wrapper.Wrapper>
            </Wrapper.Sender>
            <Wrapper.Line src={line.src} />
            <Wrapper.Destination>
              <Order.User>배송자 정보 입력</Order.User>
              <Wrapper.Address>
                <Wrapper.Wrapper>
                  <Info.Info>
                    {'배송 주소'}
                    <div className="star">{'*'}</div>
                  </Info.Info>
                  <Wrapper.Check>
                    <Info.Check onClick={handleUseRegisteredAddrClick}>
                      <Info.Off
                        src={useRegisteredAddr ? check_on.src : check_off.src}
                      />
                    </Info.Check>
                    <Info.CheckP>등록 정보로 배송 받기</Info.CheckP>
                  </Wrapper.Check>
                </Wrapper.Wrapper>
                <Address>
                  <Wrapper.Confirm>
                    <Info.Content
                      className="address"
                      {...register('address.zipCode', {
                        pattern: {
                          value: /^[\d]*$/,
                          message: '*',
                        },
                      })}
                      required
                    />
                    {errors.address?.zipCode && (
                      <Error>{errors.address?.zipCode.message}</Error>
                    )}
                    <Confirm>{'우편번호'}</Confirm>
                  </Wrapper.Confirm>
                  <Info.Wrapper>
                    <Info.Content
                      className="detail-address"
                      placeholder="상세 주소를 입력해주세요"
                      {...register('address.mainAddress', {
                        pattern: {
                          value: /^[\d가-힣\s]*$/,
                          message: '*',
                        },
                      })}
                      required
                    />
                    {errors.address?.mainAddress && (
                      <Error>{errors.address?.mainAddress.message}</Error>
                    )}
                  </Info.Wrapper>
                  <Info.Wrapper>
                    <Info.Content
                      className="detail-address"
                      placeholder="상세 주소를 입력해주세요"
                      {...register('address.detailAddress', {
                        pattern: {
                          value: /^[\d가-힣\s]*$/,
                          message: '*',
                        },
                      })}
                      required
                    />
                    {errors.address?.detailAddress && (
                      <Error>{errors.address?.detailAddress.message}</Error>
                    )}
                  </Info.Wrapper>
                </Address>
              </Wrapper.Address>
              <Request>
                <Info.P>{'배송 시 기타 요청 사항'}</Info.P>
                <Info.Content />
              </Request>
            </Wrapper.Destination>

            <Method>
              {'결제 수단'}
              <div className="star">{'*'}</div>
            </Method>
            <Wrapper.CheckMethod>
              <Wrapper.Check
                onClick={() => handlePaymentMethodClick('무통장 입금')}
              >
                <Info.Check>
                  <Info.Off
                    src={
                      paymentMethod === '무통장 입금'
                        ? check_on.src
                        : check_off.src
                    }
                  />
                </Info.Check>
                <Info.CheckP>무통장입금</Info.CheckP>
              </Wrapper.Check>
              <Wrapper.Check
                onClick={() => {
                  alert('현재 이용 불가능한 서비스입니다.');
                }}
              >
                <Info.Check>
                  <Info.Off
                    src={
                      paymentMethod === '페이북' ? check_on.src : check_off.src
                    }
                  />
                </Info.Check>
                <Info.CheckP>페이북</Info.CheckP>
              </Wrapper.Check>
              <Wrapper.Check
                onClick={() => {
                  alert('현재 이용 불가능한 서비스입니다.');
                }}
              >
                <Info.Check>
                  <Info.Off
                    src={
                      paymentMethod === '신용 카드'
                        ? check_on.src
                        : check_off.src
                    }
                  />
                </Info.Check>
                <Info.CheckP>신용 카드</Info.CheckP>
              </Wrapper.Check>
            </Wrapper.CheckMethod>
          </Order.Info>
          <Info.Final>
            <Wrapper.Line src={line.src} />
            <Order.User>최종 결제 금액 확인</Order.User>
            <Info.Pay>
              <Money.AllWrapper>
                <All>총금액</All>
                <Money.Money>{total.toLocaleString('en-US')} 원</Money.Money>
              </Money.AllWrapper>
              <Money.Line src={line.src} />
              <Money.Detail>
                <Money.Wrapper>
                  <All>상품 금액</All>
                  <Money.Money>{total.toLocaleString('en-US')} 원</Money.Money>
                </Money.Wrapper>
                <Money.Wrapper>
                  <All>배송비</All>
                  <Money.Money>0 원</Money.Money>
                </Money.Wrapper>
                <Money.Wrapper>
                  <All>할인된 금액</All>
                  <Money.Money>원</Money.Money>
                </Money.Wrapper>
              </Money.Detail>
            </Info.Pay>
            <AllPrice>주문상품</AllPrice>
            <Order.Price>
              {product.map((item) => (
                <div key={item.product.productId}>
                  <OrderItem
                    src={item.product.mainImageFile.imagePath}
                    tagName={item.product.brand}
                    size={item.product.size}
                    name={item.product.name}
                    price={item.product.price}
                  />
                </div>
              ))}
            </Order.Price>
            <AllPrice>결제수단</AllPrice>
            <MethodNotSelected>{paymentMethod}</MethodNotSelected>
            <Accept.Accept>
              *주문할 상품의 상품명, 상품 가격, 배송 정보를 다시 한 번
              확인해주세요. 구매에 동의하시겠습니까?
            </Accept.Accept>
            <Accept.Wrapper>
              <Info.Check onClick={() => handleClick()}>
                <Info.Off src={imageSrc} />
              </Info.Check>
              <Accept.P>
                {'동의합니다.'}
                <div className="star">{'*'}</div>
              </Accept.P>
            </Accept.Wrapper>
            <Button.InfoEdit>
              <Button.Input type="submit" value="결제하기"></Button.Input>
            </Button.InfoEdit>
          </Info.Final>
        </Order.InfoWrapper>
      </form>
    </Container>
  );
}

export default page;

const Error = styled.div`
  color: rgba(255, 61, 0, 1);
  font-size: 20px;
  margin-left: 3px;
  margin-right: 0;
`;

const Container = styled.div`
  margin-top: 62px;
  width: 1216px;
  height: 100%;
`;

const Order = {
  GuideP1: styled.div`
    color: #111;
    font-size: 36px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
  `,
  GuideP2: styled.div`
    color: #111;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
  `,

  ItemWrapper: styled.div`
    display: flex;
    margin-top: 60px;
    gap: 18px;
    overflow-y: hidden;
  `,

  InfoWrapper: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 148px;
  `,

  Info: styled.div`
    width: 666px;
  `,
  Price: styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
    margin-bottom: 40px;
  `,
  Line: styled.img`
    margin-top: 80px;
    width: 1216px;
  `,
  User: styled.div`
    font-size: 24px;
    font-weight: 600;
    margin-top: 20px;
    margin-bottom: 40px;
  `,
};

const Wrapper = {
  Wrapper: styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 18px;
  `,
  Check: styled.div`
    display: flex;
  `,
  Sender: styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
  `,
  Destination: styled.div`
    margin-bottom: 100px;
  `,
  Confirm: styled.div`
    display: flex;
    align-items: center;
  `,

  Address: styled.div`
    margin-bottom: 22px;
  `,
  CheckMethod: styled.div`
    display: flex;
    gap: 60px;
  `,
  Line: styled.img`
    margin-top: 80px;
    width: 100%;
  `,
};

const Info = {
  Info: styled.div`
    font-size: 20px;
    width: 207px;
    display: flex;
    .star {
      color: rgba(255, 61, 0, 1);
    }
  `,
  Wrapper: styled.div`
    display: flex;
    align-items: center;
  `,
  Content: styled.input`
    width: 436px;
    height: 56px;
    background-color: rgba(232, 232, 232, 1);
    border-radius: 15px;
    border: none;
    font-size: 20px;
    font-weight: 400;
    color: rgba(180, 180, 180, 1);
    padding: 0px 0px 0px 24px;
    outline: none;
    &.address {
      width: 308px;
    }

    &.detail-address {
      margin-left: 206px;
    }
  `,
  Check: styled.div`
    margin-right: 10px;
    cursor: pointer;
  `,

  CheckP: styled.div`
    color: var(--2, #5f5f5f);
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
    .star {
      color: rgba(255, 61, 0, 1);
    }
  `,
  Off: styled.img``,
  Final: styled.div`
    width: 388px;

    .button {
      height: 60px;
      border-radius: 15px;
      background: var(--1, #111);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  `,
  Pay: styled.div`
    padding: 40px;
    margin-bottom: 40px;
  `,
  P: styled.div`
    color: var(--2, #5f5f5f);
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
  `,
};

const Money = {
  Money: styled.div``,
  AllWrapper: styled.div`
    display: flex;
    justify-content: space-between;
    color: var(--1, #111);
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
  `,

  Line: styled.img`
    width: 100%;
    margin-top: 40px;
    margin-bottom: 40px;
  `,

  Detail: styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
  `,

  Wrapper: styled.div`
    display: flex;
    justify-content: space-between;
    color: var(--1, #111);
    height: 34px;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
  `,
};

const MethodNotSelected = styled.div`
  margin-top: 18px;
  margin-bottom: 60px;
  color: var(--2, #5f5f5f);
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`;

const Accept = {
  Accept: styled.div`
    margin-bottom: 24px;
    color: var(--2, #5f5f5f);
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
  `,

  Wrapper: styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 40px;
    align-items: center;
  `,

  P: styled.div`
    display: flex;
    align-items: center;
    color: #111;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
  `,
};

const Button = {
  InfoEdit: styled.div`
    display: flex;
    justify-content: center;
    margin-top: 52px;
    margin-bottom: 30px;
  `,

  Input: styled.input`
    display: flex;
    width: 310px;
    height: 60px;
    padding: 24px 40px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 15px;
    background: var(--1, #111);
    color: var(--4, #e8e8e8);
    text-align: center;
    cursor: pointer;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 22.4px */
  `,
};
const Address = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 18px;
`;

const Confirm = styled.button`
  border-radius: 15px;
  background: var(--3, #b4b4b4);
  width: 104px;
  height: 56px;
  border: none;
  font-weight: 600;
  font-size: 16px;
  margin-left: 24px;
`;

const Request = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Method = styled.div`
  width: 100%;
  color: #111;
  display: flex;
  margin-bottom: 40px;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;

  .star {
    color: rgba(255, 61, 0, 1);
  }
`;

const All = styled.div``;

const AllPrice = styled.div`
  color: var(--1, #111);
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  margin-bottom: 18px;
`;
