import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

function ContentBodyImage({ src, content }: { src : string ,content: string }) {
  return (
    <ImageWrapper>
      <Image
        src={src}
        alt="Picture of me"
        width={200}  
        height={200}  
      />
      <ImageBody>
        {content}
      </ImageBody>
    </ImageWrapper>
  );
}

export default ContentBodyImage;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const ImageBody = styled.div`
  margin-top : 24px;
  width:288px;
`