'use client';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';
import { selectedMypickPage } from '@/atom/states';
import { useRecoilState } from 'recoil';
import ContentBodyInfo from '@/components/guide/ContentBodyInfo';
import check_off from '@/assets/images/check/off.svg';
import check_on from '@/assets/images/check/on.svg';
import getAccessToken from '@/util/getAccessToken';
import { useCookies } from 'react-cookie';
import Alert from '@/components/mypick/Alert';
import { requestProducts } from '@/atom/states';
import { selectedNavPage } from '@/atom/states';

import {
  inquiryMypick,
  applyHomeFitting,
  getIsSubscribe,
  deleteProducts,
  getUserInfo,
} from '@/api/requests';
import { NONAME } from 'dns';

function page() {
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useRecoilState(selectedMypickPage);
  const [selectedNaviPage, setSelectedNaviPage] =
    useRecoilState(selectedNavPage);

  const [cookies, setCookie, removeCookie] = useCookies();

  const [products, setProducts] = useState<any[]>([]);

  const [selectAll, setSelectAll] = useState('전체 선택');
  const [finalProducts, setFinalProducts] = useRecoilState(requestProducts);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const get = async () => {
      let accessToken = await getAccessToken(cookies, setCookie);
      const response = await inquiryMypick(accessToken);

      const res = await getUserInfo(accessToken);
      setName(res.name);
      setPhoneNumber(res.phoneNumber);
      setBankName(res.bank.bankName);
      setAccountNumber(res.bank.accountNumber);
      setAddress(res.address.mainAddress);
      setEmail(res.email);

      console.log('res', res);
      const clothes = response.map((item: any) => {
        return { ...item, isClicked: false };
      });
      setProducts(clothes);
    };
    get();
    const areAllSelected = products.every((product) => product.isClicked);
    setSelectAll(areAllSelected ? '전체 선택' : '전체 선택 해제');
  }, []);

  const handleClick = (productId: number) => {
    //상품 클릭
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

  const [showAlert, setShowAlert] = useState(false);
  const clickModal = () => setShowAlert(!showAlert);
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');

  const handleApply = async () => {
    let accessToken = await getAccessToken(cookies, setCookie);
    const response = await getIsSubscribe(accessToken);
    const selectedProducts = products.filter((item) => item.isClicked);
    if (selectedProducts.length <= 0) {
      alert('신청할 제품을 선택해주세요.');
    } else {
      if (response == 'NONE') {
        setShowAlert(!showAlert);
        setText1('멤버십 구독 회원만 이용 가능한 서비스입니다.');
        setText2('리픽 멤버십을 구독하시겠어요?');
      } else if (response == 'BASIC') {
        if (selectedProducts.length > 3) {
          setShowAlert(!showAlert);
          setText1('베이직 멤버십 회원은 3벌까지만 입어볼 수 있어요!');
          setText2('프로 플랜 멤버십으로 바꾸시겠어요?');
        } else {
          //여기서 회원 정보 모두 있는지 확인
          console.log('있음');
          if (
            name &&
            phoneNumber &&
            bankName &&
            accountNumber &&
            address &&
            email
          ) {
            selectedProducts.forEach((item) =>
              handleHomeFitting(item.cartProductId)
            );
          } else {
            const userConfirmation = window.confirm(
              '마이페이지에 필요한 정보가 모두 들어가 있지 않습니다. 마이페이지로 이동하시겠습니까?'
            );
            if (userConfirmation) {
              router.push('/mypage');
            }
          }
        }
      } else {
        if (selectedProducts.length > 5) {
          setShowAlert(!showAlert);
          setText1('홈피팅은 한 번에 최대 5벌까지만 가능해요.');
          setText2('5벌 홈피팅 완료 후 다시 신청해주세요.');
        } else {
          //여기서 회원 정보 모두 있는지 확인
          console.log('있음');
          if (
            name &&
            phoneNumber &&
            bankName &&
            accountNumber &&
            address &&
            email
          ) {
            selectedProducts.forEach((item) =>
              handleHomeFitting(item.cartProductId)
            );
          } else {
            const userConfirmation = window.confirm(
              '마이페이지에 필요한 정보가 모두 들어가 있지 않습니다. 마이페이지로 이동하시겠습니까?'
            );
            if (userConfirmation) {
              setSelectedNaviPage(''); // 왜 안 되는거지
              router.push('/mypage');
            }
          }
        }
      }
    }
  };

  const handlePurchase = async () => {
    const selectedProducts = products.filter((item) => item.isClicked);
    if (selectedProducts.length > 0) {
      const confirm = window.confirm('홈피팅 하지 않고 바로 구매하시겠습니까?');
      if (confirm) {
        selectedProducts.forEach((item) => goPurchase(selectedProducts));
      }
    } else {
      alert('구매할 제품을 선택해주세요.');
    }
  };

  const handleHomeFitting = async (Id: any) => {
    const userConfirmation = window.confirm(
      '마이페이지에 저장되어 있는 정보로 홈피팅이 신청됩니다. 홈피팅을 신청하시겠습니까?'
    );

    if (userConfirmation) {
      let accessToken = await getAccessToken(cookies, setCookie);
      const response = await applyHomeFitting(accessToken, Id);
      setSelectedPage('홈피팅');
      router.push('/myPick/home/homefitting/success');
    } else {
      const confirm = window.confirm(
        '마이페이지로 이동해 정보를 수정하시겠습니까?'
      );
      if (confirm) {
        setSelectedNaviPage('');
        router.push('/mypage');
      }
    }
  };

  const goPurchase = (selectedProducts: any) => {
    setSelectedPage('구매하기');

    // 구매하기에 해당 제품 담아야 함.
    // const updatedProducts = [...finalProducts, ...selectedProducts];

    // 합쳐진 배열을 setFinalProducts를 통해 requestProducts에 할당
    setFinalProducts(selectedProducts);

    router.push('/myPick/shopping/purchase');
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

        console.log('de', deletePromises);

        const updatedProducts = await Promise.all(deletePromises);
        // 이제 updatedProducts는 deleteProducts의 응답으로 이루어진 배열입니다.

        // 필요한 경우 응답을 처리할 수 있습니다.
        console.log('up', updatedProducts);

        // 모든 삭제 요청이 해결된 후에 상태를 업데이트합니다.
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
    <Container>
      <SemiContainer>
        <Content>
          <Pick>
            <Title>내가 픽한제품</Title>
            <Filter>
              <Delete onClick={() => handleClickDelete()}>
                선택 상품 삭제
              </Delete>
              <Clear onClick={() => handleClickAll()}>{selectAll}</Clear>
            </Filter>
          </Pick>

          <Products>
            {products.map((item) => (
              <Product key={item.product.productId}>
                <Check onClick={() => handleClick(item.product.productId)}>
                  <Off src={item.isClicked ? check_on.src : check_off.src} />
                </Check>
                <div
                  key={item.product.productId}
                  onClick={() =>
                    router.push(`/product/detail/${item.product.productId}`)
                  }
                >
                  {/* 여기 왜 이동이 안 되는거지? */}
                  <ContentBodyInfo
                    key={item.product.productId}
                    src={item.product.mainImageFile.imagePath}
                    tagName={item.product.brand}
                    size={item.product.size}
                    name={item.product.name}
                    price={item.product.price}
                  />
                </div>
              </Product>
            ))}
          </Products>

          <ButtonWrapper>
            <div onClick={() => handleApply()}>
              <Button content="홈피팅 신청하기" num="5" />
            </div>
            {showAlert && (
              <Alert text1={text1} text2={text2} clickModal={clickModal} />
            )}
            <div onClick={() => handlePurchase()}>
              <Button content="구매하기" num="6" />
            </div>
          </ButtonWrapper>
        </Content>
      </SemiContainer>
    </Container>
  );
}

export default page;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SemiContainer = styled.div`
  width: 1216px;
`;

const Pick = styled.div`
  width: 1216px;
  margin-top: 104px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
`;
const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
`;
const Filter = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: var(--2, #5f5f5f);
  display: flex;
`;
const OnlyProduct = styled.div``;
const Delete = styled.div``;
const Clear = styled.div`
  margin-left: 54px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ButtonWrapper = styled.div`
  display: flex;
  width: 744px;
  justify-content: space-between;
  margin-bottom: 148px;
`;
const Product = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;
const Check = styled.div`
  margin-bottom: 20px;
`;
const On = styled.img``;
const Off = styled.img``;
const Products = styled.div`
  width: 1216px;
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-between;
  margin-bottom: 70px;
  gap: 21px;
`;
