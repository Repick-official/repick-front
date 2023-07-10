import React from 'react';
import next_direction from '@/assets/images/guide/next_direction.svg';
import { styled } from 'styled-components';
function ImageDivision() {
  return (
    <>
      <Arrow
        src={next_direction.src}
      />
    </>
  );
}

export default ImageDivision;

const Arrow = styled.img`
  width:40px;
  height:111px;
`