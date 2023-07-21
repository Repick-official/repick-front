'use client';
import React, { useEffect, useState } from 'react';
import '../../../reset.css';
import { useRouter } from 'next/navigation';
import { styled } from 'styled-components';
import ContentBodyInfo from '@/components/guide/ContentBodyInfo';
import sample from '@/assets/images/homefitting/sample.png';
import line from '@/assets/images/line.svg';
import check_off from '@/assets/images/check/off.svg';
import check_on from '@/assets/images/check/on.svg';
import OrderItem from '@/components/homefitting/OrderItem';
import { requestProducts, totalPrice } from '@/atom/states';
import { useRecoilState } from 'recoil';
import { FieldErrors, useForm } from 'react-hook-form';
import { orderProducts } from '@/api/requests';
import getAccessToken from '@/util/getAccessToken';
import { useCookies } from 'react-cookie';

interface HookFormTypes {
  access: any;
  address: {
    detailAddress: string;
    mainAddress: string;
    zipCode: string;
  };
  memberId: number;
  personName: string;
  phoneNumber: string;
  productIds: [];
  requestDetail: string;
}

function page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HookFormTypes>({
    defaultValues: {
      address: {
        detailAddress: '',
        mainAddress: '',
        zipCode: '',
      },
      memberId: 0,
      personName: '',
      phoneNumber: '',
      productIds: [],
      requestDetail: '',
    },
  });

  const router = useRouter();
  const [imageSrc, setImageSrc] = useState(check_off.src);
  const [isClicked, setIsClicked] = useState(false);
  const [h, setH] = useState<any[]>([]);
  const [p, setP] = useState(0);

  const [finalProducts, setFinalProducts] = useRecoilState(requestProducts);
  const [total, setTotal] = useRecoilState<number>(totalPrice);
  console.log(finalProducts);
  console.log(total);

  useEffect(() => {
    const clothes = finalProducts.map((item: any) => {
      return item;
    });
    setH(clothes);
    setP(total);
  }, []);
  const handleClick = () => {
    if (isClicked) {
      setImageSrc(check_off.src);
      setIsClicked(false);
    } else {
      setImageSrc(check_on.src);
      setIsClicked(true);
    }
  };

  const [cookies, setCookie, removeCookie] = useCookies();

  const registerHandler = async (data: HookFormTypes) => {
    // let accessToken = await getAccessToken(cookies, setCookie);
    // const response = await orderProducts(accessToken);
    // if (response.success) {
    //   router.push('/wardrobe/register/success');
    // } else {
    // }
  };

  return (
    <Container>
      <OrderGuideP1>주문 상품 정보</OrderGuideP1>
      <OrderGuideP2>회원님이 구매할 제품들이에요</OrderGuideP2>

      <OrderItemWrapper>
        {h.map((item) => (
          <div key={item.homeFittingId}>
            <ContentBodyInfo
              src={item.product.mainImageFile.imagePath}
              tagName={item.product.brand}
              size={item.product.size}
              name={item.product.name}
              price={item.product.price}
            />
          </div>
        ))}
      </OrderItemWrapper>
      <form onSubmit={handleSubmit(registerHandler)}>
        <OrderInfoWrapper>
          <OrderInfo>
            <Line100 src={line.src} />
            <User>배송자 정보</User>
            <SenderWrapper>
              <CheckWrapper>
                <Check onClick={() => handleClick()}>
                  <Off src={imageSrc} />
                </Check>
                <CheckP>배송자 정보가 회원 정보와 달라요</CheckP>
              </CheckWrapper>

              <Wrapper>
                <Info>이름</Info>
                <Content
                  placeholder="김회원"
                  {...register('personName', {
                    required: '이름을 입력해주세요.',
                  })}
                />
                {errors.personName && <p>{errors.personName.message}</p>}
              </Wrapper>
              <Wrapper>
                <Info>전화번호</Info>
                <Content
                  {...register('phoneNumber', {
                    required: '핸드폰 번호를 입력해주세요.',
                  })}
                />
                {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
              </Wrapper>
              <Wrapper>
                <Info>등록주소</Info>
                <Content />
              </Wrapper>
            </SenderWrapper>
            <Line src={line.src} />
            <DestinationWrapper>
              <User>배송자 정보 입력</User>
              <AddressWrapper>
                <Wrapper>
                  <Info>
                    {'배송 주소'}
                    <div className="star">{'*'}</div>
                  </Info>
                  <CheckWrapper>
                    <Check onClick={() => handleClick()}>
                      <Off src={imageSrc} />
                    </Check>
                    <CheckP>등록 정보로 배송 받기</CheckP>
                  </CheckWrapper>
                </Wrapper>
                <Address>
                  <ConfirmWrapper>
                    <Content
                      className="address"
                      {...register('address.zipCode', {
                        required: '우편번호를 입력해주세요.',
                      })}
                    />
                    {errors.address?.zipCode && (
                      <p>{errors.address?.zipCode.message}</p>
                    )}
                    <Confirm>{'우편번호'}</Confirm>
                  </ConfirmWrapper>
                  <Content
                    className="detail-address"
                    placeholder="상세 주소를 입력해주세요"
                    {...register('address.mainAddress', {
                      required: '상세 주소를 입력해주세요.',
                    })}
                  />
                  {errors.address?.mainAddress && (
                    <p>{errors.address?.mainAddress.message}</p>
                  )}
                  <Content
                    className="detail-address"
                    placeholder="상세 주소를 입력해주세요"
                    {...register('address.mainAddress', {
                      required: '상세 주소를 입력해주세요.',
                    })}
                  />
                  {errors.address?.detailAddress && (
                    <p>{errors.address?.detailAddress.message}</p>
                  )}
                </Address>
              </AddressWrapper>
              <Request>
                <InfoP>{'배송 시 기타 요청 사항'}</InfoP>
                <Content />
              </Request>
            </DestinationWrapper>

            <Method>
              {'결제 수단'}
              <div className="star">{'*'}</div>
            </Method>
            <CheckMethodWrapper>
              <CheckWrapper>
                <Check onClick={() => handleClick()}>
                  <Off src={imageSrc} />
                </Check>
                <CheckP>무통장입금</CheckP>
              </CheckWrapper>
              <CheckWrapper>
                <Check onClick={() => handleClick()}>
                  <Off src={imageSrc} />
                </Check>
                <CheckP>무통장입금</CheckP>
              </CheckWrapper>
              <CheckWrapper>
                <Check onClick={() => handleClick()}>
                  <Off src={imageSrc} />
                </Check>
                <CheckP>무통장입금</CheckP>
              </CheckWrapper>
            </CheckMethodWrapper>
          </OrderInfo>
          <FinalInfo>
            <Line src={line.src} />
            <User>최종 결제 금액 확인</User>
            <PayInfo>
              <MoneyAllWrapper>
                <All>총금액</All>
                <Money>{p.toLocaleString('en-US')} 원</Money>
              </MoneyAllWrapper>
              <LineMoney src={line.src} />
              <MoneyDetail>
                <MoneyWrapper>
                  <All>상품 금액</All>
                  <Money>{p.toLocaleString('en-US')} 원</Money>
                </MoneyWrapper>
                <MoneyWrapper>
                  <All>배송비</All>
                  <Money>0 원</Money>
                </MoneyWrapper>
                <MoneyWrapper>
                  <All>할인된 금액</All>
                  <Money>원</Money>
                </MoneyWrapper>
              </MoneyDetail>
            </PayInfo>
            <AllPrice>주문상품</AllPrice>
            <OrderPrice>
              {h.map((item) => (
                <div key={item.homeFittingId}>
                  <OrderItem
                    src={item.product.mainImageFile.imagePath}
                    tagName={item.product.brand}
                    size={item.product.size}
                    name={item.product.name}
                    price={item.product.price}
                  />
                </div>
              ))}
            </OrderPrice>
            <AllPrice>결제수단</AllPrice>
            <MethodNotSelected>결제 수단 미선택 상태</MethodNotSelected>
            <Accept>
              *주문할 상품의 상품명, 상품 가격, 배송 정보를 다시 한 번
              확인해주세요. 구매에 동의하시겠습니까?
            </Accept>
            <AcceptWrapper>
              <Check onClick={() => handleClick()}>
                <Off src={imageSrc} />
              </Check>
              <AcceptP>
                {'동의합니다.'}
                <div className="star">{'*'}</div>
              </AcceptP>
            </AcceptWrapper>

            <div className="button">
              <PurchaseP type="submit" value="결제하기"></PurchaseP>
            </div>
          </FinalInfo>
        </OrderInfoWrapper>
      </form>
    </Container>
  );
}

export default page;
const Container = styled.div`
  margin-top: 62px;
  width: 1216px;
  height: 100%;
`;

const OrderGuideP1 = styled.div`
  color: #111;
  font-family: Pretendard;
  font-size: 36px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
`;
const OrderGuideP2 = styled.div`
  color: #111;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`;

const OrderItemWrapper = styled.div`
  display: flex;
  margin-top: 60px;
  gap: 18px;
`;

const OrderInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 148px;
`;

const OrderInfo = styled.div`
  width: 666px;
`;

const FinalInfo = styled.div`
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
`;
const Info = styled.div`
  font-size: 20px;
  width: 207px;
  display: flex;

  .star {
    color: rgba(255, 61, 0, 1);
  }
`;

const On = styled.img``;
const Off = styled.img``;

const User = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 40px;
`;

const Line100 = styled.img`
  margin-top: 80px;
  width: 1216px;
`;

const Line = styled.img`
  margin-top: 80px;
  width: 100%;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 18px;
`;

const Content = styled.input`
  width: 436px;
  height: 56px;
  background-color: rgba(232, 232, 232, 1);
  border-radius: 15px;
  border: none;
  font-size: 20px;
  font-weight: 400;
  font-family: 'Pretendard';
  color: rgba(180, 180, 180, 1);
  padding: 0px 0px 0px 24px;
  outline: none;

  &.address {
    width: 308px;
  }

  &.detail-address {
    margin-left: 206px; //이게 맞나 모르겠다
  }
`;

const Check = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;

const CheckWrapper = styled.div`
  display: flex;
`;

const CheckP = styled.div`
  color: var(--2, #5f5f5f);
  /* Header4 20pt sb */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  .star {
    color: rgba(255, 61, 0, 1);
  }
`;

const SenderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Address = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 18px;
`;

const DestinationWrapper = styled.div`
  margin-bottom: 100px;
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

const ConfirmWrapper = styled.div`
  display: flex;
`;

const AddressWrapper = styled.div`
  margin-bottom: 22px;
`;

const Request = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const InfoP = styled.div`
  color: var(--2, #5f5f5f);

  /* Header4 20pt sb */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`;

const OrderMethodP = styled.div``;
const Method = styled.div`
  width: 100%;
  color: #111;
  display: flex;
  margin-bottom: 40px;

  /* Header3 24pt sb */
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;

  .star {
    color: rgba(255, 61, 0, 1);
  }
`;

const CheckMethodWrapper = styled.div`
  display: flex;
  gap: 60px;
`;

const PayInfo = styled.div`
  padding: 40px;
  margin-bottom: 40px;
`;

const All = styled.div``;

const AllPrice = styled.div`
  color: var(--1, #111);

  /* Header4 20pt sb */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  margin-bottom: 18px;
`;
const Money = styled.div``;
const MoneyAllWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  color: var(--1, #111);

  /* Header4 20pt sb */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
`;

const LineMoney = styled.img`
  width: 100%;
  margin-top: 40px;
  margin-bottom: 40px;
`;

const MoneyDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const OrderPrice = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 40px;
`;

const MoneyWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  color: var(--1, #111);
  height: 34px;

  /* Header4 20pt rg */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`;
const MethodNotSelected = styled.div`
  margin-top: 18px;
  margin-bottom: 60px;
  color: var(--2, #5f5f5f);
  /* Header4 20pt rg */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`;
const Accept = styled.div`
  margin-bottom: 24px;
  color: var(--2, #5f5f5f);

  /* Body1 16pt sb */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
`;

const AcceptWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 40px;
  align-items: center;
`;

const PurchaseButton = styled.div`
  height: 60px;
  border-radius: 15px;
  background: var(--1, #111);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const PurchaseP = styled.input`
  color: var(--4, #e8e8e8);
  text-align: center;

  /* Body1 16pt sb */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  background: var(--1, #111);
`;

const AcceptP = styled.div`
  display: flex;
  align-items: center;
  color: #111;

  /* Header4 20pt sb */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
`;
