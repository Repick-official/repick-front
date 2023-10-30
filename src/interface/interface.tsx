export interface Product {
  brand: string;
  detail: string;
  discountRate: null;
  mainImageFile: {
    imagePath: string;
    imageKey: string;
    isMainImage: boolean;
  };
  name: string;
  price: number;
  productId: number;
  productState: string;
  size: string;
}

export interface SlideInDivProps {
  inview: string;
}

export interface ButtonType {
  content: string;
  num: string;
}

export interface HomeFitProduct {
  homeFittingId: number;
  product: {
    brand: string;
    detail: string;
    size: string;
    price: number;
    name: string;
    mainImageFile: {
      imagePath: string;
    };
    productId: number;
  };
  isChecked: boolean;
}

export interface UserInfoType {
  id: number;
  userEmail: string;
  userNickname: string;
}

export interface CategoryType {
  id: number;
  name: string;
  parentId: number;
  parentName: string;
}

export interface CategoryMap {
  [key: number]: CategoryType[];
}

export interface CategoryMap2 {
  [key: number]: CategoryType;
}

export interface DetailProduct {
  productId: number;
  name: string;
  size: string;
  detail: string;
  brand: string;
  price: number;
  mainImageFile: {
    imagePath: string;
  };
  detailImageFiles: [
    {
      imagePath: string;
    },
  ];
  categoryInfoList: [
    {
      parentCategoryName: string;
      categoryName: string;
    },
  ];
}

export interface SuccessType {
  mainText: string;
  subText1: string;
  subText2: string;
  ishome: boolean;
  icon: string;
}

export interface ContentBodyInfoProps {
  id?: number;
  src: string;
  tagName: string;
  size: string;
  name: string;
  price: number | null;
}

export interface ItemHeartInfoType {
  seeing: number;
  heart: number;
}
