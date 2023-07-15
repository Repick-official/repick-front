export const getMainPageProducts = async () => {
  try {
    const response = await fetch(
      process.env.API_URL + '/products/main-page/recommendations',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Error fetching poll types');
    }
  } catch (error) {
    // 에러 처리
    console.error(error);
    throw error;
  }
};

export const getDetailPageProducts = async (productId: any) => {
  try {
    const response = await fetch(
      process.env.API_URL + `/products/detail/${productId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Error fetching poll types');
    }
  } catch (error) {
    // 에러 처리
    console.error(error);
    throw error;
  }
};

export const subscribePlan = async (access: any, plan: string) => {
  const data = {
    subscribeType: plan,
  };
  const response = await fetch(process.env.API_URL + '/subscribe/request', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access}`,
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    return { success: true };
  } else {
    return { success: false };
  }
};

export const refreshAccessToken = async (refresh: any) => {
  const data = {
    refresh: refresh,
  };
  const response = await fetch(process.env.API_URL + '/oauth/kakao?code=', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

export const kakaoLogin = async (code: any) => {
  console.log(process.env.API_URL + `/oauth/kakao?code=${code}`);
  const response = await fetch(
    process.env.API_URL + `/oauth/kakao?code=${code}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

export const pickupWardrobe = async (
  access: any,
  name: string,
  phoneNumber: string,
  bank: {
    accountNumber: string;
    bankName: string;
  },
  address: {
    detailAddress: string;
    mainAddress: string;
    zipCode: string;
  },
  bagQuantity: 0,
  productQuantity: 0,
  requestDetail: string,
  returnDate: string
) => {
  const data = {
    name: name,
    phoneNumber: phoneNumber,
    bank: bank,
    address: address,
    bagQuantity: bagQuantity,
    productQuantity: productQuantity,
    requestDetail: requestDetail,
    returnDate: returnDate,
  };

  const response = await fetch(process.env.API_URL + '/sell', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access}`,
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    return { success: true };
  } else {
    return { success: false };
  }
};
