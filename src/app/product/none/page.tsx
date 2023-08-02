'use client';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import none from '@/assets/images/search/none.svg';
import { selectedMypickPage } from '@/atom/states';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import { selectedNavPage } from '@/atom/states';
import Success from '@/components/common/Success';
import { keyword } from '@/atom/states';

function page() {
  const [text, setText] = useRecoilState(keyword);
  useEffect(() => {
    return () => {
      setText('');
    };
  },[])
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
