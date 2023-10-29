import { DefaultTheme, css } from 'styled-components';

const theme: DefaultTheme = {
  colors: {
    main: '#FF8A00',
    pointred: '#FF3D00',
    pointyellow: '#DDFF0E',
    gray: '#B4B4B4',
    lightgray: '#E8E8E8',
    darkgray: '#5F5F5F',
    black: '#111111',
    white: '#ffffff',
    orange: '#EA0000',
  },
};
const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const flexBetween = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

export { theme, flexCenter, flexBetween, flexColumn };
