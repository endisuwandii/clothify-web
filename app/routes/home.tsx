import type { Products } from "~/modules/product/type";
import type { Route } from "./+types/home";
import { ProductsGrid } from "~/modules/product/components/products-grid";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Clothify" },
    { name: "description", content: "Merchandise." },
  ];
}

// export async function clientLoader() {
//   const response = await fetch(
//     `${import.meta.env.VITE_BACKEND_API_URL}/products`,
//   );
//   const products: Products = await response.json();

//   return { products };
// }

// export default function Home({ loaderData }: Route.ComponentProps) {
//   const { products } = loaderData;

//   return (
//     <div className="flex justify-center mt-10">
//       <ProductsGrid products={products} />
//     </div>
//   );
// }

import { HeroSection } from "./hero-section";
// import { ProductsGrid } from "~/components/ProductsGrid"; // Sesuaikan path Anda
// ... import Route Types ...

export async function clientLoader() {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/products`,
  );
  // Pastikan error handling ditambahkan jika fetch gagal
  if (!response.ok) throw new Error("Failed to fetch products");

  const products = await response.json();
  return { products };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { products } = loaderData;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section diletakkan di paling atas */}
      <HeroSection />

      {/* Bagian Grid Produk */}
      {/* <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-black text-zinc-900">
            Featured Products
          </h2>
        </div>

       
        <ProductsGrid products={products} />
      </div> */}
    </div>
  );
}
