'use client';
import { atom } from 'recoil';

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
