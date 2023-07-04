import React from 'react';
import logo from '@/assets/images/loco.svg';
import styled from 'styled-components';

function Footer() {
  return (
    <Container>
      <Wrapper>
        <Content>
          <P>
            <Bold>{'헬프 센터'}</Bold>
            <Bold> {'운영 정책'}</Bold>
            <Bold>{'ABOUT US'}</Bold>
          </P>
          <N>
            <I>
              <Info>{'공지 사항'}</Info>
              <Info>{'자주 하는 질문'}</Info>
              <Info>{'1:1 문의'}</Info>
              <Info>{'고객 센터'}</Info>
            </I>
            <I>
              <Info>{'이용 약관'}</Info>
              <Info>{'개인정보 처리 방침'}</Info>
            </I>
            <I>
              <Info>{'회사 소개'}</Info>
              <Info>{'서비스 가이드'}</Info>
              <Info>{'인재 채용'}</Info>
            </I>
          </N>
        </Content>
        <Logo src={logo.src} />
        <Do>
          {
            '(주)Repick 대표: 이도현 사업자 등록 번호: 23579349109535 전화번호 23579-34910-9535(평일 9:00 - 17:00)'
          }
          <br />
          {
            '이메일: repick@naver.com 서울 마포구 홍익대학교 T동 창업지원실 (평일 9:00 - 17:00)'
          }
        </Do>
        <CopyRight>
          {'Copyright (c) 2023 Repick 리픽 All rights Reserved.'}
        </CopyRight>
      </Wrapper>
      <App>
        <Down>{'Repick 앱 다운로드'}</Down>
        <W>
          <A>{'IOS App Store'}</A>
          <A>{'Android'}</A>
        </W>
      </App>
    </Container>
  );
}

export default Footer;

const Container = styled.div`
  background-color: rgba(246, 246, 246, 1);
  width: 1920px;
  height: 364px;
  display: flex;
`;
const Wrapper = styled.div`
  margin-top: 53px;
  margin-left: 352px;
`;
const Content = styled.div`
  display: flex;
`;
const App = styled.div``;
const Bold = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: var(--1, #111);
  margin-bottom: 8px;
`;
const Info = styled.div`
  margin-right: 24px;
  font-size: 16px;
  color: rgba(95, 95, 95, 1);
`;

const I = styled.div`
  display: flex;
  margin-bottom: 8px;
  margin-left: 24px;
`;
const P = styled.div`
  display: flex;
  flex-direction: column;
`;
const N = styled.div``;
const Logo = styled.img`
  width: 106px;
  height: 33px;
  margin-top: 30px;
`;
const Do = styled.div`
  font-size: 14px;
  line-height: 150%;
  color: rgba(95, 95, 95, 1);
`;
const CopyRight = styled.div`
  font-size: 14px;
  margin-top: 19px;
  color: rgba(95, 95, 95, 1);
`;
const Down = styled.div`
  font-size: 19px;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: -0.5px;
  margin-top: 53px;
  margin-bottom: 12px;
`;
const A = styled.div`
  border-radius: 15px;
  background: var(--3, #b4b4b4);
  display: flex;
  width: 140px;
  height: 48px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  color: rgba(232, 232, 232, 1);
  font-weight: 600;
  font-size: 16px;
  margin-right: 18px;
`;
const W = styled.div`
  display: flex;
`;
