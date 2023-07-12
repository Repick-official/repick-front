export const registerUser = async (
  address: {
    detailAddress: string;
    mainAddress: string;
    zipCode: string;
  },
  email: string,
  name: string,
  nickname: string,
  password: string
) => {
  const data = {
    address: address,
    email: email,
    name: name,
    nickname: nickname,
    password: password,
  };

  const response = await fetch(process.env.API_URL + '/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    const responseData = await response;
    return { success: true, data: responseData };
  } else {
    const responseData = await response.json();
    return { success: false, data: responseData };
  }
};

export const refreshAccessToken = async (refresh : any) =>{
  const data = {
    refresh: refresh,
  };
  const response = await fetch(process.env.API_URL + '/sign/oauth/kakao?code=', {
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

export const kakaoLogin = async (code : any) =>{
  console.log(process.env.API_URL+`/oauth/kakao?code=${code}`);
  const response = await fetch(process.env.API_URL+`/oauth/kakao?code=${code}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    const data = await response.json();
    console.log(data);
    return data;
  }
};