import React from 'react';
import { styled } from 'styled-components';

function WardrobeTitle({
  title,
  contents,
}: {
  title: string;
  contents: string;
}) {
  return (
    <div>
      <Title.Wrapper>
        <Title.Name>{title}</Title.Name>
        <Title.Semi>{contents}</Title.Semi>
      </Title.Wrapper>
    </div>
  );
}

export default WardrobeTitle;

const Title = {
  Wrapper: styled.div`
    margin-top: 120px;
  `,
  Name: styled.div`
    font-size: 36px;
    font-weight: 600;
    line-height: 140%;
  `,
  Semi: styled.div`
    font-size: 20px;
    font-weight: 400;
  `,
};
