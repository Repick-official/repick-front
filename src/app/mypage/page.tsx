'use client';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import line from '@/assets/images/line.svg';
import approved from '@/assets/images/mypage/approved.svg';
import expired from '@/assets/images/mypage/expired.svg';
import lineStraight from '@/assets/images/mypage/LineStraight.svg';
import lineSelected from '@/assets/images/mypage/LineSelected.svg';
import check_off from '@/assets/images/check/off.svg';
import check_on from '@/assets/images/check/on.svg';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import getAccessToken from '@/util/getAccessToken';
import { useCookies } from 'react-cookie';
import {
  getUserInfo,
  getIsSubscribe,
  updateUserInfo,
  inquirySubscribeLatest,
} from '@/api/requests';

interface HookFormTypes {
  address: {
    detailAddress: string;
    mainAddress: string;
    zipCode: string;
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
  const [subscribeInfo, setSubscribeInfo] = useState(1);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  const [cookies, setCookie, removeCookie] = useCookies();

  useEffect(() => {
    const checkUserInfo = async () => {
      let accessToken = await getAccessToken(cookies, setCookie);
      const response = await getUserInfo(accessToken);

      if (response) {
        setValue('name', response.name || '');
        setValue('phoneNumber', response.phoneNumber || '');
        setValue('bank.bankName', response.bank?.bankName || '');
        setValue('bank.accountNumber', response.bank?.accountNumber || '');
        setValue('address.zipCode', response.address?.zipCode || '');
        setValue('address.mainAddress', response.address?.mainAddress || '');
        setValue(
          'address.detailAddress',
          response.address?.detailAddress || ''
        );
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
        <Info.Wrapper>
          <Info.Title>
            <Info.Mypage>{'마이페이지'}</Info.Mypage>
          </Info.Title>
          <Info.Line src={line.src} />
          <Info.User>{'회원 정보'}</Info.User>

          <Info.Content>
            <Info.Left>
              {'이름'}
              <div className="star">{'*'}</div>
            </Info.Left>
            <Info.Right
              {...register('name', {
                pattern: {
                  value: /^[a-zA-Z가-힣]+$/,
                  message: '*',
                },
              })}
              required
            />
            {errors.name && <Error>{errors.name.message}</Error>}
          </Info.Content>

          <Info.Content>
            <Info.Left>
              {'전화번호'}
              <div className="star">{'*'}</div>
            </Info.Left>
            <Info.Right
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
            {errors.phoneNumber && <Error>{errors.phoneNumber.message}</Error>}
          </Info.Content>

          <Info.Content>
            <Info.Left>
              {'등록계좌'}
              <div className="star">{'*'}</div>
            </Info.Left>
            <Bank.Wrapper>
              <Bank.Content>
                <Bank.Name>은행</Bank.Name>
                <Bank.Input
                  {...register('bank.bankName', {
                    pattern: {
                      value: /^[a-zA-Z가-힣]+$/,
                      message: '*',
                    },
                  })}
                  required
                />
                {errors.bank?.bankName && (
                  <Error>{errors.bank?.bankName.message}</Error>
                )}
              </Bank.Content>
              <Bank.Content>
                <Bank.Name>계좌번호</Bank.Name>
                <Bank.Input
                  {...register('bank.accountNumber', {
                    pattern: {
                      value: /^[\d-]*$/,
                      message: '*',
                    },
                  })}
                  required
                />
                {errors.bank?.accountNumber && (
                  <Error>{errors.bank?.accountNumber.message}</Error>
                )}
              </Bank.Content>
            </Bank.Wrapper>
          </Info.Content>

          <Address.Wrapper>
            <Address.Content>
              <Info.Left>
                {'등록주소'}
                <div className="star">{'*'}</div>
              </Info.Left>
              <Address.Wrap>
                <Info.Right
                  required
                  className="address"
                  {...register('address.zipCode', {
                    pattern: {
                      value: /^[\d]*$/,
                      message: '*',
                    },
                  })}
                />
                {errors.address?.zipCode && (
                  <Error>{errors.address?.zipCode.message}</Error>
                )}
              </Address.Wrap>
              <Address.Confirm
                onClick={() => alert('현재 이용 불가능한 서비스입니다.')}
              >
                {'우편번호'}
              </Address.Confirm>
            </Address.Content>
            <Address.Wrap>
              <Info.Right
                required
                className="detail-address"
                placeholder="상세 주소를 입력해주세요"
                {...register('address.mainAddress', {
                  pattern: {
                    value: /^[\d가-힣\s]*$/,
                    message: '*',
                  },
                })}
              />
              {errors.address?.mainAddress && (
                <Error>{errors.address?.mainAddress.message}</Error>
              )}
            </Address.Wrap>
            <Address.Wrap>
              <Info.Right
                required
                className="detail-address"
                placeholder="상세 주소를 입력해주세요"
                {...register('address.detailAddress', {
                  pattern: {
                    value: /^[\d가-힣\s]*$/,
                    message: '*',
                  },
                })}
              />
              {errors.address?.detailAddress && (
                <Error>{errors.address?.detailAddress.message}</Error>
              )}
            </Address.Wrap>
          </Address.Wrapper>

          <Info.Content>
            <Info.Left>{'아이디'}</Info.Left>
            <Info.Right
              placeholder="숫자, 영문 대소문자만 사용 가능합니다"
              {...register('nickname', {
                pattern: {
                  value: /^[0-9a-zA-Z]+$/,
                  message: '*',
                },
              })}
            />
            {errors.nickname && <Error>{errors.nickname.message}</Error>}
          </Info.Content>

          <Info.Content>
            <Info.Left>
              {'이메일'}
              <div className="star">{'*'}</div>
            </Info.Left>
            <Info.Right
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
          </Info.Content>
        </Info.Wrapper>

        <Info.EditButton>
          <Info.InputButton
            type="submit"
            value="회원정보 수정"
          ></Info.InputButton>
        </Info.EditButton>
      </form>

      {/* <Info.Line src={line.src} />
      <Info.Market>{'마케팅 정보 수신'}</Info.Market>

      <Check.Wrapper>
        <Check.Button onClick={() => handleClick()}>
          <Check.Image src={imageSrc} />
        </Check.Button>
        <Check.Agree>마케팅 정보 수신에 동의합니다.</Check.Agree>
      </Check.Wrapper>

      <Info.Line src={line.src} /> */}

      {/* <Subscribe.Category>
        <Subscribe.Menu $bold={'bold'} onClick={() => setSubscribeInfo(1)}>
          구독 내역
        </Subscribe.Menu>
        <Subscribe.Menu
          $bold={'notBold'}
          onClick={() => handleSubscribeClick(2)}
        >
          구매 내역
        </Subscribe.Menu>
        <Subscribe.Menu
          $bold={'notBold'}
          onClick={() => handleSubscribeClick(3)}
        >
          옷장 수거 내역
        </Subscribe.Menu>
        <Subscribe.Menu
          $bold={'notBold'}
          onClick={() => handleSubscribeClick(4)}
        >
          정산 내역
        </Subscribe.Menu>
      </Subscribe.Category> */}

      {/* <Subscribe.Nav>
        <Subscribe.LineStraight src={lineStraight.src} />
        <Subscribe.Selected>
          <Subscribe.MenuWrapper>
            {subscribeInfo === 1 && (
              <Subscribe.LineSelected src={lineSelected.src} />
            )}
          </Subscribe.MenuWrapper>
          <Subscribe.MenuWrapper>
            {subscribeInfo === 2 && (
              <Subscribe.LineSelected src={lineSelected.src} />
            )}
          </Subscribe.MenuWrapper>
          <Subscribe.MenuWrapper>
            {subscribeInfo === 3 && (
              <Subscribe.LineSelected src={lineSelected.src} />
            )}
          </Subscribe.MenuWrapper>
          <Subscribe.MenuWrapper>
            {subscribeInfo === 4 && (
              <Subscribe.LineSelected src={lineSelected.src} />
            )}
          </Subscribe.MenuWrapper>
        </Subscribe.Selected>
      </Subscribe.Nav> */}

      {/* <Membership.Category>
        <Membership.Menu>상태</Membership.Menu>
        <Membership.Menu>멤버쉽 종류</Membership.Menu>
        <Membership.Menu>결제 날짜</Membership.Menu>
        <Membership.Menu>만료 날짜</Membership.Menu>
        <Membership.Menu>결제 금액</Membership.Menu>
      </Membership.Category>
      <Membership.Line src={line.src} />
      {isSubscribed ? (
        <div>
          <div>
            {history.map((item, index) => (
              <Membership.Info key={index}>
                <Membership.InfoWrapper>
                  <Membership.InfoMenu>
                    <Membership.State>
                      <Membership.Sub>
                        {item.subscribeState == 'APPROVED'
                          ? '구독 중'
                          : '만료됨'}
                      </Membership.Sub>
                      {item.subscribeState == 'APPROVED' ? (
                        <Membership.Point src={approved.src} />
                      ) : (
                        <Membership.Point src={expired.src} />
                      )}
                    </Membership.State>
                  </Membership.InfoMenu>
                  <Membership.InfoMenu>
                    리픽 {item.subscribeType} 구독
                  </Membership.InfoMenu>
                  <Membership.InfoMenu>{item.createdDate}</Membership.InfoMenu>
                  <Membership.InfoMenu>{item.expireDate}</Membership.InfoMenu>
                  <Membership.InfoMenu>
                    {item.subscribeType == 'BASIC' ? '9,540 원' : '15,540 원'}
                  </Membership.InfoMenu>
                </Membership.InfoWrapper>
              </Membership.Info>
            ))}
          </div>
        </div>
      ) : (
        <Membership.Info>
          <Membership.Wrap>
            <Membership.No>구독 내역이 없어요</Membership.No>
            <Membership.AddButton
              onClick={() => router.push('/mypage/subscribe')}
            >
              <Button content="멤버쉽 구독하러 가기" num="3" />
            </Membership.AddButton>
          </Membership.Wrap>
        </Membership.Info>
      )}

      {isSubscribed ? (
        <>
          <Membership.Line src={line.src} />
          <Membership.WithDraw onClick={() => router.push('/mypage/subscribe')}>
            구독제 변경하기
          </Membership.WithDraw>
        </>
      ) : (
        <Membership.NoneLine src={line.src} />
      )} */}
    </Container>
  );
}

export default page;

const Container = styled.div`
  margin-bottom: 100px;
`;

const Error = styled.div`
  color: rgba(255, 61, 0, 1);
  font-size: 20px;
  margin-left: 3px;
  margin-right: 0;
`;

const Info = {
  Wrapper: styled.div`
    margin-top: 120px;
    ::placeholder {
      color: var(--3, #b4b4b4);
    }
  `,
  Title: styled.div`
    color: var(--1, #111);
  `,
  User: styled.div`
    font-size: 24px;
    font-weight: 600;
    margin-top: 20px;
    margin-bottom: 80px;
  `,
  Line: styled.img`
    margin-top: 60px;
  `,
  Market: styled.p`
    color: var(--1, #111);
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    margin-bottom: 40px;
    margin-top: 20px;
  `,
  Content: styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 18px;
  `,
  Left: styled.div`
    font-size: 20px;
    width: 207px;
    display: flex;
    .star {
      color: rgba(255, 61, 0, 1);
    }
  `,
  Right: styled.input`
    width: 436px;
    height: 56px;
    background-color: rgba(232, 232, 232, 1);
    border-radius: 15px;
    border: none;
    color: var(--2, #5f5f5f);
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
    padding: 0px 0px 0px 24px;
    outline: none;
    font-family: Pretendard;

    &.address {
      width: 308px;
    }

    &.detail-address {
      margin-bottom: 18px;
      margin-left: 206px;
    }
  `,
  EditButton: styled.div`
    display: flex;
    justify-content: center;
    margin-top: 52px;
    margin-bottom: 30px;
  `,
  InputButton: styled.input`
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
    line-height: 140%;
  `,
  Mypage: styled.div`
    font-size: 36px;
    font-weight: 600;
  `,
};

const Bank = {
  Wrapper: styled.div`
    display: flex;
    gap: 24px;
  `,
  Content: styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
  `,
  Name: styled.div`
    font-size: 20px;
    display: flex;

    .star {
      color: rgba(255, 61, 0, 1);
    }
  `,
  Input: styled.input`
    width: 120px;
    height: 56px;
    background-color: rgba(232, 232, 232, 1);
    border-radius: 15px;
    border: none;
    font-size: 20px;

    color: var(--2, #5f5f5f);

    font-weight: 600;

    //color: rgba(180, 180, 180, 1);
    padding: 0px 0px 0px 24px;
    outline: none;
    &.address {
      width: 308px;
    }

    &.detail-address {
      margin-bottom: 18px;
      margin-left: 206px;
    }
  `,
};

const Address = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Content: styled.div`
    display: flex;
    margin-bottom: 18px;
  `,
  Wrap: styled.div`
    display: flex;
    align-items: center;
  `,
  Confirm: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    background: var(--3, #b4b4b4);
    width: 104px;
    height: 56px;
    border: none;
    font-weight: 600;
    font-size: 16px;
    margin-left: 24px;
  `,
};

const Check = {
  Wrapper: styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  `,
  Button: styled.div`
    margin-right: 10px;
    cursor: pointer;
  `,
  Image: styled.img``,
  Agree: styled.p`
    color: var(--2, #5f5f5f);
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
    .star {
      color: rgba(255, 61, 0, 1);
    }
  `,
};

const Subscribe = {
  Category: styled.div`
    width: 100%;
    display: flex;
    margin-top: 24px;
    margin-bottom: 24px;
    justify-content: space-evenly;
  `,
  Menu: styled.p<{ $bold: string }>`
    width: 135px;
    text-align: center;
    cursor: pointer;
    font-size: 16px;
    font-weight: ${(props) => (props.$bold == 'bold' ? '600' : '400')};
    color: ${(props) => (props.$bold == 'bold' ? '#111' : '#5F5F5F')};
  `,
  Nav: styled.div`
    margin-bottom: 20px;
    position: relative;
  `,
  Selected: styled.div`
    position: absolute;
    top: 0;
    display: flex;
    justify-content: space-evenly;
    width: 100%;
  `,
  LineStraight: styled.img``,
  LineSelected: styled.img``,
  MenuWrapper: styled.div`
    width: 134px;
  `,
};

const Membership = {
  Category: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
  `,
  Menu: styled.p`
    width: 140px;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
  `,
  Info: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 16px;
    font-weight: 400;
    color: var(--2, #5f5f5f);
    margin-top: 24px;
  `,
  InfoWrapper: styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
  `,
  InfoMenu: styled.div`
    width: 150px;
    text-align: center;
  `,
  Line: styled.img`
    margin-top: 24px;
  `,
  Wrap: styled.div``,
  AddButton: styled.div`
    margin-bottom: 61px;
  `,
  WithDraw: styled.p`
    width: 100%;
    text-align: end;
    margin-top: 24px;
    margin-bottom: 148px;
    color: var(--2, #5f5f5f);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
  `,
  Sub: styled.div`
    font-size: 16px;
    font-weight: 600;
  `,
  Point: styled.img`
    margin-left: 4px;
  `,
  State: styled.div`
    display: flex;
    justify-content: center;
  `,
  NoneLine: styled.img`
    margin-bottom: 194px;
  `,
  No: styled.p`
    color: var(--2, #5f5f5f);
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    margin-bottom: 24px;
  `,
};
