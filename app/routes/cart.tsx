import Cookies from "js-cookie";
import { redirect } from "react-router";
import { useState } from "react";
import type { Route } from "./+types/cart";
// Pastikan path alias ini udah sesuai sama posisi folder schema lu ya
import type { Cart, CartItem } from "~/modules/cart/type";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Cart - Clothify" }];
}

export async function clientLoader() {
  const token = Cookies.get("token");

  if (!token) {
    return redirect("/login");
  }

  const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  // Kalau token expired atau ada masalah, buang cookie dan suruh login lagi
  if (!response.ok) {
    Cookies.remove("token");
    return redirect("/login");
  }

  const cart = await response.json();
  return { cart };
}

export default function CartRoute({ loaderData }: Route.ComponentProps) {
  // Casting data dari loader ke tipe Cart yang udah kita bikin
  const { cart } = loaderData as { cart: Cart };

  // Masukin items ke dalam state.
  // Ditambahin <CartItem[]> biar TypeScript tau pasti isi array ini apa.
  const [items, setItems] = useState<CartItem[]>(cart?.items || []);
  const token = Cookies.get("token");

  async function updateQuantity(id: string, quantity: number) {
    // Cegah user ngurangin barang sampai minus atau nol
    if (quantity < 1) return;

    // 1. Optimistic UI Update: Ubah angka di layar duluan biar terasa instan dan nggak nge-lag
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item,
      ),
    );

    // 2. Tembak API di belakang layar
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
      // Real talk: Di aplikasi beneran, kalau API gagal, kita harus balikin lagi angkanya ke semula.
      // Tapi untuk sekarang, biar jalan dulu.
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">
        Keranjang Belanja
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <p className="text-gray-500 text-lg">
            Keranjang lu masih kosong nih, Bro.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-6 bg-white border border-gray-100 p-4 rounded-xl shadow-sm"
            >
              {/* Gambar Produk */}
              <div className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Detail Produk */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.product.name}
                </h3>
                {/* Format angka jadi mata uang Rupiah */}
                <p className="text-green-600 font-medium mt-1">
                  Rp {item.product.price.toLocaleString("id-ID")}
                </p>
              </div>

              {/* Kontrol Quantity */}
              <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg border border-gray-200">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                >
                  -
                </button>

                <span className="w-8 text-center font-medium text-gray-900">
                  {item.quantity}
                </span>

                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  // Cegah user nambah lebih dari stok yang ada
                  disabled={item.quantity >= item.product.stock}
                  className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
