import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

function ContentBodyImage({
  src,
  content,
  w,
  h,
}: {
  src: string;
  content: string;
  w: number;
  h: number;
}) {
  return (
    <ImageWrapper>
      <Image src={src} alt="Picture of me" width={w} height={h} />
      <ImageBody>{content}</ImageBody>
    </ImageWrapper>
  );
}

export default ContentBodyImage;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ImageBody = styled.div`
  margin-top: 24px;
  width: 288px;
`;
