import styled from 'styled-components';
import Button from '@/components/common/Button';
import registerCheck from '@/assets/images/check/register_check.svg';
import none from '@/assets/images/search/none.svg';
import purchase from '@/assets/images/mypick/purchase.png';
import wardrobe from '@/assets/images/wardrobe/wardrobe.svg';
import { selectedMypickPage } from '@/atom/states';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import { selectedNavPage } from '@/atom/states';
import { SuccessType } from '@/interface/interface';

function Success({ mainText, subText1, subText2, ishome, icon }: SuccessType) {
  const [selectedPage, setSelectedPage] =
    useRecoilState<string>(selectedMypickPage);
  const [selectedNavigationPage, setSelectedNavigationPage] =
    useRecoilState<string>(selectedNavPage);
  const router = useRouter();
  return (
    <Component>
      <Wrapper.Success>
        <Wrapper.Welcome>
          <Wrapper.Icon>
            {icon === 'check' ? (
              <Icon.Check src={registerCheck.src} />
            ) : icon === 'none' ? (
              <Icon.None src={none.src} />
            ) : icon === 'wardrobe' ? (
              <Icon.Wardrobe src={wardrobe.src} />
            ) : (
              <Icon.Purchase src={purchase.src} />
            )}
          </Wrapper.Icon>
          <Wrapper.WelcomeMessage>
            <Text.Main>{mainText}</Text.Main>
            <Text.Sub>
              {subText1}
              <br />
              {subText2}
            </Text.Sub>
          </Wrapper.WelcomeMessage>
        </Wrapper.Welcome>
        <Wrapper.Button>
          {/* <div
            onClick={() => {
              setSelectedPage('마이픽 현황');
              setSelectedNavigationPage('마이픽');
              router.push('/myPick/home');
            }}
          >
            <Button content="마이픽 현황 보기" num="4" />
          </div> */}
          {ishome ? (
            <div
              onClick={() => {
                router.push('/myPick/home/homefitting');
              }}
            >
              <Button content="홈피팅 현황보기" num="4" />
            </div>
          ) : (
            <div
              onClick={() => {
                setSelectedNavigationPage('제품 보기');
                router.push('/product');
              }}
            >
              <Button content="다른 제품 보러가기" num="4" />
            </div>
          )}
        </Wrapper.Button>
      </Wrapper.Success>
    </Component>
  );
}

export default Success;

const Component = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
`;

const Wrapper = {
  Success: styled.div`
    margin-bottom: 158px;
  `,
  Welcome: styled.div`
    margin-bottom: 70px;
  `,

  Icon: styled.div`
    text-align: center;
    margin-bottom: 24px;
  `,
  WelcomeMessage: styled.div``,
  Button: styled.div`
    display: flex;
    justify-content: center;
    // gap: 25px;
  `,
};

const Icon = {
  Check: styled.img`
    width: 108px;
    height: 108px;
    margin-top: 120px;
  `,
  None: styled.img`
    width: 124.256px;
    height: 172px;
    margin-top: 58px;
  `,
  Wardrobe: styled.img`
    width: 118.65px;
    height: 172px;
    margin-top: 60px;
  `,
  Purchase: styled.img`
    width: 348px;
    height: 258px;
    margin-top: 32px;
  `,
};

const Text = {
  Main: styled.div`
    color: #111;
    text-align: center;
    font-size: 36px;
    font-weight: 600;
    line-height: 140%;
    margin-bottom: 20px;
  `,
  Sub: styled.div`
    color: #111;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    line-height: 140%;
  `,
};
