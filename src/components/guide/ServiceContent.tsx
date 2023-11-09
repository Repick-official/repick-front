import React from 'react';
import { styled, css, keyframes } from 'styled-components';
import small_logo from '@/assets/images/guide/small_logo.svg';
import Image from 'next/image';

function ServiceContent({
  titleText,
  contentPosition,
  content,
  description,
}: {
  titleText: string;
  contentPosition: string;
  content: string;
  description: string;
}) {
  const createMarkup = (text: string) => ({ __html: text });
  return (
    <>
      <Content.Title>
        <Image
          src={small_logo}
          alt="Small Logo"
          style={{ width: '31px', height: '31px' }}
        />
        <Content.TitleText>{titleText}</Content.TitleText>
      </Content.Title>
      <Content.Sub
        $contentPosition={contentPosition}
        dangerouslySetInnerHTML={createMarkup(content)}
      />
      <Content.Description
        dangerouslySetInnerHTML={createMarkup(description)}
      />
    </>
  );
}

const Content = {
  Title: styled.div`
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
  `,
  TitleText: styled.p`
    color: ${(props) => props.theme.colors.main};
    font-feature-settings:
      'clig' off,
      'liga' off;
    /* Header3 24pt sb */
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 36px */
  `,
  Sub: styled.p<{ $contentPosition?: string }>`
    ${(props) =>
      (props.$contentPosition == 'left' &&
        css`
          text-align: left;
        `) ||
      (props.$contentPosition == 'right' &&
        css`
          text-align: right;
        `)};
    color: ${(props) => props.theme.colors.black};
    font-family: Pretendard;
    font-size: 48px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
    font-feature-settings:
      'clig' off,
      'liga' off;
  `,

  Description: styled.p`
    margin-top: 18px;
    text-align: right;
    color: ${(props) => props.theme.colors.black};
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 155.5%;
    font-feature-settings:
      'clig' off,
      'liga' off;
  `,
};

export default ServiceContent;
