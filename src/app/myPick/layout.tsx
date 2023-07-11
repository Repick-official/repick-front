import React from 'react';
import MyPickNavigation from '@/components/mypick/MyPickNavigation';

type Props = {
  children: React.ReactNode;
};

function MyPickLayout({ children }: Props) {
  return (
    <div>
      <MyPickNavigation />
      <div>{children}</div>
    </div>
  );
}

export default MyPickLayout;
