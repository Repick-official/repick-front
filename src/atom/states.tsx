'use client';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export const selectedMypickPage = atom<string>({
  key: '마이픽 현황',
  default: '마이픽 현황',
});

export const selectedNavPage = atom<string>({
  key: '서비스 가이드',
  default: '서비스 가이드',
});

export const selectedSubscribePlan = atom<string>({
  key: 'Basic',
  default: 'Basic',
});

export const userInfoState = atom({
  key : 'userInfo',
  default : {
    id : 0,
    userEmail : '',
    userNickname: ''
  },
  effects_UNSTABLE: [persistAtom],
})