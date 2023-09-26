'use client';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import ContentBodyInfo from '@/components/guide/ContentBodyInfo';
import check_off from '@/assets/images/check/off.svg';
import check_on from '@/assets/images/check/on.svg';
import not from '@/assets/images/mypick/not.png';
import getAccessToken from '@/util/getAccessToken';
import Alert from '@/components/mypick/Alert';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { selectedMypickPage } from '@/atom/states';
import { useRecoilState } from 'recoil';
import { useCookies } from 'react-cookie';
import { requestProducts } from '@/atom/states';
import { selectedNavPage } from '@/atom/states';
import {
  inquiryMypick,
  applyHomeFitting,
  getIsSubscribe,
  deleteProducts,
  getUserInfo,
} from '@/api/requests';
import { flexBetween, flexCenter, flexColumn } from '@/styles/theme';

function page() {
  const router = useRouter();

  const [selectedPage, setSelectedPage] = useRecoilState(selectedMypickPage);
  const [selectedNaviPage, setSelectedNaviPage] =
    useRecoilState(selectedNavPage);
  const [finalProducts, setFinalProducts] = useRecoilState(requestProducts);

  const [cookies, setCookie, removeCookie] = useCookies();

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [mainAddress, setMainAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [email, setEmail] = useState('');

  const [selectAll, setSelectAll] = useState('전체 선택');
  const [products, setProducts] = useState<any[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [btn, setBtn] = useState(0);
  const [cartProducts, setCartProducts] = useState<any[]>([]);

  useEffect(() => {
    const get = async () => {
      let accessToken = await getAccessToken(cookies, setCookie);
      const response = await inquiryMypick(accessToken);

      const res = await getUserInfo(accessToken);
      setName(res.name);
      setPhoneNumber(res.phoneNumber);
      setBankName(res.bank?.bankName);
      setAccountNumber(res.bank?.accountNumber);
      setZipCode(res.address?.zipCode);
      setMainAddress(res.address?.mainAddress);
      setDetailAddress(res.address?.detailAddress);
      setEmail(res.email);
      const clothes = response.map((item: any) => {
        return { ...item, isClicked: false };
      });
      setProducts(clothes);
    };
    get();
    const areAllSelected = products.every((product) => product.isClicked);
    setSelectAll(areAllSelected ? '전체 선택' : '전체 선택 해제');
  }, []);

  const clickModal = () => setShowAlert(!showAlert);

  const handleClick = (productId: number) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((item) =>
        item.product.productId === productId
          ? { ...item, isClicked: !item.isClicked }
          : item
      );

      const areAllProductsSelected = updatedProducts.every(
        (product) => product.isClicked
      );
      setSelectAll(areAllProductsSelected ? '전체 선택 해제' : '전체 선택');

      return updatedProducts;
    });
  };

  const handleApply = async () => {
    const selectedProducts = products.filter((item) => item.isClicked);

    const newCartProducts = [
      ...cartProducts,
      ...selectedProducts.map((item) => item.cartProductId),
    ];

    setCartProducts(newCartProducts);
    handle(newCartProducts);
  };

  const handle = async (selectedProducts: any) => {
    let accessToken = await getAccessToken(cookies, setCookie);
    const response = await getIsSubscribe(accessToken);

    if (selectedProducts.length <= 0) {
      alert('신청할 제품을 선택해주세요.');
    } else {
      if (response == 'NONE') {
        setShowAlert(!showAlert);
        setText1('멤버십 구독 회원만 이용 가능한 서비스입니다.');
        setText2('리픽 멤버십을 구독하시겠어요?');
        setBtn(3);
      } else if (response == 'BASIC') {
        if (selectedProducts.length > 3) {
          setCartProducts([]);
          setShowAlert(!showAlert);
          setText1('베이직 멤버십 회원은 3벌까지만 입어볼 수 있어요!');
          setText2('프로 플랜 멤버십으로 바꾸시겠어요?');
          setBtn(2);
        } else {
          if (
            name &&
            phoneNumber &&
            bankName &&
            accountNumber &&
            zipCode &&
            mainAddress &&
            detailAddress &&
            email
          ) {
            handleHomeFitting(selectedProducts);
          } else {
            const userConfirmation = window.confirm(
              '마이페이지에 필요한 정보가 모두 들어가 있지 않습니다. 마이페이지로 이동하시겠습니까?'
            );
            if (userConfirmation) {
              router.push('/mypage');
            } else {
              setCartProducts([]);
            }
          }
        }
      } else {
        if (selectedProducts.length > 5) {
          setCartProducts([]);
          setShowAlert(!showAlert);
          setText1('홈피팅은 한 번에 최대 5벌까지만 가능해요.');
          setText2('5벌 홈피팅 완료 후 다시 신청해주세요.');
          setBtn(1);
        } else {
          if (
            name &&
            phoneNumber &&
            bankName &&
            accountNumber &&
            zipCode &&
            mainAddress &&
            detailAddress &&
            email
          ) {
            handleHomeFitting(selectedProducts);
          } else {
            const userConfirmation = window.confirm(
              '마이페이지에 필요한 정보가 모두 들어가 있지 않습니다. 마이페이지로 이동하시겠습니까?'
            );
            if (userConfirmation) {
              setSelectedNaviPage('');
              router.push('/mypage');
            } else {
              setCartProducts([]);
            }
          }
        }
      }
    }
  };

  const handlePurchase = async () => {
    const selectedProducts = products.filter((item) => item.isClicked);
    if (selectedProducts.length > 0) {
      // const confirm = window.confirm('홈피팅 하지 않고 바로 구매하시겠습니까?');
      // if (confirm) {
      selectedProducts.forEach((item) => goPurchase(selectedProducts));
      //}
    } else {
      alert('구매할 제품을 선택해주세요.');
    }
  };

  const handleHomeFitting = async (selectedProducts: any) => {
    const userConfirmation = window.confirm(
      '마이페이지에 저장되어 있는 정보로 홈피팅이 신청됩니다. 홈피팅을 신청하시겠습니까?'
    );
    if (userConfirmation) {
      let accessToken = await getAccessToken(cookies, setCookie);
      const response = await applyHomeFitting(accessToken, selectedProducts);
      setSelectedPage('홈피팅');
      router.push('/myPick/home/homefitting/success');
    } else {
      const confirm = window.confirm(
        '마이페이지로 이동해 정보를 수정하시겠습니까?'
      );
      if (confirm) {
        setSelectedNaviPage('');
        router.push('/mypage');
      } else {
        setCartProducts([]);
      }
    }
  };

  const goPurchase = (selectedProducts: any) => {
    setSelectedPage('구매하기');
    setFinalProducts(selectedProducts);
    router.push('/myPick/shopping/purchase');
  };

  const handleProduct = () => {
    setSelectedNaviPage('제품 보기');
    router.push('/product');
  };

  const handleClickAll = () => {
    const areAllProductsSelected = products.every(
      (product) => product.isClicked
    );

    const updatedProducts = products.map((product) => {
      return { ...product, isClicked: !areAllProductsSelected };
    });

    setProducts(updatedProducts);

    setSelectAll(!areAllProductsSelected ? '전체 선택 해제' : '전체 선택');
  };

  const handleClickDelete = async () => {
    const selectedProducts = products.filter((item) => item.isClicked);
    if (selectedProducts.length <= 0) {
      alert('신청할 제품을 선택해주세요.');
    } else {
      const confirmDelete = confirm('선택한 제품을 삭제할까요?');
      if (confirmDelete) {
        const accessToken = await getAccessToken(cookies, setCookie);
        const deletePromises = selectedProducts.map(async (item) => {
          const response = await deleteProducts(
            accessToken,
            item.cartProductId
          );
          return response;
        });

        const updatedProducts = await Promise.all(deletePromises);

        setProducts((prevProducts) => {
          const remainingProducts = prevProducts.filter(
            (item) => !item.isClicked
          );
          return remainingProducts;
        });
      }
    }
  };

  return (
    <Container.Wrapper>
      <Container.Semi>
        <Content.Wrapper>
          <Content.Pick>
            <Content.Title>내가 픽한제품</Content.Title>
            {products.length > 0 ? (
              <Content.Filter>
                <Content.Delete onClick={() => handleClickDelete()}>
                  선택 상품 삭제
                </Content.Delete>
                <Content.Clear onClick={() => handleClickAll()}>
                  {selectAll}
                </Content.Clear>
              </Content.Filter>
            ) : (
              <></>
            )}
          </Content.Pick>

          <Products.Wrapper>
            {products.length > 0 ? (
              products.map((item) => (
                <Products.Content key={item.product.productId}>
                  <Products.Check
                    onClick={() => handleClick(item.product.productId)}
                  >
                    <Products.Button
                      src={item.isClicked ? check_on.src : check_off.src}
                    />
                  </Products.Check>
                  <div
                    key={item.product.productId}
                    onClick={() =>
                      router.push(`/product/detail/${item.product.productId}`)
                    }
                  >
                    <ContentBodyInfo
                      key={item.product.productId}
                      src={item.product.mainImageFile.imagePath}
                      tagName={item.product.brand}
                      size={item.product.size}
                      name={item.product.name}
                      price={item.product.price}
                    />
                  </div>
                </Products.Content>
              ))
            ) : (
              <Not.Container>
                <Not.Wrapper>
                  <Not.Icon src={not.src} />
                  <Not.Title>아직 픽한 제품이 없어요</Not.Title>
                  <Not.Content>
                    제품 보기에서 마음에 드는 제품을 선택해 <br /> 마이픽에
                    담아주세요!
                  </Not.Content>
                </Not.Wrapper>
              </Not.Container>
            )}
          </Products.Wrapper>

          <Container.Button>
            {products.length > 0 ? (
              <>
                {/* <div onClick={() => handleApply()}>
                  <Button content="홈피팅 신청하기" num="5" />
                </div> */}
                {showAlert && (
                  <Alert
                    text1={text1}
                    text2={text2}
                    button={btn}
                    clickModal={clickModal}
                  />
                )}
                <div onClick={() => handlePurchase()}>
                  <Button content="구매하기" num="6" />
                </div>
              </>
            ) : (
              <Not.Container>
                <div onClick={() => handleProduct()}>
                  <Button content="제품 보러가기" num="8" />
                </div>
              </Not.Container>
            )}
          </Container.Button>
        </Content.Wrapper>
      </Container.Semi>
    </Container.Wrapper>
  );
}

export default page;

const Not = {
  Container: styled.div`
    width: 1216px;
    display: flex;
    justify-content: center;
  `,
  Wrapper: styled.div`
    ${flexColumn}
    ${flexCenter}
    margin-top: 20px;
  `,
  Icon: styled.img`
    margin-bottom: 22px;
  `,
  Title: styled.div`
    color: ${(props) => props.theme.colors.black};
    text-align: center;
    font-size: 36px;
    font-weight: 600;
    line-height: 140%;
  `,
  Content: styled.div`
    color: ${(props) => props.theme.colors.black};
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    line-height: 140%;
  `,
};

const Container = {
  Wrapper: styled.div`
    ${flexColumn}
    align-items: center;
  `,
  Semi: styled.div`
    width: 1216px;
  `,
  Button: styled.div`
    ${flexCenter}
    width: 744px;
    margin-bottom: 148px;
  `,
};
const Content = {
  Wrapper: styled.div`
    ${flexColumn}
    align-items: center;
  `,
  Pick: styled.div`
    ${flexBetween}
    width: 1216px;
    margin-top: 104px;
    margin-bottom: 40px;
  `,
  Title: styled.div`
    font-size: 24px;
    font-weight: 600;
  `,
  Filter: styled.div`
    font-size: 16px;
    font-weight: 400;
    color: ${(props) => props.theme.colors.darkgray};
    display: flex;
  `,
  Delete: styled.div``,
  Clear: styled.div`
    margin-left: 54px;
  `,
};

const Products = {
  Wrapper: styled.div`
    width: 1216px;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 70px;
    gap: 17px;
  `,
  Content: styled.div`
    ${flexColumn}
    align-items: center;
    margin-top: 20px;
  `,

  Check: styled.div`
    margin-bottom: 20px;
  `,
  Button: styled.img``,
};
