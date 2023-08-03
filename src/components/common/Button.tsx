import React from 'react';
import styled, { css } from 'styled-components';

function Button({ content, num }: { content: string; num: string }) {
  return <Show $num={num}>{content}</Show>;
}

export default Button;

const Show = styled.button<{
  $num: string;
}>`
  border: none;
  display: flex;
  padding: 24px 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;

  ${(props) =>
    (props.$num == '1' && //배경 : 회색, 글씨 : 주황
      css`
        width: 517px;
        height: 80px;
        background: var(--4, #e8e8e8);
        color: var(--serve-color, #ff8a00);
      `) ||
    (props.$num == '2' && //배경 : 회색, 글씨 : 검정
      css`
        width: 517px;
        height: 80px;
        background: var(--4, #e8e8e8);
        color: var(--1, #111);
      `) ||
    (props.$num == '3' &&
      css`
        width: 310px;
        height: 60px;
        background: var(--1, #111);
        color: var(--4, #e8e8e8);
      `) ||
    (props.$num == '4' &&
      css`
        width: 360px;
        height: 60px;
        background: var(--1, #111);
        color: var(--4, #e8e8e8);
      `) ||
    (props.$num == '5' && //배경 : 회색, 글씨 : 주황
      css`
        width: 360px;
        height: 60px;
        background: var(--4, #e8e8e8);
        color: var(--serve-color, #ff8a00);
      `) ||
    (props.$num == '6' && //배경 : 회색, 글씨 : 검정
      css`
        width: 360px;
        height: 60px;
        background: var(--4, #e8e8e8);
        color: var(--1, #111);
      `) ||
    (props.$num == '7' &&
      css`
        width: 391px;
        height: 60px;
        background: var(--1, #111);
        color: var(--4, #e8e8e8);
      `) ||
    (props.$num == '8' && //배경 : 회색, 글씨 : 진한 회색
      css`
        width: 360px;
        height: 60px;
        background: var(--4, #e8e8e8);
        color: #5f5f5f;
      `)}
`;
