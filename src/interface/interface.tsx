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

export interface DetailProduct {
  //detail/[...slug] 참고
}
