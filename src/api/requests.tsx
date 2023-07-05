export const registerUser = async (
  email: string,
  name: string,
  nickname: string,
  password: string
) => {
  const data = {
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
