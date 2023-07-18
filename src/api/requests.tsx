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

      const clothes = data.map((item: any) => {
        if (item.brand == null) {
          item.brand = 'NO BRAND';
          return item;
        } else return item;
      });
      return clothes;
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

      if (data.brand == null) {
        data.brand = 'NO BRAND';
        return data;
      } else return data;
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
  bagQuantity: number,
  productQuantity: number,
  returnDate: string
) => {
  const data = {
    name: name,
    phoneNumber: phoneNumber,
    bank: bank,
    address: address,
    bagQuantity: bagQuantity,
    productQuantity: productQuantity,
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

export const getCategories = async () => {
  try {
    const response = await fetch(process.env.API_URL + '/products/category', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
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

export const putMypick = async (access: any, productId: any) => {
  try {
    const response = await fetch(
      process.env.API_URL + `/cart/my-pick/${productId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access}`,
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

export const inquiryMypick = async (access: any) => {
  try {
    const response = await fetch(process.env.API_URL + `/cart/my-pick`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access}`,
      },
    });
    if (response.ok) {
      const data = await response.json();

      const clothes = data.map((item: any) => {
        if (item.product.brand == null) {
          item.product.brand = 'NO BRAND';
          return item;
        } else return item;
      });
      return clothes;
    } else {
      throw new Error('Error fetching poll types');
    }
  } catch (error) {
    // 에러 처리
    console.error(error);
    throw error;
  }
};
