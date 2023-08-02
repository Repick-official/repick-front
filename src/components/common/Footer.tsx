import logo from '@/assets/images/navigation/logo.svg';
import styled from 'styled-components';

function Footer() {
  return (
    <Container>
      <Wrapper.Wrap>
        <Wrapper.Content>
          <Content.Wrapper>
            <Content.Help>
              <Content.Bold>{'헬프 센터'}</Content.Bold>
              <Content.Bold> {'운영 정책'}</Content.Bold>
            </Content.Help>
            <Content.InfoWrapper>
              <Content.InfoWrap>
                <Content.Info>{'자주 하는 질문'}</Content.Info>
                <Content.Info>{'1:1 문의'}</Content.Info>
              </Content.InfoWrap>
              <Content.InfoWrap>
                <Content.Info>{'개인정보 처리 방침'}</Content.Info>
              </Content.InfoWrap>
            </Content.InfoWrapper>
          </Content.Wrapper>
          <Logo src={logo.src} />
          <Do>
            {'Repick | 대표 : 이도현 | 개인정보담당자 : 서찬혁'}
            <br />
            {
              '메일: repick.official@gmail.com | 주소 : 서울 마포구 홍익대학교 산학협력단 Startup Lounge 1F (평일 9:00 - 17:00) | TEL : 010-2890-9773'
            }
          </Do>
          <CopyRight>
            {'Copyright (c) 2023 Repick 리픽 All rights Reserved.'}
          </CopyRight>
        </Wrapper.Content>
      </Wrapper.Wrap>
    </Container>
  );
}

export default Footer;

const Container = styled.div``;

const Wrapper = {
  Wrap: styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
    background-color: rgba(246, 246, 246, 1);
    height: 364px;
    margin-top: auto;
  `,
  Content: styled.div`
    width: 1216px;
    margin-top: 53px;
  `,
};

const Content = {
  Wrapper: styled.div`
    display: flex;
  `,
  Help: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Bold: styled.div`
    font-size: 16px;
    font-weight: 600;
    color: var(--1, #111);
    margin-bottom: 8px;
    line-height: 140%;
  `,
  InfoWrapper: styled.div``,
  InfoWrap: styled.div`
    display: flex;
    margin-bottom: 8px;
    margin-left: 24px;
  `,
  Info: styled.div`
    margin-right: 24px;
    font-size: 16px;
    color: rgba(95, 95, 95, 1);
    line-height: 140%;
  `,
};

const Logo = styled.img`
  width: 106px;
  height: 33px;
  margin-top: 60px;
`;
const Do = styled.div`
  font-size: 14px;
  line-height: 150%;
  color: rgba(95, 95, 95, 1);
  line-height: 140%;
`;
const CopyRight = styled.div`
  font-size: 14px;
  margin-top: 19px;
  color: rgba(95, 95, 95, 1);
  line-height: 140%;
`;
