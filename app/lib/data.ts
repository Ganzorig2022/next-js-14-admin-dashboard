import { IProduct, IProductsData, IUsersData } from '../types/types';
import { Product, User } from './models';
import { connectToDB } from './utils';

export const fetchUsers = async (q: string, page: number) => {
  const regex = new RegExp(q, 'i');

  const ITEM_PER_PAGE = 2;

  try {
    connectToDB();
    const count = (await User.find({ username: { $regex: regex } })).length;
    const users = await User.find({ username: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    return { count, users } as IUsersData;
  } catch (err) {
    console.log(err);
    return { count: 0, users: [] };
    // throw new Error('Failed to fetch users!');
  }
};

export const fetchUser = async (id: string) => {
  console.log(id);
  try {
    connectToDB();
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.log(err);
    // throw new Error('Failed to fetch user!');
  }
};

export const fetchProducts = async (q: string, page: number) => {
  const regex = new RegExp(q, 'i');

  const ITEM_PER_PAGE = 2;

  try {
    connectToDB();
    const count = (await Product.find({ title: { $regex: regex } })).length;
    const products = await Product.find({ title: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, products } as IProductsData;
  } catch (err) {
    console.log(err);
    return { count: 0, products: [] };
    // throw new Error('Failed to fetch products!');
  }
};

export const fetchProduct = async (id: string) => {
  try {
    connectToDB();
    const product = await Product.findById(id);
    return product as IProduct;
  } catch (err) {
    console.log(err);
    // throw new Error('Failed to fetch product!');
  }
};

// DUMMY DATA

export const cards = [
  {
    id: 1,
    title: 'Total Users',
    number: 10.928,
    change: 12,
  },
  {
    id: 2,
    title: 'Stock',
    number: 8.236,
    change: -2,
  },
  {
    id: 3,
    title: 'Revenue',
    number: 6.642,
    change: 18,
  },
];
