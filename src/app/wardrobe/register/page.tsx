'use client';
import getAccessToken from '@/util/getAccessToken';
import check_off from '@/assets/images/check/off.svg';
import check_on from '@/assets/images/check/on.svg';
import styled from 'styled-components';
import line from '@/assets/images/wardrobe/line.svg';
import bagImage from '@/assets/images/wardrobe/bag.svg';
import arrow7 from '@/assets/images/wardrobe/arrow7.svg';
import arrow6 from '@/assets/images/wardrobe/arrow6.svg';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { pickupWardrobe, getUserInfo } from '@/api/requests';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<HookFormTypes>();

  const router = useRouter();

  const [cookies, setCookie, removeCookie] = useCookies();

  const [useRegisteredAddr, setUseRegisteredAddr] = useState(false);

  const open = useDaumPostcodePopup();

  const [selectedDate, setselectedDate] = useState('');
  const datePickerFormat = 'YYYY-MM-DD';
  const selectedDateChange = (date: any) => {
    const formattedDate = dayjs(date).format(datePickerFormat);
    setValue('returnDate', formattedDate);
  };
  const [formattedDate, setFormattedDate] = useState('');
  useEffect(() => {
    const dateObj = new window.Date();
    dateObj.setDate(dateObj.getDate() + 3);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    setFormattedDate(`${year}-${month}-${day}`);
  });

  useEffect(() => {
    const check = async () => {
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
    };
    check();
  }, []);

  const registerHandler = async (data: HookFormTypes) => {
    const confirm = window.confirm('입력하신 정보로 옷장 신청을 하시겠습니까?');
    if (confirm) {
      let accessToken = await getAccessToken(cookies, setCookie);
      const response = await pickupWardrobe(accessToken, data);
      if (response.success) {
        router.push('/wardrobe/register/success');
      } else {
        alert('오잉');
      }
    }
  };

  const handleUseRegisteredAddrClick = async () => {
    setUseRegisteredAddr(!useRegisteredAddr);
  };
  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    setValue('address.zipCode', data.zonecode);
    setValue('address.mainAddress', fullAddress);
    setValue('address.detailAddress', '');
    //주소값을 상태값으로..
    // setpSignForms((prev: Form) => ({ ...prev, address: fullAddress }));
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    open({ onComplete: handleComplete });
    e.preventDefault();
  };
  return (
    <Container>
      <Title.Wrapper>
        <Title.Name>옷장 정리 신청</Title.Name>
        <Title.Semi>
          리픽이 직접 옷을 수거해드려요! 어디로 가면 될까요?
        </Title.Semi>
      </Title.Wrapper>
      <Info.Line src={line.src} />
      <form onSubmit={handleSubmit(registerHandler)}>
        <Info.User>{'회원 정보'}</Info.User>
        <Info.Wrapper>
          <Info.Info>
            {'이름'}
            <div className="star">{'*'}</div>
          </Info.Info>
          <Info.Content
            required
            {...register('name', {
              pattern: {
                value: /^[a-zA-Z가-힣]+$/,
                message: '*',
              },
            })}
          />
          {errors.name && <Error>{errors.name.message}</Error>}
        </Info.Wrapper>
        <Info.Wrapper>
          <Info.Info>
            {'전화번호'}
            <div className="star">{'*'}</div>
          </Info.Info>
          <Info.Content
            required
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
          />
          {errors.phoneNumber && <Error>{errors.phoneNumber.message}</Error>}
        </Info.Wrapper>
        <Info.Wrapper>
          <Info.Info>
            {'계좌번호'}
            <div className="star">{'*'}</div>
          </Info.Info>
          <Account.Content>
            <Account.Detail>은행</Account.Detail>
            <Info.Content
              required
              className="bank"
              {...register('bank.bankName', {
                pattern: {
                  value: /^[가-힣]+$/,
                  message: '*',
                },
              })}
            />
            {errors.bank?.bankName && (
              <Error>{errors.bank?.bankName.message}</Error>
            )}
            <Account.Detail>계좌번호</Account.Detail>
            <Info.Content
              required
              className="account"
              {...register('bank.accountNumber', {
                pattern: {
                  value: /^[\d-]+$/,
                  message: '*',
                },
              })}
            />
            {errors.bank?.accountNumber && (
              <Error>{errors.bank?.accountNumber.message}</Error>
            )}
          </Account.Content>
        </Info.Wrapper>
        <Info.Line src={line.src} />
        <Info.User>{'내 지역 정보 입력하기'}</Info.User>
        <Area.Content>
          <Area.Wrapper>
            <Info.Wrapper>
              <Info.Info>
                {'정리 의류 예상 수량'}
                <div className="star">{'*'}</div>
              </Info.Info>
              <Area.Count>
                <Info.Content
                  required
                  type="number"
                  className="cloth"
                  placeholder="예상 수량"
                  {...register('bagQuantity', {
                    pattern: {
                      value: /^[\d]+$/,
                      message: '*',
                    },
                  })}
                />
                {errors.bagQuantity && (
                  <Error>{errors.bagQuantity.message}</Error>
                )}
                <Area.Text>벌</Area.Text>
                <Info.Info className="bag">
                  {'필요한 리픽백 수'}
                  <div className="star">{'*'}</div>
                </Info.Info>
                <Info.Content
                  required
                  type="number"
                  className="cloth"
                  placeholder="예상 개수"
                  {...register('productQuantity', {
                    pattern: {
                      value: /^[\d]+$/,
                      message: '*',
                    },
                  })}
                />
                {errors.productQuantity && (
                  <Error>{errors.productQuantity.message}</Error>
                )}
                <Area.Text>개가 필요해요</Area.Text>
              </Area.Count>
            </Info.Wrapper>
            <Info.Wrapper>
              <Info.Info>
                {'방문 주소'}
                <div className="star">{'*'}</div>
              </Info.Info>
              <Apply.Wrapper>
                <Apply.CheckWrapper>
                  <Apply.Check onClick={handleUseRegisteredAddrClick}>
                    <Apply.Button
                      src={useRegisteredAddr ? check_on.src : check_off.src}
                    />
                  </Apply.Check>
                  <Apply.Address>해당 주소 기본 수거지로 등록</Apply.Address>
                </Apply.CheckWrapper>
              </Apply.Wrapper>
            </Info.Wrapper>

            <Address.Content>
              <Address.Wrapper>
                <Address.Wrap>
                  <Info.Content
                    className="address"
                    placeholder="우편 번호"
                    {...register('address.zipCode')}
                    disabled
                  />
                </Address.Wrap>
                <Address.Confirm onClick={handleClick}>
                  {'우편번호'}
                </Address.Confirm>
              </Address.Wrapper>
              <Address.Wrap>
                <Info.Content
                  disabled
                  className="detail-address"
                  placeholder="상세 주소"
                  {...register('address.mainAddress')}
                />
              </Address.Wrap>
              <Address.Wrap>
                <Info.Content
                  className="detail-address"
                  placeholder="상세 주소를 입력해주세요"
                  {...register('address.detailAddress', {
                    pattern: {
                      value: /^[\d가-힣\s]*$/,
                      message: '*',
                    },
                  })}
                />
              </Address.Wrap>
            </Address.Content>
            <Info.Wrapper>
              <Info.Info>
                <Date.Section>
                  <Date.Main>
                    {'원하는 수거 날짜'}
                    <div className="star">{'*'}</div>
                  </Date.Main>
                  <div className="dateInfo">
                    {'신청일로부터 3일 이후 선택 가능'}
                  </div>
                </Date.Section>
              </Info.Info>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="ko"
              >
                <DemoContainer components={['DatePicker']}>
                  <Info.Date
                    format="YYYY / MM / DD"
                    value={selectedDate}
                    slotProps={{
                      textField: {
                        error: false,
                        variant: 'standard',
                        sx: {
                          '& .MuiInputBase-root': {
                            height: '100%',
                            width: '100%',
                          },
                          '&.MuiFormControl-root': {
                            paddingLeft: '12px',
                            paddingRight: '12px',
                          },
                        },
                      },
                    }}
                    minDate={dayjs(formattedDate)}
                    onChange={(newValue: any) => {
                      selectedDateChange(newValue);
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
              {errors.returnDate && <Error>{errors.returnDate.message}</Error>}
            </Info.Wrapper>
            <Info.Wrapper>
              <Info.Info>{'수거 시 기타 요청 사항'}</Info.Info>
              <Info.Content />
            </Info.Wrapper>
          </Area.Wrapper>
          <Area.Wrap>
            <Bag.Confirm>
              <Apply.Check>
                <Bag.Question>?</Bag.Question>
              </Apply.Check>
              <Bag.Text>리픽백 크기 확인하기</Bag.Text>
            </Bag.Confirm>
            <Bag.Container>
              <Bag.Wrapper>
                <Bag.Height>
                  <Bag.CM7>70cm</Bag.CM7>
                  <Bag.Arrow7 src={arrow7.src} />
                  <Bag.Bag src={bagImage.src} />
                </Bag.Height>
                <Bag.Width>
                  <Bag.Arrow6 src={arrow6.src} />
                  <Bag.CM6>60cm</Bag.CM6>
                  <Bag.More>
                    리픽백 한 개에는 티셔츠 <br /> 30벌 정도를 담을 수 있어요
                  </Bag.More>
                </Bag.Width>
              </Bag.Wrapper>
            </Bag.Container>
          </Area.Wrap>
        </Area.Content>
        <div className="button">
          <InputButton type="submit" value="신청하기"></InputButton>
        </div>
      </form>
    </Container>
  );
}

export default page;

const Date = {
  Section: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Main: styled.div`
    display: flex;
  `,
};

const Error = styled.div`
  color: rgba(255, 61, 0, 1);
  font-size: 20px;
  margin-left: 3px;
  margin-right: 0;
`;

const Container = styled.div`
  width: 1216px;
  ::placeholder {
    color: var(--3, #b4b4b4);
  }
  .star {
    color: rgba(255, 61, 0, 1);
  }
  .dateInfo {
    font-size: 14px;
    margin-top: 3px;
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
const Title = {
  Wrapper: styled.div`
    margin-top: 120px;
  `,
  Name: styled.div`
    font-size: 36px;
    font-weight: 600;
    line-height: 140%;
  `,
  Semi: styled.div`
    font-size: 20px;
    font-weight: 400;
  `,
};

const Account = {
  Content: styled.div`
    display: flex;
    align-items: center;
  `,
  Detail: styled.div`
    font-size: 20px;
    font-weight: 400;
    margin-right: 12px;
  `,
};

const Area = {
  Content: styled.div`
    display: flex;
  `,
  Wrapper: styled.div``,
  Wrap: styled.div`
    margin-left: 135px;
  `,
  Count: styled.div`
    display: flex;
    align-items: center;
  `,
  Text: styled.div`
    font-size: 20px;
    font-weight: 400;
    margin-left: 12px;
  `,
};

const Address = {
  Content: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Wrapper: styled.div`
    display: flex;
  `,
  Wrap: styled.div`
    display: flex;
    align-items: center;
  `,
  Confirm: styled.button`
    border-radius: 15px;
    background: var(--3, #b4b4b4);
    width: 104px;
    height: 56px;
    border: none;
    font-weight: 600;
    font-size: 16px;
    margin-left: 24px;
    cursor: pointer;
  `,
};

const Apply = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
  `,
  CheckWrapper: styled.div`
    display: flex;
    align-items: center;
    &.date {
      margin-top: 16px;
      margin-bottom: 18px;
    }
  `,
  Check: styled.div`
    width: 28px;
    height: 28px;
    border-radius: 15px;
    background: var(--4, #e8e8e8);
  `,
  Address: styled.div`
    font-size: 20px;
    font-weight: 600;
    margin-left: 10px;
    color: var(--2, #5f5f5f);

    &.am {
      margin-right: 12px;
    }
  `,
  Button: styled.img``,
};

const Info = {
  Wrapper: styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 18px;
  `,
  Line: styled.img`
    margin-top: 60px;
  `,
  User: styled.div`
    font-size: 24px;
    font-weight: 600;
    margin-top: 20px;
    margin-bottom: 40px;
  `,
  Info: styled.div`
    font-size: 20px;
    width: 207px;
    display: flex;
    &.bag {
      width: 153px;
      margin-left: 24px;
    }
  `,
  Content: styled.input`
    width: 436px;
    height: 56px;
    background-color: rgba(232, 232, 232, 1);
    border-radius: 15px;
    border: none;
    font-size: 20px;
    font-weight: 400;
    color: var(--2, #5f5f5f);

    font-weight: 600;
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
  `,
  Date: styled(DatePicker)`
    width: 436px;
    height: 56px;
    background-color: rgba(232, 232, 232, 1);
    border-radius: 15px;
    border: none;
    font-size: 20px;
    font-weight: 400;
    color: var(--2, #5f5f5f);
    padding: 0 12px 0 12px;
    font-weight: 600;
    outline: none;
  `,
};

const Bag = {
  Wrapper: styled.div`
    margin-top: 27px;
  `,
  Text: styled.div`
    font-size: 20px;
    margin-left: 17px;
  `,
  Confirm: styled.div`
    display: flex;
    margin-bottom: 14px;
  `,

  Container: styled.div`
    width: 310px;
    height: 278px;
    border-radius: 16px;
    background: var(--4, #e8e8e8);
    display: flex;

    position: relative;

    overflow: hidden;
    transition: height 0.3s ease;
  `,
  Bag: styled.img`
    width: 135px;
    height: 142px;
  `,
  Arrow7: styled.img`
    margin-left: 6.94px;
    margin-right: 12.06px;
  `,
  Arrow6: styled.img`
    margin-top: 12px;
  `,
  Height: styled.div`
    display: flex;
    align-items: center;
    margin-left: 31px;
  `,
  Width: styled.div`
    margin-left: 78px;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  CM7: styled.div`
    font-size: 16px;
    font-weight: 400;
  `,
  CM6: styled.div`
    font-size: 16px;
    font-weight: 400;
  `,
  Question: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 28px;
    font-size: 20px;
  `,
  More: styled.div`
    font-size: 16px;
    font-weight: 400;
    text-align: center;
    margin-top: 3px;
    line-height: 140%;
  `,
};

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
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  border: none;
`;
