'use client';
import MyPickNavigation from '@/components/mypick/MyPickNavigation';
import { styled } from 'styled-components';

type Props = {
  children: React.ReactNode;
};

function MyPickLayout({ children }: Props) {
  return (
    <div>
      <div className="mypick_wrapper">
        <Nav>
          <MyPickNavigation />
        </Nav>
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default MyPickLayout;

const Nav = styled.div`
  margin-top: 146px;
`;
