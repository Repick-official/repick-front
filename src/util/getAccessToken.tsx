import { refreshAccessToken } from '@/api/requests';
const getAccessToken = async (cookies: any, setCookie: any) => {
  if (!cookies.access) {
    if (!cookies.refresh) {
      localStorage.removeItem('recoil-persist');
      alert('로그인 해주세요.');
      location.href = '/';
    } else {
      const response = await refreshAccessToken(cookies.refresh);
      const expiresDate = new Date();
      expiresDate.setTime(expiresDate.getDate() + 1);
      setCookie('access', response.access, { expires: expiresDate, path: '/' });
      return response.access;
    }
  } else {
    return cookies.access;
  }
};

export default getAccessToken;
