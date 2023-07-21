import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

function ContentBodyImage({ src }: { src: string }) {
  return (
    <ImageWrapper>
      <Image src={src} alt="Picture of me" width={308} height={308} />
      {/* <ImageBody>{content}</ImageBody> */}
    </ImageWrapper>
  );
}

export default ContentBodyImage;

const ImageWrapper = styled.div`
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // justify-content: center;
`;
const ImageBody = styled.div`
  margin-top: 24px;
  width: 288px;
`;
