'use client';
import wardrobe_apply from '@/assets/images/wardrobe/fix_wardrobe.png';
import wardrobe_arrange from '@/assets/images/wardrobe/wardrobe_arrange.png';
import { flexCenter, flexColumn } from '@/styles/theme';
import { styled } from 'styled-components';
import WardrobeOption from '@/components/wardrobe/WardrobeOption';
import type { StaticImageData } from 'next/image';
import WardrobeTitle from '@/components/wardrobe/WardrobeTitle';

function page() {
  const wardrobeApplyImage: StaticImageData = wardrobe_apply;
  const wardrobeArrangeImage: StaticImageData = wardrobe_arrange;

  return (
    <Container>
      {/* <Title.Wrapper>
        <Title.Name>옷장 정리</Title.Name>
        <Title.Semi>
          리픽이 직접 옷을 수거해드려요! 어디로 가면 될까요?
        </Title.Semi>
      </Title.Wrapper> */}
      <WardrobeTitle
        title="옷장 정리"
        contents="리픽이 직접 옷을 수거해드려요! 어디로 가면 될까요?"
      />
      <Content.Wrapper>
        <Content.Wrap>
          <WardrobeOption
            routerPath="/wardrobe/register"
            title="옷장 정리 신청하기"
            contents="신청한 리픽백에 옷을 담아 문 앞에 놓으면 리픽이 직접 <br /> 옷을 수거한 후 자체 검수와 위탁을 통해 새로운 주인에게 <br /> 판매될 수 있도록 해요."
            imgSrc={wardrobeApplyImage}
          />

          <WardrobeOption
            routerPath="/wardrobe/current"
            title="나의 옷장 정리 현황보기"
            contents="내가 지금까지 리픽에 올린 판매 품목 및 <br /> 정산 내역을 확인하고
            현재 리픽에 올라간 내 옷들이 <br /> 거래되었는지 확인할 수 있어요"
            imgSrc={wardrobeArrangeImage}
          />
        </Content.Wrap>
      </Content.Wrapper>
    </Container>
  );
}

export default page;

const Container = styled.div``;

const Content = {
  Wrapper: styled.div`
    ${flexColumn}
    align-items: center;
    margin-top: 60px;
  `,
  Wrap: styled.div`
    display: flex;
    width: 1104px;
    justify-content: space-between;
  `,
};

const Choice = {
  Wrapper: styled.div`
    ${flexColumn}
    align-items: center;
  `,
  Background: styled.div`
    ${flexCenter}
    width: 540px;
    height: 400px;
    background: ${(props) => props.theme.colors.black};
    border-radius: 15px;
  `,
  ApplyImage: styled.img`
    width: 376px;
    height: 360px;
  `,
  ArrangeImage: styled.img`
    width: 417px;
    height: 334px;
  `,
  InfoTitle: styled.div`
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    margin-top: 23px;
    margin-bottom: 9px;
  `,
  InfoContent: styled.div`
    font-size: 16px;
    font-weight: 400;
    text-align: center;
    line-height: 140%;
    width: 355px;
    height: 66px;
    margin-bottom: 151px;
  `,
};

const Check = styled.div`
  position: relative;
`;
const Off = styled.img`
  width: 40px;
  height: 40px;
  margin-bottom: 20px;
`;
const On = styled.img`
  width: 40px;
  height: 40px;
  margin-bottom: 20px;
  position: absolute;
  top: 0px;
  left: 0px;
  display: none;
  ${Check}:hover & {
    display: block;
  }
`;
