'use client';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import check_off from '@/assets/images/check/off.svg';
import check_on from '@/assets/images/check/on.svg';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SubscribePlan from '@/components/mypage/SubscribePlan';
import { selectedSubscribePlan } from '@/atom/states';
import { useRecoilState } from 'recoil';
import { subscribePlan, getUserInfo } from '@/api/requests';
import { useCookies } from 'react-cookie';
import getAccessToken from '@/util/getAccessToken';

function page() {
  const router = useRouter();

  const [select, setSelect] = useState(false);

  const [selectPlan, setSelectPlan] = useRecoilState(selectedSubscribePlan);

  const [imageSrc, setImageSrc] = useState(check_off.src);
  const [isClicked, setIsClicked] = useState(false);

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');

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

  useEffect(() => {
    const get = async () => {
      let accessToken = await getAccessToken(cookies, setCookie);
      const res = await getUserInfo(accessToken);
      setName(res.name);
      setPhoneNumber(res.phoneNumber);
      setBankName(res.bank.bankName);
      setAccountNumber(res.bank.accountNumber);
      setAddress(res.address?.mainAddress);
      setEmail(res.email);

      console.log('res', res);
    };
    get();
  }, []);

  const subscribeHandler = async () => {
    if (isClicked) {
      let accessToken = await getAccessToken(cookies, setCookie);

      if (
        name &&
        phoneNumber &&
        bankName &&
        accountNumber &&
        address &&
        email
      ) {
        const response = await subscribePlan(accessToken, selectPlan);
        if (response.success) {
          router.push('/mypage/success');
        }
      } else {
        const userConfirmation = window.confirm(
          '마이페이지에 필요한 정보가 모두 들어가 있지 않습니다. 마이페이지로 이동하시겠습니까?'
        );
        if (userConfirmation) {
          router.push('/mypage');
        }
      }
    } else {
      alert('결제에 동의 해주세요');
    }
  };

  return (
    <Container>
      <Title>{'리픽 멤버십 구독 결제'}</Title>
      <SemiTitle>
        {'리픽 멤버십 구독을 통해 온라인 제품을 홈피팅 후 옷을 구매해보세요!'}
      </SemiTitle>

      {selectPlan === 'BASIC' ? (
        <SubscribePlan
          plan={'Basic Plan'}
          price={'15,900원'}
          discounted={'월 9,540원'}
        />
      ) : (
        <SubscribePlan
          plan={'Pro Plan'}
          price={'25,900원'}
          discounted={'월 15,540원'}
        />
      )}

      <Notice>
        <li>{'맴버십 구매에 따른 공지문입니다.'}</li>
        <li>{'따로 기획팀과 의논해 추가할 예정입니다.'}</li>
        <li>{'한 세 줄 정도로 가정하고 만들었습니다.'}</li>
      </Notice>

      <Agree>
        <Check onClick={() => handleClick()}>
          <Off src={imageSrc} />
        </Check>
        <div className="agree">{'매월 정기 결제에 동의합니다.'}</div>
      </Agree>
      <div className="button">
        <div onClick={() => router.push('/mypage/subscribe')}>
          <Button content="뒤로 가기" num="4" />
        </div>
        <div onClick={() => subscribeHandler()}>
          <Button content="결제 하기" num="4" />
        </div>
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
    display: flex;
    width: 744px;
    justify-content: space-between;
    margin-top: 70px;
    margin-bottom: 148px;
  }
`;
const Title = styled.div`
  font-size: 36px;
  font-weight: 600;
  margin-top: 120px;
  text-align: center;
`;
const SemiTitle = styled.div`
  font-size: 20px;
  font-weight: 400;
  text-align: center;
`;
const Wrapper = styled.div`
  display: flex;
  margin-top: 60px;
`;
const Box = styled.div`
  border-radius: 15px;
  background: var(--5, #fff);
  box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.16);
  width: 1216px;
  height: 260px;
`;
const Content = styled.div`
  margin-left: 101px;
  margin-top: 42px;
`;
const Plan = styled.div`
  font-weight: 600;
  font-size: 24px;
`;
const Price = styled.div`
  font-weight: 600;
  font-size: 48px;
`;
const Discount = styled.div`
  font-weight: 600;
  font-size: 48px;
`;
const Info = styled.div`
  font-weight: 400;
  font-size: 16px;
  margin-top: 30px;
`;

const DiscountWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
  position: relative;
`;
const PriceWrapper = styled.div`
  display: flex;
  margin-left: 24px;
`;
const Tax = styled.div`
  font-weight: 600;
  font-size: 20px;
  margin-top: 30px;
  margin-left: 12px;
`;
const Line = styled.div`
  width: 204px;
  height: 5px;
  background: var(--unnamed, #ff3d00);
  position: absolute;
`;
const Notice = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  margin-top: 60px;
`;
const Check = styled.div``;
const Off = styled.img`
  margin-bottom: 24px;
`;
const On = styled.img`
  margin-bottom: 24px;
`;
const Agree = styled.div`
  display: flex;

  margin-top: 102px;
  .agree {
    font-size: 24px;
    font-weight: 600;
    margin-left: 24px;
  }
`;
