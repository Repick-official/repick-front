import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import ItemHeartInfo from '@/components/guide/ItemHeartInfo';

interface ContentBodyInfoProps {
  src: string;
  tagName: string;
  itemInfo: string;
  price: number;
}

const ContentBodyInfo: React.FC<ContentBodyInfoProps> = ({ src, tagName, itemInfo, price }) => {
  const tagColors: { [key: string]: string } = {
    "나이키 에센셜" : "#5F5F5F",
    "꼼데가르송": "#111",
    "미쏘": "#B4B4B4",
    // 필요한 만큼 추가
  };
  const tagNameColors: { [key: string]: string } = {
    "나이키 에센셜" : "#fff",
    "꼼데가르송": "#fff",
    "미쏘": "#111",
    // 필요한 만큼 추가
  };
  return (
    <ImageWrapper>
      <Image
        src={src}
        alt="Picture of me"
        width={286}  
        height={286}  
      />
      <ImageBody>
        <TagWrapper bgColor={tagColors[tagName]}>
          <TagName textColor = {tagNameColors[tagName]}>
            {tagName}
          </TagName>
        </TagWrapper>
        <ItemInfo>
          {itemInfo}
        </ItemInfo>
        <Price>
          {price.toLocaleString('en-US')}원
        </Price>
        <IconWrapper>
          <ItemHeartInfo
            heart = {0}
            seeing = {0}
          />

        </IconWrapper>
      </ImageBody>
    </ImageWrapper>
  );
}

export default ContentBodyInfo;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const ImageBody = styled.div`
  margin-top : 24px;
`

interface TagWrapperProps {
  bgColor: string;
}

interface TagNameProps{
  textColor : string;
}
const TagWrapper = styled.div<TagWrapperProps>`
  display: inline-flex;
  padding: 2px 24px;
  align-items: flex-start;
  border-radius: 5px;
  background: ${(props) => props.bgColor || '#E8E8E8'}; // bgColor props를 받아서 적용하거나, 값이 없을 경우 기본값으로 #5F5F5F를 사용
`
const TagName = styled.p<TagNameProps>`
  color: ${(props) => props.textColor || '#5F5F5F'};
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`

const ItemInfo = styled.p`
  color: var(--1, #111);
  text-align: center;
  /* Body2 16pt rg */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`

const Price = styled.p`
  color: var(--1, #111);
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%;
`

const IconWrapper = styled.div`
  
`
