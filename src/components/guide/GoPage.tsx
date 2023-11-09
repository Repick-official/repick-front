import React from 'react';
import { selectedNavPage } from '@/atom/states';
import { styled } from 'styled-components';
import { flexCenter, flexColumn } from '@/styles/theme';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';

function GoPage({
  page,
  routerPath,
  content,
}: {
  page: string;
  routerPath: string;
  content: string;
}) {
  const router = useRouter();

  const [selectedPage, setSelectedPage] =
    useRecoilState<string>(selectedNavPage);

  const go = ({ page, routerPath }: { page: string; routerPath: string }) => {
    setSelectedPage(page);
    router.push(routerPath);
  };

  return (
    <>
      <WardrobeBtn onClick={() => go({ page, routerPath })}>
        <WardrobeP>{content}</WardrobeP>
      </WardrobeBtn>
    </>
  );
}

const WardrobeBtn = styled.div`
  ${flexCenter}
  width: 495.5px;
  height: 20px;
  overflow: hidden;
  padding: 45.406px 75.677px;
  border-radius: 28.379px;
  background: ${(props) => props.theme.colors.black};
  flex-direction: column;
  gap: 18.919px;
  cursor: pointer;
  margin-top: 20px;
`;
const WardrobeP = styled.div`
  color: ${(props) => props.theme.colors.lightgray};
  font-family: Pretendard;
  font-size: 30.271px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  text-align: center;
  font-feature-settings:
    'clig' off,
    'liga' off;
`;

export default GoPage;
