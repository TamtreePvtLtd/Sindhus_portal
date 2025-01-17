export interface ICateringPage {
  id: string;
  menuTitle?: string;
  title: string;
  description: string;
  image: string;
  trayItems: { name: string; price: string }[];
}

export interface IOurServices {
  id: number;
  iconkey: string;
  title: string;
  description: string;
}

export interface IProductCardList {
  categoryId: any;
  _id: string;
  title: string;
  posterURL: string;
  description?: string;
  netWeight?: number;
  itemSizeWithPrice: itemSizeWithPrice[] | null;
  dailyMenuSizeWithPrice: DailyMenuSizeWithPrice[] | null;
  availability: string;
}

export interface DailyMenuSizeWithPrice {
  size: string;
  price: number;
  _id: string;
}
export interface itemSizeWithPrice {
  size: string;
  price: number;
  _id: string;
}

export interface IMenuList {
  _id: string;
  title: string;
  menuType: number;
}

export interface IWhyChooseUs {
  id: number;
  // imageicon: string;
  title: string;
  description: string;
  image: string;
}

export interface IProductDropDownData {
  _id: string;
  title: string;
  posterURL: string;
}

export interface IProductDetail {
  product: IProduct;
}

export interface IProduct {
  _id: string;
  title: string;
  price?: number;
  itemSizeWithPrice: IPrice[];
  images: string[];
  servingSizeDescription: string;
  posterURL?: string;
  cateringMenuSizeWithPrice: IPrice[];
  dailyMenuSizeWithPrice: IPrice[];
  description?: string;
  netWeight?: number;
  createdAt?: Date;
  updatedAt?: Date;
  availability?: string;
}

export interface IPrice {
  size: string;
  price: number;
  quantity?: number;
  _id: string;
}

export interface ISpecials {
  data: ISpecial[];
  success: boolean;
  statusCode: number;
}

export interface ISpecial {
  _id: string;
  images: string[];
}

export interface ICateringEnquiry {
  _id?: string;
  fullName: string;
  email: string;
  typeOfEvent?: string;
  guestCount?: number;
  mobileNumber: string;
  message?: string;
  eventDate: string;
}
// export interface IMenu {
//   mainMenuIds: string[];
//   subMenuIds: any[];
// }

export interface ICategory {
  _id: string;
  title: string;
  image?: string;
  products?: IProduct[];
}
export interface ICategoryTitleDispay {
  menuDatas: ICategory;
}
export interface ICategoryWithProducts {
  menuDatas: IMenuDatas;
}

export interface IMenuDatas {
  _id?: string;
  title?: string;
  image?: string;
  menuType?: number;
  products?: IProductDinnigOut[];
}
export interface menuWithProduct {
  menus: IMenuDatas[],
  MenusWithProduct: { title: string; products: IProduct[] }[];
}

export interface IMenuDatastype {
  menus: IMenuDatastype1[];
  _id: string;
  title: string;
  image: string;
  menuType: number;
  products: IProductDinnigOut[];
}
export interface IMenuDatastype1 {
  _id: string;
  title: string;
}

export interface IProductDinnigOut {
  _id: string;
  title: string;
  posterURL: string;
  description: string;
  netWeight: number;
  price: number | null;
  dailyMenuSizeWithPrice: DailyMenuSizeWithPrice[] | null;
  itemSizeWithPrice: ItemSizeWithPrice[] | null;
}

export interface DailyMenuSizeWithPrice {
  size: string;
  price: number;
  _id: string;
}
export interface ItemSizeWithPrice {
  size: string;
  price: number;
  _id: string;
}
export interface ICommonResponse<T> {
  data: T;
  statusCode: number;
  success: boolean;
}

export interface ISnacksPage {
  subMenus: ISubMenu[];
  products: ISnackProduct[];
}

export interface ISnackProduct {
  _id: string;
  title: string;
  posterURL: string;
  price: number | null;
  subMenuId: string;
  servingSizeFirstPrice: number | null;
}

export interface ISubMenu {
  _id: string;
  title: string;
}

export interface ICateringMenu {
  _id: string;
  menuTitle: string;
  products: Product[];
}

export interface Product {
  _id: string;
  title: string;
  description: string;
  servingSizeDescription: string;
  cateringMenuSizeWithPrice: CateringSizesWithPrice[];
  posterURL?: string;
}

export interface CateringSizesWithPrice {
  size: string;
  price: number;
  quantity: number;
  _id: string;
}

export interface IMenuAutoComplete {
  _id: string;
  title: string;
  menuType: number;
  label: string;
}

export interface IProductAutoComplete {
  _id: string;
  title: string;
  posterURL: string;
  label: string;
}

export interface IServingSizeWithQuantity {
  productId: string;
  sizes: ISize[];
}

export interface ISize {
  size: string;
  qty: number;
}

export interface ISelectedCateringProduct {
  _id: string;
  title: string;
  posterURL: string;
  sizes: ISize[];
}

export interface PaginationInfo<T> {
  items: T[];
  pageInfo: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}
export interface ICateringRequest {
  name: string;
  mobileNumber: string;
  email: string;
  eventName?: string;
  eventDate: string;
  eventTime: string;
}

export interface ICateringSpecials {
  id: number;
  iconkey: string;
  title: string;
  description: string;
}

export interface ICoupen {
  _id: string;
  coupenName: string;
  coupenType: string;
  discountAmount: number;
  minAmount: number;
  maxAmount: number;
  availability: boolean;
  startDateWithTime: string;
  endDateWithTime: string;
}

export interface ICoupenResponse {
  items: ICoupen[];
}

export interface DistanceBasedDeliveryCharge {
  _id?: string
  amount: string;
  uptoDistance: string;
}

export interface PaymentData {
  url: string;
  quantity: string;
  _id: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  email: string;
  deliveryOption: string;
  amount: number;
  postalCode: number;
  paymentId: string;
  status: string;
  deliveryDate: string;
  createdAt: string;
  orderNumber: string;
  totalWithCoupon: string;
  couponName: string;
  totalWithoutCoupon: string;
  addressURL: string;
  __v: number;
}