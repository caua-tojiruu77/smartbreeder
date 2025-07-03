import produtos from '../mock/produtos_com_variacoes.json';
import categorias from '../mock/categorias.json';
import type { Product } from '../types/Product';
import type { Category } from '../types/Category';

export const getProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(produtos as Product[]);
    }, 1000);
  });
};

export const getCategories = (): Promise<Category[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(categorias as Category[]);
    }, 500);
  });
};
