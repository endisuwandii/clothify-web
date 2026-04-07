import { Form, redirect } from "react-router";
import Cookies from "js-cookie";

import type { Product } from "~/modules/product/type";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { formatPrice } from "~/lib/format";
import type { Route } from "./+types/products-slug";

export function meta({ loaderData }: Route.MetaArgs) {
  return [
    { title: `${loaderData.product.name} - Clothify` },
    { name: "description", content: loaderData.product.description },
  ];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const slug = params.slug;

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/products/${slug}`,
  );
  const product: Product = await response.json();

  return { product };
}

// PENANGKAP DATA FORM ADA DI SINI
export async function clientAction({ request }: Route.ClientActionArgs) {
  // 1. Ambil data dari form (quantity dan productId yang tersembunyi)
  const formData = await request.formData();
  const quantity = Number(formData.get("quantity"));
  const productId = formData.get("productId") as string;

  // 2. Cek token login
  const token = Cookies.get("token");
  if (!token) {
    // Kalau belum login, lempar ke halaman login
    return redirect("/login");
  }

  // 3. Tembak API buat masukin ke keranjang
  const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      productId: productId,
      quantity: quantity,
    }),
  });

  // 4. Kalau sukses, langsung pindah ke halaman keranjang
  if (response.ok) {
    return redirect("/cart");
  }

  // Kalau gagal, minimal kita return null biar nggak crash
  return null;
}

export default function ProductsSlugRoute({
  loaderData,
}: Route.ComponentProps) {
  const { product } = loaderData;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="aspect-square bg-white rounded-xl shadow-sm overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-2xl font-semibold text-green-600 mb-4">
                {formatPrice(product.price)}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-500">Stock:</span>
              <span
                className={`font-medium ${
                  product.stock > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.stock > 0
                  ? `${product.stock} available`
                  : "Out of stock"}
              </span>
            </div>

            {/* Add to Cart Form */}
            <Form method="post" className="flex flex-col gap-2 items-start">
              {/* HIDDEN INPUT: Buat ngirim ID ke clientAction tanpa kelihatan user */}
              <input type="hidden" name="productId" value={product.id} />

              <div>
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Quantity
                </label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="1"
                  max={product.stock}
                  defaultValue="1"
                  required
                  disabled={product.stock === 0}
                  className="w-24"
                />
              </div>

              <Button type="submit" disabled={product.stock === 0}>
                Add to Cart
              </Button>
            </Form>

            {/* Product Info */}
            <div className="space-y-4">
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Product Information
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Product ID:</span>
                    <span className="ml-2 font-medium">{product.id}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">SKU:</span>
                    <span className="ml-2 font-medium">{product.slug}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
