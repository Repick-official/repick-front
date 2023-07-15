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

export const subscribePlan = async (access: any) => {
  const response = await fetch(process.env.API_URL + '/subscribe/request', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access}`,
    },
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
