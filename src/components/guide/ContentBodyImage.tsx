import styled from 'styled-components';
import Image from 'next/image';

function ContentBodyImage({ src }: { src: string }) {
  return (
    <ImageWrapper>
      <Image src={src} alt="Picture of me" width={308} height={308} />
    </ImageWrapper>
  );
}

export default ContentBodyImage;

const ImageWrapper = styled.div``;
const ImageBody = styled.div`
  margin-top: 24px;
  width: 288px;
`;
