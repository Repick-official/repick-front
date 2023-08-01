'use client';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import line from '@/assets/images/line.svg';
import Button from '@/components/common/Button';
import bagImage from '@/assets/images/bag.svg';
import arrow7 from '@/assets/images/arrow7.svg';
import arrow6 from '@/assets/images/arrow6.svg';
import { useRouter } from 'next/navigation';
import { pickupWardrobe, getUserInfo } from '@/api/requests';
import getAccessToken from '@/util/getAccessToken';
import { useCookies } from 'react-cookie';
import { FieldErrors, useForm } from 'react-hook-form';
import check_off from '@/assets/images/check/off.svg';
import check_on from '@/assets/images/check/on.svg';

interface HookFormTypes {
  name: string;
  phoneNumber: string;
  bank: {
    accountNumber: string;
    bankName: string;
  };
  address: {
    detailAddress: string;
    mainAddress: string;
    zipCode: string;
  };
  bagQuantity: number;
  productQuantity: number;
  returnDate: string;
  requestDetail: string;
  id: number;
  sellState: string;
}

function page() {
  const router = useRouter();

  const [cookies, setCookie, removeCookie] = useCookies();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<HookFormTypes>();
  // {
  //   defaultValues: {
  //     name: '',
  //     phoneNumber: '',
  //     bank: {
  //       accountNumber: '',
  //       bankName: '',
  //     },
  //     address: {
  //       detailAddress: '',
  //       mainAddress: '',
  //       zipCode: '',
  //     },
  //     bagQuantity: 0, //이렇게 하면 placeholder 없어지는딩
  //     productQuantity: 0,
  //     returnDate: '',
  //     requestDetail: '',
  //     id: 1,
  //     sellState: 'DELIVERED',
  //   },
  // }

  const registerHandler = async (data: HookFormTypes) => {
    const confirm = window.confirm('입력하신 정보로 옷장 신청을 하시겠습니까?');
    if (confirm) {
      console.log(data);

      let accessToken = await getAccessToken(cookies, setCookie);
      const response = await pickupWardrobe(accessToken, data);
      if (response.success) {
        router.push('/wardrobe/register/success');
      }
    }
  };

  const [bag, setBag] = useState(false);
  const showBag = () => {
    setBag(!bag);
  };

  const [useRegisteredAddr, setUseRegisteredAddr] = useState(false);

  const handleUseRegisteredAddrClick = async () => {
    setUseRegisteredAddr(!useRegisteredAddr);
  };

  useEffect(() => {
    const check = async () => {
      if (useRegisteredAddr) {
        let accessToken = await getAccessToken(cookies, setCookie);
        const response = await getUserInfo(accessToken);
        console.log(response);
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

  return (
    <Container>
      <TitleWrapper>
        <Title>옷장 정리 신청</Title>
        <SemiTitle>
          리픽이 직접 옷을 수거해드려요! 어디로 가면 될까요?
        </SemiTitle>
      </TitleWrapper>
      <Line src={line.src} />
      <form onSubmit={handleSubmit(registerHandler)}>
        <User>{'회원 정보'}</User>
        <Wrapper>
          <Info>
            {'이름'}
            <div className="star">{'*'}</div>
          </Info>
          <Content
            required
            {...register('name', {
              pattern: {
                value: /^[a-zA-Z가-힣]+$/, // Only English and Korean characters are allowed
                message: '*',
              },
            })}
          />
          {errors.name && <Error>{errors.name.message}</Error>}
        </Wrapper>
        <Wrapper>
          <Info>
            {'전화번호'}
            <div className="star">{'*'}</div>
          </Info>
          <Content
            required
            {...register('phoneNumber', {
              pattern: {
                value: /^[\d-]*$/, // 숫자와 '-'만 입력되도록 정규식 패턴 설정
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
          />
          {errors.phoneNumber && <Error>{errors.phoneNumber.message}</Error>}
        </Wrapper>
        <Wrapper>
          <Info>
            {'계좌번호'}
            <div className="star">{'*'}</div>
          </Info>
          <Account>
            <AccountDetail>은행</AccountDetail>
            <Content
              required
              className="bank"
              {...register('bank.bankName', {
                pattern: {
                  value: /^[가-힣]+$/, // 한글만 입력되도록 정규식 패턴 설정
                  message: '*',
                },
              })}
            />
            {errors.bank?.bankName && (
              <Error>{errors.bank?.bankName.message}</Error>
            )}
            <AccountDetail>계좌번호</AccountDetail>
            <Content
              required
              className="account"
              {...register('bank.accountNumber', {
                pattern: {
                  value: /^[\d-]+$/, // 숫자와 '-'만 입력되도록 정규식 패턴 설정
                  message: '*',
                },
              })}
            />
            {errors.bank?.accountNumber && (
              <Error>{errors.bank?.accountNumber.message}</Error>
            )}
          </Account>
        </Wrapper>
        <Line src={line.src} />
        <User>{'수거 지역 정보 입력하기'}</User>
        <A>
          <S>
            <Wrapper>
              <Info>
                {'수거 의류 예상 수량'}
                <div className="star">{'*'}</div>
              </Info>
              <Count>
                <Content
                  required
                  className="cloth"
                  placeholder="예상 수량"
                  {...register('bagQuantity', {
                    pattern: {
                      value: /^[\d]+$/, // 숫자와 '-'만 입력되도록 정규식 패턴 설정
                      message: '*',
                    },
                  })}
                />
                {errors.bagQuantity && (
                  <Error>{errors.bagQuantity.message}</Error>
                )}
                <Text>벌</Text>
                <Info className="bag">
                  {'필요한 리픽백 수'}
                  <div className="star">{'*'}</div>
                </Info>
                <Content
                  required
                  className="cloth"
                  placeholder="예상 개수"
                  {...register('productQuantity', {
                    pattern: {
                      value: /^[\d]+$/, // 숫자만 입력되도록 정규식 패턴 설정
                      message: '*',
                    },
                  })}
                />
                {errors.productQuantity && (
                  <Error>{errors.productQuantity.message}</Error>
                )}
                <Text>개가 필요해요</Text>
              </Count>
            </Wrapper>
            <Wrapper>
              <Info>
                {'수거 주소'}
                <div className="star">{'*'}</div>
              </Info>
              <ApplyWrapper>
                <CheckWrapper>
                  <Check onClick={handleUseRegisteredAddrClick}>
                    <Off
                      src={useRegisteredAddr ? check_on.src : check_off.src}
                    />
                  </Check>
                  <AddressApply>등록 주소로 수거 신청하기</AddressApply>
                </CheckWrapper>
              </ApplyWrapper>
            </Wrapper>
            <Address>
              <AddressWrapper>
                <Si>
                  <Content
                    required
                    className="address"
                    {...register('address.zipCode', {
                      pattern: {
                        value: /^[\d]*$/, // 숫자만 입력되도록 정규식 패턴 설정
                        message: '*',
                      },
                    })}
                  />
                  {errors.address?.zipCode && (
                    <Error>{errors.address?.zipCode.message}</Error>
                  )}
                </Si>
                <Confirm>{'우편번호'}</Confirm>
              </AddressWrapper>
              <Si>
                <Content
                  required
                  className="detail-address"
                  placeholder="상세 주소를 입력해주세요"
                  {...register('address.mainAddress', {
                    pattern: {
                      value: /^[\d가-힣]*$/, // 숫자와 한글만 입력되도록 정규식 패턴 설정
                      message: '*',
                    },
                  })}
                />
                {errors.address?.mainAddress && (
                  <Error>{errors.address?.mainAddress.message}</Error>
                )}
              </Si>
              <Si>
                <Content
                  required
                  className="detail-address"
                  placeholder="상세 주소를 입력해주세요"
                  {...register('address.detailAddress', {
                    pattern: {
                      value: /^[\d가-힣]*$/, // 숫자와 한글만 입력되도록 정규식 패턴 설정
                      message: '*',
                    },
                  })}
                />
                {errors.address?.detailAddress && (
                  <Error>{errors.address?.detailAddress.message}</Error>
                )}
              </Si>
            </Address>
            <Wrapper>
              <Info>
                {'원하는 수거 날짜 시간'}
                <div className="star">{'*'}</div>
              </Info>
              <Content
                required
                placeholder="2023-06-23"
                {...register('returnDate', {
                  pattern: {
                    value: /^\d{4}-\d{2}-\d{2}$/, // 'yyyy-mm-dd' 형식에 맞는지 검사하는 정규식 패턴 설정
                    message: '*',
                  },
                })}
              />
              {errors.returnDate && <Error>{errors.returnDate.message}</Error>}
            </Wrapper>
            <Wrapper>
              <Info>{'수거 시 기타 요청 사항'}</Info>
              <Content />
            </Wrapper>
          </S>
          <B>
            <BagConfirm>
              <Check>
                <Question onClick={() => showBag()}>?</Question>
              </Check>
              <BagText>리픽백 크기 확인하기</BagText>
            </BagConfirm>
            {bag && (
              <BagContainer>
                <BagWrapper>
                  <BagHeight>
                    <CM7>70cm</CM7>
                    <Arrow7 src={arrow7.src} />
                    <Bag src={bagImage.src} />
                  </BagHeight>
                  <BagWidth>
                    <Arrow6 src={arrow6.src} />
                    <CM6>60cm</CM6>
                    <More>
                      리픽백 한 개에는 티셔츠 <br /> 30벌 정도를 담을 수 있어요
                    </More>
                  </BagWidth>
                </BagWrapper>
              </BagContainer>
            )}
          </B>
        </A>
        <div className="button">
          <InputButton type="submit" value="신청하기"></InputButton>
        </div>
      </form>
    </Container>
  );
}

export default page;

const Off = styled.img``;

const Si = styled.div`
  display: flex;
  align-items: center;
`;

const Error = styled.div`
  color: rgba(255, 61, 0, 1);
  font-size: 20px;
  margin-left: 3px;
  margin-right: 0;
`;

const Container = styled.div`
  ::placeholder {
    color: var(--3, #b4b4b4);
  }
  .star {
    color: rgba(255, 61, 0, 1);
  }
  .button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 70px;
    margin-bottom: 148px;
  }
`;
const Title = styled.div`
  font-size: 36px;
  font-weight: 600;
`;
const SemiTitle = styled.div`
  font-size: 20px;
  font-weight: 400;
`;
const TitleWrapper = styled.div`
  margin-top: 120px;
`;
const Line = styled.img`
  margin-top: 60px;
`;
const User = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 40px;
`;
const Info = styled.div`
  font-size: 20px;
  width: 207px;
  display: flex;

  //   .star {
  //     color: rgba(255, 61, 0, 1);
  //   }
  &.bag {
    width: 153px;
    margin-left: 24px;
  }
`;
const Content = styled.input`
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
    margin-left: 206px;
    margin-bottom: 18px;
  }

  &.detail-address {
    margin-bottom: 18px;
    margin-left: 206px;
  }

  &.bank {
    width: 94px;
    height: 56px;
    margin-right: 24px;
  }

  &.account {
    width: 196px;
    height: 56px;
  }

  &.cloth {
    width: 94px;
    height: 56px;
  }
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 18px;
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
const Account = styled.div`
  display: flex;
  align-items: center;
`;
const AccountDetail = styled.div`
  font-size: 20px;
  font-weight: 400;
  margin-right: 12px;
`;
const Count = styled.div`
  display: flex;
  align-items: center;
`;
const Text = styled.div`
  font-size: 20px;
  font-weight: 400;
  margin-left: 12px;
`;
const Address = styled.div`
  display: flex;
  flex-direction: column;
`;
const CheckWrapper = styled.div`
  display: flex;
  align-items: center;
  &.date {
    margin-top: 16px;
    margin-bottom: 18px;
  }
`;
const Check = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 15px;
  background: var(--4, #e8e8e8);
`;
const Question = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  font-size: 20px;
`;
const AddressApply = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-left: 10px;
  color: var(--2, #5f5f5f);

  &.am {
    margin-right: 12px;
  }
`;
const ApplyWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const AddressWrapper = styled.div`
  display: flex;
`;
const DateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 206px;
  color: var(--2, #5f5f5f);
`;
const Dates = styled.input`
  width: 56px;
  height: 56px;
  border-radius: 15px;
  opacity: 0.5;
  background: var(--4, #e8e8e8);
  margin-left: 24px;
`;
const DateInfo = styled.div``;
const DateInfoWrapper = styled.div`
  display: flex;
  margin-bottom: 18px;
`;
const B = styled.div`
  //   margin-top: 110px;
  margin-left: 135px;
`;
const S = styled.div``;
const A = styled.div`
  display: flex;
`;
const BagText = styled.div`
  font-size: 20px;
  margin-left: 17px;
`;
const BagConfirm = styled.div`
  display: flex;
  margin-bottom: 14px;
`;
const Bag = styled.img`
  width: 135px;
  height: 142px;
`;

const BagContainer = styled.div`
  width: 310px;
  height: 278px;
  border-radius: 16px;
  background: var(--4, #e8e8e8);
  display: flex;

  position: relative;

  overflow: hidden;
  transition: height 0.3s ease;
`;
const Arrow7 = styled.img`
  margin-left: 6.94px;
  margin-right: 12.06px;
`;
const Arrow6 = styled.img`
  //   margin-left: 97px;
  margin-top: 12px;
`;
const BagHeight = styled.div`
  display: flex;
  align-items: center;
  margin-left: 31px;
`;
const BagWidth = styled.div`
  margin-left: 78px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CM7 = styled.div`
  font-size: 16px;
  font-weight: 400;
`;
const CM6 = styled.div`
  font-size: 16px;
  font-weight: 400;
  //   margin-left: 50px;
`;
const BagWrapper = styled.div`
  margin-top: 27px;
`;
const More = styled.div`
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  margin-top: 3px;
`;

const InputButton = styled.input`
  display: flex;
  width: 360px;
  height: 60px;
  padding: 24px 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 15px;
  background: var(--1, #111);
  color: var(--4, #e8e8e8);
  text-align: center;
  cursor: pointer;
  /* Body1 16pt sb */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 22.4px */
`;
