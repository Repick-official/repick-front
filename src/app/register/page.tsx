'use client';
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Button from '@/components/common/Button';
// import line from '@/assets/images/line.svg';
import { useRouter } from 'next/navigation';

function page() {
  return (
    <Container>
      <R>
        <Title>
          <Register>{'리픽 회원가입'}</Register>
          <Welcome>{'반가워요! 리픽에 오신 것을 환영해요'}</Welcome>
        </Title>
        <Line src={line.src} />
        <User>{'회원 정보'}</User>
        <Wrapper>
          <Info>
            {'이름'}
            <div className="star">{'*'}</div>
          </Info>
          <Content />
        </Wrapper>
        <Wrapper>
          <Info>
            {'전화번호'}
            <div className="star">{'*'}</div>
          </Info>
          <Content />
          <Confirm>{'본인인증'}</Confirm>
        </Wrapper>
        <Wrapper>
          <Info>
            {'이메일'}
            <div className="star">{'*'}</div>
          </Info>
          <Content />
        </Wrapper>
        <Wrapper>
          <Info>
            {'주소'}
            <div className="star">{'*'}</div>
          </Info>
          <Content className="address" placeholder="우편번호를 검색해주세요" />
          <Confirm>{'우편번호'}</Confirm>
        </Wrapper>
        <Address>
          <Content className="detail-address" />
          <Content
            className="detail-address"
            placeholder="상세 주소를 입력해주세요"
          />
        </Address>
        <Wrapper>
          <Info>
            {'아이디'}
            <div className="star">{'*'}</div>
          </Info>
          <Content placeholder="숫자, 영문 대소문자만 사용 가능합니다" />
        </Wrapper>
        <Wrapper>
          <Info>
            {'비밀번호'}
            <div className="star">{'*'}</div>
          </Info>
          <Content placeholder="숫자, 영문 대소문자, 특수부호만 사용 가능합니다" />
        </Wrapper>
        <Wrapper>
          <Info>
            {'비밀번호 확인'}
            <div className="star">{'*'}</div>
          </Info>
          <Content placeholder="숫자, 영문 대소문자, 특수부호만 사용 가능합니다" />
        </Wrapper>
        <Register></Register>
      </R>
      <div className="button">
        <Button content="가입하기" num="4" />
      </div>
    </Container>
  );
}

export default page;

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
const Line = styled.img`
  margin-top: 60px;
`;
const Address = styled.div`
  display: flex;
  flex-direction: column;
`;
