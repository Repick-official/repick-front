'use client';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { HomeFitProduct, UserInfoType } from '@/interface/interface';

const { persistAtom } = recoilPersist();

export const keyword = atom<string>({
  key: '키워드',
  default: '어떤 의류를 찾고 계신가요?',
  effects_UNSTABLE: [persistAtom],
});

export const searchedlastProductId = atom<number>({
  key: '검색 마지막 productId',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const selectedMypickPage = atom<string>({
  key: '마이픽 현황',
  default: '마이픽 현황',
});

export const selectedNavPage = atom<string>({
  key: '서비스 가이드',
  default: '서비스 가이드',
});

export const selectedSubscribePlan = atom<string>({
  key: 'BASIC',
  default: 'BASIC',
});

export const userInfoState = atom<UserInfoType>({
  key: 'userInfo',
  default: {
    id: 0,
    userEmail: '',
    userNickname: '',
  },
  effects_UNSTABLE: [persistAtom],
});

export const requestProducts = atom<HomeFitProduct[]>({
  key: 'products',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
