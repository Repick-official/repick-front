import React from 'react';
import MyPickNavigation from '@/components/mypick/MyPickNavigation';
import { styled } from 'styled-components';
import '../globals.css';

type Props = {
  children: React.ReactNode;
};

function MyPickLayout({ children }: Props) {
  return (
    <div>
      <div className = "mypick_wrapper">
        <MyPickNavigation />
        <div className=  "content">{children}</div>
      </div>
    </div>
  );
}

export default MyPickLayout;