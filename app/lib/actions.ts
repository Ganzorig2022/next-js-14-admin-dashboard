'use server';

import { revalidatePath } from 'next/cache';
import { Product, User } from './models';
import { connectToDB } from './utils';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import { signIn } from '../auth';
import { IObject } from '../types/types';

export const addUser = async (formData: FormData) => {
  // [
  //   { name: 'username', value: 'zaya@gmail.com' },
  //   { name: 'email', value: 'ganzorig.n@qpay.mn' },
  //   { name: 'password', value: '123456' },
  //   { name: 'phone', value: '88008159' },
  //   { name: 'isAdmin', value: 'true' },
  //   { name: 'isActive', value: 'true' },
  //   { name: 'address', value: 'BGD' }
  // ]

  const { username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hash(password as string, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
      isAdmin: isAdmin === 'false' ? false : true,
      isActive: isActive === 'false' ? false : true,
    });

    await newUser.save();
  } catch (err) {
    console.log(err);
    throw new Error('Failed to create user!');
  }

  revalidatePath('/dashboard/users');
  redirect('/dashboard/users');
};

export const updateUser = async (formData: FormData) => {
  const { id, username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields: IObject = {
      username,
      email,
      password,
      phone,
      address,
      isAdmin: isAdmin === 'false' ? false : true,
      isActive: isActive === 'false' ? false : true,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === '' || undefined) && delete updateFields[key],
    );

    await User.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error('Failed to update user!');
  }

  revalidatePath('/dashboard/users');
  redirect('/dashboard/users');
};

export const addProduct = async (formData: FormData) => {
  const { title, desc, price, stock, color, size } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const newProduct = new Product({
      title,
      desc,
      price,
      stock,
      color,
      size,
    });

    await newProduct.save();
  } catch (err) {
    console.log(err);
    throw new Error('Failed to create product!');
  }

  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
};

export const updateProduct = async (formData: FormData) => {
  const { id, title, desc, price, stock, color, size } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields: IObject = {
      title,
      desc,
      price,
      stock,
      color,
      size,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === '' || undefined) && delete updateFields[key],
    );

    await Product.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error('Failed to update product!');
  }

  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
};

export const deleteUser = async (formData: FormData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await User.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error('Failed to delete user!');
  }

  revalidatePath('/dashboard/products');
};

export const deleteProduct = async (formData: FormData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await Product.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error('Failed to delete product!');
  }

  revalidatePath('/dashboard/products');
};

export const authenticate = async (prevState: any, formData: FormData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn('credentials', { username, password });
  } catch (err: any) {
    if (err.message.includes('CredentialsSignin')) {
      return 'Wrong Credentials';
    }
    throw err;
  }
};
