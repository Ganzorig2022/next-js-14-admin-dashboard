export interface IUser {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  isActive: boolean;
  phone: string;
  img: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUsersData {
  count: number;
  users: IUser[];
}

export interface IProduct {
  id: string;
  title: string;
  desc: string;
  price: number;
  stock: number;
  phone: string;
  img: string;
  color: string;
  size: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductsData {
  count: number;
  products: IProduct[];
}

export interface IUserFormData {
  username: File | string;
  email: File | string;
  password: File | string;
  isAdmin: File | boolean;
  isActive: File | boolean;
  phone: File | string;
  address: File | string;
}

export interface IObject {
  [key: string]: File | string | boolean;
}
