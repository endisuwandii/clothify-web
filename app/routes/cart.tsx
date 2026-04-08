import Cookies from "js-cookie";
import type { Route } from "./+types/cart";
import { redirect } from "react-router";
import type { Cart, CartItem } from "~/modules/cart/type"; // Pastikan import CartItem juga kalau butuh
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Cart" }];
}

export async function clientLoader() {
  const token = Cookies.get("token");
  if (!token) return redirect("/login");

  const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    // 1. Kalau masalah token (Unauthorized / Forbidden) baru tendang
    if (response.status === 401 || response.status === 403) {
      Cookies.remove("token");
      return redirect("/login");
    }

    // 2. Kalau keranjang kosong (Not Found) atau Server Error, balikin array kosong
    return { cart: { items: [] } };
  }

  const cart = await response.json();
  return { cart };
}

export default function CartRoute({ loaderData }: Route.ComponentProps) {
  const { cart } = loaderData as { cart: Cart };

  // PENGAMAN: Kasih fallback array kosong kalau cart-nya undefined/null
  const [items, setItems] = useState(cart?.items || []);

  const token = Cookies.get("token");

  async function updateQuantity(id: string, quantity: number) {
    if (quantity < 1) return;

    // Optimistic Update
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );

    // Tembak API
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/cart/item/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity }),
      });
    } catch (error) {
      console.error("Gagal update quantity:", error);
    }
  }

  async function deleteItem(id: string) {
    // Optimistic Update
    setItems((prev) => prev.filter((item) => item.id !== id));

    // Tembak API
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/cart/item/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error("Gagal hapus item:", error);
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {items.length === 0 && (
        <p className="text-gray-500 text-lg">Your cart is empty.</p>
      )}

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 border p-4 rounded-lg shadow-sm"
          >
            <img
              src={item.product.imageUrl}
              alt={item.product.name}
              className="w-20 h-20 object-cover rounded"
            />

            <div className="flex-1">
              <h3 className="font-semibold text-lg">{item.product.name}</h3>
              <p className="text-gray-600">
                Rp {item.product.price.toLocaleString("id-ID")}
              </p>
            </div>

            {/* QUANTITY BUTTONS */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                -
              </button>

              <p className="font-semibold">{item.quantity}</p>

              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>

            <div className="text-right w-32">
              <p className="font-semibold">Subtotal</p>
              <p>
                Rp{" "}
                {(item.product.price * item.quantity).toLocaleString("id-ID")}
              </p>
            </div>

            {/* DELETE BUTTON */}
            <button
              onClick={() => deleteItem(item.id)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      <div className="mt-10 border-t pt-6 text-right">
        <p className="text-2xl font-bold">
          Total: Rp{" "}
          {items
            .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
            .toLocaleString("id-ID")}
        </p>
      </div>
    </div>
  );
}
