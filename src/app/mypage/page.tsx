'use client';
import '../reset.css';
import React from 'react';
import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import Button from '@/components/common/Button';
import line from '@/assets/images/line.svg';
import approved from '@/assets/images/mypage/approved.svg';
import expired from '@/assets/images/mypage/expired.svg';
import lineStraight from '@/assets/images/LineStraight.svg';
import lineSelected from '@/assets/images/LineSelected.svg';
import check_off from '@/assets/images/check/off.svg';
import check_on from '@/assets/images/check/on.svg';
import { useRouter } from 'next/navigation';
import { FieldErrors, useForm } from 'react-hook-form';
import getAccessToken from '@/util/getAccessToken';
import { useCookies } from 'react-cookie';
import {
  getUserInfo,
  getIsSubscribe,
  updateUserInfo,
  inquirySubscribe,
  inquirySubscribeLatest,
} from '@/api/requests';
interface HookFormTypes {
  address: {
    mainAddress: string;
  };
  bank: {
    accountNumber: string;
    bankName: string;
  };
  email: string;
  name: string;
  nickname: string;
  phoneNumber: string;
}
function page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<HookFormTypes>();
  const router = useRouter();
  const [imageSrc, setImageSrc] = useState(check_off.src);
  const [isClicked, setIsClicked] = useState(false);
  const [subscribeInfo, setSubscribeInfo] = useState(1);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [isSubscribed, setIsSubscribed] = useState(false);

  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const checkUserInfo = async () => {
      let accessToken = await getAccessToken(cookies, setCookie);
      const response = await getUserInfo(accessToken);
      console.log(response);
      if (response) {
        setValue('name', response.name || '');
        setValue('phoneNumber', response.phoneNumber || '');
        setValue('bank.bankName', response.bank.bankName || '');
        setValue('bank.accountNumber', response.bank.accountNumber || '');
        setValue('address.mainAddress', response.address?.mainAddress || '');
        setValue('nickname', response.nickname || '');
        setValue('email', response.email || '');
      }
    };
    const checkIsSubscribe = async () => {
      let accessToken = await getAccessToken(cookies, setCookie);
      const response = await getIsSubscribe(accessToken);
      setIsSubscribed(response !== 'NONE');
    };
    const showSubscribeInfo = async () => {
      let accessToken = await getAccessToken(cookies, setCookie);
      const latest = await inquirySubscribeLatest(accessToken);

      console.log('la', latest);
      const Plan = latest.map((item: any) => {
        return item;
      });
      setHistory(Plan);
    };
    checkUserInfo();
    checkIsSubscribe();
    showSubscribeInfo();
  }, []);

  const onValid = async (data: HookFormTypes) => {
    let accessToken = await getAccessToken(cookies, setCookie);
    const response = await updateUserInfo(accessToken, data);
    if (response.success) {
      alert('회원정보를 수정하였습니다');
      // router.push('/');
    }
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
  const handleSubscribeClick = (num: React.SetStateAction<number>) => {
    setSubscribeInfo(num);
    alert('현재 이용 불가능한 서비스입니다.');
  };
  return (
    <Container>
      <form onSubmit={handleSubmit(onValid)}>
        <R>
          <Title>
            <Register>{'마이페이지'}</Register>
          </Title>
          <Line src={line.src} />
          <User>{'회원 정보'}</User>
          <Wrapper>
            <Info>
              {'이름'}
              <div className="star">{'*'}</div>
            </Info>
            <Content
              {...register('name', {
                pattern: {
                  value: /^[a-zA-Z가-힣]+$/, // Only English and Korean characters are allowed
                  message: '*',
                },
              })}
              required
            />
            {errors.name && <Error>{errors.name.message}</Error>}
          </Wrapper>
          <Wrapper>
            <Info>
              {'전화번호'}
              <div className="star">{'*'}</div>
            </Info>
            <Content
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
              required
            />
            {errors.phoneNumber && <Error>{errors.phoneNumber.message}</Error>}
          </Wrapper>
          <Wrapper>
            <Info>
              {'등록계좌'}
              <div className="star">{'*'}</div>
            </Info>
            <Contents>
              <ContentWrapper>
                <InfoBank>은행</InfoBank>
                <ContentBank
                  {...register('bank.bankName', {
                    pattern: {
                      value: /^[a-zA-Z가-힣]+$/, // Only English and Korean characters are allowed
                      message: '*',
                    },
                  })}
                  required
                />
                {errors.bank?.bankName && (
                  <Error>{errors.bank?.bankName.message}</Error>
                )}
              </ContentWrapper>
              <ContentWrapper>
                <InfoBank>계좌번호</InfoBank>
                <ContentBanks
                  {...register('bank.accountNumber', {
                    pattern: {
                      value: /^[\d-]*$/, // 숫자와 '-'만 입력되도록 정규식 패턴 설정
                      message: '*',
                    },
                  })}
                  required
                />
                {errors.bank?.accountNumber && (
                  <Error>{errors.bank?.accountNumber.message}</Error>
                )}
              </ContentWrapper>
            </Contents>
          </Wrapper>
          <Wrapper>
            <Info>
              {'등록주소'}
              <div className="star">{'*'}</div>
            </Info>
            <Content
              {...register('address.mainAddress', {
                pattern: {
                  value: /^[\d가-힣]*$/, // 숫자와 한글만 입력되도록 정규식 패턴 설정
                  message: '*',
                },
              })}
              required
            />
            {errors.address?.mainAddress && (
              <Error>{errors.address?.mainAddress.message}</Error>
            )}
          </Wrapper>
          <Wrapper>
            <Info>{'아이디'}</Info>
            <Content
              placeholder="숫자, 영문 대소문자만 사용 가능합니다"
              {...register('nickname', {
                pattern: {
                  value: /^[0-9a-zA-Z]+$/,
                  message: '*',
                },
              })}
            />
            {errors.nickname && <Error>{errors.nickname.message}</Error>}
          </Wrapper>
          <Wrapper>
            <Info>
              {'이메일'}
              <div className="star">{'*'}</div>
            </Info>
            <Content
              required
              {...register('email', {
                required: '이메일을 입력해주세요.',
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: '*',
                },
              })}
            />
            {errors.email && <Error>{errors.email.message}</Error>}
          </Wrapper>
        </R>
        <InfoEditButton>
          <InputButton type="submit" value="회원정보 수정"></InputButton>
        </InfoEditButton>
      </form>
      <Line src={line.src} />
      <MarketP>{'마케팅 정보 수신'}</MarketP>
      <CheckWrapper>
        <Check onClick={() => handleClick()}>
          <Off src={imageSrc} />
        </Check>
        <CheckP>마케팅 정보 수신에 동의합니다.</CheckP>
      </CheckWrapper>
      <Line src={line.src} />
      <SubscribeCategory>
        <SubscribeMenu bold={'bold'} onClick={() => setSubscribeInfo(1)}>
          구독 내역
        </SubscribeMenu>
        <SubscribeMenu bold={'notBold'} onClick={() => handleSubscribeClick(2)}>
          구매 내역
        </SubscribeMenu>
        <SubscribeMenu bold={'notBold'} onClick={() => handleSubscribeClick(3)}>
          옷장 수거 내역
        </SubscribeMenu>
        <SubscribeMenu bold={'notBold'} onClick={() => handleSubscribeClick(4)}>
          정산 내역
        </SubscribeMenu>
      </SubscribeCategory>
      <NavSubscribed>
        <LineStraight src={lineStraight.src} />
        <SelectedSubscribed>
          <MenuWrapper>
            {subscribeInfo === 1 && <LineSelected src={lineSelected.src} />}
          </MenuWrapper>
          <MenuWrapper>
            {subscribeInfo === 2 && <LineSelected src={lineSelected.src} />}
          </MenuWrapper>
          <MenuWrapper>
            {subscribeInfo === 3 && <LineSelected src={lineSelected.src} />}
          </MenuWrapper>
          <MenuWrapper>
            {subscribeInfo === 4 && <LineSelected src={lineSelected.src} />}
          </MenuWrapper>
        </SelectedSubscribed>
      </NavSubscribed>
      <MembershipCategory>
        <MembershipMenu>상태</MembershipMenu>
        <MembershipMenu>멤버쉽 종류</MembershipMenu>
        <MembershipMenu>결제 날짜</MembershipMenu>
        <MembershipMenu>만료 날짜</MembershipMenu>
        <MembershipMenu>결제 금액</MembershipMenu>
      </MembershipCategory>
      <LineNM src={line.src} />
      {isSubscribed ? (
        <div>
          <div>
            {history.map((item) => (
              <MembershipInfo key={item.id}>
                <MembershipInfoWrapper>
                  <MembershipInfoMenu>
                    <S>
                      <Sub>
                        {item.subscribeState == 'APPROVED'
                          ? '구독 중'
                          : '만료됨'}
                      </Sub>
                      {item.subscribeState == 'APPROVED' ? (
                        <Point src={approved.src} />
                      ) : (
                        <Point src={expired.src} />
                      )}
                    </S>
                  </MembershipInfoMenu>
                  <MembershipInfoMenu>
                    리픽 {item.subscribeType} 구독
                  </MembershipInfoMenu>
                  <MembershipInfoMenu>{item.createdDate}</MembershipInfoMenu>
                  <MembershipInfoMenu>{item.expireDate}</MembershipInfoMenu>
                  <MembershipInfoMenu>
                    {item.subscribeType == 'BASIC' ? '9,540 원' : '15,540 원'}
                  </MembershipInfoMenu>
                </MembershipInfoWrapper>
              </MembershipInfo>
            ))}
          </div>
        </div>
      ) : (
        <MembershipInfo>
          <InfoWrapper>
            <NoMembership>구독 내역이 없어요</NoMembership>
            <MembershipAddButton
              onClick={() => router.push('/mypage/subscribe')}
            >
              <Button content="멤버쉽 구독하러 가기" num="3" />
            </MembershipAddButton>
          </InfoWrapper>
        </MembershipInfo>
      )}

      {isSubscribed ? (
        <>
          <LineNM src={line.src} />
          <MembershipWithDraw onClick={() => router.push('/mypage/subscribe')}>
            구독제 변경하기
          </MembershipWithDraw>
        </>
      ) : (
        <LineB src={line.src} />
      )}
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

const Sub = styled.div`
  font-size: 16px;
  font-weight: 600;
`;
const Ex = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: var(--2, #5f5f5f);
`;

const Point = styled.img`
  margin-left: 4px;
`;
const S = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  .button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 70px;
    margin-bottom: 148px;
  }
`;
const R = styled.div`
  margin-top: 120px;
  ::placeholder {
    color: var(--3, #b4b4b4);
  }
`;
const Title = styled.div`
  color: var(--1, #111);
`;
const Register = styled.div`
  font-size: 36px;
  font-weight: 600;
`;
const Welcome = styled.div`
  font-size: 20px;
  font-weight: 400;
`;
const Info = styled.div`
  font-size: 20px;
  width: 207px;
  display: flex;

  .star {
    color: rgba(255, 61, 0, 1);
  }
`;
const User = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 80px;
`;
const Content = styled.input`
  width: 436px;
  height: 56px;
  background-color: rgba(232, 232, 232, 1);
  border-radius: 15px;
  border: none;
  color: var(--2, #5f5f5f);

  /* Header4 20pt sb */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  padding: 0px 0px 0px 24px;
  outline: none;

  &.address {
    width: 308px;
  }

  &.detail-address {
    margin-bottom: 18px;
    margin-left: 206px; //이게 맞나 모르겠다
  }
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 18px;
`;
const Line = styled.img`
  margin-top: 60px;
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;
const InfoBank = styled.div`
  font-size: 20px;
  display: flex;

  .star {
    color: rgba(255, 61, 0, 1);
  }
`;

const ContentBank = styled.input`
  width: 120px;
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
    margin-bottom: 18px;
    margin-left: 206px; //이게 맞나 모르겠다
  }
`;
const ContentBanks = styled.input`
  width: 220px;
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
    margin-bottom: 18px;
    margin-left: 206px; //이게 맞나 모르겠다
  }
`;
const Contents = styled.div`
  display: flex;
  gap: 24px;
`;
const InfoEditButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 52px;
  margin-bottom: 30px;
`;
const Check = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;
const CheckWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const CheckP = styled.p`
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

const On = styled.img``;
const Off = styled.img``;

const MarketP = styled.p`
  color: var(--1, #111);
  /* Header3 24pt sb */
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 36px */
  margin-bottom: 40px;
  margin-top: 20px;
`;

const SubscribeCategory = styled.div`
  width: 100%;
  display: flex;
  margin-top: 24px;
  margin-bottom: 24px;
  justify-content: space-evenly;
`;
const SubscribeMenu = styled.p<{ bold: string }>`
  width: 135px;
  text-align: center;
  cursor: pointer;
  font-size: 16px;
  font-weight: ${(props) => (props.bold == 'bold' ? '600' : '400')};
  color: ${(props) => (props.bold == 'bold' ? '#111' : '#5F5F5F')};
`;

const NavSubscribed = styled.div`
  margin-bottom: 20px;
  position: relative;
`;

const LineStraight = styled.img``;
const LineSelected = styled.img``;
const SelectedSubscribed = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;
const MenuWrapper = styled.div`
  width: 134px;
`;
const LineNM = styled.img`
  margin-top: 24px;
`;
const LineB = styled.img`
  margin-bottom: 194px;
`;
const MembershipCategory = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
`;
const MembershipMenu = styled.p`
  width: 140px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
`;

const MembershipInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 16px;
  font-weight: 400;
  color: var(--2, #5f5f5f);
  margin-top: 24px;
`;
const NoMembership = styled.p`
  color: var(--2, #5f5f5f);
  text-align: center;

  /* Body2 16pt rg */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  margin-bottom: 24px;
`;
const InfoWrapper = styled.div``;
const MembershipAddButton = styled.div`
  margin-bottom: 61px;
`;

const MembershipInfoWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;
const MembershipInfoMenu = styled.div`
  width: 140px;
  text-align: center;
`;
const MembershipWithDraw = styled.p`
  width: 100%;
  text-align: end;
  margin-top: 24px;
  margin-bottom: 148px;
  color: var(--2, #5f5f5f);

  /* Body2 16pt rg */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`;

const InputButton = styled.input`
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
  /* Body1 16pt sb */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 22.4px */
`;
