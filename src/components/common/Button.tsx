import React from 'react';
import styled from 'styled-components';

function Button({ content }: { content: string }) {
  return <Show>{content}</Show>;
}

export default Button;

const Show = styled.button`
  border: none;
  display: flex;
  width: 360px;
  height: 60px;
  padding: 24px 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background: var(--1, #111);
  color: var(--4, #e8e8e8);
  font-weight: 600;
  font-size: 16px;
`;
