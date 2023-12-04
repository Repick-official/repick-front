import React from 'react';
import { styled } from 'styled-components';
import check_off from '@/assets/images/check/off.svg';
import check_on from '@/assets/images/check/on.svg';
import { flexCenter, flexColumn } from '@/styles/theme';
import { useRouter } from 'next/navigation';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';

function WardrobeOption({
  routerPath,
  title,
  contents,
  imgSrc,
}: {
  routerPath: string;
  title: string;
  contents: string;
  imgSrc: StaticImageData;
}) {
  const router = useRouter();
  const createMarkup = (text: string) => ({ __html: text });
  return (
    <div>
      <Choice.Wrapper>
        <Check>
          <Off src={check_off.src} />
          <On src={check_on.src} onClick={() => router.push(routerPath)} />
        </Check>
        <Choice.Background>
          <div>
            <Image src={imgSrc} alt="Wardrobe Image" width={376} height={360} />
          </div>
        </Choice.Background>
        <Choice.InfoTitle>{title}</Choice.InfoTitle>
        <Choice.InfoContent dangerouslySetInnerHTML={createMarkup(contents)} />
      </Choice.Wrapper>
    </div>
  );
}

export default WardrobeOption;

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
