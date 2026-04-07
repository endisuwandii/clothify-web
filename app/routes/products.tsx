import type { Products } from "~/modules/product/type";
import { ProductsGrid } from "~/modules/product/components/products-grid";
import type { Route } from "./+types/products";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Products - Clothify" },
    { name: "description", content: "All products from Clothify." },
  ];
}

export async function clientLoader() {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/products`,
  );
  const products: Products = await response.json();

  return { products };
}

export default function ProductsRoute({ loaderData }: Route.ComponentProps) {
  const { products } = loaderData;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <section className="mx-auto w-full max-w-7xl px-6 py-12 lg:px-8">
        <div className="mb-10 border-b border-zinc-100 pb-8 text-center md:text-left">
          <h2 className="text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl">
            Our Products
          </h2>
          <p className="mt-2 text-sm text-zinc-500 sm:text-base">
            Menampilkan koleksi eksklusif Clothify.
          </p>
        </div>

        <div className="flex w-full justify-center">
          <ProductsGrid products={products} />
        </div>
      </section>
    </div>
  );
}
