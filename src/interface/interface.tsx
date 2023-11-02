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

export interface WardrobeRegisterType {
  name: string;
  phoneNumber: string;
  bank: {
    accountNumber: string;
    bankName: string;
  };
  address: {
    detailAddress: string;
    mainAddress: string;
    zipCode: string;
  };
  bagQuantity: number;
  productQuantity: number;
  returnDate: string;
  requestDetail: string;
  id: number;
  sellState: string;
}

export interface ReturnDateType {
  M: {
    $D?: number;
    $H?: number;
    $L?: string;
    $M?: number;
    $W?: number;
    $d?: {};
    $isDayjsObject?: boolean;
    $m?: number;
    $ms?: number;
    $s?: number;
    $u?: undefined;
    $x?: {};
    $y?: number;
  };
}

export interface SearchModalProps {
  clickModal: (event?: React.MouseEvent) => void;
}

export interface AddressType {
  address: string;
  addressType: string;
  bname: string;
  buildingName: string;
  zonecode: string;
}

export interface AsyncFunction {
  (access: string): Promise<Product[]>;
}
