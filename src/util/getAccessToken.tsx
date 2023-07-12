import { refreshAccessToken } from '@/api/requests';
const getAccessToken = async (cookies : any,setCookie : any) => {
  if (!cookies.access) {
    const response = await refreshAccessToken(cookies.refresh);
    const expiresDate = new Date();
    expiresDate.setTime(expiresDate.getTime() + 5 * 60 * 1000);
    setCookie('access',response.access,{expires : expiresDate});
    return response.access;
  }
  else{
    return cookies.access;
  }
};

export default getAccessToken;