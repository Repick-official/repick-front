'use client';
import React from 'react';
import styled from 'styled-components';

function page() {
  return (
    <Container>
      <R>
        <Title>
          <Register>{'리픽 회원가입'}</Register>
          <Welcome>{'반가워요! 리픽에 오신 것을 환영해요'}</Welcome>
        </Title>
        <Line />

        <User>{'회원 정보'}</User>
        <Wrapper>
          <Info>{'이름'}</Info>
          <Content />
        </Wrapper>
        <Wrapper>
          <Info>{'전화번호'}</Info>
          <Content />
        </Wrapper>
        <Wrapper>
          <Info>{'이메일'}</Info>
          <Content />
        </Wrapper>
        <Wrapper>
          <Info>{'주소'}</Info>
          <Content placeholder="우편번호를 검색해주세요" />
        </Wrapper>
        <Wrapper>
          <Info>{'아이디'}</Info>
          <Content placeholder="숫자, 영문 대소문자만 사용 가능합니다" />
        </Wrapper>
        <Wrapper>
          <Info>{'비밀번호'}</Info>
          <Content placeholder="숫자, 영문 대소문자, 특수부호만 사용 가능합니다" />
        </Wrapper>
        <Wrapper>
          <Info>{'비밀번호 확인'}</Info>
          <Content placeholder="숫자, 영문 대소문자, 특수부호만 사용 가능합니다" />
        </Wrapper>
      </R>
    </Container>
  );
}

export default page;

const Container = styled.div`
  overflow: scroll;
`;
const R = styled.div`
  margin-top: 120px;
  margin-left: 352px;
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
const Line = styled.div``;
const Info = styled.div`
  font-size: 20px;
  width: 207px;
`;
const User = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-top: 80px;
  margin-bottm: 40px;
`;
const Content = styled.input`
  width: 460px;
  height: 56px;
  background-color: rgba(232, 232, 232, 1);
  border-radius: 15px;
  border: none;
  font-size: 20px;
  font-weight: 400;
  color: rgba(180, 180, 180, 1);
  padding-left: 24px;
  outline: none;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 18px;
`;
