import React from 'react';
import styled from 'styled-components';

function Button({
  content,
  back,
  color,
  width,
  height,
}: {
  back: string;
  content: string;
  color: string;
  width: string;
  height: string;
}) {
  return (
    <Show back={back} color={color} width={width} height={height}>
      {content}
    </Show>
  );
}

export default Button;

const Show = styled.button<{
  back: string;
  color: string;
  width: string;
  height: string;
}>`
  border: none;
  display: flex;
  width: ${(props) =>
    props.width === '517'
      ? '517px'
      : props.width === '391'
      ? '391px'
      : props.width === '360'
      ? '360px'
      : '310px'}
  height: ${(props) => (props.width === '80' ? '80px' : '60px')}
  padding: 24px 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background: ${(props) => (props.back === 'gray' ? '#E8E8E8' : '#111')}
  color: ${(props) =>
    props.color === 'orange'
      ? '#FF8A00'
      : props.color === 'black'
      ? '#111'
      : '#E8E8E8'}
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
`;
