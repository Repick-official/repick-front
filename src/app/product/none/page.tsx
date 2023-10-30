'use client';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import Success from '@/components/common/Success';
import { keyword } from '@/atom/states';
import { useEffect } from 'react';

function page() {
  const [text, setText] = useRecoilState(keyword);
  useEffect(() => {
    return () => {
      setText('');
    };
  }, []);
  return (
    <Container>
      <Success
        mainText="검색 결과가 없어요!"
        subText1="검색 결과가 없어요."
        subText2="검색 키워드를 다시 한 번 확인해주세요."
        ishome={false}
        icon="none"
      />
    </Container>
  );
}

export default page;

const Container = styled.div``;
