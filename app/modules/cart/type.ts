import type { Product } from "../product/type";

export type CartItem = {
  id: string;
  quantity: number;

  // Relasi Data
  productId: string;
  product: Product; // Memanggil interface Product di atas

  cartId: string;
  createdAt: string;
  updatedAt: string;
};

// 3. Tipe Data Induk Keranjang (Bungkusan utamanya)
export type Cart = {
  id: string;
  userId: string;

  // Array dari interface CartItem di atas
  items: CartItem[];

  createdAt: string;
  updatedAt: string;
};
